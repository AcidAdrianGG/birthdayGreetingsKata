import { BirthdayGreetings, Clock, Person } from "./BirthdayGreetings.js"
import { RealEmailSender } from "./RealEmailSender.js"

const people: Person[] = [
  {
    name: "Entrainer",
    lastName: "LoL",
    dateOfBirth: new Date(2001, 2, 12),
    email: "entrainerlol@gmail.com",
  },
]

const birthdayGreetingsViaEmail = new BirthdayGreetings(new Clock(), people, new RealEmailSender())
birthdayGreetingsViaEmail
  .sendGreetings()
  .then((response) => {
    console.log("Emails sent succesfully: ", response)
  })
  .catch((err) => {
    console.error("Error ocurred when sending emails: ", err)
  })
