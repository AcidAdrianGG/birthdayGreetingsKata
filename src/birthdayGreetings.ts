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


export class BirthdayGreetings {
  private readonly clock: Clock
  private readonly people: Person[]

  constructor(clock: Clock, people: Person[] = []) {
    this.clock = clock
    this.people = people
  }

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

  private isThisPersonBirthdayToday(person: Person): boolean {
    const today: Date = this.clock.now()
    return person.dateOfBirth.getDate() == today.getDate() &&
      person.dateOfBirth.getMonth() == today.getMonth();
  }
}
