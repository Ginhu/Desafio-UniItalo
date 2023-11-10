<template>
  <q-page>
    <q-img
      alt="Quasar logo"
      src="../assets/logo.png"
      class="absolute-center"
      style="max-width: 600px"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";

const router = useRouter();

onMounted(() => {
  if (!LocalStorage.has("userSession")) {
    router.push({ name: "login" });
  }
});

/* const submitLogin = () => {
  const usersArray = users.all;
  const login = form.value.login.value;
  const password = Number(form.value.password.value);

  let teste = false;

  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].login === login && usersArray[i].senha === password) {
      teste = true;
      break;
    }
  }

  if (teste) {
    return router.push({ name: "home" });
  } else {
    return notifyError();
  }
}; */
</script>
