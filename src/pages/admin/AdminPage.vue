<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Treats"
        :rows="array"
        :columns="columns"
        row-key="nome"
        class="col-12"
      >
        <template v-slot:top>
          <span class="text-h6">Usuários</span>
          <q-space />
          <q-btn
            label="Adicionar novo"
            color="primary"
            icon="add"
            :to="{ name: 'form' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-xs">
            <q-btn icon="edit" color="info" dense @click="edit(props.row)">
              <q-tooltip> Editar </q-tooltip></q-btn
            >
            <q-btn
              icon="delete"
              color="negative"
              dense
              @click="remove(props.row)"
            >
              <q-tooltip> Deletar </q-tooltip></q-btn
            >
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, toRaw, ref } from "vue";
import { useRouter } from "vue-router";
import { LocalStorage, useQuasar } from "quasar";
import { usersDB } from "src/stores/example-store";
import { columns } from "src/composables/Columns";

const router = useRouter();
const users = usersDB();
const array = ref([]);
const $q = useQuasar();

onMounted(() => {
  const usersDB = JSON.parse(LocalStorage.getItem("usersDB"));
  users.update(usersDB);
  array.value = toRaw(users.all);
  if (!LocalStorage.has("userSession")) {
    router.push({ name: "login" });
  }
});

const edit = (data) => {
  router.push({ name: "form", params: { nome: data.nome } });
};

const remove = (data) => {
  $q.dialog({
    title: "Confirmar",
    message: `Deseja mesmo remover ${data.nome}`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    if (data.nome === "admin") return alert("admin não pode ser deletado!");
    array.value.splice(array.value.indexOf(data));
    const newArray = toRaw(array.value);

    LocalStorage.set("usersDB", JSON.stringify(newArray));
  });
};

columns;
</script>
