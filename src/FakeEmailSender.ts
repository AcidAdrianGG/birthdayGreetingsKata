import { Person } from "./BirthdayGreetings.js"
import { EmailSender } from "./EmailSender.js"

export interface Greeting {
  subject: string
  body: string
}

export class FakeEmailSender implements EmailSender {
  public amountOfCalls: number = 0
  public greetings: Greeting[] = []

  async send(people: Person[]): Promise<void> {
    this.amountOfCalls += people.length
    const greetings = people.map((person) => ({ subject: "Happy birthday!", body: person.name }))
    greetings.forEach((greeting) => this.greetings.push(greeting))
  }
}
