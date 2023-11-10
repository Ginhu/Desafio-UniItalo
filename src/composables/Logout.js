import { LocalStorage } from "quasar";
export default function logout() {
  LocalStorage.remove("userSession");
}
