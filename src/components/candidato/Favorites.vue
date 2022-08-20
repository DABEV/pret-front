<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Mis favoritos</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="space-between">
          <vs-col lg="4" sm="12" xs="12">
            <vs-row justify="space-between">
              <vs-col lg="2" sm="3" xs="3">
                <vs-avatar color="#B13CD2">
                  <i class="bx bx-bookmark"></i>
                </vs-avatar>
              </vs-col>
              <vs-col lg="9" sm="9" xs="9">
                <p>
                  Guardados: <b>{{ vacantes.length }}</b>
                </p>
                <small>Marcados como favoritos</small>
              </vs-col>
            </vs-row>
          </vs-col>
          <vs-col lg="4" sm="12" xs="12">
            <vs-input
              v-model="search"
              color="#1e88e5"
              block
              placeholder="Buscar"
            >
              <template #icon>
                <i class="bx bx-search"></i>
              </template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center" v-if="$vs.getSearch(vacantes, search).length < 1">
          No se encontraron registros
        </div>
        <div
          :key="i"
          :data="v"
          v-for="(v, i) in $vs.getPage(
            $vs.getSearch(vacantes, search),
            page,
            max
          )"
          class="item"
        >
          <vs-row justify="space-between" class="space">
            <vs-col lg="1" sm="2" xs="2" class="space-top">
              <vs-avatar primary class="space-top end-item">
                <i class="bx bxs-buildings"></i>
              </vs-avatar>
            </vs-col>
            <vs-col lg="8" sm="12" xs="12" class="space-top space">
              <div class="item-click" @click="Detalles(v), (active = !active)">
                <p class="space-top">
                  <b>{{ v.nombre }}</b>
                </p>
                <vs-row class="space">
                  <vs-col w="2">
                    <small class="bg-primary">
                      {{ v.reclutador.nombreEmpresa }}
                    </small>
                  </vs-col>
                  <vs-col w="3">
                    <small class="bg-gray">
                      Ubicado en:
                      {{ v.reclutador.estadoRepublicaEmpresa.nombre }}
                    </small>
                  </vs-col>
                  <vs-col w="6">
                    <small class="bg-sec"> Vigencia: {{ v.fechaFin }}</small>
                  </vs-col>
                </vs-row>
                <small>{{ v.descripcion }}</small>
              </div>
            </vs-col>
            <vs-col lg="1" sm="12" xs="12" class="space-top">
              <ApplyDialog :vacante="v" />
            </vs-col>
            <vs-col lg="1" sm="12" xs="12" class="space-top">
              <vs-row justify="space-between">
                <vs-col lg="12" sm="2" xs="2">
                  <ShareDialog :idVacante="v.id" />
                </vs-col>
                <vs-col lg="12" sm="2" xs="2">
                  <vs-tooltip>
                    <vs-button
                      icon
                      animation-type="vertical"
                      danger
                      @click="Detalles(v), (deleteActive = !deleteActive)"
                    >
                      <i class="bx bx-trash-alt"></i>
                      <template #animate>
                        <i class="bx bxs-trash-alt"></i>
                      </template>
                    </vs-button>
                    <template #tooltip> Quitar </template>
                  </vs-tooltip>
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
          <div class="divider">
            <span class="border"></span>
          </div>
        </div>
        <div class="pagination">
          <vs-pagination
            v-model="page"
            :length="$vs.getLength($vs.getSearch(vacantes, search), max)"
          />
        </div>
      </div>
    </div>

    <vs-dialog width="450px" class="text-center" v-model="deleteActive">
      <template #header>
        <h4><b>Confirmación</b></h4>
      </template>
      <div class="text-gray">
        <p>
          ¿Seguro de eliminar <b>{{ vacante.nombre }}</b> de tus favoritos?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button danger @click="deleteActive = false" block>
              Quitar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button transparent dark @click="deleteActive = false" block>
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <DetailsDialog
      :active="active"
      :vacante="vacante"
      :estadoRepublicaEmpresaReclutador="estadoRepublicaEmpresaReclutador"
      :nombreEmpresaReclutador="nombreEmpresaReclutador"
      @CloseDetails="CloseDetails"
    />
  </div>
</template>
<script>
import ShareDialog from "./dialogsVacante/ShareDialog.vue";
import DetailsDialog from "./dialogsVacante/DetailsDialog.vue";
import ApplyDialog from "./dialogsVacante/ApplyDialog.vue";

export default {
  name: "Favorites",
  data: () => ({
    active: false,
    deleteActive: false,
    search: "",
    nombreEmpresaReclutador: "",
    estadoRepublicaEmpresaReclutador: "",
    page: 1,
    max: 4,
    vacante: {},
    vacantes: [
      {
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
        tipo: "Medio tiempo",
        modalidad: "Híbrido",
        periodoPago: "Quincenal",
        sueldoMin: 10000,
        sueldoMax: 30000,
        fechaInicio: "5/19/12",
        fechaFin: "8/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Desarrollador Full-stack PHP",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa: {
            nombre: "Morelos",
          },
        },
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
        tipo: "Medio tiempo",
        modalidad: "Híbrido",
        periodoPago: "Mensual",
        sueldoMin: 50000,
        sueldoMax: 80000,
        fechaInicio: "5/19/12",
        fechaFin: "6/25/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "President of Sales",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa: {
            nombre: "Quintana Roo",
          },
        },
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
        tipo: "Medio tiempo",
        modalidad: "Híbrido",
        periodoPago: "Semanal",
        sueldoMin: 15000,
        sueldoMax: 30000,
        fechaInicio: "5/19/12",
        fechaFin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Web Designer",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa: {
            nombre: "Sonora",
          },
        },
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
        tipo: "Medio tiempo",
        empresa: "Sony",
        modalidad: "Híbrido",
        periodoPago: "Semanal",
        sueldoMin: 1500,
        sueldoMax: 3000,
        fechaInicio: "5/19/12",
        fechaFin: "9/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Desarrollador Full-stack PHP",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa: {
            nombre: "Nayarit",
          },
        },
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
        tipo: "Medio tiempo",
        modalidad: "Híbrido",
        periodoPago: "Quincenal",
        sueldoMin: 20000,
        sueldoMax: 50000,
        fechaInicio: "5/19/12",
        fechaFin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Desarrollador Full-stack PHP",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa: {
            nombre: "Morelos",
          },
        },
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
        tipo: "Medio tiempo",
        modalidad: "Híbrido",
        periodoPago: "Quincenal",
        sueldoMin: 15000,
        sueldoMax: 40000,
        fechaInicio: "5/19/12",
        fechaFin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Marketing Coordinator",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa: {
            nombre: "Morelos",
          },
        },
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
        tipo: "Medio tiempo",
        modalidad: "Híbrido",
        periodoPago: "Quincenal",
        sueldoMin: 12000,
        sueldoMax: 23000,
        fechaInicio: "5/19/12",
        fechaFin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
    ],
  }),
  methods: {
    Detalles: function (vacante) {
      this.vacante = vacante;
      this.estadoRepublicaEmpresaReclutador =
        vacante.reclutador.estadoRepublicaEmpresa.nombre;
      this.nombreEmpresaReclutador = vacante.reclutador.nombreEmpresa;
    },
    CloseDetails: function () {
      this.active = !this.active;
    },
  },
  components: { ShareDialog, DetailsDialog, ApplyDialog },
};
</script>
