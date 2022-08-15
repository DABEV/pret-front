<template>
  <div class="center">
    <div class="space space-top content-card">
      <vs-row justify="space-between">
        <vs-col lg="7" sm="12" xs="12" class="text-center">
          <div>
            <div class="content-data">
              <vs-row class="margin-top-avatar">
                <vs-col lg="3" sm="12" xs="12" class="space-top">
                  <p class="text-item bg-primary">
                    Teléfono
                    <small class="bold bg-gray">{{ candidato.telefono }}</small>
                  </p>
                </vs-col>
                <vs-col lg="6" sm="12" xs="12" class="center-item">
                  <vs-avatar
                    v-if="candidato.foto != null"
                    circle
                    size="150"
                    class="avatar-top-card"
                  >
                    <img :src="candidato.foto" alt="" />
                  </vs-avatar>
                  <vs-avatar
                    v-else
                    circle
                    size="150"
                    primary
                    class="avatar-top-card"
                  >
                    <i class="bx bx-user-pin avatar-lg-icon"></i>
                  </vs-avatar>
                </vs-col>
                <vs-col lg="3" sm="12" xs="12" class="space-top">
                  <p class="text-item bg-primary">
                    Estado
                    <small class="bold bg-gray">
                      {{ candidato.estadoRepublica.nombre }}
                    </small>
                  </p>
                </vs-col>
              </vs-row>
              <h3 class="space-top">
                {{ candidato.nombre }} {{ candidato.apellidoMaterno }}
                {{ candidato.apellidoPaterno }}
              </h3>
              <p class="bg-gray">{{ candidato.correoElectronico }}</p>
              <div class="center-item">
                <div class="content-card">
                  <div class="divider space space-top">
                    <span class="border"></span>
                  </div>
                  <vs-row
                    justify="space-around"
                    class="space"
                    v-if="candidato.tituloCurricular != null"
                  >
                    <vs-col lg="1" sm="2" xs="2" class="center-item">
                      <vs-avatar color="#b13cd2" size="30">
                        <i class="bx bxs-graduation"></i>
                      </vs-avatar>
                    </vs-col>
                    <vs-col
                      lg="10"
                      sm="9"
                      xs="9"
                      class="center-item text-start"
                    >
                      <p>Titulo: {{ candidato.tituloCurricular }}</p>
                    </vs-col>
                  </vs-row>
                  <div
                    class="divider space space-top"
                    v-if="candidato.tituloCurricular != null"
                  >
                    <span class="border"></span>
                  </div>
                </div>
              </div>
              <div class="center-item">
                <div class="content-card">
                  <vs-row justify="space-around" class="space">
                    <vs-col lg="1" sm="2" xs="2" class="center-item">
                      <vs-avatar color="#1E88E5" size="30">
                        <i class="bx bxs-cake"></i>
                      </vs-avatar>
                    </vs-col>
                    <vs-col
                      lg="10"
                      sm="9"
                      xs="9"
                      class="center-item text-start"
                    >
                      <p>
                        Fecha de nacimiento: {{ candidato.fechaNacimiento }}
                      </p>
                    </vs-col>
                  </vs-row>
                  <div class="divider space space-top">
                    <span class="border"></span>
                  </div>
                  <h4>Perfil profesional</h4>
                  <div class="space bg-gray">
                    <p>{{ candidato.descripcionPerfil }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-col lg="4" sm="12" xs="12" class="margin-top-avatar">
          <div
            v-if="candidato.conocimientosHabilidades.habilidades.length != 0"
          >
            <h2 class="space-top">Conocimientos</h2>
            <div class="space-top content-data space datos text-start bg-gray">
              <div
                class="center"
                v-if="
                  candidato.conocimientosHabilidades.conocimientos.length < 1
                "
              >
                No se encontraron registros
              </div>
              <div
                :key="i"
                v-for="(hab, i) in $vs.getPage(
                  candidato.conocimientosHabilidades.conocimientos,
                  page3
                )"
                :data="hab"
                class="item"
              >
                <vs-row class="space">
                  <vs-col lg="2" sm="3" xs="3" class="text-center space-top">
                    <i class="bx bx-book-open bg-primary"></i>
                  </vs-col>
                  <vs-col lg="10" sm="9" xs="9" class="space-top">
                    <p>{{ hab }}</p>
                  </vs-col>
                </vs-row>
                <div class="divider">
                  <span class="border"></span>
                </div>
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
    <div class="space space-top long" v-if="candidato.estudios.length != 0">
      <h2 class="text-center">Estudios</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> Grado académico </vs-th>
                <vs-th> Universidad </vs-th>
                <vs-th> Carrera </vs-th>
                <vs-th> Fecha inicio </vs-th>
                <vs-th>Fecha fin </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(c, i) in $vs.getPage(candidato.estudios, page2)"
                :data="c"
              >
                <vs-td>
                  {{ c.gradoAcademico }}
                </vs-td>
                <vs-td>
                  {{ c.universidad }}
                </vs-td>
                <vs-td>
                  {{ c.carrera }}
                </vs-td>
                <vs-td>
                  {{ c.fechaInicio }}
                </vs-td>
                <vs-td>
                  {{ c.fechaFin }}
                </vs-td>
              </vs-tr>
            </template>
            <template #footer> </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
      </div>
    </div>
    <div
      class="space space-top content-card"
      v-if="candidato.experienciasLaborales.length != 0"
    >
      <h2 class="text-center">Experiencia laboral</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> Puesto </vs-th>
                <vs-th> Tiempo </vs-th>
                <vs-th> Actividades que realizó </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(
                  candidato.experienciasLaborales,
                  page
                )"
                :data="tr"
              >
                <vs-td>
                  {{ tr.puesto }}
                </vs-td>
                <vs-td>
                  {{ tr.fechaInicio }}
                </vs-td>
                <vs-td>
                  {{ tr.actividadesRealizadas }}
                </vs-td>
              </vs-tr>
            </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
      </div>
    </div>
    <div class="space space-top content-card">
      <vs-row justify="space-between">
        <vs-col lg="5" sm="12" xs="12" v-if="candidato.idiomas.length != 0">
          <h2>Idiomas de dominio</h2>
          <div class="space-top content-data space datos text-start bg-gray">
            <div
              :key="i"
              v-for="(idioma, i) in candidato.idiomas"
              :data="idioma"
              class="item"
            >
              <vs-row class="space">
                <vs-col lg="1" sm="2" xs="2" class="text-center space-top">
                  <i class="bx bx-world bg-primary"></i>
                </vs-col>
                <vs-col lg="8" sm="6" xs="6" class="space-top">
                  <p>{{ idioma.nombre }}</p>
                </vs-col>
                <vs-col lg="3" sm="4" xs="4" class="text-center space-top">
                  <span class="badge-sec">{{ idioma.nivel }}</span>
                </vs-col>
              </vs-row>
              <div class="divider">
                <span class="border"></span>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-col
          lg="6"
          sm="12"
          xs="12"
          v-if="candidato.conocimientosHabilidades.habilidades.length != 0"
        >
          <h2>Habilidades</h2>
          <div class="space-top content-data space datos text-start bg-gray">
            <div
              :key="i"
              v-for="(hab, i) in candidato.conocimientosHabilidades.habilidades"
              :data="hab"
              class="item"
            >
              <vs-row class="space">
                <vs-col lg="1" sm="2" xs="2" class="text-center space-top">
                  <i class="bx bx-book-open bg-primary"></i>
                </vs-col>
                <vs-col lg="11" sm="10" xs="10" class="space-top">
                  <p>{{ hab }}</p>
                </vs-col>
              </vs-row>
              <div class="divider">
                <span class="border"></span>
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
    <div
      class="space space-top content-card"
      v-if="candidato.certificaciones.length != 0"
    >
      <h2 class="text-center">Certificaciones</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> Nombre </vs-th>
                <vs-th> Empresa </vs-th>
                <vs-th> Obtención </vs-th>
                <vs-th> Caducidad </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(candidato.certificaciones, page2)"
                :data="tr"
              >
                <vs-td>
                  {{ tr.nombre }}
                </vs-td>
                <vs-td>
                  {{ tr.empresa }}
                </vs-td>
                <vs-td>
                  {{ tr.fechaObtencion }}
                </vs-td>
                <vs-td>
                  {{ tr.fechaCaducidad }}
                </vs-td>
              </vs-tr>
            </template>
            <template #footer> </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
      </div>
    </div>
    <div class="space space-top long" v-if="candidato.cursos.length != 0">
      <h2 class="text-center">Cursos realizados</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> Nombre </vs-th>
                <vs-th> Fecha </vs-th>
                <vs-th> Empresa </vs-th>
                <vs-th> Numero de horas </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(candidato.cursos, page2)"
                :data="tr"
              >
                <vs-td>
                  {{ tr.nombre }}
                </vs-td>
                <vs-td>
                  {{ tr.fechaObtencion }}
                </vs-td>
                <vs-td>
                  {{ tr.empresa }}
                </vs-td>
                <vs-td>
                  {{ tr.numeroHoras }}
                </vs-td>
              </vs-tr>
            </template>
            <template #footer> </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CandidateService from "../../service/Candidate/CandidateService";
