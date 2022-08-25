<template>
  <div>
    <vs-tooltip>
      <vs-button
        icon
        animation-type="vertical"
        color="#009ACB"
        @click="AbrirCompartir()"
      >
        <i class="bx bx-share-alt"></i>
        <template #animate>
          <i class="bx bxs-share-alt"></i>
        </template>
      </vs-button>
      <template #tooltip> Compartir </template>
    </vs-tooltip>
    <vs-dialog
      width="450px"
      scroll
      class="text-center"
      v-model="activeCompartir"
    >
      <template #header>
        <vs-col>
          <h4>Compartir con tus contactos</h4>
          <vs-input
            class="space-top"
            v-model="searchCompartir"
            color="#1e88e5"
            block
            placeholder="Buscar contacto"
          >
            <template #icon>
              <i class="bx bx-search"></i>
            </template>
          </vs-input>
        </vs-col>
      </template>
      <div
        class="center"
        v-if="$vs.getSearch(contactos, searchCompartir).length < 1"
      >
        No se encontraron registros
      </div>
      <div
        :key="i"
        :data="c"
        v-for="(c, i) in $vs.getPage(
          $vs.getSearch(contactos, searchCompartir),
          pageCompartir,
          maxCompartir
        )"
        class="item"
      >
        <div v-if="idSession == c.id.candidatoId">
          <vs-row class="space">
            <vs-col lg="3" sm="3" xs="3" class="center-item space-top">
              <vs-avatar size="50">
                <img :src="c.amigo.foto" alt="" />
              </vs-avatar>
            </vs-col>
            <vs-col lg="7" sm="9" xs="9" class="space-top text-start">
              <div class="item-click" @click="ConfirmarCom(c.amigo)">
                <p class="bold">
                  {{ c.amigo.nombre }} {{ c.amigo.apellidoPaterno }}
                  {{ c.amigo.apellidoMaterno }}
                </p>
                <small>{{ c.amigo.correoElectronico }}</small>
              </div>
            </vs-col>
          </vs-row>
          <div class="divider">
            <span class="border"></span>
          </div>
        </div>
        <div v-else>
          <vs-row class="space">
            <vs-col lg="3" sm="3" xs="3" class="center-item space-top">
              <vs-avatar size="50">
                <img :src="c.candidato.foto" alt="" />
              </vs-avatar>
            </vs-col>
            <vs-col lg="7" sm="9" xs="9" class="space-top text-start">
              <div class="item-click" @click="ConfirmarCom(c.candidato)">
                <p class="bold">
                  {{ c.candidato.nombre }} {{ c.candidato.apellidoPaterno }}
                  {{ c.candidato.apellidoMaterno }}
                </p>
                <small>{{ c.candidato.correoElectronico }}</small>
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
          v-model="pageCompartir"
          :length="
            $vs.getLength(
              $vs.getSearch(contactos, searchCompartir),
              maxCompartir
            )
          "
        />
      </div>
    </vs-dialog>
    <vs-dialog width="450px" class="text-center" v-model="activeConfirmarCom">
      <template #header>
        <h4>Confirmación</h4>
      </template>
      <div class="text-gray">
        <p>
          Seguro de compartir a <b>{{ contacto.nombre }}</b
          >?
        </p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button
              dark
              transparent
              @click="activeConfirmarCom = !activeConfirmarCom"
              block
            >
              Cancelar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button success @click="Compartir()" block>
              Compartir
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import CandidateService from "../../../service/Candidate/CandidateService";

export default {
  name: "ShareDialog",
  data: () => ({
    activeCompartir: false,
    activeConfirmarCom: false,
    idSession: 5,
    searchCompartir: "",
    pageCompartir: 1,
    maxCompartir: 4,
    contacto: {},
    contactos: [
      {
        nombre: "",
        apellidoMaterno: "",
        apellidoPaterno: "",
        correoElectronico: "",
        telefono: "",
        estadoRepublica: {
          nombre: "",
        },
        tituloCurricular: "",
        fechaNacimiento: "",
        foto: "",
      },
    ],
  }),
  methods: {
    AbrirCompartir: function () {
      this.activeCompartir = !this.activeCompartir;
    },
    cargarContactos() {
      CandidateService.listarAmigos()
        .then((response) => {
          const amigos = response.data.data.filter((c) => c.estado);
          this.contactos = amigos;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    ConfirmarCom: function (contacto) {
      this.contacto = contacto;
      this.activeConfirmarCom = true;
    },
    Compartir: function () {
      this.activeCompartir = false;
      this.activeConfirmarCom = false;
    },
  },
  props: {
    idVacante: Number,
  },
  mounted() {
    this.cargarContactos();
  },
};
</script>
