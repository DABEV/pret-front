<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="6" vs-xs="10">
      <vs-card actionable>
        <div slot="header">
          <h3>Login</h3>
        </div>
        <div class="centerx">
          <vs-row vs-justify="center">
            <vs-input size="large" label-placeholder="Correo electrónico" v-model="username"/>
            <br>
            <vs-input size="large" label-placeholder="Contraseña" v-model="password" type="password"/>
          </vs-row>
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end">
            <vs-button size="large" type="gradient" color="primary">Ingresar</vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  data: () => ({
    active: 0,
    currentx: 4,
    username: "",
    password: "",
  }),
};
</script>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
body {
  min-height: 100vh;
  background-image: radial-gradient(
    circle 621px at 25.3% 13.8%,
    rgba(255, 255, 255, 1) 0%,
    rgba(234, 236, 255, 1) 90%
  );
  margin-top: 50px;
  font-family: "Roboto", sans-serif;
}
</style>