export default {
  name: "Profile",
  data: () => ({
    active: 0,
    page: 1,
    page2: 1,
    page3: 1,
    max: 5,
    max2: 3,
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
        id: 0,
      },
      tituloCurricular: "Administradora de base de datos (DBA)",
      descripcionPerfil:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aenean praesent non donec adipiscing ullamcorper. Tincidunt id suspendisse id sit. Nisi sed diam est.",
      foto: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      conocimientosHabilidades: {
        conocimientos: ["Laravel", "PHP", "Java", "MySQL"],
        habilidades: ["Analista", "Trabajo en Equipo"],
      },
      cursos: [
        {
          nombre: "Fundamento de bases de datos",
          fechaObtencion: "12/4/17",
          empresa: "Platzi",
          numeroHoras: "12",
        },
        {
          nombre: "Fundamento de bases de datos",
          fechaObtencion: "12/4/17",
          empresa: "Platzi",
          numeroHoras: "12",
        },
        {
          nombre: "Fundamento de bases de datos",
          fechaObtencion: "12/4/17",
          empresa: "Platzi",
          numeroHoras: "12",
        },
        {
          nombre: "Fundamento de bases de datos",
          fechaObtencion: "12/4/17",
          empresa: "Platzi",
          numeroHoras: "12",
        },
      ],
      experienciasLaborales: [
        {
          puesto: "Analista de datos",
          fechaInicio: "2 años",
          fechaFin: "",
          actividadesRealizadas: "Análisis y manejo de Bigdata",
        },
        {
          puesto: "Administrador de BD",
          fechaInicio: "11 meses",
          fechaFin: "",
          actividadesRealizadas: "Mantenimiento de BD",
        },
        {
          puesto: "Gerente de BD en la nube",
          fechaInicio: "1 año",
          fechaFin: "",
          actividadesRealizadas: "Monitoreo de bases en la nube",
        },
        {
          puesto: "Diseñador de BD relacionales",
          fechaInicio: "6 meses",
          fechaFin: "",
          actividadesRealizadas: "Maquetado y análisis de relaciones",
        },
        {
          puesto: "Analista de datos",
          fechaInicio: "2 años",
          fechaFin: "",
          actividadesRealizadas: "Análisis y manejo de Bigdata",
        },
        {
          puesto: "Analista de datos",
          fechaInicio: "2 años",
          actividadesRealizadas: "Análisis y manejo de Bigdata",
        },
        {
          puesto: "Analista de datos",
          fechaInicio: "2 años",
          actividadesRealizadas: "Análisis y manejo de Bigdata",
        },
      ],
      estudios: [
        {
          universidad: "Universidad del estado de Morelos",
          carrera: "Ingeniería en Manejo de Datos Computacionales",
          gradoAcademico: "Ingeniería en TI y Data Cience",
          fechaInicio: "2015",
          fechaFin: "2020",
        },
        {
          universidad: "Universidad Tecnológica Emiliano Zapata",
          carrera: "Ingeniería en Tecnologías de la comunicación",
          gradoAcademico: "Ingeniería en TI y Data Cience",
          fechaInicio: "2019",
          fechaFin: "2024",
        },
        {
          universidad: "Universidad del estado de Morelos",
          carrera: "Ingeniería en Manejo de Datos Computacionales",
          gradoAcademico: "Ingeniería en TI y Data Cience",
          fechaInicio: "2015",
          fechaFin: "2020",
        },
        {
          universidad: "xxxxxxxxxxxxxxxx",
          carrera: "Ingeniería en Manejo de Datos Computacionales",
          gradoAcademico: "Ingeniería en TI y Data Cience",
          fechaInicio: "2015",
          fechaFin: "2020",
        },
      ],
      idiomas: [
        {
          nombre: "Español",
          nivel: "Avanzado",
        },
        {
          nombre: "Inglés (USA)",
          nivel: "Medio",
        },
        {
          nombre: "Portugués",
          nivel: "Básico",
        },
        {
          nombre: "Alemán",
          nivel: "Básico",
        },
      ],
      certificaciones: [
        {
          nombre: "Analista de datos",
          empresa: "Microsoft",
          fechaObtencion: "8/15/17",
          fechaCaducidad: "8/15/20",
        },
        {
          nombre: "Administrador de BD",
          empresa: "Oracle",
          fechaObtencion: "8/21/17",
          fechaCaducidad: "8/21/20",
        },
        {
          nombre: "Industria 2.0",
          empresa: "Cisco",
          fechaObtencion: "8/15/17",
          fechaCaducidad: "8/15/20",
        },
        {
          nombre: "Manejo de AWS",
          empresa: "Amazon Web Services",
          fechaObtencion: "6/19/14",
          fechaCaducidad: "6/19/20",
        },
      ],
    },
  }),
  methods: {
    IrEditar: function () {
      this.$router.push("/candidato/editarPerfil");
    },
    cargarPerfil: function () {
      CandidateService.getProfile()
        .then((response) => {
          this.candidato = response.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
        });
    },
  },
  mounted() {
    this.cargarPerfil();
  },
};
</script>

