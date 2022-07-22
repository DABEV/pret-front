<template>
  <div class="center">
    <vs-card class="content-login">
      <template #title>
        <h4>
          <b>PRET</b><br /><img
            class="logo"
            alt="img"
            src="../../assets/img/logo.svg"
            style="width: 40px"
          />
        </h4>
      </template>
      <template #text>
        <div class="con-form">
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
          <vs-row>
            <vs-col offset="3" w="8">
              <vs-checkbox v-model="remember">Recuérdame</vs-checkbox>
            </vs-col>
          </vs-row>
          <a href="#">Olvidaste la contraseña?</a>
        </div>
      </template>
      <template #buttons>
        <vs-row>
          <vs-col offset="3" w="7">
            <vs-button class="button-long" block animation-type="vertical">
              Iniciar sesión
              <template #animate>
                <em class="bx bx-log-in-circle"></em>&nbsp;Entrar
              </template>
            </vs-button>
          </vs-col>
        </vs-row>
        <br />
        <div class="new">
          No tienes cuenta?
          <br />
          <a href="#">Crea una nueva</a>
        </div>
        <br />
      </template>
    </vs-card>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style>
</style>
