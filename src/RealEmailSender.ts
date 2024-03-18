import * as nodemailer from "nodemailer"
import { Person } from "./BirthdayGreetings.js"
import { EmailSender } from "./EmailSender.js"

export class RealEmailSender implements EmailSender {
  async send(people: Person[]): Promise<void> {
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

    people.forEach((person) => {
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
    })
    await Promise.all(sendEmailPromises)

    return
  }
}
