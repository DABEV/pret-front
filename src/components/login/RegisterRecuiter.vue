<template>
  <vs-row>
    <vs-col>
      <vs-card type="1">
        <template #title>
          <h4>
            <strong>Registro de reclutador</strong>
            <br />
            <img alt="img" src="../../assets/img/logo.svg" style="width: 25px" />
          </h4>
        </template>
        <template #text>
          <div class="con-form">
            <vs-input primary v-model="name" placeholder="Nombre">
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input primary v-model="lastname" placeholder="Apellidos">
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input primary v-model="stance" placeholder="Puesto de trabajo">
              <template #icon><em class="bx bxs-briefcase"></em></template>
            </vs-input>
            <vs-input primary v-model="company" placeholder="Empresa">
              <template #icon><em class="bx bxs-buildings"></em></template>
            </vs-input>
            <vs-select placeholder="Estado en el que reside" v-model="value">
                <vs-option label="Morelos" value="1">
                Morelos
                </vs-option>
                <vs-option label="Puebla" value="2">
                Puebla
                </vs-option>
                <vs-option label="Sonora" value="3">
                Sonora
                </vs-option>
            </vs-select>
            <vs-input primary v-model="email" placeholder="ejemplo@gmail.com">
              <template #icon> @ </template>
            </vs-input>
            <vs-input
              primary
              type="password"
              v-model="password"
              placeholder="********"
            >
              <template #icon>
                <em class="bx bxs-lock-alt"></em>
              </template>
            </vs-input>
          </div>
        </template>
        <template #buttons>
          <vs-row>
            <vs-col offset="4" w="6">
              <vs-button block animation-type="vertical">
                Crear cuenta
                <template #animate>
                  <em class="bx bx-log-in-circle"></em>&nbsp;Registrarse
                </template>
              </vs-button>
            </vs-col>
          </vs-row>
          <br />
          <div class="new">
            Ya dispones de una cuenta?
            <br />
            <a href="#">Inicia sesión</a>
          </div>
          <br />
        </template>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "RegisterRecuiter",
  data:() => ({
        value: '',
        placeholder: '',
        name: '',
        lastname: '',
        stance: '',
        company: '',
        email: '',
        password: '',
  })
};
</script>

<style>
@media screen {
  .vs-card {
    width: 400px;
  }
}

.con-form {
  width: 100%;
  align-items: center;
}
.vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.vs-input {
  width: 100%;
}
.vs-select-content {
    margin: 10px 0px;
    margin-left: 5px;
}
.vs-select {
  width: 155%;
}
.vs-button {
  margin: 0px;
  width: 75%;
}
body {
  font-family: "Poppins";
}
</style>
