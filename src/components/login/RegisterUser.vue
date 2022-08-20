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
              v-model="fechaNacimiento"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              block
              class="space"
              primary
              v-model="tituloCurricular"
              placeholder="Grado de estudios"
            >
              <template #icon><em class="bx bxs-graduation"></em></template>
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
            <textarea v-model="descripcionPerfil" placeholder="Breve descripción">
          </textarea>
          </vs-col>
        </vs-row>
        <vs-row justify="space-around" class="space-top">
          <vs-col w="4">
            <vs-button @click="registrar()" block animation-type="vertical">
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
          <a href="#/acceso/login">Inicia sesión</a>
        </div>
        <br />
      </div>
    </vs-col>
  </div>
</template>

<script>
import CatalogueService from "../../service/Catalogues/CatalogueService";
import CandidateNoTokenService from "../../service/Candidate/CandidateNoTokenService";
export default {
  name: "RegisterUser",
  data: () => ({
    value: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    estadoRepublica: {
      nombre: "Morelos",
    },
    habilitado: true,
    tituloCurricular: "",
    telefono: "",
    fechaNacimiento: "",
    correoElectronico: "",
    contrasena: "",
    descripcionPerfil: "",
    conocimientosHabilidades: {
      conocimientos: [],
      habilidades: [],
    },
    cursos: [],
    experienciasLaborales: [],
    estudios: [],
    idiomas: [],
    certificaciones: [],
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
    async registrar(){
      try{
        let candidateData = { 
          nombre: this.nombre, 
          apellidoPaterno: this.apellidoPaterno, 
          apellidoMaterno: this.apellidoMaterno,
          correoElectronico: this.correoElectronico,
          contrasena: this.contrasena,
          telefono: this.telefono,
          fechaNacimiento: this.fechaNacimiento,
          estadoRepublica: this.candidato.estadoRepublica,
          descripcionPerfil: this.descripcionPerfil,
          tituloCurricular: this.tituloCurricular,
           };
        CandidateNoTokenService.registrar(candidateData)
        .then((response) =>{
          if(response){
            this.llamarNotificacion(1, response.data.title, response.data.message);
            setTimeout(location.href = "#/acceso/login",4000);
          }
        })
        .catch((e) => {
          console.log(e);
          this.llamarNotificacion(4, "Hubo un error!", "Verifica los datos, puede que te haya faltado ingresar uno");
        });
      }catch(e){
        console.log(e);
        this.llamarNotificacion(4, "Hubo un error!");
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
    this.cargarEstados();
  },
};
</script>

<style></style>
