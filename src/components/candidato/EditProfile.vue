<template>
  <div class="center">
    <div class="space content-card">
      <vs-row justify="space-between">
        <vs-col lg="4" sm="12" xs="12" class="margin-top-avatar">
          <div class="content-data space datos text-start bg-gray">
            <div class="center-item">
              <vs-avatar
                v-if="candidato.foto == null"
                circle
                size="150"
                primary
                class="avatar-top-card"
              >
                <i class="bx bx-user-pin avatar-lg-icon"></i>
              </vs-avatar>
              <vs-avatar v-else circle size="150" class="avatar-top-card">
                <img :src="candidato.foto"/>
              </vs-avatar>
            </div>
            <h3 class="space-top text-center">
              {{ candidato.nombre }} {{ candidato.apellidoPaterno }}
              {{ candidato.apellidoMaterno }}
            </h3>
            <p class="bg-gray text-center">{{ candidato.correoElectronico }}</p>
            <div class="divider space space-top">
              <span class="border"></span>
            </div>
            <vs-row justify="center" class="space">
              <vs-col lg="2" sm="4" xs="4" class="center-item">
                <vs-avatar color="#b13cd2" size="30">
                  <i class="bx bxs-cake"></i>
                </vs-avatar>
              </vs-col>
              <vs-col lg="9" sm="8" xs="8" class="text-start">
                <small>
                  Fecha de nacimiento:
                  {{ candidato.fechaNacimiento.slice(0, 10) }}
                </small>
              </vs-col>
            </vs-row>
            <div class="divider space space-top">
              <span class="border"></span>
            </div>
            <div class="center-item space-top">
              <ChangePhotoDialog :candidato="candidato" />
            </div>
          </div>
        </vs-col>
        <vs-col lg="7" sm="12" xs="12" class="text-center">
          <div class="content-data margin-top-avatar">
            <vs-row justify="flex-end">
              <vs-col lg="4" sm="12" xs="12" class="space-top center-item">
                <vs-button success @click="actualizar()">
                  Guardar cambios
                </vs-button>
              </vs-col>
            </vs-row>
            <div class="margin-xy space">
              <h4 class="text-start bg-gray">Datos personales</h4>
              <vs-input
                class="space-top"
                placeholder="Título curricular"
                v-model="candidato.tituloCurricular"
                color="#1e88e5"
                block
              >
                <template #icon>
                  <i class="bx bxs-graduation"></i>
                </template>
              </vs-input>
              <vs-row justify="space-between" class="space-top">
                <vs-col lg="5" sm="12" xs="12">
                  <vs-input
                    class="space-top space"
                    placeholder="Teléfono"
                    v-model="candidato.telefono"
                    maxlength="10"
                    color="#1e88e5"
                    block
                  >
                    <template #icon>
                      <i class="bx bxs-phone"></i>
                    </template>
                  </vs-input>
                </vs-col>
                <vs-col lg="6" sm="12" xs="12">
                  <div class="input-icon">
                    <span><i class="bx bxs-map"></i> </span>
                    <select
                      class="select-custom space-top space"
                      placeholder="Estado"
                      v-model="candidato.estadoRepublica"
                    >
                      <option
                        class="select-option"
                        disabled
                        :value="candidato.estadoRepublica"
                      >
                        {{ candidato.estadoRepublica.nombre }}
                      </option>
                      <option
                        class="select-option"
                        v-for="(edo, i) in estados"
                        :key="i"
                        :value="edo"
                      >
                        {{ edo.nombre }}
                      </option>
                    </select>
                  </div>
                </vs-col>
              </vs-row>
              <textarea
                class="space space-top"
                v-model="candidato.descripcionPerfil"
                placeholder="Descripción de tu perfil profesional"
              >
              </textarea>
              <br />
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
    <ChangePassword />
    <div class="space content-card">
      <div class="text-center bg-gray">
        <div>
          <vs-card-group>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" primary class="space-top">
                    <i class="bx bxs-hot"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Conocimientos</h4>
                <small
                  v-if="
                    candidato.conocimientosHabilidades.conocimientos != null
                  "
                >
                  Guardados:
                  {{ candidato.conocimientosHabilidades.conocimientos.length }}
                </small>
                <small v-else> Guardados: 0 </small>
                <div class="center-item">
                  <KnowledgeDialog :candidato="candidato" @CargarPerfil="cargarPerfil" />
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" color="#b13cd2" class="space-top">
                    <i class="bx bxs-hard-hat"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Habilidades</h4>
                <small
                  v-if="candidato.conocimientosHabilidades.habilidades != null"
                >
                  Guardados:
                  {{ candidato.conocimientosHabilidades.habilidades.length }}
                </small>
                <small v-else> Guardados: 0 </small>
                <div class="center-item">
                  <HabilityDialog :candidato="candidato" @CargarPerfil="cargarPerfil"/>
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" primary class="space-top">
                    <i class="bx bxs-book-bookmark"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Estudios</h4>
                <small v-if="candidato.estudios != null">
                  Guardados:
                  {{ candidato.estudios.length }}
                </small>
                <small v-else> Guardados: 0 </small>
                <div class="center-item">
                  <StudyDialog @CargarPerfil="cargarPerfil" />
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" color="#b13cd2" class="space-top">
                    <i class="bx bxs-briefcase"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Experiencia</h4>
                <small v-if="candidato.experienciasLaborales != null">
                  Guardados:
                  {{ candidato.experienciasLaborales.length }}
                </small>
                <small v-else> Guardados: 0 </small>
                <div class="center-item">
                  <ExperienceDialog @CargarPerfil="cargarPerfil" />
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" primary class="space-top">
                    <i class="bx bxs-book-bookmark"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Certificación</h4>
                <small v-if="candidato.certificaciones != null">
                  Guardados:
                  {{ candidato.certificaciones.length }}
                </small>
                <small v-else> Guardados: 0 </small>
                <div class="center-item">
                  <CertificateDialog @CargarPerfil="cargarPerfil" />
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" color="#b13cd2" class="space-top">
                    <i class="bx bxs-book-bookmark"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Idiomas</h4>
                <small v-if="candidato.idiomas != null">
                  Guardados:
                  {{ candidato.idiomas.length }}
                </small>
                <small v-else> Guardados: 0 </small>
                <div class="center-item">
                  <LanguageDialog @CargarPerfil="cargarPerfil" />
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" primary class="space-top">
                    <i class="bx bxs-book-bookmark"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Curso</h4>
                <small v-if="candidato.cursos != null">
                  Guardados:
                  {{ candidato.cursos.length }}
                </small>
                <small v-else> Guardados: 0 </small>
                <div class="center-item">
                  <CourseDialog @CargarPerfil="cargarPerfil" />
                </div>
              </template>
            </vs-card>
          </vs-card-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CandidateService from "../../service/Candidate/CandidateService";
