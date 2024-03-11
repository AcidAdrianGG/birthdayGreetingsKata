import { describe, it, expect } from "vitest"
import { BirthdayGreetings } from "./birthdayGreetings.js"

describe("BirthDayGreetings", () => {
  it("displays error when there is no birthday greetings to send", () => {
    const birthdayGreetings = new BirthdayGreetings()

    try {
      const greetings: string = birthdayGreetings.sendGreetings()
    } catch (error) {
      expect(error.message).toBe("no birthdays for today")
    }

  })
})
