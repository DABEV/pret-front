<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Lista de candidatos</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="space-between">
          <vs-col lg="5" sm="12" xs="12">
            Candidatos postulados en la vacante:
            <strong>{{ vacante.nombre }}</strong>
          </vs-col>
          <vs-col lg="4" sm="12" xs="12">
            <vs-input
              v-model="search"
              color="#1e88e5"
              block
              placeholder="Buscar"
            >
              <template #icon>
                <i class="bx bx-search"></i>
              </template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <div class="space-top content-data space datos text-start bg-gray">
        <div
          class="center"
          v-if="$vs.getSearch(postulaciones, search).length < 1"
        >
          No se encontraron registros
        </div>
        <div
          :key="i"
          :data="c"
          v-for="(c, i) in $vs.getPage(
            $vs.getSearch(postulaciones, search),
            page,
            max
          )"
          class="item"
        >
          <vs-row class="space">
            <vs-col lg="1" sm="3" xs="3" class="space-top center-item">
              <vs-tooltip
                v-if="c.estadoVacante.id != 6 && c.estadoVacante.id != 5"
              >
                <vs-button
                  icon
                  animation-type="rotate"
                  danger
                  @click="AbrirEliminar(c)"
                >
                  <i class="bx bx-trash"></i>
                  <template #animate>
                    <i class="bx bxs-trash"></i>
                  </template>
                </vs-button>
                <template #tooltip> Rechazar candidato </template>
              </vs-tooltip>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="center-item space-top">
              <vs-avatar size="50">
                <img :src="c.candidato.foto" alt="" />
              </vs-avatar>
            </vs-col>
            <vs-col lg="8" sm="9" xs="9" class="space-top">
              <div class="item-click" @click="AbrirDetalles(c.candidato)">
                <vs-row>
                  <vs-col lg="6" sm="9" xs="9">
                    <p class="bold">
                      {{ c.candidato.nombre }}
                      {{ c.candidato.apellidoPaterno }}
                      {{ c.candidato.apellidoMaterno }}
                    </p>
                    <small>{{ c.candidato.tituloCurricular }}</small>
                  </vs-col>
                  <vs-col lg="6" sm="9" xs="9" class="space-top text-center">
                    <span v-if="c.estadoVacante.id == 4" class="badge-suc">
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span v-else-if="c.estadoVacante.id == 1" class="badge-def">
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span v-else-if="c.estadoVacante.id == 2" class="badge-war">
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span v-else-if="c.estadoVacante.id == 6" class="badge-dan">
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span v-else-if="c.estadoVacante.id == 3" class="badge-sec">
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span v-else-if="c.estadoVacante.id == 5" class="badge-pri">
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span v-else class="badge-def"
                      >{{ c.estadoVacante.nombre }}
                    </span>
                  </vs-col>
                </vs-row>
              </div>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="space-top center-item">
              <vs-tooltip>
                <vs-button
                  icon
                  animation-type="rotate"
                  color="#88BAF3"
                  :href="c.cv"
                  blank
                >
                  <i class="bx bx-download"></i>
                  <template #animate>
                    <i class="bx bx-import"></i>
                  </template>
                </vs-button>
                <template #tooltip> Descargar CV </template>
              </vs-tooltip>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="space-top center-item">
              <vs-tooltip v-if="c.estadoVacante.id == 1">
                <vs-button
                  @click="ActualizarEstadoVacante(c, 2, 'CV visto')"
                  icon
                  animation-type="vertical"
                  warn
                >
                  <i class="bx bx-show"></i>
                  <template #animate><i class="bx bxs-show"></i></template>
                </vs-button>
                <template #tooltip> Marcar CV visto </template>
              </vs-tooltip>
              <vs-tooltip v-else-if="c.estadoVacante.id == 2">
                <vs-button
                  color="#b13cd2"
                  @click="ActualizarEstadoVacante(c, 3, 'Entrevista')"
                  icon
                  animation-type="rotate"
                >
                  <i class="bx bx-file-find"></i>
                  <template #animate>
                    <i class="bx bxs-file-find"></i>
                  </template>
                </vs-button>
                <template #tooltip> Marcar Entrevista </template>
              </vs-tooltip>
              <vs-tooltip v-else-if="c.estadoVacante.id == 3">
                <vs-button
                  @click="ActualizarEstadoVacante(c, 4, 'Idóneo')"
                  icon
                  animation-type="rotate"
                  color="#2ECC71"
                >
                  <i class="bx bx-user-check"></i>
                  <template #animate>
                    <i class="bx bxs-user-check"></i>
                  </template>
                </vs-button>
                <template #tooltip> Marcar Idóneo </template>
              </vs-tooltip>
              <vs-tooltip v-else-if="c.estadoVacante.id == 4">
                <vs-button
                  icon
                  animation-type="rotate"
                  color="#1e88e5"
                  @click="AbrirContratar(c)"
                >
                  <i class="bx bx-briefcase"></i>
                  <template #animate>
                    <i class="bx bxs-briefcase"></i>
                  </template>
                </vs-button>
                <template #tooltip> Contratar </template>
              </vs-tooltip>
            </vs-col>
          </vs-row>
          <div class="divider">
            <span class="border"></span>
          </div>
        </div>
        <div class="pagination">
          <vs-pagination
            v-model="page"
            :length="$vs.getLength($vs.getSearch(postulaciones, search), max)"
          />
        </div>
      </div>
    </div>

    <vs-dialog width="450px" class="text-center" v-model="active">
      <template #header>
        <h4>Marcar como {{ sigNivel }}</h4>
      </template>
      <div class="text-gray">
        <p>
          ¿Seguro que desea añadir a <strong>{{ candidato.nombre }}</strong> a
          la lista de candidatos <b>{{ sigNivel }} </b>?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button success @click="EnviarActualizar()" block>
              Añadir
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button transparent dark @click="active = !active" block>
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog width="450px" class="text-center" v-model="activeContratar">
      <template #header>
        <h4 class="bg-primary">Contratación</h4>
      </template>
      <div class="bg-gray">
        <p>
          ¿Seguro que desea <b>Contratar</b> a
          <strong>{{ candidato.nombre }}</strong>
          para este puesto?
        </p>
        <small>El resto de postulantes se marcarán como rechazados</small>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button
              primary
              @click="(activeContratar = !activeContratar), EnviarActualizar()"
              block
            >
              Contratar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button
              transparent
              dark
              @click="activeContratar = !activeContratar"
              block
            >
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog width="450px" class="text-center" v-model="activeDelete">
      <template #header>
        <h4>Rechazar candidato</h4>
      </template>
      <div class="text-gray">
        <p>
          ¿Seguro de rechazar a <b>{{ candidato.nombre }}</b> para esta vacante?
        </p>
        <small>No podrás deshacer esta acción</small>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button
              danger
              @click="(activeDelete = !activeDelete), EnviarActualizar()"
              block
            >
              Quitar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button
              transparent
              dark
              @click="activeDelete = !activeDelete"
              block
            >
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog class="text-center" v-model="activeDetalles">
      <vs-row>
        <vs-col lg="4">
          <div class="text-item bg-primary">
            Teléfono
            <small class="bold bg-gray">{{ candidato.telefono }}</small>
          </div>
        </vs-col>
        <vs-col lg="4" class="center-item">
          <vs-avatar circle size="100" class="avatar-top">
            <img :src="candidato.foto" alt="" />
          </vs-avatar>
        </vs-col>
        <vs-col lg="4">
          <div class="text-item bg-primary">
            Estado
            <small class="bold bg-gray">
              {{ candidato.estadoRepublica.nombre }}
            </small>
          </div>
        </vs-col>
      </vs-row>
      <h4 class="space-top">
        {{ candidato.nombre }} {{ candidato.apellidoMaterno }}
        {{ candidato.apellidoPaterno }}
      </h4>
      <small class="bg-gray">{{ candidato.correoElectronico }}</small>
      <div class="divider space space-top">
        <span class="border"></span>
      </div>
      <vs-row justify="space-around" class="space">
        <vs-col w="1" class="center-item">
          <vs-avatar color="#b13cd2" size="30">
            <i class="bx bxs-graduation"></i>
          </vs-avatar>
        </vs-col>
        <vs-col w="10" class="center-item text-start">
          <small>Titulo: {{ candidato.tituloCurricular }}</small>
        </vs-col>
      </vs-row>
      <div class="divider space space-top">
        <span class="border"></span>
      </div>
      <vs-row justify="center">
        <vs-col lg="4" sm="6" xs="6">
          <vs-button block color="#1E88E5"> Ver perfil </vs-button>
        </vs-col>
      </vs-row>
    </vs-dialog>
  </div>
