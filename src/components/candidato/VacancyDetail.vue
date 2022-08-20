<template>
  <div class="center">
    <div class="content-card content-data space space-top">
      <div class="margin-xy text-center">
        <h2 class="space-top">{{ vacante.nombre }}</h2>
        <small class="space">
          {{ vacante.reclutador.nombreEmpresa }},
          {{ vacante.reclutador.estadoRepublicaEmpresa.nombre }}</small
        >
        <vs-row justify="center" class="space-top">
          <vs-col lg="2" sm="12" xs="12" class="center-item">
           <ApplyDialog :vacante="vacante"/>
          </vs-col>
          <vs-col lg="2" sm="12" xs="12" class="center-item">
            <vs-tooltip>
              <vs-button
                icon
                animation-type="vertical"
                danger
                @click="favoritos = !favoritos"
              >
                <i class="bx bx-heart"></i>
                <template #animate>
                  <i class="bx bxs-heart"></i>
                </template>
              </vs-button>
              <template #tooltip> Favoritos </template>
            </vs-tooltip>
          </vs-col>
          <vs-col lg="2" sm="12" xs="12" class="center-item">
            <ShareDialog :idVacante="vacante.id"/>
          </vs-col>
        </vs-row>
        <div class="divider space-top">
          <span class="border"></span>
        </div>
        <vs-row justify="space-around" class="space-top text-start">
          <vs-col lg="9" sm="10" xs="12">
            <small class="bg-primary"> Vigencia: {{ vacante.fechaFin }} </small>
          </vs-col>
          <vs-col lg="2" sm="12" xs="12" class="text-end">
            <small class="badge-sec">{{ vacante.modalidad }}</small>
          </vs-col>
        </vs-row>
        <p class="center">{{ vacante.descripcion }}</p>
        <div class="divider space">
          <span class="border"></span>
        </div>
        <p class="text-center bold">Modo de pago: {{ vacante.periodoPago }}</p>
        <vs-row justify="space-around" class="text-center space">
          <vs-col lg="4" sm="3" xs="3">
            <p>
              Mínimo:
              <small class="badge-pri"> ${{ vacante.sueldoMin }}</small>
            </p>
          </vs-col>
          <vs-col lg="4" sm="3" xs="3">
            <p>
              Máximo:
              <small class="badge-war"> ${{ vacante.sueldoMax }}</small>
            </p>
          </vs-col>
        </vs-row>
        <div class="divider space-top">
          <span class="border"></span>
        </div>
        <p class="bg-gray text-center space-top">Tipo: {{ vacante.tipo }}</p>
        <div class="divider space-top">
          <span class="border"></span>
        </div>
        <p class="text-center bold space-top">Beneficios</p>
        <div class="space text-start bg-gray">
          <div
            :key="i"
            v-for="(b, i) in vacante.beneficios"
            :data="b"
            class="item"
          >
            <vs-row justify="space-around">
              <vs-col lg="1" sm="2" xs="2" class="text-center space-top">
                <i class="bx bx-check-shield bg-success"></i>
              </vs-col>
              <vs-col lg="10" sm="10" xs="10" class="space-top">
                <p>{{ b.nombre }}</p>
              </vs-col>
            </vs-row>
          </div>
        </div>
        <br />
      </div>
    </div>

    
  </div>
</template>

<script>
import ShareDialog from "./dialogsVacante/ShareDialog.vue";
import ApplyDialog from "./dialogsVacante/ApplyDialog.vue";

export default {
  name: "VacancyDetail",
  data: () => ({
    activeCompartir: false,
    vacante: {
      id: 3,
      nombre: "Desarrollador Full-stack Java",
      reclutador: {
        nombre: "Roberto",
        apellidoPaterno: "Miramontes",
        apellidoMaterno: "Ruiseñor",
        nombreEmpresa: "Sony",
        estadoRepublicaEmpresa: {
          nombre: "Morelos",
        },
      },
      tipo: "Medio tiempo",
      modalidad: "Híbrido",
      periodoPago: "Quincenal",
      sueldoMin: 10000,
      sueldoMax: 30000,
      fechaInicio: "5/19/12",
      fechaFin: "8/19/12",
      descripcion:
        "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      beneficios: [
        {
          nombre: "Ofrecemos sueldo competitivo",
        },
        {
          nombre: "Trabajo en modalidad híbrida (Homeoffice)",
        },
        {
          nombre: "Cursos y Certificaciones constantes",
        },
        {
          nombre: "Prestaciones de ley y Superirores",
        },
        {
          nombre: "Programas de crecimiento a corto, mediano y largo plazo",
        },
      ],
    },
    postulacion: {
      id: 0,
      cv: "",
      vacante: {},
      candidato: {},
      estadoVacante: {
        id: 1,
      },
    },
    contactos: [
      {
        nombre: "Cameron",
        apellidoMaterno: "Williamson",
        apellidoPaterno: "Warren",
        correoElectronico: "cameron@example.com",
        telefono: "(704) 555-0127",
        estadoRepublica: {
          nombre: "Morelos",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      },
      {
        nombre: "Esther",
        apellidoMaterno: "Howard",
        apellidoPaterno: "Simmons",
        correoElectronico: "esther@example.com",
        telefono: "(907) 555-0101",
        estadoRepublica: {
          nombre: "Morelos",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=562&q=80",
      },
      {
        nombre: "Robert",
        apellidoMaterno: "Warren",
        apellidoPaterno: "Hawkins",
        correoElectronico: "robert@example.com",
        telefono: "(217) 555-0113",
        estadoRepublica: {
          nombre: "Querétaro",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80",
      },
      {
        nombre: "Alexander",
        apellidoMaterno: "Edwards",
        apellidoPaterno: "Wade",
        correoElectronico: "alexander@example.com",
        telefono: "(308) 555-0121",
        estadoRepublica: {
          nombre: "Durango",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=558&q=80",
      },
      {
        nombre: "Leslie",
        apellidoMaterno: "Brooklyn",
        apellidoPaterno: "Williamson",
        correoElectronico: "leslie@example.com",
        telefono: "(302) 555-0107",
        estadoRepublica: {
          nombre: "Tamaulipas",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      },
      {
        nombre: "Ralph",
        apellidoMaterno: "Williamson",
        apellidoPaterno: "Fox",
        correoElectronico: "ralph@example.com",
        telefono: "(702) 555-0122",
        estadoRepublica: {
          nombre: "Oaxaca",
        },
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1483995564125-85915c11dcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=641&q=80",
      },
    ],
  }),
  methods: {
    CargarVacante: function (id) {
      console.log(id);
    },
  },
  mounted() {
    if (this.$route.params.id != undefined) {
      this.CargarVacante(this.$route.params.id);
    }
  },
  components: { ShareDialog, ApplyDialog },
};
</script>