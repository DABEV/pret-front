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
            <vs-col lg="1" sm="2" xs="2" class="space-top">
              <vs-tooltip v-if="isPending">
                <vs-button
                  icon
                  animation-type="rotate"
                  success
                  @click="(active = !active), Confirmar(c)"
                >
                  <i class="bx bx-user-check"></i>
                  <template #animate>
                    <i class="bx bxs-user-check"></i>
                  </template>
                </vs-button>
                <template #tooltip> Aceptar </template>
              </vs-tooltip>
            </vs-col>
          </vs-row>
          <div class="divider">
            <span class="border"></span>
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
          ¿Seguro de aceptar la solicitud de <b>{{ contacto.nombre }}</b>?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button success @click="active = false" block> Aceptar </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button transparent dark @click="active = false" block>
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import ContactDetailDialog from "../dialogsContactos/ContactDetailDialog.vue";

export default {
  name: "SentContactList",
  data: () => ({
    active: false,
    detalles: false,
    page: 1,
    max: 5,
    contacto: {},
    estado: {},
  }),
  methods: {
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
  },
  components: { ContactDetailDialog },
  props: {
    search: String,
    contactos: Array,
    titulo: String,
    isPending: Boolean,
  },
};
</script>