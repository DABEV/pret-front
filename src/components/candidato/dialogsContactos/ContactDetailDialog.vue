<template>
  <div>
    <vs-dialog class="text-center" @close="CloseDetails" v-model="detalles">
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
  </div>
</template>

<script>
export default {
  name: "ContactDetailDialog",
  data: () => ({}),
  methods: {
    CloseDetails: function () {
      this.$emit("CloseDetails");
    },
  },
  props: {
    detalles: Boolean,
    contacto: Object,
    estado: Object,
  },
};
</script>

<style>
</style>