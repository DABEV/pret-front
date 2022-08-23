<template>
  <div>
    <vs-tooltip>
      <vs-button @click="Añadir()" icon animation-type="rotate" color="#B13CD2">
        <i class="bx bx-user-plus"></i>
        <template #animate>
          <i class="bx bxs-user-plus"></i>
        </template>
      </vs-button>
      <template #tooltip> Añadir contacto </template>
    </vs-tooltip>
    <vs-dialog v-model="activeAdd">
      <template #header>
        <h2>Añadir Contacto</h2>
      </template>
      <div class="margin-xy space text-center">
        <small class="bg-sec">Tu solicitúd deberá ser aceptada</small>
        <vs-input
          class="space-top space"
          placeholder="Correo del usuario"
          v-model="correoContacto"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-contact"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeAdd = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button primary block @click="enviarAdd()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "ContactDetailDialog",
  data: () => ({
    activeAdd: false,
    correoContacto: "",
  }),
  methods: {
    Añadir: function () {
      this.correoContacto = "";
      this.activeAdd = true;
    },
    enviarAdd: function () {},
  },
};
</script>