</template>

<script>
import RecruiterService from "../../service/Recruiter/RecruiterService";
export default {
  name: "CandidatesList",
  data: () => ({
    active: false,
    activeDelete: false,
    activeDetalles: false,
    activeContratar: false,
    page: 1,
    max: 5,
    search: "",
    sigNivel: "",
    estadoVacante: {
      id: 0,
    },
    vacante: {},
    candidato: {
      nombre: "",
      estadoRepublica: {},
    },
    postulacion: {
      id: {
        vacanteId: 0,
        candidatoId: 0,
      },
      estadoVacante: {
        id: 0,
      },
      candidato: {},
      vacante: {},
      cv: "",
    },
    postulaciones: [],
  }),
  methods: {
    ActualizarEstadoVacante: function (postulacion, estadoId, estadoNombre) {
      this.postulacion = postulacion;
      this.estadoVacante.id = estadoId;
      this.sigNivel = estadoNombre;
      this.candidato = postulacion.candidato;
      this.active = !this.active;
    },
    EnviarActualizar: function () {
      this.postulacion.estadoVacante.id = this.estadoVacante.id;
      RecruiterService.actualizarEstadoPostulacion(this.postulacion)
        .then((response) => {
          if (response.data) {
            this.openNotification(
              1,
              response.data.title,
              response.data.message
            );
            this.CargarCandidatos();
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
    AbrirEliminar: function (postulacion) {
      this.postulacion = postulacion;
      this.estadoVacante.id = 6;
      this.sigNivel = "Rechazar";
      this.candidato = postulacion.candidato;
      this.activeDelete = true;
    },
    AbrirDetalles: function (candidato) {
      this.candidato = candidato;
      this.activeDetalles = true;
    },
    AbrirContratar: function (postulacion) {
      this.postulacion = postulacion;
      this.estadoVacante.id = 5;
      this.sigNivel = "Contratado";
      this.candidato = postulacion.candidato;
      this.activeContratar = true;
    },
    CargarCandidatos: function () {
      RecruiterService.obtenerListacandidatos(this.vacante.id)
        .then((response) => {
          this.postulaciones = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    CargarVacante: function (id) {
      RecruiterService.obtenerVacanteUnica(id)
        .then((response) => {
          this.vacante = response.data.data;
          this.CargarCandidatos();
        })
        .catch((e) => {
          console.log(e);
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
  mounted() {
    if (this.$route.params.id != undefined) {
      this.CargarVacante(this.$route.params.id);
    }
  },
};
</script>
