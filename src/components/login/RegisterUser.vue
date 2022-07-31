<template>
  <div class="center">
    <vs-col lg="5" sm="10" xs="10" class="display-table text-center">
      <div class="content-data padding-xy">
        <h4>
          <strong>Registro de usuario</strong>
          <br />
          <img
            class="logo"
            alt="img"
            src="../../assets/img/logo.svg"
            style="width: 40px"
          />
        </h4>
        <vs-row justify="space-around">
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              block
              class="space"
              primary
              v-model="nombre"
              placeholder="Nombre"
            >
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="apellidoPaterno"
              placeholder="Apellido paterno"
            >
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="apellidoMaterno"
              placeholder="Apellido materno"
            >
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="telefono"
              placeholder="Télefono"
            >
              <template #icon><em class="bx bxs-phone"></em></template>
            </vs-input>
            <vs-input
              block
              class="space input-date"
              type="date"
              primary
              v-model="birthdate"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              block
              class="space"
              primary
              v-model="career"
              placeholder="Grado de estudios"
            >
              <template #icon><em class="bx bxs-graduation"></em></template>
            </vs-input>
            <vs-select
              class="space"
              block
              placeholder="Estado de recidencia"
              v-model="value"
            >
              <vs-option label="Morelos" value="1"> Morelos </vs-option>
              <vs-option label="Puebla" value="2"> Puebla </vs-option>
              <vs-option label="Sonora" value="3"> Sonora </vs-option>
            </vs-select>
            <vs-input
              block
              class="space"
              primary
              v-model="correoElectronico"
              placeholder="Correo"
            >
              <template #icon> @ </template>
            </vs-input>
            <vs-input
              primary
              block
              class="space"
              type="password"
              v-model="contrasena"
              placeholder="Contraseña"
            >
              <template #icon><em class="bx bxs-lock-alt"></em></template>
            </vs-input>
            <vs-input
              primary
              block
              class="space"
              type="password"
              v-model="value"
              placeholder="Repetir contraseña"
            >
              <template #icon><em class="bx bxs-lock-alt"></em></template>
            </vs-input>
          </vs-col>
        </vs-row>
        <vs-row justify="space-around">
          <vs-col lg="11" sm="12" xs="12">
            <textarea v-model="description" placeholder="Breve descripción">
          </textarea>
          </vs-col>
        </vs-row>
        <vs-row justify="space-around" class="space-top">
          <vs-col w="4">
            <vs-button block animation-type="vertical">
              Crear cuenta
              <template #animate>
                <em class="bx bx-log-in-circle"></em>&nbsp;Registrarse
              </template>
            </vs-button>
          </vs-col>
        </vs-row>
        <div class="space-top">
          Ya dispones de una cuenta?
          <br />
          <a href="#">Inicia sesión</a>
        </div>
        <br />
      </div>
    </vs-col>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",
  data: () => ({
    value: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    career: "",
    telefono: "",
    correoElectronico: "",
    contrasena: "",
    description: "",
  }),
};
</script>

<style></style>
