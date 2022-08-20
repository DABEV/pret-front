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
                        Fecha de nacimiento: {{ reclutador.fechaNacimiento.slice(0, 10) }}
                      </p>
                    </vs-col>
                  </vs-row>
                </div>
                <vs-col lg="6" sm="6" xs="6" class="space">
                  <vs-row justify="space-between">
                    <vs-col lg="5" sm="12" xs="12">
                      <vs-button
                        color="#b13cd2"
                        transparent
                        block
                        @click="AbrirCambiar()"
                      >
                        Cambiar foto
                      </vs-button>
                    </vs-col>
                    <vs-col lg="5" sm="12" xs="12">
                      <vs-button
                        color="#b13cd2"
                        block
                        @click="IrEditar(), (active = !active)"
                      >
                        Editar perfil
                      </vs-button>
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
                    <vs-button primary block @click="IrVacantes()">
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
    <div
      class="content-data content-card space space-top datos text-start bg-gray"
    >
      <vs-row justify="space-between">
        <vs-col lg="5" sm="12" xs="12">
          <h4 class="bg-gray space-top">Cambiar tu contraseña</h4>
        </vs-col>
        <vs-col lg="2" sm="12" xs="12">
          <vs-button block success @click="actualizarContrasena()">
            Guardar contraseña
          </vs-button>
        </vs-col>
      </vs-row>
      <vs-row justify="center" class="space-top">
        <vs-col lg="6" sm="12" xs="12">
          <vs-input
            class="space-top space padding-y"
            placeholder="Actual contraseña"
            color="#1e88e5"
            v-model="cambioContra.contrasena"
            type="password"
            block
          >
            <template #icon>
              <i class="bx bxs-lock"></i>
            </template>
          </vs-input>
        </vs-col>
      </vs-row>
      <vs-row
        justify="space-between"
        class="space-top"
        v-if="cambioContra.contrasena != ''"
      >
        <vs-col lg="6" sm="12" xs="12">
          <vs-input
            class="space-top space padding-y"
            placeholder="Nueva contraseña"
            color="#1e88e5"
            v-model="cambioContra.nuevaContrasena"
            type="password"
            block
          >
            <template #icon>
              <i class="bx bxs-lock"></i>
            </template>
            <template
              v-if="!validPassword && cambioContra.nuevaContrasena != ''"
              #message-danger
            >
              Tamaño min 6, incluir al menos un número, mayúscula y un caracter
              especial
            </template>
          </vs-input>
        </vs-col>
        <vs-col lg="6" sm="12" xs="12">
          <vs-input
            class="space-top space padding-x"
            placeholder="Repite la contraseña"
            color="#1e88e5"
            v-model="cambioContra.repetirContrasena"
            type="password"
            block
          >
            <template #icon>
              <i class="bx bxs-lock"></i>
            </template>
            <template v-if="!samePassword" #message-danger>
              Las contraseñas no coinciden
            </template>
          </vs-input>
        </vs-col>
      </vs-row>
    </div>

    <vs-dialog prevent-close scroll width="600px" v-model="active">
      <template #header>
        <h4>Editar perfil</h4>
      </template>
      <div class="margin-xy space">
        <h4 class="text-start bg-gray">Datos personales</h4>
        <vs-input
          class="space-top"
          placeholder="Puesto"
          v-model="puesto.nombre"
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
              v-model="reclutadorEditado.telefono"
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
                v-model="reclutadorEditado.estadoRepublica"
              >
                <option
                  class="select-option"
                  disabled
                  :value="reclutadorEditado.estadoRepublica"
                >
                  {{ reclutadorEditado.estadoRepublica.nombre }}
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
              v-model="reclutadorEditado.nombreEmpresa"
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
                v-model="reclutadorEditado.estadoRepublicaEmpresa"
              >
                <option
                  class="select-option"
                  disabled
                  :value="reclutadorEditado.estadoRepublicaEmpresa"
                >
                  {{ reclutadorEditado.estadoRepublicaEmpresa.nombre }}
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
            <vs-button dark transparent block @click="Cancelar()"
              >Cancelar
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
import RecruiterService from "../../service/Recruiter/RecruiterService";
import AuthService from "../../service/Auth/AuthService";
import CatalogueService from "../../service/Catalogues/CatalogueService";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "Profile",
  data: () => ({
    active: false,
    activeCambiarFoto: false,
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
    reclutadorEditado: {
      tnombre: "",
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
        nombre: "Gerente de Recursos humanos",
      },
      nombreEmpresa: "",
      estadoRepublicaEmpresa: {
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
    IrEditar: function () {
      RecruiterService.getProfile()
        .then((response) => {
          this.reclutadorEditado = response.data.data;
          this.reclutadorEditado.contrasena = "Ninguna1*";
        })
        .catch((e) => {
          console.log(e);
        });
      this.puesto = this.reclutadorEditado.puesto;
    },
    IrVacantes: function () {
      this.$router.push("/reclutador/vacantes");
    },
    Cancelar: function () {
      this.active = false;
    },
    actualizarContrasena: function () {
      if (this.pswdOld != "" && this.validPassword && this.samePassword) {
        AuthService.cambiarContrasena(this.cambioContra)
          .then((response) => {
            if (response.data) {
              this.openNotification(
                1,
                response.data.title,
                response.data.message
              );
              this.cambioContra = {
                contrasena: "",
                nuevaContrasena: "",
                repetirContrasena: "",
              };
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
      } else {
        this.openNotification(2, "Atencion", "Ingrese correctamente los datos");
      }
    },
    actualizar: function () {
      this.reclutadorEditado.contrasena = "Ninguna1*";
      RecruiterService.updateProfile(this.reclutadorEditado)
        .then((response) => {
          if (response.data) {
            this.reclutador = response.data.data;
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
    changeImg: function (e) {
      this.imagen = e.target.files[0];
    },
    AbrirCambiar: function () {
      this.activeCambiarFoto = !this.activeCambiarFoto;
    },
    subirFoto: function () {
      const child = "imagenes/perfil_reclutador" + this.reclutador.id;
      const refImg = ref(storage, child);
      const fullPath = refImg.fullPath;
      const metadata = { contentType: "img/jpeg" };
      uploadBytes(refImg, this.imagen, metadata).then(() => {
        getDownloadURL(ref(storage, fullPath))
          .then((url) => {
            this.reclutador.foto = url;
            this.actualizarFoto();
          })
          .catch((error) => {
            console.log(error);
          });
      });
      this.activeCambiarFoto = false;
    },
    actualizarFoto: function () {
      RecruiterService.updatePhoto(this.reclutador.foto)
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
  },
  computed: {
    samePassword() {
      return (
        this.cambioContra.nuevaContrasena == this.cambioContra.repetirContrasena
      );
    },
    validPassword() {
      return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=^.{6,}$).*$/g.test(
        this.cambioContra.nuevaContrasena
      );
    },
  },
  mounted() {
    this.cargarPerfil();
    this.cargarEstados();
  },
};
</script>