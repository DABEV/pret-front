<template>
  <div>
    <vs-button success @click="AbrirPostular()"> Postularse </vs-button>
    <vs-dialog width="450px" prevent-close v-model="activePostular">
      <template #header>
        <h2>Postularse</h2>
      </template>
      <div class="margin-xy space space-top text-center">
        <small class="bold">Vacante: {{ vacante.nombre }}</small>
        <br />
        <small class="bg-primary">Agregar CV</small>
        <vs-input
          class="space-top space"
          color="#1e88e5"
          type="file"
          accept=".pdf"
          @change="ChangePDF($event)"
          block
        >
          <template #icon>
            <i class="bx bxs-file-pdf"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button
              transparent
              dark
              @click="activePostular = !activePostular"
              block
            >
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button success block @click="EnviarPostular()">
              Enviar CV
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CandidateService from "../../../service/Candidate/CandidateService";

export default {
  name: "ShareDialog",
  data: () => ({
    activePostular: false,
    searchCompartir: "",
    postulacion: {
      id: {
        vacanteId: 0,
      },
      cv: "",
    },
    candidato: {},
    contactos: [],
    pdf: null,
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
    AbrirPostular: function () {
      this.postulacion.id.vacanteId = this.vacante.id;
      this.activePostular = !this.activePostular;
    },
    EnviarPostular: function () {
      const child =
        "cv/vacante" + this.vacante.id + "_candidato" + this.candidato.id;
      const refPdf = ref(storage, child);
      const fullPath = refPdf.fullPath;
      const metadata = { contentType: "application/pdf" };
      uploadBytes(refPdf, this.pdf, metadata).then(() => {
        getDownloadURL(ref(storage, fullPath))
          .then((url) => {
            this.postulacion.cv = url;
            CandidateService.applyVancy(this.postulacion)
              .then((response) => {
                if (response.data) {
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
          })
          .catch((error) => {
            console.log(error);
          });
      });
      this.activePostular = false;
      this.CloseDetails();
    },
    ChangePDF: function (e) {
      this.pdf = e.target.files[0];
    },
    CloseDetails: function () {
      this.$emit("CloseDetails");
    },
    CargarSession: function () {
      CandidateService.getProfile()
        .then((response) => {
          this.candidato = response.data.data;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
        });
    },
  },
  props: {
    vacante: Object,
  },
  mounted() {
    this.CargarSession();
  },
};
</script>