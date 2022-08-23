<template>
  <div>
    <vs-button color="#b13cd2" block @click="IrEditar()">
      Editar perfil
    </vs-button>
    <vs-dialog prevent-close scroll width="600px" v-model="active">
      <template #header>
        <h4>Editar perfil</h4>
      </template>
      <div class="margin-xy space">
        <h4 class="text-start bg-gray">Datos personales</h4>
        <vs-input
          class="space-top"
          placeholder="Puesto"
          v-model="reclutador.puesto.nombre"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-briefcase"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between" class="space-top">
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              class="space-top space"
              placeholder="Teléfono"
              v-model="reclutador.telefono"
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
                v-model="reclutador.estadoRepublica"
              >
                <option
                  class="select-option"
                  disabled
                  :value="reclutador.estadoRepublica"
                >
                  {{ reclutador.estadoRepublica.nombre }}
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
        <h4 class="text-start bg-gray">Empresa</h4>
        <vs-row justify="space-between" class="space-top">
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              class="space-top space"
              placeholder="Nombre"
              v-model="reclutador.nombreEmpresa"
              color="#1e88e5"
              block
            >
              <template #icon>
                <i class="bx bxs-buildings"></i>
              </template>
            </vs-input>
          </vs-col>
          <vs-col lg="6" sm="12" xs="12">
            <div class="input-icon">
              <span><i class="bx bxs-map"></i> </span>
              <select
                class="select-custom space-top space"
                placeholder="Estado"
                v-model="reclutador.estadoRepublicaEmpresa"
              >
                <option
                  class="select-option"
                  disabled
                  :value="reclutador.estadoRepublicaEmpresa"
                >
                  {{ reclutador.estadoRepublicaEmpresa.nombre }}
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
        <br />
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="4" sm="12" xs="12" class="space-top center-item">
            <vs-button dark transparent block @click="Cancelar()">
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="4" sm="12" xs="12" class="space-top center-item">
            <vs-button success block @click="actualizar()">
              Guardar cambios
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import RecruiterService from "../../../service/Recruiter/RecruiterService";
import CatalogueService from "../../../service/Catalogues/CatalogueService";

export default {
  name: "EditProfile",
  data: () => ({
    active: false,
    reclutador: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correoElectronico: "",
      habilitado: true,
      telefono: "",
      fechaNacimiento: "",
      estadoRepublica: {
        id: 0,
        nombre: "",
      },
      puesto: {
        nombre: "",
      },
      nombreEmpresa: "",
      estadoRepublicaEmpresa: {
        id: 0,
        nombre: "",
      },
      vacantes: [
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
      ],
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
    IrEditar: function () {
      this.cargarPerfil();
      this.active = !this.active;
    },
    Cancelar: function () {
      this.active = false;
    },
    actualizar: function () {
      this.reclutador.contrasena = "Ninguna1*";
      RecruiterService.updateProfile(this.reclutador)
        .then((response) => {
          if (response.data) {
            this.reclutador = response.data.data;
            this.chargePerfil();
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
      this.Cancelar();
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
    cargarPerfil: function () {
      RecruiterService.getProfile()
        .then((response) => {
          this.reclutador = response.data.data;
          this.reclutador.contrasena = "Ninguna1*";
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
        });
    },
    chargePerfil: function () {
      this.$emit("chargePerfil");
    },
  },
  mounted() {
    this.cargarEstados();
  },
};
</script>

<style>
</style>