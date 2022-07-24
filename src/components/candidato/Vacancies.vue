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
                    @click="vacantes = $vs.sortData($event, vacantes, 'fin')"
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
                      vacantes = $vs.sortData($event, vacantes, 'modoPago')
                    "
                  >
                    Modo de pago
                  </vs-th>
                  <div class="divider">
                    <span class="border"></span>
                  </div>
                </vs-col>
                <vs-col class="item">
                  <vs-th
                    class="custom-th"
                    sort
                    @click="vacantes = $vs.sortData($event, vacantes, 'estado')"
                  >
                    Estado
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
                    <template #text> {{ v.empresa }} </template>
                  </vs-avatar>
                </vs-col>
                <vs-col lg="9" sm="12" xs="12" class="space-top">
                  <div
                    class="item-click"
                    @click="Detalles(v), (active = !active)"
                  >
                    <p class="space-top">
                      <b>{{ v.nombre }}</b>
                    </p>
                    <vs-row class="space">
                      <vs-col w="3">
                        <small class="bg-primary">{{ v.empresa }}</small>
                      </vs-col>
                      <vs-col w="3">
                        <small class="bg-gray"> {{ v.estado }}</small>
                      </vs-col>
                      <vs-col w="6">
                        <small class="bg-sec"> Vigencia: {{ v.fin }}</small>
                      </vs-col>
                    </vs-row>
                    <small class="bg-gray">{{ v.descripcion }}</small>
                    <vs-row justify="space-between" class="space-top space">
                      <vs-col lg="4" sm="3" xs="3">
                        <p class="bold">
                          {{ v.modoPago }}
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
                      <vs-tooltip>
                        <vs-button
                          icon
                          animation-type="vertical"
                          color="#009ACB"
                        >
                          <i class="bx bx-share-alt"></i>
                          <template #animate>
                            <i class="bx bxs-share-alt"></i>
                          </template>
                        </vs-button>
                        <template #tooltip> Compartir </template>
                      </vs-tooltip>
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

    <vs-dialog prevent-close scroll width="550px" v-model="active">
      <template #header>
        <h4>{{ vacante.nombre }}</h4>
      </template>
    </vs-dialog>

    <vs-dialog prevent-close v-model="favoritos">
      <template #header>
        <h4>Añadir a favoritos</h4>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "VacanciesList",
  data: () => ({
    active: false,
    favoritos: false,
    page: 1,
    max: 5,
    search: "",
    vacante: {},
    sortIcon1: true,
    sortIcon2: true,
    sortIcon3: true,
    vacantes: [
      {
        nombre: "Desarrollador Full-stack PHP",
        reclutador: "Roberto Miramontes Ruiseñor",
        estado: "Morelos",
        tipo: "Medio tiempo",
        empresa: "Microsoft",
        modalidad: "Híbrido",
        modoPago: "Mensual",
        sueldoMin: 40000,
        sueldoMax: 80000,
        inicio: "5/19/12",
        fin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Desarrollador Full-stack PHP",
        reclutador: "Roberto Miramontes Ruiseñor",
        estado: "Morelos",
        tipo: "Medio tiempo",
        empresa: "Sony",
        modalidad: "Híbrido",
        modoPago: "Quincenal",
        sueldoMin: 20000,
        sueldoMax: 50000,
        inicio: "5/19/12",
        fin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "President of Sales",
        reclutador: "Roberto Miramontes Ruiseñor",
        estado: "Morelos",
        tipo: "Medio tiempo",
        empresa: "Oracle",
        modalidad: "Híbrido",
        modoPago: "Quincenal",
        sueldoMin: 50000,
        sueldoMax: 80000,
        inicio: "5/19/12",
        fin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Web Designer",
        reclutador: "Roberto Miramontes Ruiseñor",
        estado: "Morelos",
        tipo: "Medio tiempo",
        empresa: "Sony",
        modalidad: "Híbrido",
        modoPago: "Semanal",
        sueldoMin: 20000,
        sueldoMax: 50000,
        inicio: "5/19/12",
        fin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Desarrollador Full-stack PHP",
        reclutador: "Roberto Miramontes Ruiseñor",
        estado: "Morelos",
        tipo: "Medio tiempo",
        empresa: "Sony",
        modalidad: "Híbrido",
        modoPago: "Quincenal",
        sueldoMin: 20000,
        sueldoMax: 30000,
        inicio: "5/19/12",
        fin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Analista de datos",
        reclutador: "Roberto Miramontes Ruiseñor",
        estado: "Nayarit",
        tipo: "Tiempo completo",
        empresa: "Rappi",
        modalidad: "Híbrido",
        modoPago: "Mensual",
        sueldoMin: 200050,
        sueldoMax: 500000,
        inicio: "5/19/12",
        fin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
      {
        nombre: "Marketing Coordinator",
        reclutador: "Roberto Miramontes Ruiseñor",
        estado: "Morelos",
        tipo: "Medio tiempo",
        empresa: "Microsoft",
        modalidad: "Híbrido",
        modoPago: "Quincenal",
        sueldoMin: 20000,
        sueldoMax: 50000,
        inicio: "5/19/12",
        fin: "7/19/12",
        descripcion:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
      },
    ],
  }),
  methods: {
    Detalles: function (vacante) {
      this.vacante = vacante;
    },
  },
};
</script>