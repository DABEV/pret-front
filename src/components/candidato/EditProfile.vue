<template>
  <div class="center">
    <div class="space content-card">
      <vs-row justify="space-between">
        <vs-col lg="4" sm="12" xs="12" class="margin-top-avatar">
          <div class="content-data space datos text-start bg-gray">
            <div class="center-item">
              <vs-avatar circle size="150" class="avatar-top-card">
                <img :src="candidato.foto" alt="perfil" />
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
              <vs-col lg="7" sm="8" xs="8" class="text-start">
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
              <vs-button color="#1E88E5" @click="AbrirCambiar()">
                Cambiar foto
              </vs-button>
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
                  <vs-button success @click="activeCon = !activeCon">
                    Añadir conocimiento
                  </vs-button>
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
                  <vs-button success @click="activeHab = !activeHab">
                    Añadir habilidad
                  </vs-button>
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
                  <vs-button
                    success
                    @click="cargarUniversidades(), (activeEst = !activeEst)"
                  >
                    Añadir estudio
                  </vs-button>
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
                  <vs-button success @click="activeExp = !activeExp">
                    Añadir experiencia
                  </vs-button>
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
                  <vs-button success @click="activeCer = !activeCer">
                    Añadir certificación
                  </vs-button>
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
                  <vs-button success @click="activeIdi = !activeIdi">
                    Añadir idioma
                  </vs-button>
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
                  <vs-button success @click="activeCur = !activeCur">
                    Añadir curso
                  </vs-button>
                </div>
              </template>
            </vs-card>
          </vs-card-group>
        </div>
      </div>
    </div>

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
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <small>Caducidad</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="experiencia.fechaCaducidad"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
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

    <vs-dialog v-model="activeIdi">
      <template #header>
        <h2>Añadir Idioma</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nombre"
          v-model="idioma.nombre"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bx-world"></i>
          </template>
        </vs-input>
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

    <vs-dialog scroll width="600px" v-model="activeCur">
      <template #header>
        <h2>Añadir Curso</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nombre"
          v-model="curso.nombre"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-purchase-tag-alt"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between">
          <vs-col lg="5">
            <vs-input
              class="space-top space"
              placeholder="Empresa"
              v-model="curso.empresa"
              color="#1e88e5"
              block
            >
              <template #icon>
                <i class="bx bxs-buildings"></i>
              </template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <vs-input
              class="space-top space"
              placeholder="No. Hrs"
              type="number"
              v-model="curso.numeroHoras"
              color="#1e88e5"
              min="1"
              block
            >
              <template #icon>
                <i class="bx bx-time"></i>
              </template>
            </vs-input>
          </vs-col>
        </vs-row>
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
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <small>Caducidad</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="experiencia.fechaCaducidad"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeCur = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarCur()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

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
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CandidateService from "../../service/Candidate/CandidateService";
import CatalogueService from "../../service/Catalogues/CatalogueService";
import ChangePassword from "../reclutador/dialogsPerfil/ChangePassword.vue";

export default {
  name: "EditProfile",
  data: () => ({
    activeCambiarFoto: false,
    activeCon: false,
    activeHab: false,
    activeEst: false,
    activeExp: false,
    activeIdi: false,
    activeCer: false,
    activeCur: false,
    success: false,
    error: false,
    conocimiento: "",
    habilidad: "",
    imagen: null,
    estado: {},
    idioma: {
      nombre: "",
    },
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
    experiencia: {
      puesto: "",
      fechaInicio: "",
      fechaFin: "",
      actividadesRealizadas: "",
    },
    certificado: {
      nombre: "",
      empresa: "",
      fechaObtencion: "",
      fechaCaducidad: "",
    },
    curso: {
      nombre: "",
      fechaObtencion: "",
      empresa: "",
      numeroHoras: "",
    },
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
    enviarCon: function () {
      this.candidato.conocimientosHabilidades.conocimientos.push(
        this.conocimiento
      );
      this.activeCon = false;
    },
    enviarHab: function () {
      this.candidato.conocimientosHabilidades.habilidades.push(this.habilidad);
      this.activeHab = false;
    },
    enviarEst: function () {
      this.activeEst = false;
      this.success = true;
    },
    enviarExp: function () {
      this.activeExp = false;
      this.success = true;
    },
    enviarCer: function () {
      this.activeCer = false;
      this.success = true;
    },
    enviarIdi: function () {
      this.activeIdi = false;
      this.success = true;
    },
    enviarCur: function () {
      this.activeCur = false;
      this.success = true;
    },
    changeImg: function (e) {
      this.imagen = e.target.files[0];
    },
    AbrirCambiar: function () {
      this.activeCambiarFoto = !this.activeCambiarFoto;
    },
    subirFoto: function () {
      const child = "imagenes/perfil_candidato" + this.candidato.id;
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
    cargarEstados: function () {
      CatalogueService.listarEstados()
        .then((response) => {
          this.estados = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
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
  mounted() {
    this.cargarPerfil();
    this.cargarEstados();
  },
  components: { ChangePassword },
};
</script>