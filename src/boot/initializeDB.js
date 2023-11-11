import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";

export default boot(() => {
  const usersDB = LocalStorage.getItem("usersDB");
  const usersSessions = LocalStorage.getItem("sessions");
  const users = [
    { nome: "admin", login: "admin", senha: "123123", grupo: "administrador" },
  ];

  const sessions = [];

  if (!usersDB) {
    LocalStorage.set("usersDB", JSON.stringify(users));
  }

  if (!usersSessions) {
    LocalStorage.set("sessions", JSON.stringify(sessions));
  }
});
