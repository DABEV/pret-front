<template>
  <div class="long">
    <div class="space-top content-data space datos text-start bg-gray">
      <vs-row justify="space-between" class="space">
        <vs-col lg="2">
          <vs-button primary block @click="ChangeTap(1)" size="large">
            <small>Mis contactos</small>
          </vs-button>
        </vs-col>
      </vs-row>
      <h3 class="text-center">{{ titulo }}</h3>
      <div v-if="contactos != null">
        <div class="center" v-if="$vs.getSearch(contactos, search).length < 1">
          No se encontraron registros
        </div>
        <div>
          <div
            :key="i"
            :data="c"
            v-for="(c, i) in $vs.getPage(
              $vs.getSearch(contactos, search),
              page,
              max
            )"
            class="item"
          >
            <div v-if="idSession == c.id.candidatoId">
              <vs-row class="space" justify="space-between">
                <vs-col lg="1" sm="2" xs="2" class="space-top">
                  <vs-avatar
                    v-if="c.amigo.foto != null"
                    class="end-item"
                    size="50"
                  >
                    <img :src="c.amigo.foto" alt="" />
                  </vs-avatar>
                  <vs-avatar v-else class="end-item" size="50">
                    <img alt="" />
                  </vs-avatar>
                </vs-col>
                <vs-col lg="8" sm="9" xs="9" class="space-top">
                  <div
                    class="item-click"
                    @click="Confirmar(c.amigo), (detalles = !detalles)"
                  >
                    <p>
                      <b
                        >{{ c.amigo.nombre }} {{ c.amigo.apellidoMaterno }}
                        {{ c.amigo.apellidoPaterno }}</b
                      >
                    </p>
                    <small>{{ c.amigo.correoElectronico }}</small>
                  </div>
                </vs-col>
                <vs-col lg="1" sm="2" xs="2" class="space-top center-item">
                  <vs-tooltip v-if="isPending">
                    <vs-button
                      icon
                      animation-type="rotate"
                      success
                      @click="(active = !active), Confirmar(c.amigo)"
                    >
                      <i class="bx bx-user-check"></i>
                      <template #animate>
                        <i class="bx bxs-user-check"></i>
                      </template>
                    </vs-button>
                    <template #tooltip> Aceptar </template>
                  </vs-tooltip>
                </vs-col>
                <vs-col lg="1" sm="12" xs="12" class="space-top">
                  <vs-tooltip v-if="isPending">
                    <vs-button
                      icon
                      animation-type="rotate"
                      danger
                      @click="
                        (activeRechazar = !activeRechazar), Confirmar(c.amigo)
                      "
                    >
                      <i class="bx bx-user-x"></i>
                      <template #animate>
                        <i class="bx bxs-user-x"></i>
                      </template>
                    </vs-button>
                    <template #tooltip> Rechazar </template>
                  </vs-tooltip>
                </vs-col>
              </vs-row>
              <div class="divider">
                <span class="border"></span>
              </div>
            </div>
            <div v-else>
              <vs-row class="space" justify="space-between">
                <vs-col lg="1" sm="2" xs="2" class="space-top">
                  <vs-avatar
                    v-if="c.candidato.foto != null"
                    class="end-item"
                    size="50"
                  >
                    <img :src="c.candidato.foto" alt="" />
                  </vs-avatar>
                  <vs-avatar v-else class="end-item" size="50">
                    <img alt="" />
                  </vs-avatar>
                </vs-col>
                <vs-col lg="8" sm="9" xs="9" class="space-top">
                  <div
                    class="item-click"
                    @click="Confirmar(c.candidato), (detalles = !detalles)"
                  >
                    <p>
                      <b
                        >{{ c.candidato.nombre }}
                        {{ c.candidato.apellidoMaterno }}
                        {{ c.candidato.apellidoPaterno }}</b
                      >
                    </p>
                    <small>{{ c.candidato.correoElectronico }}</small>
                  </div>
                </vs-col>
                <vs-col lg="1" sm="2" xs="2" class="space-top">
                  <vs-tooltip v-if="isPending">
                    <vs-button
                      icon
                      animation-type="rotate"
                      success
                      @click="(active = !active), Confirmar(c.candidato)"
                    >
                      <i class="bx bx-user-check"></i>
                      <template #animate>
                        <i class="bx bxs-user-check"></i>
                      </template>
                    </vs-button>
                    <template #tooltip> Aceptar </template>
                  </vs-tooltip>
                </vs-col>
                <vs-col lg="1" sm="12" xs="12" class="space-top">
                  <vs-tooltip v-if="isPending">
                    <vs-button
                      icon
                      animation-type="rotate"
                      danger
                      @click="
                        (activeRechazar = !activeRechazar),
                          Confirmar(c.candidato)
                      "
                    >
                      <i class="bx bx-user-x"></i>
                      <template #animate>
                        <i class="bx bxs-user-x"></i>
                      </template>
                    </vs-button>
                    <template #tooltip> Rechazar </template>
                  </vs-tooltip>
                </vs-col>
              </vs-row>
              <div class="divider">
                <span class="border"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <vs-pagination
            v-model="page"
            :length="$vs.getLength($vs.getSearch(contactos, search), max)"
          />
        </div>
      </div>
    </div>

    <ContactDetailDialog
      :detalles="detalles"
      :contacto="contacto"
      :estado="estado"
      @CloseDetails="CloseDetails"
    />

    <vs-dialog width="450px" class="text-center" v-model="active">
      <template #header>
        <h4><b>Confirmación</b></h4>
      </template>
      <div class="text-gray">
        <p>
          ¿Seguro de aceptar la solicitud de <b>{{ contacto.nombre }}</b
          >?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button
              success
              @click="CargarCorreoAceptar(contacto.correoElectronico)"
              block
            >
              Aceptar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button transparent dark @click="active = false" block>
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog width="450px" class="text-center" v-model="activeRechazar">
      <template #header>
        <h4><b>Confirmación</b></h4>
      </template>
      <div class="text-gray">
        <p>
          ¿Seguro de rechazar la solicitud de <b>{{ contacto.nombre }}</b
          >?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button
              danger
              block
              @click="CargarCorreoEliminar(contacto.correoElectronico)"
            >
              Rechazar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button transparent dark @click="activeRechazar = false" block>
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import CandidateService from "../../../service/Candidate/CandidateService";
import ContactDetailDialog from "../dialogsContactos/ContactDetailDialog.vue";

