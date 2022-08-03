<template>
  <div>
    <vs-navbar not-line color="#009ACB" shadow center-collapsed v-model="active">
      <template #left>
        <vs-button @click="activeSidebar = !activeSidebar" class="bg-white" transparent icon>
          <i class="bx bx-menu"></i>
        </vs-button>
        &nbsp; &nbsp;
        <vs-avatar class="logo-navbar">
          <img alt="img" src="../assets/img/logo.svg" />
        </vs-avatar>
        <vs-navbar-item class="bg-white" :active="active == 'guide'" id="guide">
          PRET
        </vs-navbar-item>
      </template>
      <template #right>
        <vs-button transparent class="bg-white">Acceso</vs-button>
        &nbsp;
      </template>
    </vs-navbar>
    <vs-sidebar absolute v-model="active" :open.sync="activeSidebar">
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item id="perfil">
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
        <vs-sidebar-item id="vacantes">
          <template #icon>
            <i class='bx bx-bookmarks' ></i>
          </template>
          Vacantes disponibles
        </vs-sidebar-item>
        <vs-sidebar-item id="postulaciones">
          <template #icon>
            <i class='bx bx-bookmark-plus'></i>
          </template>
          Listado de postulaciones
        </vs-sidebar-item>
        <vs-sidebar-item id="favoritos">
          <template #icon>
            <i class='bx bx-bookmark-heart'></i>
          </template>
          Favoritos
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-item id="contactos">
        <template #icon>
          <i class='bx bx-user-pin'></i>
        </template>
        Contactos
      </vs-sidebar-item>
      <vs-sidebar-item id="perfilReclutador">
        <template #icon>
          <i class='bx bx-buildings' ></i>
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
        <vs-sidebar-item id="vacantesPublicadas">
          <template #icon>
            <i class='bx bx-bookmarks' ></i>
          </template>
          Vacantes publicadas
        </vs-sidebar-item>
        <vs-sidebar-item id="registroVacante">
          <template #icon>
            <i class='bx bx-bookmark-plus'></i>
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
};
</script>
