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
          <q-form>
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
              :type="visible ? 'text' : 'password'"
            >
              <template v-slot:prepend> <q-icon name="lock" /> </template>
              <template v-slot:append>
                <q-icon
                  @click="switchVisibility"
                  :name="visible ? 'visibility' : 'visibility_off'"
                />
              </template>
            </q-input>
          </q-form>
        </div>
        <div class="column">
          <q-btn class="q-mt-sm" color="indigo" @click.prevent="submitLogin"
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
import { usersDB, userSession } from "src/stores/store";
import { ref, onMounted, toRaw } from "vue";
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
  const usersDB = JSON.parse(LocalStorage.getItem("usersDB"));
  users.update(usersDB);

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

let visible = false;

const switchVisibility = () => {
  visible = !visible;
};

const submitLogin = () => {
  const usersArray = toRaw(users.all);
  const login = form.value.login.value;
  const password = form.value.password.value;

  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].login === login && usersArray[i].senha === password) {
      const userName = usersArray[i].nome;
      newSessions(userName);

      if (login === "admin") {
        return router.push({ name: "admin" });
      } else {
        return router.push({ name: "home" });
      }
    }
  }

  return notifyError();
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
