<template>
  <div class="center">
    <div class="space space-top content-card">
      <vs-row justify="space-between">
        <vs-col lg="7" sm="12" xs="12" class="text-center">
          <div>
            <div class="content-data">
              <vs-row class="margin-top-avatar" justify="space-around">
                <vs-col lg="3" sm="12" xs="12" class="space-top">
                  <p class="text-item bg-primary">
                    Teléfono
                    <small class="bold bg-gray">{{
                      reclutador.telefono
                    }}</small>
                  </p>
                </vs-col>
                <vs-col lg="4" sm="12" xs="12" class="center-item">
                  <vs-avatar primary circle size="100" class="avatar-top-card">
                    <i class="bx bx-user-pin avatar-lg-icon"></i>
                  </vs-avatar>
                </vs-col>
                <vs-col lg="3" sm="12" xs="12">
                  <p class="text-item bg-primary">
                    Estado
                    <small class="bold bg-gray">
                      {{ reclutador.estadoRepublica.nombre }}
                    </small>
                  </p>
                </vs-col>
              </vs-row>
              <h3 class="space-top">
                {{ reclutador.nombre }} {{ reclutador.apellidoMaterno }}
                {{ reclutador.apellidoPaterno }}
              </h3>
              <p class="bg-gray">{{ reclutador.correoElectronico }}</p>
              <div class="center-item space">
                <div class="content-card">
                  <div class="divider space space-top">
                    <span class="border"></span>
                  </div>
                  <vs-row justify="space-around" class="space">
                    <vs-col lg="1" sm="2" xs="2" class="center-item">
                      <vs-avatar color="#b13cd2" size="30">
                        <i class="bx bxs-graduation"></i>
                      </vs-avatar>
                    </vs-col>
                    <vs-col
                      lg="10"
                      sm="9"
                      xs="9"
                      class="center-item text-start"
                    >
                      <p>Puesto: {{ reclutador.puesto.nombre }}</p>
                    </vs-col>
                  </vs-row>
                  <div class="divider space space-top">
                    <span class="border"></span>
                  </div>
                </div>
                <div class="content-card">
                  <vs-row justify="space-around" class="space">
                    <vs-col lg="1" sm="2" xs="2" class="center-item">
                      <vs-avatar color="#1E88E5" size="30">
                        <i class="bx bxs-cake"></i>
                      </vs-avatar>
                    </vs-col>
                    <vs-col
                      lg="10"
                      sm="9"
                      xs="9"
                      class="center-item text-start"
                    >
                      <p>
                        Fecha de nacimiento: {{ reclutador.fechaNacimiento }}
                      </p>
                    </vs-col>
                  </vs-row>
                </div>
                <vs-col lg="2" sm="6" xs="6" class="space">
                  <vs-button color="#b13cd2" block @click="IrEditar()">
                    Editar perfil
                  </vs-button>
                </vs-col>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-col lg="4" sm="12" xs="12" class="margin-top-avatar">
          <div class="content-data space datos text-start bg-gray">
            <div class="center-item space">
              <div class="content-card">
                <vs-row>
                  <vs-col lg="4">
                    <vs-avatar primary circle size="60">
                      <i class="bx bxs-buildings"></i>
                    </vs-avatar>
                  </vs-col>
                  <vs-col lg="8">
                    <p class="bold">Empresa: {{ reclutador.nombreEmpresa }}</p>
                    <p>
                      Estado: {{ reclutador.estadoRepublicaEmpresa.nombre }}
                    </p>
                  </vs-col>
                </vs-row>
                <div class="divider space space-top">
                  <span class="border"></span>
                </div>
                <div class="callout-seccess">
                  <p>
                    Vacantes:
                    <small>{{ reclutador.vacantes.length }} publicadas</small>
                  </p>
                </div>
                <vs-row justify="center">
                  <vs-col lg="5" sm="6" xs="6" class="space">
                    <vs-button success block @click="IrVacantes()">
                      Ir a las vacantes
                    </vs-button>
                  </vs-col>
                </vs-row>
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>

    <vs-dialog prevent-close scroll width="600px" v-model="active">
      <template #header>
        <h4>Editar perfil</h4>
      </template>
      <div class="margin-xy space">
        <h4 class="text-start bg-gray">Datos personales</h4>
        <vs-input
          class="space-top"
          placeholder="Puesto"
          v-model="puesto.nombre"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-briefcase"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between" class="space-top">
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              class="space-top space"
              placeholder="Teléfono"
              v-model="reclutadorEditado.telefono"
              color="#1e88e5"
              block
            >
              <template #icon>
                <i class="bx bxs-phone"></i>
              </template>
            </vs-input>
          </vs-col>
          <vs-col lg="6" sm="12" xs="12">
            <div class="input-icon">
              <span><i class="bx bxs-map"></i> </span>
              <select
                class="select-custom space-top space"
                placeholder="Estado"
                v-model="reclutadorEditado.estadoRepublica"
              >
                <option
                  class="select-option"
                  v-for="(edo, i) in estados"
                  :key="i"
                  :value="edo"
                >
                  {{ edo.nombre }}
                </option>
              </select>
            </div>
          </vs-col>
        </vs-row>
        <h4 class="text-start bg-gray">Empresa</h4>
        <vs-row justify="space-between" class="space-top">
          <vs-col lg="5" sm="12" xs="12">
            <vs-input
              class="space-top space"
              placeholder="Nombre"
              v-model="reclutadorEditado.nombreEmpresa"
              color="#1e88e5"
              block
            >
              <template #icon>
                <i class="bx bxs-buildings"></i>
              </template>
            </vs-input>
          </vs-col>
          <vs-col lg="6" sm="12" xs="12">
            <div class="input-icon">
              <span><i class="bx bxs-map"></i> </span>
              <select
                class="select-custom space-top space"
                placeholder="Estado"
                v-model="reclutadorEditado.estadoRepublicaEmpresa"
              >
                <option
                  class="select-option"
                  v-for="(edo, i) in estados"
                  :key="i"
                  :value="edo"
                >
                  {{ edo.nombre }}
                </option>
              </select>
            </div>
          </vs-col>
        </vs-row>
        <br />
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="4" sm="12" xs="12" class="space-top center-item">
            <vs-button dark transparent block @click="Cancelar()"
              >Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="4" sm="12" xs="12" class="space-top center-item">
            <vs-button success block @click="Guardar()"> Guardar cambios </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  name: "Profile",
  data: () => ({
    active: false,
    reclutador: {
      nombre: "Michelle",
      apellidoPaterno: "Rivera",
      apellidoMaterno: "Solaz",
      correoElectronico: "michelle.rivera@example.com",
      habilitado: true,
      telefono: "(225) 555-0118",
      fechaNacimiento: "9/4/12",
      estadoRepublica: {
        nombre: "Morelos",
      },
      puesto: {
        nombre: "Gerente de Recursos humanos",
      },
      nombreEmpresa: "Oracle",
      estadoRepublicaEmpresa: {
        nombre: "Morelos",
      },
      vacantes: [
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
      ],
    },
    puesto: {},
    reclutadorEditado: {
      tnombre: "Michelle",
      apellidoPaterno: "Rivera",
      apellidoMaterno: "Solaz",
      correoElectronico: "michelle.rivera@example.com",
      habilitado: true,
      telefono: "(225) 555-0118",
      fechaNacimiento: "9/4/12",
      estadoRepublica: {
        nombre: "Morelos",
      },
      puesto: {
        nombre: "Gerente de Recursos humanos",
      },
      nombreEmpresa: "Oracle",
      estadoRepublicaEmpresa: {
        nombre: "Morelos",
      },
      vacantes: [
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
        {
          nombre: "",
          descripcion: "",
          modalidad: "",
          tipo: "",
          fechaInicio: "",
          fechaVigencia: "",
          sueldoMin: "",
          sueldoMax: "",
          periodoPago: "",
          reclutador: {},
        },
      ],
    },
    estados: [
      {
        nombre: "Cohahuila",
      },
      {
        nombre: "Morelos",
      },
      {
        nombre: "Sonora",
      },
      {
        nombre: "Nayarit",
      },
      {
        nombre: "Tamaulipas",
      },
      {
        nombre: "Querétaro",
      },
    ],
    vacio: {
      telefono: "",
      fechaNacimiento: "",
      estadoRepublica: {
        nombre: "",
      },
      puesto: {
        nombre: "",
      },
      nombreEmpresa: "",
      estadoRepublicaEmpresa: {
        nombre: "",
      },
    },
  }),
  methods: {
    IrEditar: function () {
      //petición por id
      this.puesto = this.reclutadorEditado.puesto;
      this.active = !this.active;
    },
    IrVacantes: function () {
      this.$router.push('/reclutador/vacantes') 
    },
    Guardar: function () {
      this.reclutadorEditado.puesto = this.puesto;
      this.active = false;
    },
    Cancelar: function () {
      this.active = false;
    },
  },
};
</script>