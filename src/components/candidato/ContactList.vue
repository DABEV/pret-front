<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Lista de contactos</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="space-between">
          <vs-col lg="6" sm="12" xs="12" class="space">
            <vs-row>
              <vs-col lg="2" sm="3" xs="3">
                <AddContactDialog @CargarContactos="CargarContactos" />
              </vs-col>
              <vs-col lg="10" sm="8" xs="8">
                <p class="bold">
                  Contactos registrados: <small>{{ amigos.length }}</small>
                </p>
                <small>Puedes compartir vacantes entre contactos</small>
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
    </div>

    <MyContactList
      v-if="tap == 1"
      :search="search"
      @ChangeTap="ChangeTap"
      :contactos="amigos"
      :solicitudes="solLength"
      :idSession="idSession"
      :pendientes="penLength"
      @CargarContactos="CargarContactos"
    />
    <SentContactList
      v-else-if="tap == 2"
      :search="search"
      :contactos="solicitudes"
      :titulo="'Solicitudes Pendientes'"
      :isPending="solicitud"
      :idSession="idSession"
      @ChangeTap="ChangeTap"
      @CargarContactos="CargarContactos"
    />
    <SentContactList
      v-else
      :contactos="pendientes"
      :titulo="'Han solicitado ser tu contacto'"
      :search="search"
      :isPending="pendiente"
      :idSession="idSession"
      @ChangeTap="ChangeTap"
      @CargarContactos="CargarContactos"
    />
  </div>
</template>

<script>
import CandidateService from "../../service/Candidate/CandidateService";
import AddContactDialog from "./dialogsContactos/AddContactDialog.vue";
import MyContactList from "./dialogsContactos/MyContactList.vue";
import SentContactList from "./dialogsContactos/SentContactList.vue";

export default {
  name: "ContactList",
  data: () => ({
    search: "",
    estado: {},
    tap: 1,
    solLength: 0,
    penLength: 0,
    idSession: 0,
    solicitud: false,
    pendiente: true,
    contactos: [],
    amigos: [],
    solicitudes: [],
    pendientes: [],
  }),
  methods: {
    ChangeTap(tap) {
      this.tap = tap;
    },
    CargarContactos: function () {
      this.CargarIdSession();
      this.tap = 1;
      CandidateService.listContacts()
        .then((response) => {
          this.contactos = response.data.data;
          const amigos = this.contactos.filter((c) => c.estado);
          const solicitudes = this.contactos.filter(
            (c) => !c.estado && this.idSession == c.id.candidatoId
          );
          const pendientes = this.contactos.filter(
            (c) => !c.estado && this.idSession == c.id.amigoId
          );

          this.amigos = amigos;
          this.solicitudes = solicitudes;
          this.pendientes = pendientes;

          if (solicitudes != null) {
            this.solLength = solicitudes.length;
          } else {
            this.solLength = 0;
          }

          if (pendientes != null) {
            this.penLength = pendientes.length;
          } else {
            this.penLength = 0;
          }
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
        });
    },
    CargarIdSession: function () {
      CandidateService.getProfile()
        .then((response) => {
          this.idSession = response.data.data.id;
        })
        .catch((e) => {
          console.log(e);
          //Toast de error al obtener datos
        });
    },
  },
  mounted() {
    this.CargarContactos();
  },
  components: { AddContactDialog, MyContactList, SentContactList },
};
</script>