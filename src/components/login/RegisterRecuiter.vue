<template>
  <div class="center">
    <vs-col lg="4" sm="10" xs="10" class="center-content-25">
      <div class="content-data padding-xy">
        <h4>
          <strong>Registro de usuario</strong>
          <br />
          <img
            class="logo"
            alt="img"
            src="../../assets/img/logo.svg"
            style="width: 40px"
          />
        </h4>
        <vs-row justify="space-around">
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              block
              class="space"
              primary
              v-model="name"
              placeholder="Nombre"
            >
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="lastname"
              placeholder="Apellidos"
            >
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="stance"
              placeholder="Puesto de trabajo"
            >
              <template #icon><em class="bx bxs-briefcase"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="company"
              placeholder="Empresa"
            >
              <template #icon><em class="bx bxs-buildings"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12">
            <vs-select
              class="space"
              block
              placeholder="Estado de recidencia"
              v-model="value"
            >
              <vs-option label="Morelos" value="1"> Morelos </vs-option>
              <vs-option label="Puebla" value="2"> Puebla </vs-option>
              <vs-option label="Sonora" value="3"> Sonora </vs-option>
            </vs-select>
            <vs-input
              block
              class="space"
              primary
              v-model="email"
              placeholder="ejemplo@gmail.com"
            >
              <template #icon> @ </template>
            </vs-input>
            <vs-input
              primary
              block
              class="space"
              type="password"
              v-model="value"
              placeholder="Contraseña"
            >
              <template #icon><em class="bx bxs-lock-alt"></em></template>
            </vs-input>
            <vs-input
              primary
              block
              class="space"
              type="password"
              v-model="password"
              placeholder="Confirmar contraseña"
            >
              <template #icon><em class="bx bxs-lock-alt"></em></template>
            </vs-input>
          </vs-col>
        </vs-row>
        <br />
        <vs-row justify="space-around">
          <vs-col w="4">
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
      </div>
    </vs-col>
  </div>
</template>
<!--<template>
  <vs-row>
    <vs-col>
      <vs-card class="content-login">
        <template #title>
          <h4>
            <strong>Registro de reclutador</strong>
            <br />
            <img
              alt="img"
              class="logo"
              src="../../assets/img/logo.svg"
              style="width: 40px"
            />
          </h4>
        </template>
        <template #text>
          <div class="con-form">
            <vs-input
              block
              class="space"
              primary
              v-model="name"
              placeholder="Nombre"
            >
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="lastname"
              placeholder="Apellidos"
            >
              <template #icon><em class="bx bxs-user"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="stance"
              placeholder="Puesto de trabajo"
            >
              <template #icon><em class="bx bxs-briefcase"></em></template>
            </vs-input>
            <vs-input
              block
              class="space"
              primary
              v-model="company"
              placeholder="Empresa"
            >
              <template #icon><em class="bx bxs-buildings"></em></template>
            </vs-input>
            <vs-select
              class="space"
              block
              placeholder="Estado en el que reside"
              v-model="value"
            >
              <vs-option label="Morelos" value="1"> Morelos </vs-option>
              <vs-option label="Puebla" value="2"> Puebla </vs-option>
              <vs-option label="Sonora" value="3"> Sonora </vs-option>
            </vs-select>
            <vs-input
              block
              class="space"
              primary
              v-model="email"
              placeholder="ejemplo@gmail.com"
            >
              <template #icon> @ </template>
            </vs-input>
            <vs-input
              block
              class="space"
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
          <vs-row justify="space-around">
            <vs-col w="6">
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
</template>-->

<script>
export default {
  name: "RegisterRecuiter",
  data: () => ({
    value: "",
    placeholder: "",
    name: "",
    lastname: "",
    stance: "",
    company: "",
    email: "",
    password: "",
  }),
};
</script>

<style>
</style>
