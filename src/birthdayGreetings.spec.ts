import { describe, it, expect } from "vitest"
import { BirthdayGreetings } from "./birthdayGreetings.js"
import { Greeting } from "./birthdayGreetings.js"
import { Person } from "./birthdayGreetings.js"

describe("BirthDayGreetings", () => {
  it("displays error when there is no birthday greetings to send", () => {
    const birthdayGreetings = createBirthdayGreetings(11, 4, 2024, [])  
    try {
      birthdayGreetings.sendGreetings()
    } catch (error) {
      expect(error.message).toBe("no birthdays for today")
    }
  })

  it("displays happy birthday to 1 person", () => {
    const person = {
      name: "John",
      lastName: "Doe",
      dateOfBirth: new Date(1982, 9 , 8),
      email: 'johnDoe@example.com'
    }
    const birthdayGreetings: BirthdayGreetings = createBirthdayGreetings(8, 9, 1982, [person])

    const greetings: Greeting[] = birthdayGreetings.sendGreetings()

    expect(greetings.length).toBe(1)
    expect(greetings[0].subject).toBe("Happy birthday!")
    expect(greetings[0].body).toBe("Happy birthday, dear " + person.name + '!')
  })
})

function createBirthdayGreetings(day: number, month: number, year: number, people: Person[]) {
  const today = new Date("2024-03-11T00:00:00.000Z")
  today.setDate(day)
  today.setMonth(month)
  today.setFullYear(year)
  const clockStub = { now: () => today }
  return new BirthdayGreetings(clockStub, people)
}
