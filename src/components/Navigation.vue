<template>
  <div>
    <vs-navbar
      not-line
      color="#009ACB"
      shadow
      center-collapsed
      v-model="active"
    >
      <template #left>
        <vs-button
          @click="activeSidebar = !activeSidebar"
          v-if="isAuth"
          class="bg-white"
          transparent
          icon
        >
          <i class="bx bx-menu"></i>
        </vs-button>
        &nbsp; &nbsp;
        <vs-avatar circle class="logo-navbar">
          <img alt="img" src="../assets/img/logo.svg" />
        </vs-avatar>
        <vs-navbar-item class="bg-white" :active="active == 'guide'" id="guide">
          PRET
        </vs-navbar-item>
      </template>
      <template #right>
        <vs-button v-if="!isAuth" transparent class="bg-white">Acceso</vs-button>
        <vs-button @click="cerrarSesion()" v-else transparent class="bg-white">Cerrar sesión</vs-button>
        &nbsp;
      </template>
    </vs-navbar>
    <vs-sidebar
      absolute
      v-model="active"
      :open.sync="activeSidebar"
      class="space-sidebar"
    >
      <template #logo>
        <img alt="img" src="../assets/img/logo.svg" />
      </template>
      <vs-sidebar-item id="perfil" to="/candidato/perfil">
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
        Perfil
      </vs-sidebar-item>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-task"></i>
            </template>
            Vacantes
          </vs-sidebar-item>
        </template>
        <vs-sidebar-item id="vacantes" to="/candidato/buscar">
          <template #icon>
            <i class="bx bx-bookmarks"></i>
          </template>
          Vacantes disponibles
        </vs-sidebar-item>
        <vs-sidebar-item id="postulaciones" to="/candidato/postulaciones">
          <template #icon>
            <i class="bx bx-bookmark-plus"></i>
          </template>
          Listado de postulaciones
        </vs-sidebar-item>
        <vs-sidebar-item id="favoritos" to="/candidato/favoritos">
          <template #icon>
            <i class="bx bx-bookmark-heart"></i>
          </template>
          Favoritos
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-item id="contactos" to="/candidato/contactos">
        <template #icon>
          <i class="bx bx-user-pin"></i>
        </template>
        Contactos
      </vs-sidebar-item>
      <vs-sidebar-item id="perfilReclutador" to="/reclutador/perfil">
        <template #icon>
          <i class="bx bx-buildings"></i>
        </template>
        Perfil
      </vs-sidebar-item>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-task"></i>
            </template>
            Vacantes
          </vs-sidebar-item>
        </template>
        <vs-sidebar-item id="vacantesPublicadas" to="/reclutador/vacantes">
          <template #icon>
            <i class="bx bx-bookmarks"></i>
          </template>
          Vacantes publicadas
        </vs-sidebar-item>
        <vs-sidebar-item id="registroVacante" to="/reclutador/registrarVacante">
          <template #icon>
            <i class="bx bx-bookmark-plus"></i>
          </template>
          Registrar vacante
        </vs-sidebar-item>
      </vs-sidebar-group>
      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar>
            <img src="/avatars/avatar-5.png" alt="" />
          </vs-avatar>

          <vs-avatar badge-color="danger" badge-position="top-right">
            <i class="bx bx-bell"></i>

            <template #badge> 28 </template>
          </vs-avatar>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data: () => ({
    active: "home",
    activeSidebar: false,
  }),
  methods: {
    async cerrarSesion() {
      try {
        await this.$store.dispatch("logout");
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    isAuth(){
      return localStorage.getItem("token");
    }
  }
};
</script>
