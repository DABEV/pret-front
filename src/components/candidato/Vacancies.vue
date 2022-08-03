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
                      vacantes = $vs.sortData($event, vacantes, 'fechaVigencia')
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
                    <i class="bx bxs-buildings"></i>
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
                        <small class="bg-sec">
                          Vigencia: {{ v.fechaVigencia }}</small
                        >
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
                          @click="activeCompartir = !activeCompartir"
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

    <vs-dialog prevent-close v-model="favoritos">
      <template #header>
        <h4>Añadir a favoritos</h4>
      </template>
    </vs-dialog>

    <vs-dialog
      width="450px"
      scroll
      class="text-center"
      v-model="activeCompartir"
    >
      <template #header>
        <vs-col>
          <h4>Compartir con tus contactos</h4>
          <vs-input
            class="space-top"
            v-model="searchCompartir"
            color="#1e88e5"
            block
            placeholder="Buscar contacto"
          >
            <template #icon>
              <em class="bx bx-search"></em>
            </template>
          </vs-input>
        </vs-col>
      </template>
      <div
        class="center"
        v-if="$vs.getSearch(contactos, searchCompartir).length < 1"
      >
        No se encontraron registros
      </div>
      <div
        :key="i"
        :data="c"
        v-for="(c, i) in $vs.getPage(
          $vs.getSearch(contactos, searchCompartir),
          pageCompartir,
          maxCompartir
        )"
        class="item"
      >
        <vs-row class="space">
          <vs-col lg="3" sm="3" xs="3" class="center-item space-top">
            <vs-avatar size="50">
              <img :src="c.foto" alt="" />
            </vs-avatar>
          </vs-col>
          <vs-col lg="7" sm="9" xs="9" class="space-top text-start">
            <div class="item-click" @click="ConfirmarCom(c)">
              <p class="bold">
                {{ c.nombre }} {{ c.apellidoPaterno }}
                {{ c.apellidoMaterno }}
              </p>
              <small>{{ c.correoElectronico }}</small>
            </div>
          </vs-col>
        </vs-row>
        <div class="divider">
          <span class="border"></span>
        </div>
      </div>
      <div class="pagination">
        <vs-pagination
          v-model="pageCompartir"
          :length="
            $vs.getLength(
              $vs.getSearch(contactos, searchCompartir),
              maxCompartir
            )
          "
        />
      </div>
    </vs-dialog>

    <vs-dialog width="450px" class="text-center" v-model="activeConfirmarCom">
      <template #header>
        <h4>Confirmación</h4>
      </template>
      <div class="text-gray">
        <p>
          Seguro de compartir a <b>{{ contacto.nombre }}</b
          >?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button
              dark
              transparent
              @click="activeConfirmarCom = !activeConfirmarCom"
              block
            >
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button success @click="Compartir()" block>
              Compartir
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "VacanciesList",
  data: () => ({
    active: false,
    activeConfirmarCom: false,
    activeCompartir: false,
    favoritos: false,
    page: 1,
    pageCompartir: 1,
    maxCompartir: 4,
    max: 5,
    search: "",
    searchCompartir: "",
    vacante: {},
    contacto: {},
    sortIcon1: true,
    sortIcon2: true,
    sortIcon3: true,
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
    Detalles: function (vacante) {
      this.vacante = vacante;
    },
    ConfirmarCom: function (contacto) {
      this.contacto = contacto;
      this.activeConfirmarCom = true;
    },
    Compartir: function () {
      this.activeCompartir = false;
      this.activeConfirmarCom = false;
    },
  },
};
</script>