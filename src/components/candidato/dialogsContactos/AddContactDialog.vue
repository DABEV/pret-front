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
            <vs-button primary block @click="EnviarAdd()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import CandidateService from "../../../service/Candidate/CandidateService";
export default {
  name: "ContactDetailDialog",
  data: () => ({
    activeAdd: false,
    correoContacto: "",
    solicitudEnviar: {
      id: {
        amigoId: 0,
      },
    },
  }),
  methods: {
    openNotification(border_, title_, text_) {
      let tipo = "";
      let icon_ = "";
      switch (border_) {
        case 1:
          tipo = "success";
          icon_ = `<i class='bx bx-check-circle' ></i>`;
          break;
        case 2:
          tipo = "primary";
          icon_ = `<i class='bx bx-info-circle'></i>`;
          break;
        case 3:
          tipo = "warning";
          icon_ = `<i class='bx bx-error'></i>`;
          break;
        case 4:
          tipo = "danger";
          icon_ = `<i class='bx bx-x-circle'></i>`;
          break;
      }
      this.$vs.notification({
        progress: "auto",
        position: null,
        title: title_,
        text: text_,
        border: tipo,
        icon: icon_,
      });
    },
    Añadir: function () {
      this.correoContacto = "";
      this.activeAdd = true;
    },
    CargarContactos: function () {
      this.$emit("CargarContactos");
    },
    Solicitar: function () {
      CandidateService.addContact(this.solicitudEnviar)
        .then((response) => {
          if (response.data) {
            this.openNotification(
              1,
              response.data.title,
              response.data.message
            );
            this.CargarContactos();
          } else {
            this.openNotification(
              4,
              response.data.title,
              response.data.message
            );
          }
        })
        .catch((e) => {
          console.log(e);
          this.openNotification(
            4,
            e.response.data.title,
            e.response.data.message
          );
        });
    },
    EnviarAdd: function () {
      this.BuscarCandidato();
    },
    BuscarCandidato: function () {
      console.log(this.correoContacto);
      CandidateService.getByEmail(this.correoContacto)
        .then((response) => {
          if (response.data.data) {
            this.openNotification(
              1,
              response.data.title,
              response.data.message
            );
            this.solicitudEnviar.id.amigoId = response.data.data;
            this.Solicitar();
          } else {
            this.openNotification(
              4,
              response.data.title,
              response.data.message
            );
          }
        })
        .catch((e) => {
          console.log(e);
          this.openNotification(
            4,
            e.response.data.title,
            e.response.data.message
          );
        });
      this.activeAdd = !this.activeAdd;
    },
  },
};
</script>