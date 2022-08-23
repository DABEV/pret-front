<template>
  <div>
    <vs-button color="#1E88E5" @click="AbrirCambiar()">
      Cambiar foto
    </vs-button>
    <vs-dialog width="450px" prevent-close v-model="activeCambiarFoto">
      <template #header>
        <h2>Cambiar foto</h2>
      </template>
      <div class="margin-xy space space-top text-center">
        <small class="bg-primary">Cambiar foto</small>
        <form enctype="multipart/form-data">
          <vs-input
            class="space-top space"
            color="#1e88e5"
            type="file"
            @change="changeImg($event)"
            accept="image/*"
            block
          >
            <template #icon>
              <i class="bx bxs-file-pdf"></i>
            </template>
          </vs-input>
          <vs-row justify="center">
            <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
              <vs-button
                transparent
                dark
                @click="activeCambiarFoto = !activeCambiarFoto"
                block
              >
                Cancelar
              </vs-button>
            </vs-col>
            <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
              <vs-button success block @click="subirFoto()">
                Guardar Cambios
              </vs-button>
            </vs-col>
          </vs-row>
        </form>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import CandidateService from "../../../service/Candidate/CandidateService";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "ChangePhotoDialog",
  data: () => ({
    activeCambiarFoto: false,
    imagen: null,
  }),
  methods: {
    changeImg: function (e) {
      this.imagen = e.target.files[0];
    },
    AbrirCambiar: function () {
      this.activeCambiarFoto = !this.activeCambiarFoto;
    },
    subirFoto: function () {
      const child = "imagenes/perfil_reclutador" + this.candidato.id;
      const refImg = ref(storage, child);
      const fullPath = refImg.fullPath;
      const metadata = { contentType: "img/jpeg" };
      uploadBytes(refImg, this.imagen, metadata).then(() => {
        getDownloadURL(ref(storage, fullPath))
          .then((url) => {
            this.candidato.foto = url;
            this.actualizarFoto();
          })
          .catch((error) => {
            console.log(error);
          });
      });
      this.activeCambiarFoto = false;
    },
    actualizarFoto: function () {
      CandidateService.updatePhoto(this.candidato.foto)
        .then((response) => {
          if (response.data) {
            this.openNotification(
              1,
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
  },
  props: {
    candidato: Object,
  },
};
</script>