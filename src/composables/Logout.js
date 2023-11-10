import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default function logout() {
  const $q = useQuasar();
  const router = useRouter();
  return console.log("logout");
}
