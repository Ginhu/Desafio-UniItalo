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
</script>
