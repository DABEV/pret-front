<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Búsqueda de empleo</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="flex-end">
          <vs-col lg="6" sm="12" xs="12">
            <vs-input
              v-model="search"
              color="#1e88e5"
              block
              placeholder="Puesto, pago, Estado de la Rep., empresa ..."
            >
              <template #icon>
                <i class="bx bx-search"></i>
              </template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <vs-row justify="space-between">
        <vs-col lg="3" sm="12" xs="12" class="space-top space">
          <div class="content-data datos text-start bg-gray">
            <h4 class="bg-primary">Ordenar vacantes</h4>
            <vs-tr>
              <vs-row>
                <vs-col class="item">
                  <vs-th
                    class="custom-th"
                    sort
                    @click="vacantes = $vs.sortData($event, vacantes, 'nombre')"
                  >
                    Nombre
                  </vs-th>
                  <div class="divider">
                    <span class="border"></span>
                  </div>
                </vs-col>
                <vs-col class="item">
                  <vs-th
                    class="custom-th"
                    sort
                    @click="
                      vacantes = $vs.sortData($event, vacantes, 'sueldoMax')
                    "
                  >
                    Sueldo máximo
                  </vs-th>
                  <div class="divider">
                    <span class="border"></span>
                  </div>
                </vs-col>
                <vs-col class="item">
                  <vs-th
                    class="custom-th"
                    sort
                    @click="
                      vacantes = $vs.sortData($event, vacantes, 'sueldoMin')
                    "
                  >
                    Sueldo mínimo
                  </vs-th>
                  <div class="divider">
                    <span class="border"></span>
                  </div>
                </vs-col>
                <vs-col class="item">
                  <vs-th
                    class="custom-th"
                    sort
                    @click="
                      vacantes = $vs.sortData($event, vacantes, 'fechaFin')
                    "
                  >
                    Vigencia
                  </vs-th>
                  <div class="divider">
                    <span class="border"></span>
                  </div>
                </vs-col>
                <vs-col class="item">
                  <vs-th
                    class="custom-th"
                    sort
                    @click="
                      vacantes = $vs.sortData($event, vacantes, 'periodoPago')
                    "
                  >
                    Modo de pago
                  </vs-th>
                  <div class="divider">
                    <span class="border"></span>
                  </div>
                </vs-col>
              </vs-row>
            </vs-tr>
          </div>
        </vs-col>
        <vs-col lg="8" sm="12" xs="12" class="space-top space">
          <div class="content-data datos text-start bg-gray">
            <div
              class="center"
              v-if="$vs.getSearch(vacantes, search).length < 1"
            >
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
                  <vs-avatar color="#b13cd2" class="space-top end-item">
                    <i class="bx bxs-buildings"></i>
                  </vs-avatar>
                </vs-col>
                <vs-col lg="9" sm="12" xs="12" class="space-top">
                  <div class="item-click" @click="Detalles(v)">
                    <p class="space-top">
                      <b>{{ v.nombre }}</b>
                    </p>
                    <vs-row class="space">
                      <vs-col w="3">
                        <small class="bg-primary">
                          {{ v.reclutador.nombreEmpresa }}
                        </small>
                      </vs-col>
                      <vs-col w="3">
                        <small class="bg-gray">
                          {{ v.reclutador.estadoRepublicaEmpresa.nombre }}
                        </small>
                      </vs-col>
                      <vs-col w="6">
                        <small class="bg-sec">
                          Vigencia: {{ v.fechaFin }}
                        </small>
                      </vs-col>
                    </vs-row>
                    <small class="bg-gray">{{ v.descripcion }}</small>
                    <vs-row justify="space-between" class="space-top space">
                      <vs-col lg="4" sm="3" xs="3">
                        <p class="bold">
                          {{ v.periodoPago }}
                        </p>
                      </vs-col>
                      <vs-col lg="4" sm="3" xs="3">
                        <p>
                          Mínimo:
                          <small class="badge-pri"> ${{ v.sueldoMin }}</small>
                        </p>
                      </vs-col>
                      <vs-col lg="4" sm="3" xs="3">
                        <p>
                          Máximo:
                          <small class="badge-war"> ${{ v.sueldoMax }}</small>
                        </p>
                      </vs-col>
                    </vs-row>
                  </div>
                </vs-col>
                <vs-col lg="1" sm="12" xs="12" class="space-top">
                  <vs-row justify="space-between" class="space-top">
                    <vs-col lg="12" sm="2" xs="2">
                      <ShareDialog :idVacante="v.id" />
                    </vs-col>
                    <vs-col lg="12" sm="2" xs="2">
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
        </vs-col>
      </vs-row>
    </div>

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

export default {
  name: "VacanciesList",
  data: () => ({
    active: false,
    favoritos: false,
    page: 1,
    max: 5,
    search: "",
    nombreEmpresaReclutador: "",
    estadoRepublicaEmpresaReclutador: "",
    vacante: {},
    vacantes: [
      {
        id: 1,
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
      {
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
      this.active = !this.active;
      this.vacante = vacante;
      this.estadoRepublicaEmpresaReclutador =
        vacante.reclutador.estadoRepublicaEmpresa.nombre;
      this.nombreEmpresaReclutador = vacante.reclutador.nombreEmpresa;
    },
    CloseDetails: function () {
      this.active = !this.active;
    },
  },
  components: { ShareDialog, DetailsDialog },
};
</script>