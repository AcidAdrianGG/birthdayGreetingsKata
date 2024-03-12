import * as nodemailer from "nodemailer"
import * as dotenv from "dotenv"

dotenv.config()

export interface Greeting {
  subject: string
  body: string
}

export interface Person {
  name: string
  lastName: string
  dateOfBirth: Date
  email: string
}
export class Clock {
  now() {
    return new Date()
  }
}

export abstract class BirthdayGreetings {
  protected readonly clock: Clock
  protected readonly people: Person[]

  constructor(clock: Clock, people: Person[] = []) {
    this.clock = clock
    this.people = people
  }

  protected isThisPersonBirthdayToday(person: Person): boolean {
    const today: Date = this.clock.now()
    return person.dateOfBirth.getDate() == today.getDate() && person.dateOfBirth.getMonth() == today.getMonth()
  }

  abstract sendGreetings(): unknown
}

export interface Response {
  data: string[]
  length: number
}

export class BirthDayGreetingsEmail extends BirthdayGreetings {
  async sendGreetings(): Promise<Response> {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: parseInt(process.env.PORT as string),
      secure: false,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    const sendEmailPromises: Promise<string>[] = []

    this.people.forEach((person: Person) => {
      if (this.isThisPersonBirthdayToday(person)) {
        const mailOptions = {
          from: process.env.AUTH_USER,
          to: person.email,
          subject: "Happy birthday!",
          text: "Happy birthday, dear " + person.name + "!",
        }

        sendEmailPromises.push(
          new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                reject(err.message)
              } else {
                resolve(info.response)
              }
            })
          }),
        )
      }
    })

    const responses = await Promise.all(sendEmailPromises)
    return {
      data: responses,
      length: responses.length
    }
  }
}
