import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(() => {
  const usersDB = LocalStorage.getItem("usersDB");
  const usersSessions = LocalStorage.getItem("sessions");
  const users = [
    { nome: "admin", login: "admin", senha: "123123", grupo: "administrador" },
    { nome: "teste 1", login: "teste", senha: "a1", grupo: "aluno" },
  ];

  const sessions = [];

  if (!usersDB) {
    LocalStorage.set("usersDB", JSON.stringify(users));
  }

  if (!usersSessions) {
    LocalStorage.set("sessions", JSON.stringify(sessions));
  }
});
