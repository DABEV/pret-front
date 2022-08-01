<template>
  <div class="center">
    <div class="space content-card">
      <vs-row justify="space-between">
        <vs-col lg="4" sm="12" xs="12" class="margin-top-avatar">
          <div class="content-data space datos text-start bg-gray">
            <div class="center-item">
              <vs-avatar circle size="150" class="avatar-top-card">
                <img :src="candidato.foto" alt="" />
              </vs-avatar>
            </div>
            <h3 class="space-top text-center">
              {{ candidato.nombre }} {{ candidato.apellidoMaterno }}
              {{ candidato.apellidoPaterno }}
            </h3>
            <p class="bg-gray text-center">{{ candidato.correoElectronico }}</p>
            <div class="divider space space-top">
              <span class="border"></span>
            </div>
            <vs-row justify="center" class="space">
              <vs-col lg="2" sm="4" xs="4" class="center-item">
                <vs-avatar color="#b13cd2" size="30">
                  <i class="bx bxs-cake"></i>
                </vs-avatar>
              </vs-col>
              <vs-col lg="7" sm="8" xs="8" class="text-start">
                <small>
                  Fecha de nacimiento: {{ candidato.fechaNacimiento }}
                </small>
              </vs-col>
            </vs-row>
            <div class="divider space space-top">
              <span class="border"></span>
            </div>
            <div class="center-item space-top">
              <vs-button color="#1E88E5"> Cambiar foto </vs-button>
            </div>
          </div>
        </vs-col>
        <vs-col lg="7" sm="12" xs="12" class="text-center">
          <div class="content-data margin-top-avatar">
            <vs-row justify="flex-end">
              <vs-col lg="4" sm="12" xs="12" class="space-top center-item">
                <vs-button success> Guardar cambios </vs-button>
              </vs-col>
            </vs-row>
            <div class="margin-xy space">
              <h4 class="text-start bg-gray">Datos personales</h4>
              <vs-input
                class="space-top"
                placeholder="Título curricular"
                v-model="candidato.tituloCurricular"
                color="#1e88e5"
                block
              >
                <template #icon>
                  <i class="bx bxs-graduation"></i>
                </template>
              </vs-input>
              <vs-row justify="space-between" class="space-top">
                <vs-col lg="5" sm="12" xs="12">
                  <vs-input
                    class="space-top space"
                    placeholder="Teléfono"
                    v-model="candidato.telefono"
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
                      v-model="candidato.estadoRepublica"
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
              <textarea
                class="space space-top"
                v-model="candidato.descripcionPerfil"
                placeholder="Descripción de tu perfil profesional"
              >
              </textarea>
              <br />
            </div>
          </div>
        </vs-col>
      </vs-row>
      <div class="text-center bg-gray">
        <div>
          <vs-card-group>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" primary class="space-top">
                    <i class="bx bxs-hot"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Conocimientos</h4>
                <small>
                  Guardados:
                  {{ candidato.conocimientosHabilidades.conocimientos.length }}
                </small>
                <div class="center-item">
                  <vs-button success @click="activeCon = !activeCon">
                    Añadir conocimiento
                  </vs-button>
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" color="#b13cd2" class="space-top">
                    <i class="bx bxs-hard-hat"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Habilidades</h4>
                <small>
                  Guardados:
                  {{ candidato.conocimientosHabilidades.habilidades.length }}
                </small>
                <div class="center-item">
                  <vs-button success @click="activeHab = !activeHab">
                    Añadir habilidad
                  </vs-button>
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" primary class="space-top">
                    <i class="bx bxs-book-bookmark"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Estudios</h4>
                <small>
                  Guardados:
                  {{ candidato.estudios.length }}
                </small>
                <div class="center-item">
                  <vs-button success @click="activeEst = !activeEst">
                    Añadir estudio
                  </vs-button>
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" color="#b13cd2" class="space-top">
                    <i class="bx bxs-briefcase"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Experiencia</h4>
                <small>
                  Guardados:
                  {{ candidato.experienciasLaborales.length }}
                </small>
                <div class="center-item">
                  <vs-button success @click="activeExp = !activeExp">
                    Añadir experiencia
                  </vs-button>
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" primary class="space-top">
                    <i class="bx bxs-book-bookmark"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Certificación</h4>
                <small>
                  Guardados:
                  {{ candidato.certificaciones.length }}
                </small>
                <div class="center-item">
                  <vs-button success @click="activeCer = !activeCer">
                    Añadir certificación
                  </vs-button>
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" color="#b13cd2" class="space-top">
                    <i class="bx bxs-book-bookmark"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Idiomas</h4>
                <small>
                  Guardados:
                  {{ candidato.idiomas.length }}
                </small>
                <div class="center-item">
                  <vs-button success @click="activeIdi = !activeIdi">
                    Añadir idioma
                  </vs-button>
                </div>
              </template>
            </vs-card>
            <vs-card>
              <template #text>
                <div class="center-item">
                  <vs-avatar size="50" primary class="space-top">
                    <i class="bx bxs-book-bookmark"></i>
                  </vs-avatar>
                </div>
                <h4 class="space-top">Curso</h4>
                <small>
                  Guardados:
                  {{ candidato.cursos.length }}
                </small>
                <div class="center-item">
                  <vs-button success @click="activeCur = !activeCur">
                    Añadir curso
                  </vs-button>
                </div>
              </template>
            </vs-card>
          </vs-card-group>
        </div>
      </div>
    </div>

    <vs-dialog v-model="activeCon">
      <template #header>
        <h2>Añadir Conocimiento</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nuevo conocimiento"
          v-model="conocimiento"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-graduation"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeCon = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button primary block @click="enviarCon()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog v-model="activeHab">
      <template #header>
        <h2>Añadir Habilidad</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nueva habilidad"
          v-model="habilidad"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-hard-hat"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeHab = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button primary block @click="enviarHab()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog scroll width="600px" v-model="activeEst">
      <template #header>
        <h2>Añadir Estudio</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Carrera"
          v-model="estudio.carrera"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-book-bookmark"></i>
          </template>
        </vs-input>
        <vs-input
          class="space-top space"
          placeholder="Universidad"
          v-model="estudio.universidad"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-buildings"></i>
          </template>
        </vs-input>
        <vs-input
          class="space-top space"
          placeholder="Grado académico"
          v-model="estudio.gradoAcademico"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-graduation"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between">
          <vs-col lg="5">
            <small>Inicio</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="estudio.fechaInicio"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <small>Fin</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="estudio.fechaFin"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeEst = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarEst()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog scroll width="600px" v-model="activeExp">
      <template #header>
        <h2>Añadir Experiencia</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Puesto"
          v-model="experiencia.puesto"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-briefcase"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between">
          <vs-col lg="5">
            <small>Inicio</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="experiencia.fechaInicio"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <small>Fin</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="experiencia.fechaFin"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <textarea
            class="space space-top"
            v-model="experiencia.actividadesRealizadas"
            placeholder="Actividades realizadas"
          >
          </textarea>
        </vs-row>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeExp = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarExp()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog scroll width="600px" v-model="activeCer">
      <template #header>
        <h2>Añadir Certificación</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nombre"
          v-model="certificado.nombre"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-purchase-tag-alt"></i>
          </template>
        </vs-input>
        <vs-input
          class="space-top space"
          placeholder="Empresa"
          v-model="certificado.empresa"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-buildings"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between">
          <vs-col lg="5">
            <small>Obtención</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="certificado.fechaObtencion"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <small>Caducidad</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="experiencia.fechaCaducidad"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeCer = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarCer()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog v-model="activeIdi">
      <template #header>
        <h2>Añadir Idioma</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nombre"
          v-model="idioma.nombre"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bx-world"></i>
          </template>
        </vs-input>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeIdi = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarIdi()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>

    <vs-dialog scroll width="600px" v-model="activeCur">
      <template #header>
        <h2>Añadir Curso</h2>
      </template>
      <div class="margin-xy space space-top">
        <vs-input
          class="space-top space"
          placeholder="Nombre"
          v-model="curso.nombre"
          color="#1e88e5"
          block
        >
          <template #icon>
            <i class="bx bxs-purchase-tag-alt"></i>
          </template>
        </vs-input>
        <vs-row justify="space-between">
          <vs-col lg="5">
            <vs-input
              class="space-top space"
              placeholder="Empresa"
              v-model="curso.empresa"
              color="#1e88e5"
              block
            >
              <template #icon>
                <i class="bx bxs-buildings"></i>
              </template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <vs-input
              class="space-top space"
              placeholder="No. Hrs"
              type="number"
              v-model="curso.numeroHoras"
              color="#1e88e5"
              min="1"
              block
            >
              <template #icon>
                <i class="bx bx-time"></i>
              </template>
            </vs-input>
          </vs-col>
        </vs-row>
        <vs-row justify="space-between">
          <vs-col lg="5">
            <small>Obtención</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="certificado.fechaObtencion"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
          <vs-col lg="5">
            <small>Caducidad</small>
            <vs-input
              type="date"
              block
              class="input-date"
              primary
              v-model="experiencia.fechaCaducidad"
            >
              <template #icon><em class="bx bxs-calendar"></em></template>
            </vs-input>
          </vs-col>
        </vs-row>
      </div>
      <template #footer>
        <vs-row justify="center">
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button transparent dark @click="activeCur = false" block>
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col lg="5" sm="12" xs="12" class="space-top center-item">
            <vs-button block primary @click="enviarCur()">
              Enviar datos
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  name: "EditProfile",
  data: () => ({
    activeCon: false,
    activeHab: false,
    activeEst: false,
    activeExp: false,
    activeIdi: false,
    activeCer: false,
    activeCur: false,
    success: false,
    error: false,
    progress: 0,
    estado: {},
    idioma: {
      nombre: "",
    },
    estudio: {
      universidad: "",
      carrera: "",
      gradoAcademico: "",
      fechaInicio: "",
      fechaFin: "",
    },
    experiencia: {
      puesto: "",
      fechaInicio: "",
      fechaFin: "",
      actividadesRealizadas: "",
    },
    certificado: {
      nombre: "",
      empresa: "",
      fechaObtencion: "",
      fechaCaducidad: "",
    },
    curso: {
      nombre: "",
      fechaObtencion: "",
      empresa: "",
      numeroHoras: "",
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
    conocimiento: "",
    habilidad: "",
    candidato: {
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
      tituloCurricular: "Administradora de base de datos (DBA)",
      descripcionPerfil:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aenean praesent non donec adipiscing ullamcorper. Tincidunt id suspendisse id sit. Nisi sed diam est.",
      foto: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      conocimientosHabilidades: {
        conocimientos: ["Laravel", "PHP", "Java", "MySQL"],
        habilidades: ["Analista", "Trabajo en Equipo"],
      },
      cursos: [
        {
          nombre: "Fundamento de bases de datos",
          fechaObtencion: "12/4/17",
          empresa: "Platzi",
          numeroHoras: "12",
        },
        {
          nombre: "Fundamento de bases de datos",
          fechaObtencion: "12/4/17",
          empresa: "Platzi",
          numeroHoras: "12",
        },
        {
          nombre: "Fundamento de bases de datos",
          fechaObtencion: "12/4/17",
          empresa: "Platzi",
          numeroHoras: "12",
        },
        {
          nombre: "Fundamento de bases de datos",
          fechaObtencion: "12/4/17",
          empresa: "Platzi",
          numeroHoras: "12",
        },
      ],
      experienciasLaborales: [
        {
          puesto: "Analista de datos",
          fechaInicio: "2 años",
          fechaFin: "",
          actividadesRealizadas: "Análisis y manejo de Bigdata",
        },
        {
          puesto: "Administrador de BD",
          fechaInicio: "11 meses",
          fechaFin: "",
          actividadesRealizadas: "Mantenimiento de BD",
        },
        {
          puesto: "Gerente de BD en la nube",
          fechaInicio: "1 año",
          fechaFin: "",
          actividadesRealizadas: "Monitoreo de bases en la nube",
        },
        {
          puesto: "Diseñador de BD relacionales",
          fechaInicio: "6 meses",
          fechaFin: "",
          actividadesRealizadas: "Maquetado y análisis de relaciones",
        },
        {
          puesto: "Analista de datos",
          fechaInicio: "2 años",
          fechaFin: "",
          actividadesRealizadas: "Análisis y manejo de Bigdata",
        },
        {
          puesto: "Analista de datos",
          fechaInicio: "2 años",
          actividadesRealizadas: "Análisis y manejo de Bigdata",
        },
        {
          puesto: "Analista de datos",
          fechaInicio: "2 años",
          actividadesRealizadas: "Análisis y manejo de Bigdata",
        },
      ],
      estudios: [
        {
          universidad: "Universidad del estado de Morelos",
          carrera: "Ingeniería en Manejo de Datos Computacionales",
          gradoAcademico: "Ingeniería en TI y Data Cience",
          fechaInicio: "2015",
          fechaFin: "2020",
        },
        {
          universidad: "Universidad Tecnológica Emiliano Zapata",
          carrera: "Ingeniería en Tecnologías de la comunicación",
          gradoAcademico: "Ingeniería en TI y Data Cience",
          fechaInicio: "2019",
          fechaFin: "2024",
        },
        {
          universidad: "Universidad del estado de Morelos",
          carrera: "Ingeniería en Manejo de Datos Computacionales",
          gradoAcademico: "Ingeniería en TI y Data Cience",
          fechaInicio: "2015",
          fechaFin: "2020",
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
      certificaciones: [
        {
          nombre: "Analista de datos",
          empresa: "Microsoft",
          fechaObtencion: "8/15/17",
          fechaCaducidad: "8/15/20",
        },
        {
          nombre: "Administrador de BD",
          empresa: "Oracle",
          fechaObtencion: "8/21/17",
          fechaCaducidad: "8/21/20",
        },
        {
          nombre: "Industria 2.0",
          empresa: "Cisco",
          fechaObtencion: "8/15/17",
          fechaCaducidad: "8/15/20",
        },
        {
          nombre: "Manejo de AWS",
          empresa: "Amazon Web Services",
          fechaObtencion: "6/19/14",
          fechaCaducidad: "6/19/20",
        },
      ],
    },
  }),
  methods: {
    enviarCon: function () {
      this.candidato.conocimientosHabilidades.conocimientos.push(
        this.conocimiento
      );
      this.activeCon = false;
    },

    enviarHab: function () {
      this.candidato.conocimientosHabilidades.habilidades.push(this.habilidad);
      this.activeHab = false;
    },

    enviarEst: function () {
      this.activeEst = false;
      this.success = true;
    },
    enviarExp: function () {
      this.activeExp = false;
      this.success = true;
    },
    enviarCer: function () {
      this.activeCer = false;
      this.success = true;
    },
    enviarIdi: function () {
      this.activeIdi = false;
      this.success = true;
    },
    enviarCur: function () {
      this.activeCur = false;
      this.success = true;
    },
  },
};
</script>