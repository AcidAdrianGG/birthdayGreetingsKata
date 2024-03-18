import { EmailSender } from "./EmailSender.js"

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

export class BirthdayGreetings {
  constructor(
    private readonly clock: Clock,
    private readonly people: Person[] = [],
    private readonly emailSender: EmailSender,
  ) {
    this.clock = clock
    this.people = people
    this.emailSender = emailSender
  }

  protected isThisPersonBirthdayToday(person: Person): boolean {
    const today: Date = this.clock.now()
    return person.dateOfBirth.getDate() == today.getDate() && person.dateOfBirth.getMonth() == today.getMonth()
  }

  async sendGreetings(): Promise<void> {
    const filteredPeople = this.people.filter((person: Person) => this.isThisPersonBirthdayToday(person))

    if (filteredPeople.length == 0) {
      throw Error("no birthdays for today")
    }
    await this.emailSender.send(filteredPeople)
  }
}
