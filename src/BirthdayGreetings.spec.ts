import { describe, expect, it } from "vitest"
import { BirthdayGreetings, Person } from "./BirthdayGreetings.js"
import { EmailSender } from "./EmailSender.js"
import { FakeEmailSender } from "./FakeEmailSender.js"

const person: Person = {
  name: "John",
  lastName: "Doe",
  dateOfBirth: new Date(1982, 9, 8),
  email: "johnDoe@example.com",
}

const person2: Person = {
  name: "Ann",
  lastName: "Mary",
  dateOfBirth: new Date(1975, 9, 8),
  email: "annMary@example.com",
}

describe("BirthDayGreetings", () => {
  it("displays error when there is no birthday greetings to send", () => {
    const birthdayGreetings = createBirthdayGreetings(11, 4, 2024, [])
    expect(birthdayGreetings.sendGreetings()).rejects.toThrow("no birthdays for today")
  })

  it("displays happy birthday to 1 person", () => {
    const emailSender = new FakeEmailSender()
    const birthdayGreetings: BirthdayGreetings = createBirthdayGreetings(8, 9, 1982, [person], emailSender)

    birthdayGreetings.sendGreetings()

    expect(emailSender.amountOfCalls).toBe(1)
    expect(emailSender.greetings[0].subject).toBe("Happy birthday!")
    expect(emailSender.greetings[0].body).toBe(person.name)
  })

  it("displays happy birthday to 2 people", () => {
    const emailSender = new FakeEmailSender()
    const people = [person, person2]

    const birthdayGreetings: BirthdayGreetings = createBirthdayGreetings(8, 9, 2001, people, emailSender)
    birthdayGreetings.sendGreetings()

    expect(emailSender.amountOfCalls).toBe(2)
    expect(emailSender.greetings[0].subject).toBe("Happy birthday!")
    expect(emailSender.greetings[1].subject).toBe("Happy birthday!")
    expect(emailSender.greetings[0].body).toBe(person.name)
    expect(emailSender.greetings[1].body).toBe(person2.name)
  })
})

function createBirthdayGreetings(
  day: number,
  month: number,
  year: number,
  people: Person[],
  emailSender: EmailSender = new FakeEmailSender(),
) {
  const today = new Date("2024-03-11T00:00:00.000Z")
  today.setDate(day)
  today.setMonth(month)
  today.setFullYear(year)
  const clockStub = { now: () => today }
  return new BirthdayGreetings(clockStub, people, emailSender)
}
