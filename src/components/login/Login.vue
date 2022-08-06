<template>
  <div class="center">
    <vs-col lg="4" sm="10" xs="10" class="display-table text-center">
      <div class="content-data padding-xy">
        <h3>
          <b>PRET</b>
          <br />
          <img
            class="logo"
            alt="img"
            src="../../assets/img/logo.svg"
            style="width: 40px"
          />
        </h3>
        <vs-row justify="space-around">
          <vs-col w="10">
            <div class="">
              <vs-input
                block
                primary
                v-model="email"
                class="space"
                placeholder="Correo"
              >
                <template #icon> @ </template>
              </vs-input>
              <vs-input
                primary
                block
                type="password"
                v-model="password"
                placeholder="Contraseña"
              >
                <template #icon>
                  <em class="bx bxs-lock-alt"></em>
                </template>
              </vs-input>
              <div class="center-item space space-top">
                <vs-checkbox v-model="option"> Recuérdame </vs-checkbox>
              </div>
              <a href="#">Olvidaste la contraseña?</a>
            </div>
          </vs-col>
        </vs-row>
        <vs-row class="space-top" justify="space-around">
          <vs-col w="5">
            <vs-button transparent block @click="active = !active">
              Crear cuenta</vs-button
            >
          </vs-col>
          <vs-col w="5">
            <vs-button @click="llamarNotificacion()" primary block>
              Iniciar sesión
            </vs-button>
          </vs-col>
        </vs-row>
      </div>
    </vs-col>
    <vs-dialog prevent-close v-model="active">
      <template #header>
        <h4 class="not-margin">
          <b>Elige el tipo de cuenta a crear</b>
        </h4>
      </template>
      <div class="center">
        <vs-row justify="space-around">
          <vs-col lg="5" sm="12" xs="12" class="text-center center-item">
            <div
              class="content-selection padding-xy space content-card center-item"
            >
              <vs-button icon class="logo" @click="IrCandidato()">
                <i class="bx bx-user"></i>
              </vs-button>
              <vs-button transparent block @click="IrCandidato()"
                >Cuenta candidato</vs-button
              >
            </div>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="text-center center-item">
            <div
              class="content-selection padding-xy space content-card center-item"
            >
              <vs-button icon class="logo" @click="IrReclutador()">
                <i class="bx bx-buildings"></i>
              </vs-button>
              <vs-button transparent block @click="IrReclutador()"
                >Cuenta reclutador</vs-button
              >
            </div>
          </vs-col>
        </vs-row>
      </div>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  name: "Login",
  option: true,
  methods: {
    llamarNotificacion: function () {
      this.openNotification(
        1,
        "Notificación de prueba",
        "Mensaje genérico"
      );
    },
    openNotification(border_, title_, text_) {
      let tipo = "";
      let icon_ = "";
      switch (border_) {
        case 1:
          tipo = 'success';
          icon_ = `<i class='bx bx-check-circle' ></i>`;
          break;
        case 2:
          tipo = 'primary';
          icon_ = `<i class='bx bx-info-circle'></i>`;
          break;
        case 3:
          tipo = 'warning';
          icon_ = `<i class='bx bx-error'></i>`;
          break;
        case 4:
          tipo = 'danger';
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
    IrCandidato: function () {
      this.$router.push("/acceso/registroCandidato");
    },
    IrReclutador: function () {
      this.$router.push("/acceso/registroReclutador");
    },
  },
  data: () => ({
    active: false,
  }),
};
</script>