export default {
  name: "SentContactList",
  data: () => ({
    active: false,
    activeRechazar: false,
    detalles: false,
    page: 1,
    max: 5,
    idAmigo: 0,
    correoContacto: "",
    contacto: {},
    estado: {},
  }),
  methods: {
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
    Confirmar: function (contacto) {
      this.contacto = contacto;
      this.estado = contacto.estadoRepublica;
    },
    CloseDetails: function () {
      this.detalles = !this.detalles;
    },
    ChangeTap: function (tap) {
      this.$emit("ChangeTap", tap);
    },
    CargarCorreoAceptar: function (correoElectronico) {
      this.activeAdd = !this.activeAdd;
      this.correoContacto = correoElectronico;
      this.BuscarCandidato();
      this.Aceptar();
      this.CargarContactos();
    },
    CargarCorreoEliminar: function (correoElectronico) {
      this.activeRechazar = !this.activeRechazar;
      this.correoContacto = correoElectronico;
      this.BuscarCandidato();
      this.Rechazar();
      this.CargarContactos();
    },
    BuscarCandidato: function () {
      console.log(this.correoContacto)
      CandidateService.getByEmail(this.correoContacto)
        .then((response) => {
          if (response.data.data) {
            this.amigoId = response.data.data;
          } else {
            this.openNotification(
              4,
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
    },
    Aceptar: function () {
      CandidateService.aceptContact(this.amigoId)
        .then((response) => {
          if (response.data) {
            this.amigoId = response.data.data;
            this.openNotification(
              1,
              response.data.title,
              response.data.message
            );
          } else {
            this.openNotification(
              4,
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
      this.activeAdd = false;
    },
    Rechazar: function () {
      console.log(this.amigoId)
      CandidateService.rejectContact(this.amigoId)
        .then((response) => {
          if (response.data) {
            this.amigoId = response.data.data;
            this.openNotification(
              1,
              response.data.title,
              response.data.message
            );
          } else {
            this.openNotification(
              4,
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
    },
    CargarContactos: function () {
      this.$emit("CargarContactos");
    },
  },
  components: { ContactDetailDialog },
  props: {
    search: String,
    contactos: Array,
    titulo: String,
    isPending: Boolean,
    idSession: Number,
  },
};
</script>