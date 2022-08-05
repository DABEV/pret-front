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
                  <div
                    class="item-click"
                    @click="Detalles(v), (active = !active)"
                  >
                    <p class="space-top">
                      <b>{{ v.nombre }}</b>
                    </p>
                    <vs-row class="space">
                      <vs-col w="3">
                        <small class="bg-primary">{{
                          v.reclutador.nombreEmpresa
                        }}</small>
                      </vs-col>
                      <vs-col w="3">
                        <small class="bg-gray">
                          {{
                            v.reclutador.estadoRepublicaEmpresa.nombre
                          }}</small
                        >
                      </vs-col>
                      <vs-col w="6">
                        <small class="bg-sec">
                          Vigencia: {{ v.fechaFin }}</small
                        >
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
          <p class="bold">Empresa: {{ nombreEmpresaReclutador }}</p>
          <small>Ubicado en: {{ estadoRepublicaEmpresaReclutador }}</small>
        </vs-col>
        <vs-col lg="2" sm="12" xs="12">
          <vs-button success @click="AbrirPostular(vacante)"
            >Postularse</vs-button
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

    <vs-dialog width="450px" prevent-close v-model="activePostular">
      <template #header>
        <h2>Postularse</h2>
      </template>
      <div class="margin-xy space space-top text-center">
        <small class="bold">Vacante: {{ postulacion.vacante.nombre }}</small>
        <br />
        <small class="bg-primary">Agregar CV</small>
        <vs-input
          class="space-top space"
          color="#1e88e5"
          type="file"
          accept=".pdf"
          @change="ChangePDF($event)"
          block
        >
          <template #icon>
            <i class="bx bxs-file-pdf"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button
              transparent
              dark
              @click="activePostular = !activePostular"
              block
            >
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button success block @click="EnviarPostular()">
              Enviar CV
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "VacanciesList",
  data: () => ({
    active: false,
    activeConfirmarCom: false,
    activeCompartir: false,
    favoritos: false,
    activePostular: false,
    page: 1,
    pageCompartir: 1,
    maxCompartir: 4,
    max: 5,
    search: "",
    searchCompartir: "",
    nombreEmpresaReclutador: "",
    estadoRepublicaEmpresaReclutador: "",
    pdf: null,
    vacante: {},
    contacto: {},
    postulacion: {
      id: 0,
      cv: "",
      vacante: {},
      candidato: {},
      estadoVacante: {
        id: 1,
      },
    },
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
      this.estadoRepublicaEmpresaReclutador =
        vacante.reclutador.estadoRepublicaEmpresa.nombre;
      this.nombreEmpresaReclutador = vacante.reclutador.nombreEmpresa;
    },
    ConfirmarCom: function (contacto) {
      this.contacto = contacto;
      this.activeConfirmarCom = true;
    },
    Compartir: function () {
      this.activeCompartir = false;
      this.activeConfirmarCom = false;
    },
    AbrirPostular: function (vacante) {
      this.postulacion.vacante = vacante;
      this.activePostular = !this.activePostular;
    },
    EnviarPostular: function () {
      const child = "cv/" + this.pdf.name;
      const refPdf = ref(storage, child);
      const fullPath = refPdf.fullPath;
      const metadata = { contentType: "pdf" };
      uploadBytes(refPdf, this.pdf, metadata).then(() => {
        getDownloadURL(ref(storage, fullPath))
          .then((url) => {
            this.postulacion.cv = url
            //petición de guardar
          })
          .catch((error) => {
            console.log(error);
          });
      });
      this.active = false;
      this.activePostular = !this.activePostular;
    },
    ChangePDF: function (e) {
      this.pdf = e.target.files[0];
    },
  },
};
</script>