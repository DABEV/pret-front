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
                    <vs-col lg="3" sm="3" xs="3" class="text-center space-top">
                      <i class="bx bx-book-open bg-light"></i>
                    </vs-col>
                    <vs-col lg="9" sm="9" xs="9" class="space-top text-middle">
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
                    <vs-col lg="3" sm="3" xs="3" class="text-center space-top">
                      <i class="bx bxs-hand bg-light"></i>
                    </vs-col>
                    <vs-col lg="9" sm="9" xs="9" class="space-top text-middle">
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
        <small class="bg-gray">{{ candidato.descripcionPerfil }}</small>
        <div class="divider space space-top">
          <span class="border"></span>
        </div>
        <vs-row justify="space-around" class="space">
          <vs-col lg="4" sm="2" xs="2" class="center-item">
            <vs-row class="space">
              <vs-col lg="4" sm="4" xs="4" class="center-item">
                <vs-avatar color="#b13cd2" size="30">
                  <i class="bx bxs-cake"></i>
                </vs-avatar>
              </vs-col>
              <vs-col lg="8" sm="8" xs="8" class="text-middle">
                <small>
                  {{ candidato.fechaNacimiento.slice(0, 10) }}
                </small>
              </vs-col>
            </vs-row>
          </vs-col>
          <vs-col lg="4" sm="4" xs="4" class="center-item">
            <vs-row class="space">
              <vs-col lg="4" sm="4" xs="4" class="center-item">
                <vs-avatar color="#b13cd2" size="30">
                  <i class="bx bxs-phone"></i>
                </vs-avatar>
              </vs-col>
              <vs-col lg="8" sm="8" xs="8" class="text-middle">
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
        <vs-row justify="space-between">
          <vs-col lg="12" sm="12" xs="12" v-if="candidato.idiomas.length != 0">
            <h3>Idiomas de dominio</h3>
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
                    <p>{{ idioma.idioma.nombre }}</p>
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
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-row justify="space-around">
      <vs-col lg="12" sm="12" xs="12" class="space-top space">
        <div class="space space-top" v-if="candidato.estudios != null">
          <h3 class="bold bg-primary">Estudios</h3>
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
                  {{ c.universidad.siglas }}, {{ c.universidad.nombre }}
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
          <h3 class="bold bg-primary">Cursos</h3>
          <vs-table class="content-data space-top">
            <template #thead>
              <vs-tr>
                <vs-th> Nombre </vs-th>
                <vs-th> Empresa </vs-th>
                <vs-th> Obtención </vs-th>
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
              </vs-tr>
            </template>
            <template #footer> </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
        <!-- Experiencia laboral -->
        <div
          class="space space-top"
          v-if="candidato.experienciasLaborales != null"
        >
          <h3 class="bold bg-primary">Experiencia laboral</h3>
          <vs-table class="content-data space-top">
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
                v-for="(tr, i) in candidato.experienciasLaborales"
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
            <template #footer> </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
        <!-- Certificaciones -->
        <div class="space space-top" v-if="candidato.certificaciones != null">
          <h3 class="bold bg-primary">Certificaciones</h3>

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
              <vs-tr
                :key="i"
                v-for="(tr, i) in candidato.certificaciones"
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
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import CandidateService from "../../service/Candidate/CandidateService";
export default {
  name: "ContentPdf",
  data: () => ({
    active: 0,
    max: 5,
    max2: 3,
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