import CatalogueService from "../../service/Catalogues/CatalogueService";

import ChangePassword from "../reclutador/dialogsPerfil/ChangePassword.vue";

import ChangePhotoDialog from "./dialogsEditprofile/ChangePhotoDialog.vue";
import LanguageDialog from "./dialogsEditprofile/LanguageDialog.vue";
import HabilityDialog from "./dialogsEditprofile/HabilityDialog.vue";
import KnowledgeDialog from "./dialogsEditprofile/KnowledgeDialog.vue";
import StudyDialog from "./dialogsEditprofile/StudyDialog.vue";
import ExperienceDialog from "./dialogsEditprofile/ExperienceDialog.vue";
import CertificateDialog from "./dialogsEditprofile/CertificateDialog.vue";
import CourseDialog from "./dialogsEditprofile/CourseDialog.vue";

export default {
  name: "EditProfile",
  data: () => ({
    estado: {},
    candidato: {
      id: 0,
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correoElectronico: "",
      habilitado: true,
      telefono: "",
      fechaNacimiento: "",
      estadoRepublica: {
        id: 0,
      },
      tituloCurricular: "",
      descripcionPerfil: "",
      foto: "",
      conocimientosHabilidades: {
        conocimientos: [],
        habilidades: [],
      },
      cursos: [],
      experienciasLaborales: [],
      estudios: [],
      idiomas: [],
      certificaciones: [],
      vacantesFavoritas: [],
    },
    estados: [
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
    cargarPerfil: function () {
      CandidateService.getProfile()
        .then((response) => {
          this.candidato = response.data.data;
          this.candidato.contrasena = "Ninguna1*";
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
        });
    },
    actualizar: function () {
      this.candidato.contrasena = "Ninguna1*";
      CandidateService.updateProfile(this.candidato)
        .then((response) => {
          if (response.data) {
            this.candidato = response.data.data;
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
    cargarEstados: function () {
      CatalogueService.listarEstados()
        .then((response) => {
          this.estados = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.cargarPerfil();
    this.cargarEstados();
  },
  components: {
    ChangePassword,
    ChangePhotoDialog,
    LanguageDialog,
    HabilityDialog,
    KnowledgeDialog,
    StudyDialog,
    ExperienceDialog,
    CertificateDialog,
    CourseDialog,
  },
};
</script>