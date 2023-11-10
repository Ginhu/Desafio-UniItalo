<template>
  <q-page>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
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
import { useCounterStore, usersDB } from "src/stores/example-store";
import { ref } from "vue";
import useNotify from "../composables/UserNotify";
import { useRouter } from "vue-router";

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
const counter = useCounterStore();
const users = usersDB();
const router = useRouter();

const submitLogin = () => {
  /* counter.increment(); */
  const usersArray = users.all;
  const login = form.value.login.value;
  const password = Number(form.value.password.value);
  /* const data = usersArray.map((element) => {
    if (element.nome === login && element.senha === password) {
      return element;
    }
  }); */

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

  /*  const locals = counter.get;
      console.log(locals); */
  /* console.log(counter.count);
      console.log("A contagem dupla é ", counter.doubleCount); */
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
