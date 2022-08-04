<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Lista de contactos</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="space-between">
          <vs-col lg="6" sm="12" xs="12" class="space">
            <vs-row>
              <vs-col lg="2" sm="3" xs="3">
                <vs-tooltip>
                  <vs-button
                    @click="Añadir()"
                    icon
                    animation-type="rotate"
                    color="#B13CD2"
                  >
                    <i class="bx bx-user-plus"></i>
                    <template #animate>
                      <i class="bx bxs-user-plus"></i>
                    </template>
                  </vs-button>
                  <template #tooltip> Añadir contacto </template>
                </vs-tooltip>
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
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="space-between" class="space">
          <vs-col lg="2">
            <vs-button success block>
              Enviadas:
              <vs-avatar circle size="25" class="margin-xy">
                {{ solicitudes.length }}
              </vs-avatar>
            </vs-button>
          </vs-col>
          <vs-col lg="2">
            <vs-button primary block>
              Por aceptar:
              <vs-avatar circle size="25" class="margin-xy">
                {{ enviadas.length }}
              </vs-avatar>
            </vs-button>
          </vs-col>
        </vs-row>
        <div class="center" v-if="$vs.getSearch(contactos, search).length < 1">
          No se encontraron registros
        </div>
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
          <vs-row class="space" justify="space-between">
            <vs-col lg="1" sm="2" xs="2" class="space-top">
              <vs-avatar class="end-item" size="50">
                <img :src="c.foto" alt="" />
              </vs-avatar>
            </vs-col>
            <vs-col lg="9" sm="9" xs="9" class="space-top">
              <div
                class="item-click"
                @click="Confirmar(c), (detalles = !detalles)"
              >
                <p>
                  <b
                    >{{ c.nombre }} {{ c.apellidoMaterno }}
                    {{ c.apellidoPaterno }}</b
                  >
                </p>
                <small>{{ c.correoElectronico }}</small>
              </div>
            </vs-col>
            <vs-col lg="1" sm="12" xs="12" class="space-top">
              <vs-tooltip>
                <vs-button
                  icon
                  animation-type="rotate"
                  danger
                  @click="(active = !active), Confirmar(c)"
                >
                  <i class="bx bx-trash-alt"></i>
                  <template #animate>
                    <i class="bx bxs-trash-alt"></i>
                  </template>
                </vs-button>
                <template #tooltip> Quitar </template>
              </vs-tooltip>
            </vs-col>
          </vs-row>
          <div class="divider">
            <span class="border"></span>
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

    <vs-dialog width="450px" class="text-center" v-model="active">
      <template #header>
        <h4><b>Confirmación</b></h4>
      </template>
      <div class="text-gray">
        <p>
          ¿Seguro de eliminar a <b>{{ contacto.nombre }}</b> de tus contactos?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button danger @click="active = false" block> Quitar </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button transparent dark @click="active = false" block>
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog class="text-center" v-model="detalles">
      <vs-row>
        <vs-col lg="4">
          <div class="text-item bg-primary">
            Teléfono
            <small class="bold bg-gray">{{ contacto.telefono }}</small>
          </div>
        </vs-col>
        <vs-col lg="4" class="center-item">
          <vs-avatar circle size="100" class="avatar-top">
            <img :src="contacto.foto" alt="" />
          </vs-avatar>
        </vs-col>
        <vs-col lg="4">
          <div class="text-item bg-primary">
            Estado
            <small class="bold bg-gray">
              {{ estado.nombre }}
            </small>
          </div>
        </vs-col>
      </vs-row>
      <h4 class="space-top">
        {{ contacto.nombre }} {{ contacto.apellidoMaterno }}
        {{ contacto.apellidoPaterno }}
      </h4>
      <small class="bg-gray">{{ contacto.correoElectronico }}</small>
      <div class="divider space space-top">
        <span class="border"></span>
      </div>
      <vs-row justify="space-around" class="space">
        <vs-col w="1" class="center-item">
          <vs-avatar color="#b13cd2" size="30">
            <i class="bx bxs-graduation"></i>
          </vs-avatar>
        </vs-col>
        <vs-col w="10" class="center-item text-start">
          <small>Titulo: {{ contacto.tituloCurricular }}</small>
        </vs-col>
      </vs-row>
      <div class="divider space space-top">
        <span class="border"></span>
      </div>
    </vs-dialog>

    <vs-dialog v-model="activeAdd">
      <template #header>
        <h2>Añadir Contacto</h2>
      </template>
      <div class="margin-xy space text-center">
        <small class="bg-sec">Tu solicitúd deberá ser aceptada</small>
        <vs-input
          class="space-top space"
          placeholder="Correo del usuario"
          v-model="correoContacto"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-contact"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeAdd = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button primary block @click="enviarAdd()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "ContactList",
  data: () => ({
    active: false,
    activeAdd: false,
    detalles: false,
    page: 1,
    max: 5,
    search: "",
    contacto: {},
    correoContacto: "",
    estado: {},
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
    solicitudes: [
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
    ],
    enviadas: [
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
    ],
  }),
  methods: {
    Confirmar: function (contacto) {
      this.contacto = contacto;
      this.estado = contacto.estadoRepublica;
    },
    Añadir: function () {
      this.correoContacto = "";
      this.activeAdd = true;
    },
  },
};
</script>