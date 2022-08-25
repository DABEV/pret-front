<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Publicar vacante nueva</h2>
      <div class="space-top space content-data datos text-start">
        <div class="center">
          <vs-row justify="center">
            <vs-col lg="2">
              <vs-button
                @click="registrarVacante()"
                success
                block
                animation-type="vertical"
              >
                Publicar vacante
                <template #animate>
                  <i class="bx bxs-save"></i>&nbsp;Guardar
                </template>
              </vs-button>
            </vs-col>
          </vs-row>
          <vs-row justify="space-around" class="space-top">
            <vs-col lg="5" sm="12" xs="12">
              Título
              <vs-input
                primary
                block
                class="space"
                v-model="vacante.nombre"
                placeholder="Título de la postulación"
              >
                <template #icon><em class="bx bxs-notepad"></em></template>
              </vs-input>
              Tipo
              <vs-input
                primary
                block
                class="space"
                v-model="vacante.tipo"
                placeholder="Horario de trabajo"
              >
                <template #icon><em class="bx bxs-time-five"></em></template>
              </vs-input>
              Sueldo mínimo
              <vs-input
                primary
                block
                class="space"
                type="number"
                v-model="vacante.sueldoMin"
                placeholder="1000"
              >
                <template #icon><em class="bx bx-money"></em></template>
              </vs-input>
              Fecha inicio
              <vs-input
                type="date"
                block
                class="space input-date"
                primary
                v-model="vacante.fechaInicio"
              >
                <template #icon><em class="bx bxs-calendar"></em></template>
              </vs-input>
            </vs-col>
            <vs-col lg="5" sm="12" xs="12">
              Modalidad
              <vs-input
                primary
                v-model="vacante.modalidad"
                placeholder="Modalidad de trabajo"
                block
                class="space"
              >
                <template #icon><em class="bx bxs-briefcase"></em></template>
              </vs-input>
              Periodo de pago
              <vs-input
                primary
                v-model="vacante.periodoPago"
                placeholder="Lapso de pago"
                block
                class="space"
              >
                <template #icon><em class="bx bxs-graduation"></em></template>
              </vs-input>
              Sueldo máximo
              <vs-input
                type="number"
                block
                class="space"
                primary
                v-model="vacante.sueldoMax"
                placeholder="1000.99"
              >
                <template #icon><em class="bx bx-money"></em></template>
              </vs-input>
              Fecha vigencia
              <vs-input
                type="date"
                block
                class="space input-date"
                primary
                v-model="vacante.fechaVigencia"
              >
                <template #icon><em class="bx bxs-calendar"></em></template>
              </vs-input>
            </vs-col>
            <vs-col lg="11" sm="12" xs="12">
              Descripción
              <textarea
                v-model="vacante.descripcion"
                placeholder="Breve descripción"
              >
              </textarea>
            </vs-col>
          </vs-row>
        </div>
      </div>
      <div class="space-top space content-data datos text-start">
        <div class="center">
          <vs-row justify="space-between">
            <vs-col lg="4">
              <h2>Beneficios</h2>
            </vs-col>
            <vs-col lg="2" class="center-item">
              <vs-button
                primary
                block
                animation-type="vertical"
                @click="activeBen = !activeBen"
              >
                Añadir beneficio
                <template #animate>
                  <i class="bx bx-check-shield"></i>&nbsp;Añadir
                </template>
              </vs-button>
            </vs-col>
          </vs-row>
          <div v-if="vacante.beneficios != null">
            <vs-table v-if="vacante.beneficios.length != 0">
              <template #thead>
                <vs-tr>
                  <vs-th> Nombre </vs-th>
                  <vs-th> Acción </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr
                  :key="i"
                  v-for="(tr, i) in $vs.getPage(vacante.beneficios, page2, max)"
                  :data="tr"
                >
                  <vs-td>
                    {{ tr.nombre }}
                  </vs-td>
                  <vs-td>
                    <vs-button>Quitar</vs-button>
                  </vs-td>
                </vs-tr>
              </template>
              <template #footer>
                <vs-pagination
                  v-model="page2"
                  :length="$vs.getLength(vacante.beneficios, max)"
                />
              </template>
              <template #notFound> No se encontraron registros </template>
            </vs-table>
          </div>
        </div>
      </div>
    </div>

    <vs-dialog v-model="activeBen">
      <template #header>
        <h2>Añadir Beneficio</h2>
      </template>
      <div class="margin-xy space space-top">
        <div class="input-icon">
          <span><i class="bx bx-check-shield"></i></span>
          <select
            class="select-custom space-top space"
            placeholder="Beneficios"
            v-model="beneficio"
          >
            <option
              class="select-option"
              disabled
              v-if="beneficio == null"
            >
              Selecciona ...
            </option>
            <option
              class="select-option"
              v-for="(ben, i) in beneficiosLista"
              :key="i"
              :value="ben"
            >
              {{ ben.nombre }}
            </option>
          </select>
        </div>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeBen = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button primary block @click="enviarBen()"> Añadir </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import CatalogueService from "../../service/Catalogues/CatalogueService";
import RecruiterService from "../../service/Recruiter/RecruiterService";

export default {
  name: "RegisterVacancy",
  data: () => ({
    activeBen: false,
    page2: 0,
    max: 2,
    vacante: {
      nombre: "",
      descripcion: "",
      modalidad: "",
      tipo: "",
      fechaInicio: "",
      fechaVigencia: "",
      sueldoMin: "",
      sueldoMax: "",
      periodoPago: "",
      reclutador: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombreEmpresa: "",
        beneficiosEmpresa: {
          nombre: "",
        },
      },
      beneficios: [
        
      ],
    },
    beneficiosLista: [],
    beneficio: {
      id: 0,
      nombre: "",
    },
  }),
  methods: {
    async registrarVacante() {
      try {
        RecruiterService.registrarVacante(this.vacante)
          .then((response) => {
            if (response.data) {
              this.openNotification(
                1,
                response.data.title,
                response.data.message
              );
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
    cargarBeneficios: function () {
      CatalogueService.listarBeneficios()
        .then((response) => {
          this.beneficiosLista = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    enviarBen() {
      console.log(this.beneficio);
      this.vacante.beneficios.push(this.beneficio);
      this.activeBen = false;
    },
  },
  mounted() {
    this.cargarBeneficios();
  },
};
</script>
