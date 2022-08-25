<template>
  <div>
    <vs-button success @click="activeCer = !activeCer">
      Añadir certificación
    </vs-button>
    <vs-dialog scroll width="600px" v-model="activeCer">
      <template #header>
        <h2>Añadir Certificación</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nombre"
          v-model="certificado.nombre"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-purchase-tag-alt"></i>
          </template>
        </vs-input>
        <vs-input
          class="space-top space"
          placeholder="Empresa"
          v-model="certificado.empresa"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-buildings"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between">
          <vs-col lg="5">
            <small>Obtención</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="certificado.fechaObtencion"
            >
              <template #icon><i class="bx bxs-calendar"></i></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <small>Caducidad</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="certificado.fechaCaducidad"
            >
              <template #icon><i class="bx bxs-calendar"></i></template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeCer = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarCer()">
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
  name: "CertificateDialog",
  data: () => ({
    activeCer: false,
    certificado: {
      nombre: "",
      empresa: "",
      fechaObtencion: "",
      fechaCaducidad: "",
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
    enviarCer: function () {
      this.activeCer = false;
      CandidateService.addCertificate(this.certificado)
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