<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Lista de contactos</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <vs-row justify="space-between">
          <vs-col lg="5" sm="12" xs="12">
            <vs-row>
              <vs-col lg="2" sm="4" xs="4">
                <vs-tooltip>
                  <vs-button
                    @click="(active2 = !active2), Enviar(c)"
                    icon
                    animation-type="vertical"
                    color="#B13CD2"
                  >
                    <em class="bx bx-user-plus"></em>
                    <template #animate
                      ><em class="bx bxs-user-plus"></em
                    ></template>
                  </vs-button>
                  <template #tooltip> Añadir contacto </template>
                </vs-tooltip>
              </vs-col>
              <vs-col lg="9" sm="7" xs="7">
                <p>Comparte vacantes entre todos tus contactos</p>
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
          <vs-row class="space">
            <vs-col lg="1" sm="3" xs="3" class="text-center space-top">
              <vs-avatar size="50">
                <img :src="c.img" alt="" />
              </vs-avatar>
            </vs-col>
            <vs-col lg="9" sm="9" xs="9" class="space-top">
              <p>
                <b>{{ c.nombre }} {{ c.apellido1 }} {{ c.apellido2 }}</b>
              </p>
              <small>{{ c.correo }}</small>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="space-top">
              <vs-tooltip>
                <vs-button
                  @click="(active3 = !active3), Confirmar(c)"
                  icon
                  animation-type="vertical"
                  color="#009ACB"
                >
                  <i class="bx bx-user-plus"></i>
                  <template #animate><i class="bx bxs-user-plus"></i></template>
                </vs-button>
                <template #tooltip> Ver perfil </template>
              </vs-tooltip>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="space-top">
              <vs-tooltip>
                <vs-button icon animation-type="vertical" color="#009ACB">
                  <i class="bx bx-show"></i>
                  <template #animate><i class="bx bxs-show"></i></template>
                </vs-button>
                <template #tooltip> Ver perfil </template>
              </vs-tooltip>
            </vs-col>
            <vs-col lg="1" sm="3" xs="3" class="space-top">
              <vs-tooltip>
                <vs-button
                  icon
                  animation-type="rotate"
                  danger
                  @click="(active = !active), Confirmar(c)"
                >
                  <i class="bx bx-trash-alt"></i>
                  <template #animate><i class="bx bxs-trash-alt"></i></template>
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
    <!-- Enviar vacante -->
    <vs-dialog width="450px" class="text-center" v-model="active2">
      <template #header>
        <vs-col>
          <h4><b>Compartir</b></h4>
          <vs-input v-model="search" color="#1e88e5" block placeholder="Buscar">
            <template #icon>
              <em class="bx bx-search"></em>
            </template>
          </vs-input>
        </vs-col>
      </template>
      <vs-select
        label="Group Multiple Filter"
        filter
        block
        multiple
        placeholder="Group Multiple Filter"
        v-model="value3"
      >
        <vs-option-group>
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
            <vs-option  value="0" label="xx">
              <b>{{ c.correo }}</b>
            </vs-option>
          </div>
        </vs-option-group>
      </vs-select>

      <div class="space-top content-data space datos text-start bg-gray">
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
          <vs-row class="space">
            <vs-col lg="2" sm="3" xs="3" class="text-center space-top">
              <vs-avatar size="50">
                <img :src="c.img" alt="" />
              </vs-avatar>
            </vs-col>
            <vs-col lg="7" sm="9" xs="9" class="space-top">
              <p>
                <small>{{ c.correo }}</small>
                <!-- <b>{{ c.nombre }} {{ c.apellido1 }} {{ c.apellido2 }}</b> -->
              </p>
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
    <!-- añadir contacto -->
    <vs-dialog width="450px" class="text-center" v-model="active3">
      <template #header>
        <h4><b>Confirmación</b></h4>
      </template>
      <div class="text-gray">
        <p>
          Espera a que <b>{{ contacto.nombre }}</b> acepte tu solicitud
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button success @click="active = false" block>
              Aceptar
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
    active2: false,
    active3: false,
    value3: ['1'],
    page: 1,
    max: 5,
    search: "",
    contacto: {},
    contactos: [
      {
        nombre: "Cameron",
        apellido1: "Williamson",
        apellido2: "Warren",
        correo: "cameron@example.com",
        telefono: "(704) 555-0127",
        img: "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      },
      {
        nombre: "Esther",
        apellido1: "Howard",
        apellido2: "Simmons",
        correo: "esther@example.com",
        telefono: "(907) 555-0101",
        img: "https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=562&q=80",
      },
      {
        nombre: "Robert",
        apellido1: "Warren",
        apellido2: "Hawkins",
        correo: "robert@example.com",
        telefono: "(217) 555-0113",
        img: "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80",
      },
      {
        nombre: "Alexander",
        apellido1: "Edwards",
        apellido2: "Wade",
        correo: "alexander@example.com",
        telefono: "(308) 555-0121",
        img: "https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=558&q=80",
      },
      {
        nombre: "Leslie",
        apellido1: "Brooklyn",
        apellido2: "Williamson",
        correo: "leslie@example.com",
        telefono: "(302) 555-0107",
        img: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      },
      {
        nombre: "Ralph",
        apellido1: "Williamson",
        apellido2: "Fox",
        correo: "ralph@example.com",
        telefono: "(702) 555-0122",
        img: "https://images.unsplash.com/photo-1483995564125-85915c11dcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=641&q=80",
      },
    ],
  }),
  methods: {
    Confirmar: function (contacto) {
      this.contacto = contacto;
    },
    // Enviar: function (contacto){
    //   this.contacto = contacto;
    // }
  },
};
</script>