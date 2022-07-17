<template>
  <div class="center">
    <div class="content-data content-card space">
      <vs-row class="datos">
        <vs-col lg="3" sm="12" xs="12">
          <img
            class="photo"
            src="https://images.unsplash.com/photo-1593439411281-6500cf61961c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt=""
          />
        </vs-col>
        <vs-col lg="7" sm="12" xs="12" class="text-start">
          <h2 class="space">{{ candidato.nombre }}</h2>
          <p class="bg-gray">{{ candidato.correo }}</p>
          <p class="space">{{ candidato.titulo }}</p>
          <vs-row class="bg-gray">
            <vs-col lg="4" sm="12" xs="12"
              ><i class="bx bx-phone bg-primary p"></i
              >{{ candidato.telefono }}</vs-col
            >
            <vs-col lg="4" sm="12" xs="12"
              ><i class="bx bx-calendar bg-primary p"></i
              >{{ candidato.fecha }}</vs-col
            >
            <vs-col lg="4" sm="12" xs="12"
              ><i class="bx bx-map bg-primary p"></i
              >{{ candidato.estado }}</vs-col
            >
          </vs-row>
        </vs-col>

        <vs-button color="#1E88E5"> Editar perfil </vs-button>
        <vs-button icon color="#B13CD2">
          <i class="bx bx-download"></i>
        </vs-button>
      </vs-row>
    </div>
    <div class="space space-top content-card">
      <vs-row justify="space-between">
        <vs-col lg="5" sm="12" xs="12">
          <h2>Perfil profesional</h2>
          <div class="space-top content-data space datos text-start bg-gray">
            <p>{{ candidato.descripcion }}</p>
          </div>
        </vs-col>
        <vs-col lg="6" sm="12" xs="12">
          <h2>Estudios</h2>
          <div class="space-top content-data space datos text-start">
            <vs-row justify="space-between">
              <vs-col lg="1" sm="12" xs="12">
                <i class="bx bx-book bg-primary"></i>
              </vs-col>
              <vs-col lg="11" sm="12" xs="12">
                <p class="bold">{{ estudios.universidad }}</p>
                <p class="bg-gray">{{ estudios.titulo }}</p>
                <p class="bg-primary">Grado: {{ estudios.grado }}</p>
                <span class="badge-sec">{{ estudios.periodo }}</span>
              </vs-col>
            </vs-row>
          </div>
        </vs-col>
      </vs-row>
    </div>
    <div class="space space-top content-card">
      <h2 class="text-center">Perfil profesional</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> Puesto </vs-th>
                <vs-th> Tiempo </vs-th>
                <vs-th> Actividades que realizó </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(experiencia, page, max)"
                :data="tr"
              >
                <vs-td>
                  {{ tr.puesto }}
                </vs-td>
                <vs-td>
                  {{ tr.tiempo }}
                </vs-td>
                <vs-td>
                  {{ tr.actividades }}
                </vs-td>
                <template #expand>
                  <div class="con-content">
                    <vs-row justify="space-between">
                      <vs-col lg="10">
                        <p class="bold">{{ tr.puesto }}</p>
                      </vs-col>
                      <vs-button icon>
                        <i class="bx bx-lock-open-alt"></i>
                      </vs-button>
                    </vs-row>
                  </div>
                </template>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(experiencia, max)"
              />
            </template>
          </vs-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    active: 0,
    page: 1,
    max: 5,
    candidato: {
      nombre: "Michelle Rivera",
      correo: "michelle.rivera@example.com",
      titulo: "Grado de estudios: Administradora de base de datos (DBA)",
      telefono: "(225) 555-0118",
      fecha: "9/4/12",
      estado: "Morelos",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aenean praesent non donec adipiscing ullamcorper. Tincidunt id suspendisse id sit. Nisi sed diam est.",
    },
    estudios: {
      universidad: "Universidad del estado de Morelos",
      titulo: "Ingeniería en Manejo de Datos Computacionales",
      grado: "Ingeniería en TI y Data Cience",
      periodo: "2015-2020",
    },
    experiencia: [
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
      {
        puesto: "Analista de datos",
        tiempo: "2 años",
        actividades: "Análisis y manejo de Bigdata",
      },
    ],
  }),
};
</script>
<style>
img {
  border-radius: 100%;
  max-width: 170px;
  padding: 5px;
}

.content-data {
  border-radius: 20px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, var(--vs-shadow-opacity));
  background: rgba(var(--vs-background), 1);
}

.content-card {
  overflow: hidden;
  width: 90%;
  color: rgba(var(--vs-text), 1);
}

.datos {
  padding: 20px;
  text-align: center;
}

.text-start {
  text-align: start;
}

.text-center {
  text-align: center;
}

.space {
  margin-bottom: 10px;
}

.space-top {
  margin-top: 10px;
}

.item-list {
  margin-top: 20px;
  color: #6c7885;
}

.bold {
  font-weight: bold;
}

.bg-gray {
  color: #6c7885;
}

.bg-primary {
  color: #1e88e5;
}

.bg-sec {
  color: #b13cd2;
}

.long {
  width: 100%;
}

.p {
  margin-right: 5px;
  margin-top: 20px;
}

.badge-sec {
  padding: 1px;
  background: #b13cd2;
  color: #fff;
  display: inline-block;
  font-size: 0.9rem;
  border-radius: 5px;
  padding: 1px 5px;
}

.con-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>

