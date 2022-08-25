<template>
  <div>
    <vs-button success @click="activeExp = !activeExp">
      Añadir experiencia
    </vs-button>
    <vs-dialog scroll width="600px" v-model="activeExp">
      <template #header>
        <h2>Añadir Experiencia</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Puesto"
          v-model="experiencia.puesto"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-briefcase"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between">
          <vs-col lg="5">
            <small>Inicio</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="experiencia.fechaInicio"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <small>Fin</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="experiencia.fechaFin"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <textarea
            class="space space-top"
            v-model="experiencia.actividadesRealizadas"
            placeholder="Actividades realizadas"
          >
          </textarea>
        </vs-row>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeExp = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarExp()">
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
  name: "ExperienceDialog",
  data: () => ({
    activeExp: false,
    experiencia: {
      puesto: "",
      fechaInicio: "",
      fechaFin: "",
      actividadesRealizadas: "",
      candidato: { id: 0 },
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
    enviarExp: function () {
      this.activeExp = false;
      CandidateService.addExperience(this.experiencia)
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
    },
    CargarPerfil: function () {
      this.$emit("CargarPerfil");
    },
  },
};
</script>