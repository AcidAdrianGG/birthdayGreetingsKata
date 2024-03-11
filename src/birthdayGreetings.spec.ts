import { describe, it, expect } from "vitest"
import { BirthdayGreetings } from "./birthdayGreetings.js"

describe("BirthDayGreetings", () => {
  it("displays Happy Birthday!", () => {
    const birthdayGreetings = new BirthdayGreetings()

    const greetings: string = birthdayGreetings.sendGreetings()

    expect(greetings).toBe("Happy Birthday!")
  })
})