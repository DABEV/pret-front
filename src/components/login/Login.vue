<template>
  <div class="center">
    <vs-col lg="4" sm="10" xs="10" class="center-content-25">
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
                placeholder="ejemplo@gmail.com"
              >
                <template #icon> @ </template>
              </vs-input>
              <vs-input
                primary
                block
                type="password"
                v-model="password"
                placeholder="********"
              >
                <template #icon>
                  <em class="bx bxs-lock-alt"></em>
                </template>
              </vs-input>
              <div class="center-item space space-top">
                <vs-checkbox v-model="remember"> Recuérdame </vs-checkbox>
              </div>
              <a href="#">Olvidaste la contraseña?</a>
            </div>
          </vs-col>
        </vs-row>
        <vs-row class="space-top" justify="space-around">
          <vs-col w="5">
            <vs-button transparent block> Crear cuenta </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button primary block> Iniciar sesión </vs-button>
          </vs-col>
        </vs-row>
      </div>
    </vs-col>
  </div>
</template>
<script>
export default {
  name: "Login",
};
</script>


