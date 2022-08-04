<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Postulaciones realizadas</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <div class="header-table">
            <vs-row justify="flex-end">
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
                <vs-th> Puesto </vs-th>
                <vs-th> Modalidad </vs-th>
                <vs-th> Tipo</vs-th>
                <vs-th> Edo. Rep</vs-th>
                <vs-th> Estatus</vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(
                  $vs.getSearch(postulaciones, search),
                  page,
                  max
                )"
                class="item-click"
                @click="Detalles(tr)"
                :data="tr"
              >
                <vs-td>
                  {{ tr.vacante.nombre }}
                </vs-td>
                <vs-td>
                  {{ tr.vacante.modalidad }}
                </vs-td>
                <vs-td>
                  {{ tr.vacante.tipo }}
                </vs-td>
                <vs-td>
                  {{ tr.vacante.reclutador.estadoRepublicaEmpresa.nombre }}
                </vs-td>
                <vs-td class="text-center">
                  <span
                    v-if="tr.estadoVacante.nombre == 'Idóneo'"
                    class="badge-suc"
                  >
                    {{ tr.estadoVacante.nombre }}
                  </span>
                  <span
                    v-else-if="tr.estadoVacante.nombre == 'Postulado'"
                    class="badge-pri"
                  >
                    {{ tr.estadoVacante.nombre }}
                  </span>
                  <span
                    v-else-if="tr.estadoVacante.nombre == 'CV visto'"
                    class="badge-war"
                  >
                    {{ tr.estadoVacante.nombre }}
                  </span>
                  <span
                    v-else-if="tr.estadoVacante.nombre == 'Cancelado'"
                    class="badge-dan"
                  >
                    {{ tr.estadoVacante.nombre }}
                  </span>
                  <span v-else class="badge-def">{{
                    tr.estadoVacante.nombre
                  }}</span>
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="
                  $vs.getLength($vs.getSearch(postulaciones, search), max)
                "
              />
            </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
      </div>
    </div>

    <vs-dialog scroll width="550px" v-model="active">
      <template #header>
        <h4 class="space-top">{{ vacante.nombre }}</h4>
      </template>
      <vs-row justify="space-around">
        <vs-col lg="5" sm="10" xs="12" class="text-center">
          <p class="bold">Empresa: {{ reclutador.nombreEmpresa }}</p>
          <small>Ubicado en: {{ estadoRepublicaEmpresaReclutador }}</small>
        </vs-col>
        <vs-col lg="5" sm="12" xs="12" class="text-center">
          <p class="bold">Reclutador</p>
          <small>
            {{ reclutador.nombre }} {{ reclutador.apellidoPaterno }}
            {{ reclutador.apellidoMaterno }}</small
          >
        </vs-col>
      </vs-row>
      <div class="divider space-top">
        <span class="border"></span>
      </div>
      <vs-row justify="space-around" class="space-top">
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
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    active: false,
    page: 1,
    max: 7,
    search: "",
    postulaciones: [
      {
        cv: "",
        candidato: {},
        estadoVacante: { nombre: "Postulado" },
        vacante: {
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
          modalidad: "Remoto",
          periodoPago: "Quincenal",
          sueldoMin: 10000,
          sueldoMax: 30000,
          fechaInicio: "5/19/12",
          fechaFin: "8/19/12",
          descripcion:
            "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
        },
      },
      {
        cv: "",
        candidato: {},
        estadoVacante: { nombre: "Cancelado" },
        vacante: {
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
      },
      {
        cv: "",
        candidato: {},
        estadoVacante: { nombre: "CV visto" },
        vacante: {
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
      },
      {
        cv: "",
        candidato: {},
        estadoVacante: { nombre: "Idóneo" },
        vacante: {
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
      },
      {
        cv: "",
        candidato: {},
        estadoVacante: { nombre: "Postulado" },
        vacante: {
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
      },
      {
        cv: "",
        candidato: {},
        estadoVacante: { nombre: "CV visto" },
        vacante: {
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
      },
      {
        cv: "",
        candidato: {},
        estadoVacante: { nombre: "Postulado" },
        vacante: {
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
      },
    ],
    vacante: {},
    reclutador: {},
    nombreEmpresaReclutador: "",
    estadoRepublicaEmpresaReclutador: "",
  }),
  methods: {
    Detalles: function (postulacion) {
      this.active = true;
      this.vacante = postulacion.vacante;
      this.estadoRepublicaEmpresaReclutador =
        postulacion.vacante.reclutador.estadoRepublicaEmpresa.nombre;
      this.reclutador = postulacion.vacante.reclutador;
    },
  },
};
</script>
