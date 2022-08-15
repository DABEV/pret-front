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
            <div class="input-icon-register">
              <span><i class="bx bxs-briefcase"></i> </span>
              <select
                      class="select-custom space"
                      placeholder="Puesto de trabajo"
                      v-model="reclutador.puesto"
                    >
                      <option
                        class="select-option"
                        v-for="(pues, i) in puestos"
                        :key="i"
                        :value="pues"
                      >
                        {{ pues.nombre }}
                      </option>
              </select>
            </div>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              block
              class="space input-date"
              type="date"
              primary
              v-model="fechaNacimiento"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
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
        </vs-row>
        <br />
        <vs-row justify="space-around">
          <vs-col w="4">
            <vs-button @click="registrar()" block animation-type="vertical">
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
import RecruiterService from "../../service/Recruiter/RecruiterService";
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
    reclutador: {
      puesto: {
        id: 0,
      }
    },
    estados: [
      {
        id: 0,
        nombre: "",
      },
    ],
    puestos: [
      {
        id: 0,
        nombre: "",
      }
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
    cargarPuestos: function () {
      CatalogueService.listarPuestos()
        .then((response) => {
          this.puestos = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async registrar(){
      try{
        let recruiterData = { 
          nombre: this.nombre, 
          apellidoPaterno: this.apellidoPaterno, 
          apellidoMaterno: this.apellidoMaterno,
          correoElectronico: this.correoElectronico,
          contrasena: this.contrasena,
          telefono: this.telefono,
          fechaNacimiento: this.fechaNacimiento,
          estadoRepublica: this.candidato.estadoRepublica,
          puesto: this.reclutador.puesto,
          nombreEmpresa: this.nombreEmpresa,
          estadoRepublicaEmpresa: this.candidato.estadoRepublica,
           };
        RecruiterService.registrar(recruiterData)
        .then((response) =>{
          if(response){
            this.llamarNotificacion(1, response.data.title, response.data.message);
            setTimeout(location.href = "#/acceso/login",4000);
          }
        })
        .catch((e) => {
          console.log(e);
          this.llamarNotificacion(4, "Hubo un error!", "a");
        });
      }catch(e){
        console.log(e);
        this.llamarNotificacion(4, "Hubo un error!", e);
      }
    },
    llamarNotificacion: function (color, titulo, mensaje) {
      this.openNotification(
        color,
        titulo,
        mensaje
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
  },
  mounted() {
    this.cargarPuestos();
    this.cargarEstados();
    
  },
};
</script>

<style>
</style>
