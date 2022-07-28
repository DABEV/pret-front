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
                    <small class="bg-primary">{{ v.empresa }}</small>
                  </vs-col>
                  <vs-col w="3">
                    <small class="bg-gray">Ubicado en: {{ v.estado }}</small>
                  </vs-col>
                  <vs-col w="6">
                    <small class="bg-sec">
                      Vigencia: {{ v.fechaVigencia }}</small
                    >
                  </vs-col>
                </vs-row>
                <small>{{ v.descripcion }}</small>
              </div>
            </vs-col>
            <vs-col lg="1" sm="12" xs="12" class="space-top">
              <vs-button success class="space-top">Postularse</vs-button>
            </vs-col>
            <vs-col lg="1" sm="12" xs="12" class="space-top">
              <vs-row justify="space-between">
                <vs-col lg="12" sm="2" xs="2">
                  <vs-tooltip>
                    <vs-button
                      icon
                      animation-type="vertical"
                      color="#009ACB"
                      class="space-top"
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

    <vs-dialog prevent-close scroll width="550px" v-model="active">
      <template #header>
        <h4 class="space-top">{{ vacante.nombre }}</h4>
      </template>
      <vs-row justify="space-around">
        <vs-col lg="9" sm="10" xs="12">
          <p class="bold">Empresa: {{ vacante.empresa }}</p>
          <small>Ubicado en: {{ vacante.estado }}</small>
        </vs-col>
        <vs-col lg="2" sm="12" xs="12">
          <vs-button success>Postularse</vs-button>
        </vs-col>
      </vs-row>
      <div class="divider space-top">
        <span class="border"></span>
      </div>
      <vs-row justify="space-around" class="space-top">
        <vs-col lg="9" sm="10" xs="12">
          <small class="bg-primary">
            Vigencia: {{ vacante.fechaVigencia }}
          </small>
        </vs-col>
        <vs-col lg="2" sm="12" xs="12" class="text-end">
          <small class="badge-sec">{{ vacante.modalidad }}</small>
        </vs-col>
      </vs-row>
      <p class="center">{{ vacante.descripcion }}</p>
      <div class="divider space">
        <span class="border"></span>
      </div>
      <p class="text-center bold">Modo de pago: {{ vacante.modoPago }}</p>
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
  </div>
</template>
<script>
export default {
  name: "Favorites",
  data: () => ({
    active: false,
    deleteActive: false,
    search: "",
    page: 1,
    max: 4,
    vacante: {},
    vacantes: [
      {
        nombre: "Desarrollador Full-stack Java",
        reclutador: "Roberto Miramontes Ruiseñor",
        estado: "Morelos",
        tipo: "Medio tiempo",
        empresa: "Microsoft",
        modalidad: "Híbrido",
        modoPago: "Mensual",
        sueldoMin: 40000,
        sueldoMax: 80000,
        fechaInicio: "5/19/12",
        fechaVigencia: "7/19/12",
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
        descripcion:
          "Ut libero turpis, sollicitudin sed lectus ac, porta ornare erat. Integer nibh purus, mattis in felis eget, eleifend ultricies mi. Integer et fringilla sem, eu rhoncus nunc. ",
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
        fechaInicio: "5/19/12",
        fechaVigencia: "7/19/12",
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
        descripcion:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas elit at lectus aliquet fringilla. Quisque aliquet placerat eros, sed pretium nunc. Phasellus convallis scelerisque elit in commodo.",
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
        fechaInicio: "5/19/12",
        fechaVigencia: "7/19/12",
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
        fechaInicio: "5/19/12",
        fechaVigencia: "7/19/12",
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
        fechaInicio: "5/19/12",
        fechaVigencia: "7/19/12",
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
        descripcion:
          "Cras et massa dapibus ipsum faucibus varius. Pellentesque lorem nunc, venenatis sit amet augue vel, suscipit mattis orci. Curabitur rutrum libero sit amet viverra rhoncus.",
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
        fechaInicio: "6/19/12",
        fechaVigencia: "8/19/12",
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
        fechaInicio: "5/19/12",
        fechaVigencia: "7/19/12",
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
    ],
  }),
  methods: {
    Detalles: function (vacante) {
      this.vacante = vacante;
    },
  },
};
</script>
