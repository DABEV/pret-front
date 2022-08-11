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
              v-model="nombreEmpresa"
              placeholder="Empresa"
            >
              <template #icon><em class="bx bxs-buildings"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12">
            <div class="input-icon-register">
              <span><i class="bx bxs-map"></i> </span>
              <select
                      class="select-custom space"
                      placeholder="Estado"
                      v-model="candidato.estadoRepublica"
                    >
                      <option
                        class="select-option"
                        disabled
                        :value="candidato.estadoRepublica"
                      >
                        {{ candidato.estadoRepublica.nombre }}
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
              v-model="value"
              placeholder="Contraseña"
            >
              <template #icon><em class="bx bxs-lock-alt"></em></template>
            </vs-input>
            <vs-input
              primary
              block
              class="space"
              type="password"
              v-model="contrasena"
              placeholder="Repetir contraseña"
            >
              <template #icon><em class="bx bxs-lock-alt"></em></template>
            </vs-input>
          </vs-col>
            
        </vs-row>
        <vs-row justify="space-around">
          <vs-col lg="11" sm="12" xs="12">
            <vs-input
              block
              primary
              v-model="puesto"
              placeholder="Puesto de trabajo"
            >
              <template #icon><em class="bx bxs-briefcase"></em></template>
            </vs-input>
          </vs-col>
        </vs-row>
        <br />
        <vs-row justify="space-around">
          <vs-col w="4">
            <vs-button block animation-type="vertical">
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
          <a href="#/acceso/login">Inicia sesión</a>
        </div>
        <br />
      </div>
    </vs-col>
  </div>
</template>
<script>
import CatalogueService from "../../service/Catalogues/CatalogueService";
export default {
  name: "RegisterRecuiter",
  data: () => ({
    value: "",
    placeholder: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    habilitado: true,
    telefono: "",
    fechaNacimiento: "",
    estadoRepublica: {
      nombre: "",
    },
    roles: "",
    puesto: "",
    estadoRepublicaEmpresa: {
      nombre: "",
    },
    nombreEmpresa: "",
    correoElectronico: "",
    contrasena: "",
    candidato: {
      estadoRepublica: {
        id: 0,
      },
    },
    estados: [
      {
        id: 0,
        nombre: "",
      },
    ],
  }),
  methods: {
    cargarEstados: function () {
      CatalogueService.listarEstados()
        .then((response) => {
          this.estados = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.cargarEstados();
  },
};
</script>

<style>
</style>
