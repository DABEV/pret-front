<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Lista de contactos</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="space-between">
          <vs-col lg="6" sm="12" xs="12" class="space">
            <vs-row>
              <vs-col lg="2" sm="3" xs="3">
                <AddContactDialog />
              </vs-col>
              <vs-col lg="10" sm="8" xs="8">
                <p class="bold">
                  Contactos registrados: <small>{{ contactos.length }}</small>
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

    <MyContactList v-if="tap == 1" :search="search" @ChangeTap="ChangeTap" />
    <SentContactList
      v-else-if="tap == 2"
      :search="search"
      :contactos="contactos"
      :titulo="'Solicitudes Pendientes'"
      :isPending="solicitud"
      @ChangeTap="ChangeTap"
    />
    <SentContactList
      v-else
      :contactos="contactos"
      :titulo="'Han solicitado ser tu contacto'"
      :search="search"
      :isPending="pendiente"
      @ChangeTap="ChangeTap"
    />
  </div>
</template>

<script>
import AddContactDialog from "./dialogsContactos/AddContactDialog.vue";
import MyContactList from "./dialogsContactos/MyContactList.vue";
import SentContactList from "./dialogsContactos/SentContactList.vue";

export default {
  name: "ContactList",
  data: () => ({
    search: "",
    estado: {},
    tap: 1,
    solicitud: false,
    pendiente: true,
    contactos: [
      {
        nombre: "Cameron",
        apellidoMaterno: "Williamson",
        apellidoPaterno: "Warren",
        correoElectronico: "cameron@example.com",
        telefono: "(704) 555-0127",
        estadoRepublica: {
          nombre: "Morelos",
        },
        tituloCurricular: "Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      },
      {
        nombre: "Esther",
        apellidoMaterno: "Howard",
        apellidoPaterno: "Simmons",
        correoElectronico: "esther@example.com",
        telefono: "(907) 555-0101",
        estadoRepublica: {
          nombre: "Morelos",
        },
        tituloCurricular: "Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=562&q=80",
      },
      {
        nombre: "Robert",
        apellidoMaterno: "Warren",
        apellidoPaterno: "Hawkins",
        correoElectronico: "robert@example.com",
        telefono: "(217) 555-0113",
        estadoRepublica: {
          nombre: "Querétaro",
        },
        tituloCurricular: "Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80",
      },
      {
        nombre: "Alexander",
        apellidoMaterno: "Edwards",
        apellidoPaterno: "Wade",
        correoElectronico: "alexander@example.com",
        telefono: "(308) 555-0121",
        estadoRepublica: {
          nombre: "Durango",
        },
        tituloCurricular: "Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=558&q=80",
      },
      {
        nombre: "Leslie",
        apellidoMaterno: "Brooklyn",
        apellidoPaterno: "Williamson",
        correoElectronico: "leslie@example.com",
        telefono: "(302) 555-0107",
        estadoRepublica: {
          nombre: "Tamaulipas",
        },
        tituloCurricular: "Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      },
      {
        nombre: "Ralph",
        apellidoMaterno: "Williamson",
        apellidoPaterno: "Fox",
        correoElectronico: "ralph@example.com",
        telefono: "(702) 555-0122",
        estadoRepublica: {
          nombre: "Oaxaca",
        },
        tituloCurricular: "Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1483995564125-85915c11dcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=641&q=80",
      },
    ],
  }),
  methods: {
    ChangeTap(tap) {
      this.tap = tap;
    },
  },
  components: { AddContactDialog, MyContactList, SentContactList },
};
</script>