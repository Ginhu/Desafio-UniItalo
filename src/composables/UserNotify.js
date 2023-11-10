import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifyError = (message) => {
    $q.notify({
      type: "negative",
      message: message || "Login Error!",
    });
  };

  return notifyError;
}
