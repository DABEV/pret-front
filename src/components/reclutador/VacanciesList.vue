<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Vacantes publicadas</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <div class="header-table">
            <vs-row justify="space-between">
              <vs-col lg="5" sm="12" xs="12">
                <vs-row>
                  <vs-col lg="2" sm="4" xs="4">
                    <vs-tooltip not-hover>
                      <vs-button
                        icon
                        animation-type="rotate"
                        color="#B13CD2"
                        to="/reclutador/registrarVacante"
                      >
                        <i class="bx bx-folder-plus"></i>
                        <template #animate>
                          <i class="bx bxs-folder-plus"></i>
                        </template>
                      </vs-button>
                      <template #tooltip> Añadir vacante </template>
                    </vs-tooltip>
                  </vs-col>
                  <vs-col lg="10" sm="4" xs="4">
                    <p class="text-start bold">
                      Gestiona la información de tus vacantes
                    </p>
                    <small>Visualiza a los candidatos postulados</small>
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
                  @click="
                    vacantes = $vs.sortData($event, vacantes, 'fechaInicio')
                  "
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
                      <vs-col lg="1" class="center-item">
                        <vs-avatar circle primary>
                          <i class="bx bxs-briefcase"></i>
                        </vs-avatar>
                      </vs-col>
                      <vs-col lg="8">
                        <p class="bold">{{ tr.nombre }}</p>
                        <small
                          >{{ tr.reclutador.estadoRepublicaEmpresa.nombre }} ·
                          Vigencia: {{ tr.fechaVigencia }}</small
                        >
                      </vs-col>
                      <vs-col lg="2" class="center-item">
                        <vs-button success @click="IrSeleccion1()">
                          Ver candidatos
                        </vs-button>
                      </vs-col>
                      <vs-col lg="1" class="center-item">
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
import RecruiterService from "../../service/Recruiter/RecruiterService";

export default {
  name: "VacanciesList",
  data: () => ({
    active: false,
    page: 1,
    max: 5,
    search: "",
    vacantes: [
      {
        nombre: "",
        reclutador: {
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          nombreEmpresa: "",
          estadoRepublicaEmpresa: {
            nombre: "",
          },
        },
        tipo: "",
        modalidad: "",
        periodoPago: "",
        sueldoMin: 0,
        sueldoMax: 0,
        fechaInicio: "",
        fechaVigencia: "",
        descripcion:
          "",
      },
    ],
  }),
  methods: {
    listarVacantes (){
      RecruiterService.listarVacantes()
      .then((response) => {
        console.log(response.data.data);
        this.vacantes = response.data.data;
      }).catch((e) => {
        console.log(e);
      });
    },
    Confirmar: function (contacto) {
      this.contacto = contacto;
    },
    IrSeleccion1: function () {
      this.$router.push("/reclutador/candidatos");
    },
  },
  mounted(){
    this.listarVacantes();
  },
};
</script>
