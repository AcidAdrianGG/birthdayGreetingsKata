import { Person } from "./BirthdayGreetings.js"

export interface EmailSender {
  send(people: Person[]): Promise<void>
}
