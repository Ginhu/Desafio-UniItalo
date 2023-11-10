<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Centro Universitário Católico Ítalo Brasileiro
        </q-toolbar-title>

        <q-btn class="q-mr-sm" flat @click="confirm = true">
          <q-icon name="logout" size="md" />
        </q-btn>

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="logout" color="primary" text-color="white" />
              <span class="q-ml-sm"
                >Realizar logout. Caso queira acessar terá que realizar login
                novamente.</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                flat
                label="Logout"
                color="primary"
                v-close-popup
                @click="confirmLogout"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import logout from "../composables/Logout";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Area do Aluno",
    icon: "school",
  },
  {
    title: "Fale com um tutor",
    icon: "chat",
  },
  {
    title: "Forum",
    icon: "record_voice_over",
  },
  {
    title: "Financeiro",
    icon: "savings",
  },
  {
    title: "Jurídico",
    icon: "work",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      confirm: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      confirmLogout() {
        logout();
        router.push({ name: "login" });
      },
    };
  },
});
</script>
