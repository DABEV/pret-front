<template>
  <div>
    <vs-button success @click="cargarIdiomas(), (activeIdi = !activeIdi)">
      Añadir idioma
    </vs-button>
    <vs-dialog v-model="activeIdi">
      <template #header>
        <h2>Añadir Idioma</h2>
      </template>
      <div class="margin-xy space space-top">
        <p>Idioma</p>
        <div class="input-icon">
          <span><i class="bx bx-world"></i></span>
          <select
            class="select-custom space-top space"
            v-model="idiomaCandidato.idioma"
          >
            <option
              class="select-option"
              disabled
              :value="idiomaCandidato.idioma"
            >
              {{ idiomaCandidato.idioma.nombre }}
            </option>
            <option
              class="select-option"
              v-for="(idi, i) in idiomas"
              :key="i"
              :value="idi"
            >
              {{ idi.nombre }}
            </option>
          </select>
        </div>
        <p>Nivel</p>
        <div class="input-icon">
          <span><i class="bx bx-world"></i></span>
          <select
            class="select-custom space-top space"
            placeholder="Estado"
            v-model="idiomaCandidato.nivel"
          >
            <option
              class="select-option"
              disabled
              :value="idiomaCandidato.nivel"
            >
              {{ idiomaCandidato.nivel }}
            </option>
            <option
              class="select-option"
              v-for="(niv, i) in niveles"
              :key="i"
              :value="niv"
            >
              {{ niv }}
            </option>
          </select>
        </div>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeIdi = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarIdi()">
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
import CandidateService from "../../../service/Candidate/CandidateService";

export default {
  name: "LanguageDialog",
  data: () => ({
    activeIdi: false,
    success: false,
    error: false,
    idiomaCandidato: {
      idioma: {
        nombre: "",
      },
      candidato: {},
      nivel: "",
    },
    idiomas: [],
    niveles: ["Experto", "Intermedio", "Básico", "Traductor"],
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
    enviarIdi: function () {
      this.activeIdi = false;
      console.log(this.idiomaCandidato.idioma)
      console.log(this.idiomaCandidato.candidato)
      console.log(this.idiomaCandidato.nivel)

      CandidateService.addLanguage(this.idiomaCandidato)
        .then((response) => {
          if (response.data) {
            this.idiomaCandidato = response.data.data;
            this.openNotification(
              1,
              response.data.title,
              response.data.message
            );
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
    cargarIdiomas: function () {
      CatalogueService.listarIdiomas()
        .then((response) => {
          console.log("data");
          this.idiomas = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>