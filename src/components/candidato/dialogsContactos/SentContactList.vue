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
            <vs-col lg="10" sm="9" xs="9" class="space-top">
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
  props: { search: String, contactos: Array, titulo: String },
};
</script>