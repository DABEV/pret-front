<template>
  <div>
    <vs-tooltip>
      <vs-button
        icon
        animation-type="vertical"
        color="#009ACB"
        @click="activeCompartir = !activeCompartir"
      >
        <i class="bx bx-share-alt"></i>
        <template #animate>
          <i class="bx bxs-share-alt"></i>
        </template>
      </vs-button>
      <template #tooltip> Compartir </template>
    </vs-tooltip>
    <vs-dialog
      width="450px"
      scroll
      class="text-center"
      v-model="activeCompartir"
    >
      <template #header>
        <vs-col>
          <h4>Compartir con tus contactos</h4>
          <vs-input
            class="space-top"
            v-model="searchCompartir"
            color="#1e88e5"
            block
            placeholder="Buscar contacto"
          >
            <template #icon>
              <i class="bx bx-search"></i>
            </template>
          </vs-input>
        </vs-col>
      </template>
      <div
        class="center"
        v-if="$vs.getSearch(contactos, searchCompartir).length < 1"
      >
        No se encontraron registros
      </div>
      <div
        :key="i"
        :data="c"
        v-for="(c, i) in $vs.getPage(
          $vs.getSearch(contactos, searchCompartir),
          pageCompartir,
          maxCompartir
        )"
        class="item"
      >
        <vs-row class="space">
          <vs-col lg="3" sm="3" xs="3" class="center-item space-top">
            <vs-avatar size="50">
              <img :src="c.foto" alt="" />
            </vs-avatar>
          </vs-col>
          <vs-col lg="7" sm="9" xs="9" class="space-top text-start">
            <div class="item-click" @click="ConfirmarCom(c)">
              <p class="bold">
                {{ c.nombre }} {{ c.apellidoPaterno }}
                {{ c.apellidoMaterno }}
              </p>
              <small>{{ c.correoElectronico }}</small>
            </div>
          </vs-col>
        </vs-row>
        <div class="divider">
          <span class="border"></span>
        </div>
      </div>
      <div class="pagination">
        <vs-pagination
          v-model="pageCompartir"
          :length="
            $vs.getLength(
              $vs.getSearch(contactos, searchCompartir),
              maxCompartir
            )
          "
        />
      </div>
    </vs-dialog>
  </div>
</template>

<script>

export default {
  name: "ShareDialog",
  data: () => ({
    activeCompartir: false,
    searchCompartir: "",
    pageCompartir: 1,
    maxCompartir: 4,
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
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
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
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
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
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
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
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
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
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
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
        tituloCurricular:
          "Grado de estudios: Administradora de base de datos (DBA)",
        fechaNacimiento: "9/4/12",
        foto: "https://images.unsplash.com/photo-1483995564125-85915c11dcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=641&q=80",
      },
    ],
  }),
  methods: {
    CargarContactos: function () {
      console.log("candidato: " + this.idCandidato);
    },
  },
  props: {
    idCandidato: Number,
  },
  mounted() {
    this.CargarContactos();
  },
};
</script>