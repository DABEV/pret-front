<template>
  <div class="center">
    <div class="content-data content-card space">
      <vs-row justify="space-around" class="datos">
        <vs-col lg="2" sm="12" xs="12">
          <vs-avatar size="150" circle>
            <img
              src="https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
              alt=""
            />
          </vs-avatar>
        </vs-col>
        <vs-col lg="7" sm="12" xs="12" class="text-start">
          <h2 class="space">{{ candidato.nombre }}</h2>
          <p class="bg-gray">{{ candidato.correo }}</p>
          <p class="space">{{ candidato.titulo }}</p>
          <vs-row class="bg-gray">
            <vs-col lg="4" sm="12" xs="12">
              <vs-row class="p">
                <vs-col w="2" class="text-center">
                  <i class="bx bx-phone bg-primary"></i>
                </vs-col>
                <vs-col w="10">
                  <p>{{ candidato.telefono }}</p>
                </vs-col>
              </vs-row>
            </vs-col>
            <vs-col lg="4" sm="12" xs="12">
              <vs-row class="p">
                <vs-col w="2" class="text-center">
                  <i class="bx bx-calendar bg-primary"></i>
                </vs-col>
                <vs-col w="10">
                  <p>{{ candidato.fecha }}</p>
                </vs-col>
              </vs-row>
            </vs-col>
            <vs-col lg="4" sm="12" xs="12">
              <vs-row class="p">
                <vs-col w="2" class="text-center">
                  <i class="bx bx-map bg-primary"></i>
                </vs-col>
                <vs-col w="10">
                  <p>{{ candidato.estado }}</p>
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
        <vs-col lg="2" sm="12" xs="12">
          <vs-row justify="space-between">
            <vs-col lg="8" sm="5" xs="5">
              <vs-button color="#1E88E5"> Editar perfil </vs-button>
            </vs-col>
            <vs-col lg="4" sm="5" xs="5">
              <vs-button icon color="#B13CD2">
                <i class="bx bx-download"></i>
              </vs-button>
            </vs-col>
          </vs-row>
        </vs-col>
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
              <vs-col w="1" sm="2" xs="2">
                <i class="bx bx-book bg-primary"></i>
              </vs-col>
              <vs-col w="11" sm="10" xs="10">
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
      <h2 class="text-center">Experiencia laboral</h2>
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
    <div class="space space-top content-card">
      <vs-row justify="space-between">
        <vs-col lg="5" sm="12" xs="12">
          <h2>Idiomas de dominio</h2>
          <div class="space-top content-data space datos text-start bg-gray">
            <div
              :key="i"
              v-for="(idioma, i) in idiomas"
              :data="idioma"
              class="item"
            >
              <vs-row class="space">
                <vs-col lg="1" sm="2" xs="2" class="text-center space-top">
                  <i class="bx bx-world bg-primary"></i>
                </vs-col>
                <vs-col lg="8" sm="6" xs="6" class="space-top">
                  <p>{{ idioma.nombre }}</p>
                </vs-col>
                <vs-col lg="3" sm="4" xs="4" class="text-center space-top">
                  <span class="badge-sec">{{ idioma.nivel }}</span>
                </vs-col>
              </vs-row>
              <div class="divider">
                <span class="border"></span>
              </div>
            </div>
          </div>
        </vs-col>
        <vs-col lg="6" sm="12" xs="12">
          <h2>Conocimientos y habilidades</h2>
          <div class="space-top content-data space datos text-start bg-gray">
            <div
              :key="i"
              v-for="(hab, i) in habilidades"
              :data="hab"
              class="item"
            >
              <vs-row class="space">
                <vs-col lg="1" sm="2" xs="2" class="text-center space-top">
                  <i class="bx bx-book-open bg-primary"></i>
                </vs-col>
                <vs-col lg="11" sm="10" xs="10" class="space-top">
                  <p>{{ hab.nombre }}</p>
                </vs-col>
              </vs-row>
              <div class="divider">
                <span class="border"></span>
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
    <div class="space space-top content-card">
      <h2 class="text-center">Certificaciones</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> Nombre </vs-th>
                <vs-th> Empresa </vs-th>
                <vs-th> Obtención </vs-th>
                <vs-th> Caaducidad </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(certificaciones, page2, max)"
                :data="tr"
              >
                <vs-td>
                  {{ tr.nombre }}
                </vs-td>
                <vs-td>
                  {{ tr.empresa }}
                </vs-td>
                <vs-td>
                  {{ tr.inicio }}
                </vs-td>
                <vs-td>
                  {{ tr.fin }}
                </vs-td>
                <template #expand>
                  <div class="con-content">
                    <vs-row justify="space-between">
                      <vs-col lg="10">
                        <p class="bold">{{ tr.nombre }}</p>
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
                v-model="page2"
                :length="$vs.getLength(certificaciones, max)"
              />
            </template>
          </vs-table>
        </div>
      </div>
    </div>
    <div class="space space-top long">
      <h2 class="text-center">Cursos realizados</h2>
      <div class="text-start bg-gray">
        <div>
          <vs-card-group>
            <vs-card :key="i" :data="c" v-for="(c, i) in cursos">
              <template #title>
                <vs-row>
                  <vs-col lg="2" sm="3" xs="3">
                    <vs-avatar primary>
                      <i class="bx bxs-hot"></i>
                    </vs-avatar>
                  </vs-col>
                  <vs-col lg="10" sm="9" xs="9">
                    <h3>{{ c.nombre }}</h3>
                  </vs-col>
                </vs-row>
              </template>
              <template #text>
                <vs-row>
                  <vs-col w="8">
                    <p>Fecha: {{ c.fecha }}</p>
                  </vs-col>
                  <vs-col w="4" class="text-end">
                    <span class="badge-sec">{{ c.horas }}hrs</span>
                  </vs-col>
                </vs-row>
              </template>
            </vs-card>
          </vs-card-group>
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
    page2: 1,
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
        puesto: "Administrador de BD",
        tiempo: "11 meses",
        actividades: "Mantenimiento de BD",
      },
      {
        puesto: "Gerente de BD en la nube",
        tiempo: "1 año",
        actividades: "Monitoreo de bases en la nube",
      },
      {
        puesto: "Diseñador de BD relacionales",
        tiempo: "6 meses",
        actividades: "Maquetado y análisis de relaciones",
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
    idiomas: [
      {
        nombre: "Español",
        nivel: "Avanzado",
      },
      {
        nombre: "Inglés (USA)",
        nivel: "Medio",
      },
      {
        nombre: "Portugués",
        nivel: "Básico",
      },
      {
        nombre: "Alemán",
        nivel: "Básico",
      },
    ],
    habilidades: [
      {
        nombre: "Manejo de bases de datos",
      },
      {
        nombre: "Data science",
      },
      {
        nombre: "Manejo de Bigdata y machine learning",
      },
      {
        nombre: "Uso de servicios en la nube (AWS)",
      },
    ],
    certificaciones: [
      {
        nombre: "Analista de datos",
        empresa: "Microsoft",
        inicio: "8/15/17",
        fin: "8/15/20",
      },
      {
        nombre: "Administrador de BD",
        empresa: "Oracle",
        inicio: "8/21/17",
        fin: "8/21/20",
      },
      {
        nombre: "Industria 2.0",
        empresa: "Cisco",
        inicio: "8/15/17",
        fin: "8/15/20",
      },
      {
        nombre: "Manejo de AWS",
        empresa: "Amazon Web Services",
        inicio: "6/19/14",
        fin: "6/19/20",
      },
    ],
    cursos: [
      {
        nombre: "Fundamento de bases de datos",
        fecha: "12/4/17",
        empresa: "Platzi",
        horas: "12",
      },
      {
        nombre: "Fundamento de bases de datos",
        fecha: "12/4/17",
        empresa: "Platzi",
        horas: "12",
      },
      {
        nombre: "Fundamento de bases de datos",
        fecha: "12/4/17",
        empresa: "Platzi",
        horas: "12",
      },
      {
        nombre: "Fundamento de bases de datos",
        fecha: "12/4/17",
        empresa: "Platzi",
        horas: "12",
      },
    ],
  }),
};
</script>

