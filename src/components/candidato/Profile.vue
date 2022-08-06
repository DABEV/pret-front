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
          <div class="content-data space datos text-start bg-gray">
            <vs-row justify="space-between">
              <vs-col lg="6" sm="6" xs="6">
                <vs-button color="#1E88E5" @click="IrEditar()">
                  Editar perfil
                </vs-button>
              </vs-col>
              <vs-col lg="2" sm="2" xs="2">
                <vs-tooltip>
                  <vs-button icon animation-type="rotate" color="#B13CD2">
                    <i class="bx bx-download"></i>
                    <template #animate>
                      <i class="bx bx-import"></i>
                    </template>
                  </vs-button>
                  <template #tooltip> Descargar CV </template>
                </vs-tooltip>
              </vs-col>
            </vs-row>
          </div>
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
                  page3,
                  max2
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
              <div class="pagination">
                <vs-pagination
                  v-model="page3"
                  :length="
                    $vs.getLength(
                      candidato.conocimientosHabilidades.conocimientos,
                      max2
                    )
                  "
                />
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
    <div class="space space-top long" v-if="candidato.estudios.length != 0">
      <h2 class="text-center">Estudios</h2>
      <div class="text-center bg-gray">
        <div>
          <vs-card-group>
            <vs-card :key="i" :data="c" v-for="(c, i) in candidato.estudios">
              <template #text>
                <vs-row>
                  <vs-col lg="2" sm="3" xs="3" class="space-top">
                    <vs-avatar primary size="35">
                      <i class="bx bx-book"></i>
                    </vs-avatar>
                  </vs-col>
                  <vs-col lg="10" sm="9" xs="9" class="text-start space-top">
                    <h4>{{ c.gradoAcademico }}</h4>
                    <small>{{ c.universidad }}</small>
                  </vs-col>
                </vs-row>
                <small class="bold"> {{ c.carrera }}</small>
                <vs-row justify="space-between">
                  <vs-col w="4" class="space-top">
                    Inicio:
                    <span class="badge-sec"> {{ c.fechaInicio }}</span>
                  </vs-col>
                  <vs-col w="4" class="space-top">
                    Fin:
                    <span class="badge-sec"> {{ c.fechaFin }}</span>
                  </vs-col>
                </vs-row>
              </template>
            </vs-card>
          </vs-card-group>
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
                  page,
                  max
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
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(candidato.experienciasLaborales, max)"
              />
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
                <vs-th> Caaducidad </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(
                  candidato.certificaciones,
                  page2,
                  max
                )"
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
            <template #footer>
              <vs-pagination
                v-model="page2"
                :length="$vs.getLength(candidato.certificaciones, max)"
              />
            </template>
            <template #notFound> No se encontraron registros </template>
          </vs-table>
        </div>
      </div>
    </div>
    <div class="space space-top long" v-if="candidato.cursos.length != 0">
      <h2 class="text-center">Cursos realizados</h2>
      <div class="text-start bg-gray">
        <div>
          <vs-card-group>
            <vs-card :key="i" :data="c" v-for="(c, i) in candidato.cursos">
              <template #title>
                <vs-row>
                  <vs-col lg="2" sm="3" xs="3">
                    <vs-avatar primary>
                      <i class="bx bxs-hot"></i>
                    </vs-avatar>
                  </vs-col>
                  <vs-col lg="10" sm="9" xs="9">
                    <h3>{{ c.nombre }}</h3>
                  </vs-col>
                </vs-row>
              </template>
              <template #text>
                <vs-row>
                  <vs-col w="8">
                    <p>Fecha: {{ c.fechaObtencion }}</p>
                  </vs-col>
                  <vs-col w="4" class="text-end">
                    <span class="badge-sec">{{ c.numeroHoras }}hrs</span>
                  </vs-col>
                </vs-row>
              </template>
            </vs-card>
          </vs-card-group>
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

