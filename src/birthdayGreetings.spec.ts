import { describe, it, expect } from "vitest"
import { BirthdayGreetings, Greeting, Person, Clock } from "./birthdayGreetings.js"

export class BirthdayGreetingsTesteable extends BirthdayGreetings {
  sendGreetings(): Greeting[] {
    let greetings: Greeting[] = []

    this.people.forEach((person: Person) => {
      if (this.isThisPersonBirthdayToday(person)) {
        greetings.push({
          subject: "Happy birthday!",
          body: "Happy birthday, dear " + person.name + "!",
        })
      }
    })

    if (greetings.length != 0) {
      return greetings
    }

    throw Error("no birthdays for today")
  }
}


const person: Person = {
  name: "John",
  lastName: "Doe",
  dateOfBirth: new Date(1982, 9 , 8),
  email: 'johnDoe@example.com'
}

const person2: Person = {
  name: "Ann",
  lastName: "Mary",
  dateOfBirth: new Date(1975, 9, 8),
  email: "annMary@example.com"
}

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
    
    const birthdayGreetings: BirthdayGreetingsTesteable = createBirthdayGreetings(8, 9, 1982, [person])

    const greetings: Greeting[] = birthdayGreetings.sendGreetings()

    expect(greetings.length).toBe(1)
    expect(greetings[0].subject).toBe("Happy birthday!")
    expect(greetings[0].body).toBe("Happy birthday, dear " + person.name + '!')
  })

  it ("displays happy birthday to 2 people", () => {
    const people = [
      person, 
      person2
    ]

    const birthdayGreetings: BirthdayGreetingsTesteable = createBirthdayGreetings(8, 9, 2001, people)
    const greetings: Greeting[] = birthdayGreetings.sendGreetings()

    expect(greetings.length).toBe(2)
    expect(greetings[0].subject).toBe("Happy birthday!")
    expect(greetings[1].subject).toBe("Happy birthday!")
    expect(greetings[0].body).toBe("Happy birthday, dear " + person.name + '!')
    expect(greetings[1].body).toBe("Happy birthday, dear " + person2.name + '!')

  })
})

function createBirthdayGreetings(day: number, month: number, year: number, people: Person[]) {
  const today = new Date("2024-03-11T00:00:00.000Z")
  today.setDate(day)
  today.setMonth(month)
  today.setFullYear(year)
  const clockStub = { now: () => today }
  return new BirthdayGreetingsTesteable(clockStub, people)
}
