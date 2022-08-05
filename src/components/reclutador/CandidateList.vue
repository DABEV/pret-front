<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Lista de candidatos</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="space-between">
          <vs-col lg="5" sm="12" xs="12">
            Candidatos postulados en la vacante:
            <strong>"{{ postulaciones[0].vacante.nombre }}"</strong>
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
        <div
          class="center"
          v-if="$vs.getSearch(postulaciones, search).length < 1"
        >
          No se encontraron registros
        </div>
        <div
          :key="i"
          :data="c"
          v-for="(c, i) in $vs.getPage(
            $vs.getSearch(postulaciones, search),
            page,
            max
          )"
          class="item"
        >
          <vs-row class="space">
            <vs-col lg="1" sm="3" xs="3" class="space-top center-item">
              <vs-tooltip
                v-if="
                  c.estadoVacante.nombre != 'Rechazado' &&
                  c.estadoVacante.nombre != 'Contratado'
                "
              >
                <vs-button
                  icon
                  animation-type="rotate"
                  danger
                  @click="AbrirEliminar(c.candidato)"
                >
                  <i class="bx bx-trash"></i>
                  <template #animate>
                    <i class="bx bxs-trash"></i>
                  </template>
                </vs-button>
                <template #tooltip> Rechazar candidato </template>
              </vs-tooltip>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="center-item space-top">
              <vs-avatar size="50">
                <img :src="c.candidato.foto" alt="" />
              </vs-avatar>
            </vs-col>
            <vs-col lg="8" sm="9" xs="9" class="space-top">
              <div class="item-click" @click="AbrirDetalles(c.candidato)">
                <vs-row>
                  <vs-col lg="6" sm="9" xs="9">
                    <p class="bold">
                      {{ c.candidato.nombre }}
                      {{ c.candidato.apellidoPaterno }}
                      {{ c.candidato.apellidoMaterno }}
                    </p>
                    <small>{{ c.candidato.tituloCurricular }}</small>
                  </vs-col>
                  <vs-col lg="6" sm="9" xs="9" class="space-top text-center">
                    <span
                      v-if="c.estadoVacante.nombre == 'Idóneo'"
                      class="badge-suc"
                    >
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span
                      v-else-if="c.estadoVacante.nombre == 'Postulado'"
                      class="badge-def"
                    >
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span
                      v-else-if="c.estadoVacante.nombre == 'CV visto'"
                      class="badge-war"
                    >
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span
                      v-else-if="c.estadoVacante.nombre == 'Rechazado'"
                      class="badge-dan"
                    >
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span
                      v-else-if="c.estadoVacante.nombre == 'Entrevista'"
                      class="badge-sec"
                    >
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span
                      v-else-if="c.estadoVacante.nombre == 'Contratado'"
                      class="badge-pri"
                    >
                      {{ c.estadoVacante.nombre }}
                    </span>
                    <span v-else class="badge-def"
                      >{{ c.estadoVacante.nombre }}
                    </span>
                  </vs-col>
                </vs-row>
              </div>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="space-top center-item">
              <vs-tooltip>
                <vs-button icon animation-type="rotate" color="#88BAF3">
                  <i class="bx bx-download"></i>
                  <template #animate>
                    <i class="bx bx-import"></i>
                  </template>
                </vs-button>
                <template #tooltip> Descargar CV </template>
              </vs-tooltip>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="space-top center-item">
              <vs-tooltip v-if="c.estadoVacante.nombre == 'Postulado'">
                <vs-button
                  @click="ActualizarEstadoVacante(c, 2, 'CV visto')"
                  icon
                  animation-type="vertical"
                  warn
                >
                  <i class="bx bx-show"></i>
                  <template #animate><i class="bx bxs-show"></i></template>
                </vs-button>
                <template #tooltip> Marcar CV visto </template>
              </vs-tooltip>
              <vs-tooltip v-else-if="c.estadoVacante.nombre == 'CV visto'">
                <vs-button
                  color="#b13cd2"
                  @click="ActualizarEstadoVacante(c, 3, 'Entrevista')"
                  icon
                  animation-type="rotate"
                >
                  <i class="bx bx-file-find"></i>
                  <template #animate>
                    <i class="bx bxs-file-find"></i>
                  </template>
                </vs-button>
                <template #tooltip> Marcar Entrevista </template>
              </vs-tooltip>
              <vs-tooltip v-else-if="c.estadoVacante.nombre == 'Entrevista'">
                <vs-button
                  @click="ActualizarEstadoVacante(c, 4, 'Idóneo')"
                  icon
                  animation-type="rotate"
                  color="#2ECC71"
                >
                  <i class="bx bx-user-check"></i>
                  <template #animate>
                    <i class="bx bxs-user-check"></i>
                  </template>
                </vs-button>
                <template #tooltip> Marcar Idóneo </template>
              </vs-tooltip>
              <vs-tooltip v-else-if="c.estadoVacante.nombre == 'Idóneo'">
                <vs-button
                  icon
                  animation-type="rotate"
                  color="#1e88e5"
                  @click="AbrirContratar(c)"
                >
                  <i class="bx bx-briefcase"></i>
                  <template #animate>
                    <i class="bx bxs-briefcase"></i>
                  </template>
                </vs-button>
                <template #tooltip> Contratar </template>
              </vs-tooltip>
            </vs-col>
          </vs-row>
          <div class="divider">
            <span class="border"></span>
          </div>
        </div>
        <div class="pagination">
          <vs-pagination
            v-model="page"
            :length="$vs.getLength($vs.getSearch(postulaciones, search), max)"
          />
        </div>
      </div>
    </div>

    <vs-dialog width="450px" class="text-center" v-model="active">
      <template #header>
        <h4>Marcar como {{ sigNivel }}</h4>
      </template>
      <div class="text-gray">
        <p>
          ¿Seguro que desea añadir a <strong>{{ candidato.nombre }}</strong> a
          la lista de candidatos <b>{{ sigNivel }} </b>?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button success @click="active = !active" block>
              Añadir
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button transparent dark @click="active = !active" block>
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog width="450px" class="text-center" v-model="activeContratar">
      <template #header>
        <h4 class="bg-primary">Contratación</h4>
      </template>
      <div class="bg-gray">
        <p>
          ¿Seguro que desea <b>Contratar</b> a
          <strong>{{ candidato.nombre }}</strong>
          para este puesto?
        </p>
        <small>El resto de postulantes se marcarán como rechazados</small>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button
              primary
              @click="activeContratar = !activeContratar"
              block
            >
              Contratar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button
              transparent
              dark
              @click="activeContratar = !activeContratar"
              block
            >
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog width="450px" class="text-center" v-model="activeDelete">
      <template #header>
        <h4>Rechazar candidato</h4>
      </template>
      <div class="text-gray">
        <p>
          ¿Seguro de rechazar a <b>{{ candidato.nombre }}</b> para esta vacante?
        </p>
        <small>No podrás deshacer esta acción</small>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button danger @click="activeDelete = !activeDelete" block>
              Quitar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button
              transparent
              dark
              @click="activeDelete = !activeDelete"
              block
            >
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog class="text-center" v-model="activeDetalles">
      <vs-row>
        <vs-col lg="4">
          <div class="text-item bg-primary">
            Teléfono
            <small class="bold bg-gray">{{ candidato.telefono }}</small>
          </div>
        </vs-col>
        <vs-col lg="4" class="center-item">
          <vs-avatar circle size="100" class="avatar-top">
            <img :src="candidato.foto" alt="" />
          </vs-avatar>
        </vs-col>
        <vs-col lg="4">
          <div class="text-item bg-primary">
            Estado
            <small class="bold bg-gray">
              {{ candidato.estadoRepublica.nombre }}
            </small>
          </div>
        </vs-col>
      </vs-row>
      <h4 class="space-top">
        {{ candidato.nombre }} {{ candidato.apellidoMaterno }}
        {{ candidato.apellidoPaterno }}
      </h4>
      <small class="bg-gray">{{ candidato.correoElectronico }}</small>
      <div class="divider space space-top">
        <span class="border"></span>
      </div>
      <vs-row justify="space-around" class="space">
        <vs-col w="1" class="center-item">
          <vs-avatar color="#b13cd2" size="30">
            <i class="bx bxs-graduation"></i>
          </vs-avatar>
        </vs-col>
        <vs-col w="10" class="center-item text-start">
          <small>Titulo: {{ candidato.tituloCurricular }}</small>
        </vs-col>
      </vs-row>
      <div class="divider space space-top">
        <span class="border"></span>
      </div>
      <vs-row justify="center">
        <vs-col lg="4" sm="6" xs="6">
          <vs-button block color="#1E88E5"> Ver perfil </vs-button>
        </vs-col>
      </vs-row>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "CandidatesList",
  data: () => ({
    active: false,
    activeDelete: false,
    activeDetalles: false,
    activeContratar: false,
    page: 1,
    max: 5,
    search: "",
    sigNivel: "",
    estadoVacante: {
      id: 0,
    },
    candidato: {
      nombre: "",
      estadoRepublica: {},
    },
    postulacion: {
      candidato: {},
    },
    postulaciones: [
      {
        cv: "",
        candidato: {
          nombre: "Michelle",
          apellidoPaterno: "Rivera",
          apellidoMaterno: "Solaz",
          correoElectronico: "michelle.rivera@example.com",
          habilitado: true,
          telefono: "(225) 555-0118",
          fechaNacimiento: "9/4/12",
          estadoRepublica: {
            nombre: "Morelos",
          },
          tituloCurricular: "Administradora de base de datos (DBA)",
          descripcionPerfil:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aenean praesent non donec adipiscing ullamcorper. Tincidunt id suspendisse id sit. Nisi sed diam est.",
          foto: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
        },
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
        candidato: {
          nombre: "Robert",
          apellidoMaterno: "Warren",
          apellidoPaterno: "Hawkins",
          correoElectronico: "robert@example.com",
          telefono: "(217) 555-0113",
          estadoRepublica: {
            nombre: "Querétaro",
          },
          tituloCurricular: "Administrador de base de datos (DBA)",
          fechaNacimiento: "9/4/12",
          foto: "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80",
        },
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
        candidato: {
          nombre: "Alexander",
          apellidoMaterno: "Edwards",
          apellidoPaterno: "Wade",
          correoElectronico: "alexander@example.com",
          telefono: "(308) 555-0121",
          estadoRepublica: {
            nombre: "Durango",
          },
          tituloCurricular: "Administrador de base de datos (DBA)",
          fechaNacimiento: "9/4/12",
          foto: "https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=558&q=80",
        },
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
        candidato: {
          nombre: "Leslie",
          apellidoMaterno: "Brooklyn",
          apellidoPaterno: "Williamson",
          correoElectronico: "leslie@example.com",
          telefono: "(302) 555-0107",
          estadoRepublica: {
            nombre: "Tamaulipas",
          },
          tituloCurricular: "Administrador de base de datos (DBA)",
          fechaNacimiento: "9/4/12",
          foto: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        },
        estadoVacante: { nombre: "Entrevista" },
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
        candidato: {
          nombre: "Ralph",
          apellidoMaterno: "Williamson",
          apellidoPaterno: "Fox",
          correoElectronico: "ralph@example.com",
          telefono: "(702) 555-0122",
          estadoRepublica: {
            nombre: "Oaxaca",
          },
          tituloCurricular: "Administrador de base de datos (DBA)",
          fechaNacimiento: "9/4/12",
          foto: "https://images.unsplash.com/photo-1483995564125-85915c11dcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=641&q=80",
        },
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
        candidato: {
          nombre: "Esther",
          apellidoMaterno: "Howard",
          apellidoPaterno: "Simmons",
          correoElectronico: "esther@example.com",
          telefono: "(907) 555-0101",
          estadoRepublica: {
            nombre: "Morelos",
          },
          tituloCurricular: "Administrador de base de datos (DBA)",
          fechaNacimiento: "9/4/12",
          foto: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=562&q=80",
        },
        estadoVacante: { nombre: "Rechazado" },
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
        candidato: {
          nombre: "Esther",
          apellidoMaterno: "Howard",
          apellidoPaterno: "Simmons",
          correoElectronico: "esther@example.com",
          telefono: "(907) 555-0101",
          estadoRepublica: {
            nombre: "Morelos",
          },
          tituloCurricular: "Administrador de base de datos (DBA)",
          fechaNacimiento: "9/4/12",
          foto: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=562&q=80",
        },
        estadoVacante: { nombre: "Contratado" },
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
    ],
  }),
  methods: {
    ActualizarEstadoVacante: function (postulacion, estadoId, estadoNombre) {
      this.postulacion = postulacion;
      this.estadoVacante.id = estadoId;
      this.sigNivel = estadoNombre;
      this.candidato = postulacion.candidato;
      this.active = !this.active;
    },
    AbrirEliminar: function (candidato) {
      this.candidato = candidato;
      this.activeDelete = true;
    },
    AbrirDetalles: function (candidato) {
      this.candidato = candidato;
      this.activeDetalles = true;
    },
    AbrirContratar: function (postulacion) {
      this.candidato = postulacion.candidato;
      this.activeContratar = true;
    },
  },
};
</script>
