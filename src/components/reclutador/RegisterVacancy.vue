<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Publicar vacante nueva</h2>
      <div class="space-top content-data datos text-start">
        <div class="center">
          <vs-row justify="space-around">
            <vs-col class="vs-input2" lg="5" sm="12" xs="12">
              Título
              <vs-input
                primary
                block
                class="space"
                v-model="nombre"
                placeholder="Título de la postulación"
              >
                <template #icon><em class="bx bxs-notepad"></em></template>
              </vs-input>
              Tipo
              <vs-input
                primary
                block
                class="space"
                v-model="tipo"
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
                v-model="sueldoMin"
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
                v-model="fechaInicio"
              >
                <template #icon><em class="bx bxs-calendar"></em></template>
              </vs-input>
            </vs-col>
            <vs-col class="vs-input2" lg="5" sm="12" xs="12">
              Modalidad
              <vs-select
                class="space"
                block
                placeholder="Modalidad de trabajo"
                v-model="modalidad"
              >
                <vs-option label="Home Office" value="1">
                  Home Office
                </vs-option>
                <vs-option label="Planta" value="2"> Planta </vs-option>
                <vs-option label="Modalidad mixta" value="3">
                  Modalidad mixta
                </vs-option>
              </vs-select>
              Periodo de pago
              <vs-input
                primary
                v-model="periodoPago"
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
                v-model="sueldoMax"
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
                v-model="fechaVigencia"
              >
                <template #icon><em class="bx bxs-calendar"></em></template>
              </vs-input>
            </vs-col>
            <vs-col class="vs-input2" lg="11" sm="12" xs="12">
              Descripción
              <textarea v-model="descripcion" placeholder="Breve descripción">
              </textarea>
            </vs-col>
          </vs-row>
          <div class="button-center center">
            <vs-button block animation-type="vertical">
              Publicar vacante
              <template #animate>
                <em class="bx bx-log-in-circle"></em>&nbsp;Aceptar
              </template>
            </vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterVacancy",
  data: () => ({
    value: "",
    nombre: "",
    descripcion: "",
    modalidad: "",
    tipo: "",
    fechaInicio:"",
    fechaVigencia: "",
    sueldoMin: "",
    sueldoMax: "",
    periodoPago: "",
    reclutador: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombreEmpresa: "",
      estadoRepublicaEmpresa:{
        nombre:""
      },
    },
  }),
};
</script>

<style>
</style>