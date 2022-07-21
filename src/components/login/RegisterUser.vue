<template>
  <div class="center">
    <div class="content-data content-card">
      <h4>
        <strong>Registro de usuario</strong>
        <br />
        <img alt="img" src="../../assets/img/logo.svg" style="width: 40px" />
      </h4>
      <vs-row>
        <vs-col lg="6" sm="12" xs="12">
          <vs-input primary v-model="name" placeholder="Nombre">
            <template #icon><em class="bx bxs-user"></em></template>
          </vs-input>
          <vs-input primary v-model="lastname" placeholder="Apellidos">
            <template #icon><em class="bx bxs-user"></em></template>
          </vs-input>
          <vs-input primary v-model="phone" placeholder="Télefono">
            <template #icon><em class="bx bxs-phone"></em></template>
          </vs-input>
          <vs-input type="date" primary v-model="birthdate">
            <template #icon><em class="bx bxs-calendar"></em></template>
          </vs-input>
        </vs-col>
        <vs-col lg="6" sm="12" xs="12">
          <vs-input primary v-model="career" placeholder="Grado de estudios">
            <template #icon><em class="bx bxs-graduation"></em></template>
          </vs-input>
          <vs-select class="vs-select2" block placeholder="Estado en el que reside" v-model="value">
                <vs-option label="Morelos" value="1">
                Morelos
                </vs-option>
                <vs-option label="Puebla" value="2">
                Puebla
                </vs-option>
                <vs-option label="Sonora" value="3">
                Sonora
                </vs-option>
          </vs-select>
          <vs-input primary v-model="email" placeholder="ejemplo@gmail.com">
            <template #icon> @ </template>
          </vs-input>
          <vs-input primary type="password" v-model="password" placeholder="********">
            <template #icon><em class="bx bxs-lock-alt"></em></template>
          </vs-input>
        </vs-col>
      </vs-row>
      <div class="center2">
        <textarea v-model="description" placeholder="Breve descripción"></textarea>
      </div>
      <br />
      <vs-row justify="space-around">
        <vs-col  w="4">
          <vs-button animation-type="vertical">
            Crear cuenta
            <template #animate>
              <em class="bx bx-log-in-circle"></em>&nbsp;Registrarse
            </template>
          </vs-button>
        </vs-col>
      </vs-row>    
      <br />
      <div class="new">
        Ya dispones de una cuenta?
        <br />
        <a href="#">Inicia sesión</a>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",
  data: () => ({
        value: '',
        name: '',
        lastname: '',
        career: '',
        phone: '',
        email: '',
        password: '',
        description: '',
  }),
};
</script>

<style>
</style>
