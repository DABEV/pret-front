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
    candidato: { id: 1 },
    contactos: [
      {
        nombre: "Cameron",
        apellidoMaterno: "Williamson",
        apellidoPaterno: "Warren",
        correoElectronico: "cameron@example.com",
        telefono: "(704) 555-0127",
        estadoRepublica: {
          nombre: "Morelos",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      },
      {
        nombre: "Esther",
        apellidoMaterno: "Howard",
        apellidoPaterno: "Simmons",
        correoElectronico: "esther@example.com",
        telefono: "(907) 555-0101",
        estadoRepublica: {
          nombre: "Morelos",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=562&q=80",
      },
      {
        nombre: "Robert",
        apellidoMaterno: "Warren",
        apellidoPaterno: "Hawkins",
        correoElectronico: "robert@example.com",
        telefono: "(217) 555-0113",
        estadoRepublica: {
          nombre: "Querétaro",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80",
      },
      {
        nombre: "Alexander",
        apellidoMaterno: "Edwards",
        apellidoPaterno: "Wade",
        correoElectronico: "alexander@example.com",
        telefono: "(308) 555-0121",
        estadoRepublica: {
          nombre: "Durango",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=558&q=80",
      },
      {
        nombre: "Leslie",
        apellidoMaterno: "Brooklyn",
        apellidoPaterno: "Williamson",
        correoElectronico: "leslie@example.com",
        telefono: "(302) 555-0107",
        estadoRepublica: {
          nombre: "Tamaulipas",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      },
      {
        nombre: "Ralph",
        apellidoMaterno: "Williamson",
        apellidoPaterno: "Fox",
        correoElectronico: "ralph@example.com",
        telefono: "(702) 555-0122",
        estadoRepublica: {
          nombre: "Oaxaca",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1483995564125-85915c11dcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=641&q=80",
      },
    ],
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
      const metadata = { contentType: "pdf" };
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
  },
  props: {
    vacante: Object,
  },
};
</script>