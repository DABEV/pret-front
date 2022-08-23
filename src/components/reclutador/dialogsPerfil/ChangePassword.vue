<template>
  <div
    class="content-data content-card space space-top datos text-start bg-gray"
  >
    <div>
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
    <vs-dialog prevent-close scroll width="600px" v-model="activeGuardar">
      <template #header>
        <h4>Actualizar Contraseña</h4>
      </template>
      <div class="margin-xy space text-center">
        <p>Se cerrará tu sesión por tú seguridad</p>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="4" sm="12" xs="12" class="space-top center-item">
            <vs-button
              dark
              transparent
              block
              @click="activeGuardar = !activeGuardar"
            >
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="4" sm="12" xs="12" class="space-top center-item">
            <vs-button success block @click="EnviarContra()">
              Guardar cambios
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import AuthService from "../../../service/Auth/AuthService";

export default {
  name: "ChangePassword",
  data: () => ({
    activeGuardar: false,
    cambioContra: {
      contrasena: "",
      nuevaContrasena: "",
      repetirContrasena: "",
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
    actualizarContrasena: function () {
      if (this.pswdOld != "" && this.validPassword && this.samePassword) {
        this.activeGuardar = !this.activeGuardar;
      } else {
        this.openNotification(2, "Atencion", "Ingrese correctamente los datos");
      }
    },
    async cerrarSesion() {
      try {
        await this.$store.dispatch("logout");
      } catch (e) {
        console.log(e);
      }
    },
    EnviarContra: function () {
      AuthService.cambiarContrasena(this.cambioContra)
        .then((response) => {
          if (response.data) {
            if (response.data.data) {
              this.openNotification(
                1,
                response.data.title,
                response.data.message
              );
              this.cerrarSesion();
            } else {
              this.openNotification(
                4,
                response.data.title,
                response.data.message
              );
            }
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
      this.activeGuardar = false;
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
};
</script>