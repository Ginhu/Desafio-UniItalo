import { LocalStorage } from "quasar";
import { v4 as uuid } from "uuid";

export default function loginSession() {
  const token = uuid();
  const sessions = JSON.parse(LocalStorage.getItem("sessions"));

  const newSessions = (nome) => {
    const updatedSession = [...sessions, { nome, token }];
    LocalStorage.set("sessions", JSON.stringify(updatedSession));
    LocalStorage.set("userSession", { nome, token });
  };

  return newSessions;
}
