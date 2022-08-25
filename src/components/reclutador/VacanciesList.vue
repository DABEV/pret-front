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
                  @click="
                    vacantes = $vs.sortData($event, vacantes, 'fechaVigencia')
                  "
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
                  {{ tr.fechaVigencia }}
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
                        <vs-button success @click="IrSeleccion1(tr.id)">
                          Ver candidatos
                        </vs-button>
                      </vs-col>
                      <vs-col lg="1" class="center-item">
                        <vs-tooltip>
                          <vs-button
                            @click="editarVacante(tr.id)"
                            icon
                            animation-type="rotate"
                            warn
                          >
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
                <vs-dialog prevent-close v-model="actualizar">
                  <template #header>
                    <h4 class="not-margin">
                      <b>Editar datos de la vacante</b>
                    </h4>
                  </template>
                  <div class="center">
                    <vs-row justify="space-around">
                      <vs-col lg="5" sm="12" xs="12">
                        Fecha vigencia
                        <vs-input
                          type="date"
                          block
                          class="space input-date"
                          primary
                          v-model="vacanteDialog.fechaVigencia"
                        >
                          <template #icon>
                            <em class="bx bxs-calendar"></em>
                          </template>
                        </vs-input>
                      </vs-col>
                      <vs-col lg="5" sm="12" xs="12">
                        Sueldo mínimo
                        <vs-input
                          primary
                          block
                          class="space"
                          type="number"
                          v-model="vacanteDialog.sueldoMin"
                          placeholder="1000"
                        >
                          <template #icon>
                            <em class="bx bx-money"></em>
                          </template>
                        </vs-input>
                      </vs-col>
                      <vs-col lg="5" sm="12" xs="12">
                        Tipo
                        <vs-input
                          primary
                          block
                          class="space"
                          v-model="vacanteDialog.tipo"
                          placeholder="Horario de trabajo"
                        >
                          <template #icon>
                            <em class="bx bxs-time-five"></em>
                          </template>
                        </vs-input>
                      </vs-col>
                      <vs-col lg="5" sm="12" xs="12">
                        Modalidad
                        <vs-input
                          primary
                          v-model="vacanteDialog.modalidad"
                          placeholder="Modalidad de trabajo"
                          block
                          class="space"
                        >
                          <template #icon>
                            <em class="bx bxs-briefcase"></em>
                          </template>
                        </vs-input>
                      </vs-col>
                      <vs-col lg="5" sm="12" xs="12">
                        Sueldo máximo
                        <vs-input
                          type="number"
                          block
                          class="space"
                          primary
                          v-model="vacanteDialog.sueldoMax"
                          placeholder="1000.99"
                        >
                          <template #icon>
                            <em class="bx bx-money"></em>
                          </template>
                        </vs-input>
                      </vs-col>
                      <vs-col lg="5" sm="12" xs="12">
                        Periodo de pago
                        <vs-input
                          primary
                          v-model="vacanteDialog.periodoPago"
                          placeholder="Lapso de pago"
                          block
                          class="space"
                        >
                          <template #icon>
                            <em class="bx bxs-graduation"></em>
                          </template>
                        </vs-input>
                      </vs-col>
                      <vs-col lg="4" sm="12" xs="12"> </vs-col>
                    </vs-row>
                    <vs-row justify="center">
                      <vs-col
                        lg="4"
                        sm="12"
                        xs="12"
                        class="text-center center-item"
                      >
                        <vs-button
                          @click="actualizarVacante()"
                          success
                          block
                          animation-type="vertical"
                        >
                          Actualizar vacante
                          <template #animate>
                            <i class="bx bxs-save"></i>&nbsp;Guardar
                          </template>
                        </vs-button>
                      </vs-col>
                    </vs-row>
                  </div>
                </vs-dialog>
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
    actualizar: false,
    page: 1,
    max: 5,
    search: "",
    vacanteDialog: [
      {
        id: "",
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
        descripcion: "",
      },
    ],
    vacantes: [
      {
        id: "",
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
        descripcion: "",
      },
    ],
  }),
  methods: {
    async editarVacante(i) {
      try {
        this.actualizar = true;
        RecruiterService.obtenerVacanteUnica(i).then((response) => {
          if (response.data) {
            this.vacanteDialog = response.data.data;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async actualizarVacante() {
      try {
        RecruiterService.actualizarVacante(this.vacanteDialog)
          .then((response) => {
            if (response.data) {
              this.openNotification(
                1,
                response.data.title,
                response.data.message
              );
              this.actualizar = false;
              this.listarVacantes();
            }
          })
          .catch((e) => {
            console.log(e);
            this.openNotification(
              4,
              e.response.data.title,
              e.response.data.message
            );
          });
      } catch (e) {
        console.log(e);
        this.openNotification(
          4,
          "Hubo un error!",
          "Espera a que soporte técnico repare el problema"
        );
      }
    },
    openNotification(border_, title_, text_) {
      let tipo = "";
      let icon_ = "";
      switch (border_) {
        case 1:
          tipo = "success";
          icon_ = `<i class='bx bx-check-circle' ></i>`;
          break;
        case 2:
          tipo = "primary";
          icon_ = `<i class='bx bx-info-circle'></i>`;
          break;
        case 3:
          tipo = "warning";
          icon_ = `<i class='bx bx-error'></i>`;
          break;
        case 4:
          tipo = "danger";
          icon_ = `<i class='bx bx-x-circle'></i>`;
          break;
      }
      this.$vs.notification({
        progress: "auto",
        position: null,
        title: title_,
        text: text_,
        border: tipo,
        icon: icon_,
      });
    },
    listarVacantes() {
      RecruiterService.listarVacantes()
        .then((response) => {
          this.vacantes = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    Confirmar: function (contacto) {
      this.contacto = contacto;
    },
    IrSeleccion1: function (id) {
      this.$router.push("/reclutador/candidatos/" + id);
    },
  },
  mounted() {
    this.listarVacantes();
  },
};
</script>
