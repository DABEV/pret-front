<template>
  <div>
    <vs-button success @click="activeHab = !activeHab">
      Añadir habilidad
    </vs-button>
    <vs-dialog v-model="activeHab">
      <template #header>
        <h2>Añadir Habilidad</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nueva habilidad"
          v-model="habilidad"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-hard-hat"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeHab = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button primary block @click="enviarHab()">
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
  name: "HabilityDialog",
  data: () => ({
    activeHab: false,
    habilidad: "",
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
    enviarHab: function () {
      this.candidato.conocimientosHabilidades.habilidades.push(this.habilidad);
      CandidateService.updateProfile(this.candidato)
        .then((response) => {
          if (response.data) {
            this.openNotification(
              1,
              response.data.title,
              response.data.message
            );
            this.CargarPerfil()
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
      this.activeHab = false;
    },
    CargarPerfil: function () {
      this.$emit("CargarPerfil")
    },
  },
  props: {
    candidato: Object,
  },
};
</script>