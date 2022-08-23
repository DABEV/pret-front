<template>
  <div class="center">
    <div class="space space-top content-card">
      <vs-row justify="space-between">
        <vs-col lg="7" sm="12" xs="12" class="text-center">
          <div>
            <div class="content-data">
              <vs-row class="margin-top-avatar" justify="space-around">
                <vs-col lg="3" sm="12" xs="12" class="space-top">
                  <p class="text-item bg-primary">
                    Teléfono
                    <small class="bold bg-gray">{{
                      reclutador.telefono
                    }}</small>
                  </p>
                </vs-col>
                <vs-col lg="6" sm="12" xs="12" class="center-item">
                  <vs-avatar
                    v-if="reclutador.foto != null"
                    circle
                    size="150"
                    class="avatar-top-card"
                  >
                    <img :src="reclutador.foto" alt="" />
                  </vs-avatar>
                  <vs-avatar
                    v-else
                    circle
                    size="150"
                    primary
                    class="avatar-top-card"
                  >
                    <i class="bx bx-user-pin avatar-lg-icon"></i>
                  </vs-avatar>
                </vs-col>
                <vs-col lg="3" sm="12" xs="12">
                  <p class="text-item bg-primary">
                    Estado
                    <small class="bold bg-gray">
                      {{ reclutador.estadoRepublica.nombre }}
                    </small>
                  </p>
                </vs-col>
              </vs-row>
              <h3 class="space-top">
                {{ reclutador.nombre }} {{ reclutador.apellidoPaterno }}
                {{ reclutador.apellidoMaterno }}
              </h3>
              <p class="bg-gray">{{ reclutador.correoElectronico }}</p>
              <div class="center-item space">
                <div class="content-card">
                  <div class="divider space space-top">
                    <span class="border"></span>
                  </div>
                  <vs-row justify="space-around" class="space">
                    <vs-col lg="1" sm="2" xs="2" class="center-item">
                      <vs-avatar color="#b13cd2" size="30">
                        <i class="bx bxs-graduation"></i>
                      </vs-avatar>
                    </vs-col>
                    <vs-col lg="10" sm="9" xs="9" class="text-start">
                      <p>Puesto: {{ reclutador.puesto.nombre }}</p>
                    </vs-col>
                  </vs-row>
                  <div class="divider space space-top">
                    <span class="border"></span>
                  </div>
                </div>
                <div class="content-card">
                  <vs-row justify="space-around" class="space">
                    <vs-col lg="1" sm="2" xs="2" class="center-item">
                      <vs-avatar color="#1E88E5" size="30">
                        <i class="bx bxs-cake"></i>
                      </vs-avatar>
                    </vs-col>
                    <vs-col lg="10" sm="9" xs="9" class="text-start">
                      <p>
                        Fecha de nacimiento:
                        {{ reclutador.fechaNacimiento.slice(0, 10) }}
                      </p>
                    </vs-col>
                  </vs-row>
                </div>
                <vs-col lg="6" sm="6" xs="6" class="space">
                  <vs-row justify="space-between">
                    <vs-col lg="5" sm="12" xs="12">
                      <ChangePhotoDialog :reclutador="reclutador" />
                    </vs-col>
                    <vs-col lg="5" sm="12" xs="12">
                      <EditProfile
                        :reclutador="reclutador"
                        @chargePerfil="chargePerfil"
                      />
                    </vs-col>
                  </vs-row>
                </vs-col>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-col lg="4" sm="12" xs="12" class="margin-top-avatar">
          <div class="content-data space datos text-start bg-gray">
            <div class="center-item space">
              <div class="content-card">
                <vs-row>
                  <vs-col lg="4">
                    <vs-avatar primary circle size="60">
                      <i class="bx bxs-buildings"></i>
                    </vs-avatar>
                  </vs-col>
                  <vs-col lg="8">
                    <p class="bold">Empresa: {{ reclutador.nombreEmpresa }}</p>
                    <p>
                      Estado: {{ reclutador.estadoRepublicaEmpresa.nombre }}
                    </p>
                  </vs-col>
                </vs-row>
                <div class="divider space space-top">
                  <span class="border"></span>
                </div>
                <div class="callout-seccess">
                  <p v-if="reclutador.vacantes != null">
                    Vacantes:
                    <small>{{ reclutador.vacantes.length }} publicadas</small>
                  </p>
                  <p v-else>
                    Vacantes:
                    <small>0 publicadas</small>
                  </p>
                </div>
                <vs-row justify="center">
                  <vs-col lg="6" sm="6" xs="6" class="space">
                    <vs-button primary block to="/reclutador/vacantes">
                      Ir a las vacantes
                    </vs-button>
                  </vs-col>
                </vs-row>
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>

    <ChangePassword />
  </div>
</template>
<script>
import RecruiterService from "../../service/Recruiter/RecruiterService";
import ChangePhotoDialog from "./dialogsPerfil/ChangePhotoDialog.vue";
import EditProfile from "./dialogsPerfil/EditProfile.vue";
import ChangePassword from "./dialogsPerfil/ChangePassword.vue";

export default {
  name: "Profile",
  data: () => ({
    activeGuardar: false,
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
    puesto: {},
    cambioContra: {
      contrasena: "",
      nuevaContrasena: "",
      repetirContrasena: "",
    },
    estados: [
      {
        id: 0,
        nombre: "",
      },
    ],
    vacio: {
      telefono: "",
      fechaNacimiento: "",
      estadoRepublica: {
        nombre: "",
      },
      puesto: {
        nombre: "",
      },
      nombreEmpresa: "",
      estadoRepublicaEmpresa: {
        nombre: "",
      },
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
      this.cargarPerfil();
    },
  },
  mounted() {
    this.cargarPerfil();
  },
  components: { ChangePhotoDialog, EditProfile, ChangePassword },
};
</script>