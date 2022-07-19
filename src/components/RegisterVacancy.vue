<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Publicar vacante nueva</h2>
      <div class="space-top content-data datos text-start">
        <div class="center">
          <vs-row justify="space-around">
            <vs-col lg="6" sm="12" xs="12">
                Título
              <vs-input primary v-model="name" placeholder="Título de la postulación">
                <template #icon><em class="bx bxs-notepad"></em></template>
              </vs-input>
                Tipo
              <vs-input primary v-model="lastname" placeholder="Horario de trabajo">
                <template #icon><em class="bx bxs-time-five"></em></template>
              </vs-input>
                Sueldo mínimo
              <vs-input primary type="number" v-model="phone" placeholder="$$$">
                <template #icon><em class="bx bx-money"></em></template>
              </vs-input>
                Fecha inicio
              <vs-input type="date" primary v-model="birthdate">
                <template #icon><em class="bx bxs-calendar"></em></template>
              </vs-input>
            </vs-col>
            <vs-col lg="6" sm="12" xs="12">
                Modalidad
              <vs-select block placeholder="Modalidad de trabajo" v-model="value">
                <vs-option label="Home Office" value="1"> Home Office </vs-option>
                <vs-option label="Planta" value="2"> Planta </vs-option>
                <vs-option label="Modalidad mixta" value="3"> Modalidad mixta </vs-option>
              </vs-select>
                Periodo de pago
              <vs-input
                primary
                v-model="career"
                placeholder="Lapso de pago"
              >
                <template #icon><em class="bx bxs-graduation"></em></template>
              </vs-input>
                Sueldo máximo
              <vs-input type="number" primary v-model="email" placeholder="$$$">
                <template #icon><em class="bx bx-money"></em></template>
              </vs-input>
                Fecha vigencia
              <vs-input type="date" primary v-model="birthdate">
                <template #icon><em class="bx bxs-calendar"></em></template>
              </vs-input>
            </vs-col>
            <vs-col lg="12" sm="12" xs="12">
                Descripción
                <br>
                <textarea
                    v-model="description"
                    placeholder="Breve descripción"
                ></textarea>
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
        value: '',
  }),
};
</script>

<style>
textarea{
    display: flex;
    border-radius: 12px;
    border: 2px solid transparent;
    background: #f4f7f8;
    font-family: "Poppins";
    margin-top: 20px;
    padding: 20px;
    width: 100%;
}
textarea::placeholder{
    color: #b5bdc3;
    visibility: visible;
    pointer-events: auto;
}
.button-center{
    width: 30%;
    padding: 20px;
}
</style>