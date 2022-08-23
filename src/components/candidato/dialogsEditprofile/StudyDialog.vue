<template>
  <div>
    <vs-button success @click="cargarUniversidades(), (activeEst = !activeEst)">
      Añadir estudio
    </vs-button>
    <vs-dialog scroll width="600px" v-model="activeEst">
      <template #header>
        <h2>Añadir Estudio</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Carrera"
          v-model="estudio.carrera"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-book-bookmark"></i>
          </template>
        </vs-input>
        <div class="input-icon">
          <span><i class="bx bxs-buildings"></i></span>
          <select
            class="select-custom space-top space"
            placeholder="Estado"
            v-model="estudio.universidad"
          >
            <option class="select-option" disabled :value="estudio.universidad">
              {{ estudio.universidad.siglas }} -
              {{ estudio.universidad.nombre }}
            </option>
            <option
              class="select-option"
              v-for="(uni, i) in universidades"
              :key="i"
              :value="uni"
            >
              {{ uni.siglas }} - {{ uni.nombre }}
            </option>
          </select>
        </div>
        <vs-input
          class="space-top space"
          placeholder="Grado académico"
          v-model="estudio.gradoAcademico"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-graduation"></i>
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
              v-model="estudio.fechaInicio"
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
              v-model="estudio.fechaFin"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeEst = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarEst()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import CatalogueService from "../../../service/Catalogues/CatalogueService";

export default {
  name: "StudyDialog",
  data: () => ({
    activeEst: false,
    estudio: {
      universidad: {
        nombre: "Selecciona -",
        siglas: "",
        estadoRepublica: {
          id: 0,
        },
      },
      carrera: "",
      gradoAcademico: "",
      fechaInicio: "",
      fechaFin: "",
    },
    universidades: [
      {
        id: 0,
        nombre: "",
      },
    ],
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
    enviarEst: function () {
      this.activeEst = false;
    },
    cargarUniversidades: function () {
      CatalogueService.listarUniversidades()
        .then((response) => {
          this.universidades = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>