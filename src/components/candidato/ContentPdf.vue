<template>
  <div class="margin-top-avatar center space">
    <vs-row justify="space-between">
      <vs-col lg="4" class="center-item cv-side">
        <vs-row>
          <vs-col class="center-item">
            <vs-avatar
              v-if="candidato.foto != null"
              circle
              size="180"
              class="avatar-top-card"
            >
              <img :src="candidato.foto" />
            </vs-avatar>
            <vs-avatar v-else circle size="180" primary class="avatar-top-card">
              <i class="bx bx-user-pin avatar-lg-icon"></i>
            </vs-avatar>
          </vs-col>
        </vs-row>
        <vs-row v-if="candidato.idiomas != null">
          <vs-col class="space-top text-center">
            <div v-if="candidato.idiomas.length != 0">
              <div class="space center">
                <h3 class="margin-xy space bg-light">Idiomas de dominio</h3>
                <div
                  :key="i"
                  v-for="(idi, i) in candidato.idiomas"
                  :data="idi"
                  class="text-start long"
                >
                  <div class="divider">
                    <span class="border-light"></span>
                  </div>
                  <vs-row class="space">
                    <vs-col lg="2" sm="2" xs="2" class="text-center space-top">
                      <i class="bx bx-world bg-light"></i>
                    </vs-col>
                    <vs-col lg="6" sm="6" xs="6" class="space-top text-middle">
                      <small class="bg-light">{{ idi.idioma.nombre }}</small>
                    </vs-col>
                    <vs-col lg="4" sm="4" xs="4" class="text-center space-top">
                      <span class="badge-sec">{{ idi.nivel }}</span>
                    </vs-col>
                  </vs-row>
                </div>
                <div class="text-start long">
                  <div class="divider">
                    <span class="border-light"></span>
                  </div>
                </div>
              </div>
            </div>
          </vs-col>
        </vs-row>
        <vs-row v-if="candidato.conocimientosHabilidades != null">
          <vs-col class="text-center">
            <div
              v-if="
                candidato.conocimientosHabilidades.conocimientos.length != 0
              "
            >
              <div class="space center">
                <h3 class="margin-xy space bg-light">Conocimientos</h3>
                <div
                  :key="i"
                  v-for="(con, i) in candidato.conocimientosHabilidades
                    .conocimientos"
                  :data="con"
                  class="text-start long"
                >
                  <div class="divider">
                    <span class="border-light"></span>
                  </div>
                  <vs-row class="space">
                    <vs-col lg="2" sm="2" xs="2" class="text-center space-top">
                      <i class="bx bx-book-open bg-light"></i>
                    </vs-col>
                    <vs-col lg="10" sm="6" xs="6" class="space-top text-middle">
                      <small class="bg-light">{{ con }}</small>
                    </vs-col>
                  </vs-row>
                </div>
                <div class="text-start long">
                  <div class="divider">
                    <span class="border-light"></span>
                  </div>
                </div>
              </div>
            </div>
          </vs-col>
          <vs-col class="text-center">
            <div
              v-if="candidato.conocimientosHabilidades.habilidades.length != 0"
            >
              <div class="space center">
                <h3 class="margin-xy space bg-light">Habilidades</h3>
                <div
                  :key="i"
                  v-for="(hab, i) in candidato.conocimientosHabilidades
                    .habilidades"
                  :data="hab"
                  class="text-start long"
                >
                  <div class="divider">
                    <span class="border-light"></span>
                  </div>
                  <vs-row class="space">
                    <vs-col lg="2" sm="2" xs="2" class="text-center space-top">
                      <i class="bx bxs-hand bg-light"></i>
                    </vs-col>
                    <vs-col lg="10" sm="6" xs="6" class="space-top text-middle">
                      <small class="bg-light">{{ hab }}</small>
                    </vs-col>
                  </vs-row>
                </div>
                <div class="text-start long">
                  <div class="divider">
                    <span class="border-light"></span>
                  </div>
                </div>
              </div>
            </div>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col lg="7" sm="9" xs="9">
        <h1 class="bold bg-primary">{{ candidato.tituloCurricular }}</h1>
        <h3>
          {{ candidato.nombre }} {{ candidato.apellidoPaterno }}
          {{ candidato.apellidoMaterno }}
        </h3>
        <small class="bg-gray">{{ candidato.correoElectronico }}</small>
        <div class="divider space space-top">
          <span class="border"></span>
        </div>
        <p class="bg-gray">{{ candidato.descripcionPerfil }}</p>
        <div class="divider space space-top">
          <span class="border"></span>
        </div>
        <vs-row justify="space-around" class="space">
          <vs-col lg="4" sm="2" xs="2" class="center-item">
            <vs-row class="space">
              <vs-col lg="3" sm="4" xs="4" class="center-item">
                <vs-avatar color="#b13cd2" size="30">
                  <i class="bx bxs-cake"></i>
                </vs-avatar>
              </vs-col>
              <vs-col lg="9" sm="8" xs="8" class="text-middle">
                <small>
                  {{ candidato.fechaNacimiento.slice(0, 10) }}
                </small>
              </vs-col>
            </vs-row>
          </vs-col>
          <vs-col lg="4" sm="4" xs="4" class="center-item">
            <vs-row class="space">
              <vs-col lg="3" sm="4" xs="4" class="center-item">
                <vs-avatar color="#b13cd2" size="30">
                  <i class="bx bxs-phone"></i>
                </vs-avatar>
              </vs-col>
              <vs-col lg="9" sm="8" xs="8" class="text-middle">
                <small>
                  {{ candidato.telefono }}
                </small>
              </vs-col>
            </vs-row>
          </vs-col>
          <vs-col lg="4" sm="4" xs="4" class="center-item">
            <vs-row class="space">
              <vs-col lg="3" sm="4" xs="4" class="center-item">
                <vs-avatar color="#b13cd2" size="30">
                  <i class="bx bxs-map"></i>
                </vs-avatar>
              </vs-col>
              <vs-col lg="9" sm="8" xs="8" class="text-middle">
                <small>
                  {{ candidato.estadoRepublica.nombre }}
                </small>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
        <div class="space-top space" v-if="candidato.estudios != null">
          <h3>Estudios</h3>
          <vs-table class="content-data space-top">
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
              <vs-tr :key="i" v-for="(c, i) in candidato.estudios" :data="c">
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
        <div class="space-top space" v-if="candidato.cursos != null">
          <h3>Cursos</h3>
          <vs-table class="content-data space-top">
            <template #thead>
              <vs-tr>
                <vs-th> Nombre </vs-th>
                <vs-th> Empresa </vs-th>
                <vs-th> Obtención </vs-th>
                <vs-th> Caducidad </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr :key="i" v-for="(tr, i) in candidato.cursos" :data="tr">
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
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import CandidateService from "../../service/Candidate/CandidateService";

export default {
  name: "ContentPdf",
  data: () => ({
    candidato: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correoElectronico: "",
      habilitado: true,
      telefono: "",
      fechaNacimiento: "",
      estadoRepublica: {
        id: 0,
      },
      tituloCurricular: "",
      descripcionPerfil: "",
      foto: "",
      conocimientosHabilidades: {
        conocimientos: [],
        habilidades: [],
      },
      cursos: [],
      experienciasLaborales: [],
      estudios: [],
      idiomas: [],
      certificaciones: [],
      vacantesFavoritas: [],
    },
  }),
  methods: {
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

