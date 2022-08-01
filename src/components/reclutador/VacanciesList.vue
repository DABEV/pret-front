<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Vacantes publicadas</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <div class="header-table">
            <vs-row justify="space-between">
              <vs-col lg="1" sm="4" xs="4">
                <vs-tooltip>
                  <vs-button icon animation-type="rotate" color="#B13CD2">
                    <i class="bx bx-folder-plus"></i>
                    <template #animate>
                      <i class="bx bxs-folder-plus"></i>
                    </template>
                  </vs-button>
                  <template #tooltip> Añadir vacante </template>
                </vs-tooltip>
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
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th
                  sort
                  @click="vacantes = $vs.sortData($event, vacantes, 'nombre')"
                >
                  Nombre
                </vs-th>
                <vs-th
                  sort
                  @click="
                    vacantes = $vs.sortData($event, vacantes, 'modalidad')
                  "
                >
                  Modalidad
                </vs-th>
                <vs-th
                  sort
                  @click="vacantes = $vs.sortData($event, vacantes, 'tipo')"
                >
                  Tipo</vs-th
                >
                <vs-th
                  sort
                  @click="vacantes = $vs.sortData($event, vacantes, 'fechaInicio')"
                >
                  Publicación</vs-th
                >
                <vs-th
                  sort
                  @click="vacantes = $vs.sortData($event, vacantes, 'fechaFin')"
                >
                  Vigencia</vs-th
                >
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(
                  $vs.getSearch(vacantes, search),
                  page,
                  max
                )"
                :data="tr"
              >
                <vs-td>
                  {{ tr.nombre }}
                </vs-td>
                <vs-td>
                  {{ tr.modalidad }}
                </vs-td>
                <vs-td>
                  {{ tr.tipo }}
                </vs-td>
                <vs-td>
                  {{ tr.fechaInicio }}
                </vs-td>
                <vs-td>
                  {{ tr.fechaFin }}
                </vs-td>
                <template #expand>
                  <div class="divider">
                    <span class="border"></span>
                  </div>
                  <div class="space-top">
                    <vs-row>
                      <vs-col lg="1" sm="2" xs="2">
                        <vs-avatar color="#90BFF5">
                          <i class="bx bxs-briefcase"></i>
                        </vs-avatar>
                      </vs-col>
                      <vs-col lg="10" sm="9" xs="9">
                        <p>
                          <b>{{ tr.nombre }}</b>
                        </p>
                        <vs-row>
                          <vs-col w="5">
                            <p>
                              Sueldo min:
                              <span class="badge-pri"
                                >$ {{ tr.sueldoMin }}</span
                              >
                            </p>
                          </vs-col>
                          <vs-col w="5">
                            <p>
                              Sueldo max:
                              <span class="badge-sec"
                                >$ {{ tr.sueldoMax }}</span
                              >
                            </p>
                          </vs-col>
                        </vs-row>
                      </vs-col>
                      <vs-col lg="1">
                        <vs-tooltip>
                          <vs-button icon animation-type="rotate" warn>
                            <i class="bx bx-edit"></i>
                            <template #animate>
                              <i class="bx bxs-edit"></i>
                            </template>
                          </vs-button>
                          <template #tooltip> Editar vacante </template>
                        </vs-tooltip>
                      </vs-col>
                    </vs-row>
                  </div>
                </template>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength($vs.getSearch(vacantes, search), max)"
              />
            </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VacanciesList",
  data: () => ({
    active: false,
    page: 1,
    max: 5,
    search: "",
    vacantes: [
      {
        nombre: "Desarrollador Full-stack PHP",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa:{
            nombre:"Morelos"
          },
        },
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
          estadoRepublicaEmpresa:{
            nombre:"Morelos"
          },
        },
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
        nombre: "President of Sales",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa:{
            nombre:"Morelos"
          },
        },
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
        nombre: "Web Designer",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa:{
            nombre:"Morelos"
          },
        },
        tipo: "Medio tiempo",
        empresa: "Sony",
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
          estadoRepublicaEmpresa:{
            nombre:"Morelos"
          },
        },
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
          estadoRepublicaEmpresa:{
            nombre:"Morelos"
          },
        },
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
        nombre: "Marketing Coordinator",
        reclutador: {
          nombre: "Roberto",
          apellidoPaterno: "Miramontes",
          apellidoMaterno: "Ruiseñor",
          nombreEmpresa: "Sony",
          estadoRepublicaEmpresa:{
            nombre:"Morelos"
          },
        },
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
    ],
  }),
  methods: {
    Confirmar: function (contacto) {
      this.contacto = contacto;
    },
  },
};
</script>
