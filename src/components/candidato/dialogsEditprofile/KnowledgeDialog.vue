<template>
  <div>
    <vs-button success @click="activeCon = !activeCon">
      Añadir conocimiento
    </vs-button>
    <vs-dialog v-model="activeCon">
      <template #header>
        <h2>Añadir Conocimiento</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nuevo conocimiento"
          v-model="conocimiento"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-graduation"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeCon = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button primary block @click="enviarCon()">
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
  name: "KnowledgeDialog",
  data: () => ({
    activeCon: false,
    conocimiento: "",
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
    enviarCon: function () {
      this.candidato.conocimientosHabilidades.conocimientos.push(
        this.conocimiento
      );
      CandidateService.updateProfile(this.candidato)
        .then((response) => {
          if (response.data) {
            this.openNotification(
              1,
              response.data.title,
              response.data.message
            );
            this.CargarPerfil();
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
      this.activeCon = false;
    },
    CargarPerfil: function () {
      this.$emit("CargarPerfil");
    },
  },
  props: {
    candidato: Object,
  },
};
</script>