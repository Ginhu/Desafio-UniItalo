<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Form</p>
      </div>
      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
        @submit.prevent="click"
      >
        <q-input label="Nome" v-model="form.nome.value" />
        <q-input label="Login" v-model="form.login.value" />
        <q-input label="Senha" v-model="form.senha.value" />
        <q-input label="Grupo" v-model="form.grupo.value" />

        <q-btn
          label="Salvar"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />
        <q-btn
          label="Cancelar"
          color="primary"
          class="full-width"
          rounded
          flat
          :to="{ name: 'admin' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, toRaw, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usersDB } from "src/stores/example-store";
import { LocalStorage } from "quasar";

const form = ref({
  nome: {
    value: "",
    required: true,
  },
  login: {
    value: "",
    required: true,
  },
  senha: {
    value: "",
    required: true,
  },
  grupo: {
    value: "",
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const isUpdate = computed(() => route.params.nome);
const userState = usersDB();
let data = {};
let index;

onMounted(() => {
  if (isUpdate.value) {
    userData(isUpdate.value);
  }
  const usersDB = JSON.parse(LocalStorage.getItem("usersDB"));
  userState.update(usersDB);
});

const userData = (nome) => {
  const usersArray = toRaw(userState.all);
  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].nome === nome) {
      data = usersArray[i];
      index = i;

      form.value.nome.value = data.nome;
      form.value.login.value = data.login;
      form.value.senha.value = data.senha;
      form.value.grupo.value = data.grupo;
      break;
    }
  }
};

const click = () => {
  let userData;
  if (
    form.value.nome.value &&
    form.value.login.value &&
    form.value.senha.value &&
    form.value.grupo.value
  ) {
    userData = {
      nome: form.value.nome.value,
      login: form.value.login.value,
      senha: form.value.senha.value,
      grupo: form.value.grupo.value,
    };
  } else {
    return;
  }

  const users = toRaw(userState.all);

  if (isUpdate.value) {
    users[index] = userData;
  } else {
    users.push(userData);
  }

  userState.update(users);
  LocalStorage.set("usersDB", JSON.stringify(users));
  router.push({ name: "admin" });
};
</script>
