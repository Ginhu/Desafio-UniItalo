import { LocalStorage } from "quasar";
import { v4 as uuid } from "uuid";

export default function loginSession() {
  const token = uuid();
  const sessions = JSON.parse(LocalStorage.getItem("sessions"));

  const newSessions = (user) => {
    const updatedSession = [...sessions, { user, token }];
    LocalStorage.set("sessions", JSON.stringify(updatedSession));
    LocalStorage.set("userSession", { user, token });
  };

  return newSessions;
  /* const newSessions = (user) => [...sessions, { user, token }];
  LocalStorage.set("usersSessions", JSON.stringify(newSessions)); */
}