import { boot } from "quasar/wrappers";
import { Loading, LocalStorage, SessionStorage } from "quasar";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(() => {
  const usersDB = LocalStorage.getItem("usersDB");
  const usersSessions = LocalStorage.getItem("usersSessions");
  const users = [
    { nome: "admin", login: "admin", senha: 123123, grupo: "administrador" },
  ];

  const sessions = [];

  if (!usersDB) {
    LocalStorage.set("usersDB", JSON.stringify(users));
  }

  if (!usersSessions) {
    LocalStorage.set("usersSessions", JSON.stringify(sessions));
  }
});
