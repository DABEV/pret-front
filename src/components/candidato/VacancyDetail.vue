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
        </vs-row>
        <div class="divider space-top">
          <span class="border"></span>
        </div>
        <vs-row justify="space-around" class="space-top text-start">
          <vs-col lg="9" sm="10" xs="12">
            <small class="bg-primary"> Vigencia: {{ vacante.fechaVigencia }} </small>
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
import ApplyDialog from "./dialogsVacante/ApplyDialog.vue";
import RecruiterService from "../../service/Recruiter/RecruiterService";

export default {
  name: "VacancyDetail",
  data: () => ({
    activeCompartir: false,
    vacante: {
      id: null,
      nombre: "",
      reclutador: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombreEmpresa: "",
        estadoRepublicaEmpresa: {
          nombre: "",
        },
      },
      tipo: "",
      modalidad: "",
      periodoPago: "",
      sueldoMin: 0,
      sueldoMax: 0,
      fechaInicio: "",
      fechaVigencia: "",
      descripcion:"",
      beneficios: [
        {
          nombre: "",
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
    
  }),
  methods: {
    CargarVacante: function (id) {
      console.log(id);
      try{
        RecruiterService.obtenerVacanteUnica(id)
        .then((response) => {
          if(response.data){
            this.vacante = response.data.data;
          }
        })
      }catch(e){
        console.log(e);
      }
    },
  },
  mounted() {
    if (this.$route.params.id != undefined) {
      this.CargarVacante(this.$route.params.id);
    }
  },
  components: {  ApplyDialog },
};
</script>