<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-4 q-pa-xl">
        <div class="text-center">
          <q-img class="logo" src="src/assets/logo.png" />
        </div>

        <div class="text-h4 text-bold q-mt-lg">Desafio Uni Ítalo</div>
        <div class="text-grey-7">Please login your account below</div>
        <div class="column">
          <q-input
            class="q-mt-sm"
            outlined
            label="Enter login"
            v-model="form.login.value"
            :error="form.login.error"
            :error-message="form.login.msg"
          >
            <template v-slot:prepend>
              <q-icon name="email"></q-icon>
            </template>
          </q-input>
          <q-input
            class="q-mt-sm"
            outlined
            label="Enter password"
            v-model="form.password.value"
            :error="form.password.error"
            :error-message="form.password.msg"
          >
            <template v-slot:prepend> <q-icon name="lock"></q-icon> </template>
            <template v-slot:append>
              <q-icon name="visibility_off"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="column">
          <q-btn class="q-mt-sm" color="indigo" @click="submitLogin"
            >Login</q-btn
          >
        </div>
      </div>
      <div class="col-12 col-md-8 col-lg-8 text-center">
        <q-img class="login-logo" src="src/assets/Campus_UniÍtalo.jpeg"></q-img>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {
  useCounterStore,
  usersDB,
  userSession,
} from "src/stores/example-store";
import { ref, onMounted } from "vue";
import useNotify from "../composables/UserNotify";
import { useRouter } from "vue-router";
import loginSession from "src/composables/Login";
import { LocalStorage } from "quasar";

const form = ref({
  login: {
    value: "",
    required: true,
  },
  password: {
    value: "",
    required: true,
  },
});

const notifyError = useNotify();
const users = usersDB();
const router = useRouter();
const session = userSession();
const newSessions = loginSession();

onMounted(() => {
  if (LocalStorage.has("userSession")) {
    const sessions = JSON.parse(LocalStorage.getItem("sessions"));
    let sessionActive = false;
    for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].token === session.data.token) {
        sessionActive = true;
        router.push({ name: "home" });
        break;
      }
    }
  }
});

const submitLogin = () => {
  const usersArray = users.all;
  const login = form.value.login.value;
  const password = Number(form.value.password.value);
  let usera;

  let teste = false;

  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].login === login && usersArray[i].senha === password) {
      teste = true;
      usera = usersArray[i].nome;
      break;
    }
  }

  if (teste) {
    newSessions(usera);
    return router.push({ name: "home" });
  } else {
    return notifyError();
  }
};
</script>
<style scoped>
.logo {
  width: 85%;
}

.login-logo {
  width: 100%;
  margin: 2px 2px;
}
</style>
