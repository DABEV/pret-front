<template>
  <div class="center">
    <div class="space space-top content-card-datalles">
      <vs-row justify="space-between">
        <vs-col
          style="border: 1px solid #6c7885; border-bottom: 1px solid #6c7885"
          lg="2"
          sm="12"
          xs="12"
          class="content-data"
        >
          <vs-row style="margin: 10px">
            <div class="place" style="font-weight: 700">
              <i class="bx bxs-heart bg-primary" style="margin-right: 10px"></i>
              Mis favoritos
            </div>
          </vs-row>
          <vs-row
            style="
              background: rgba(30, 136, 229, 1);
              border-radius: 0px 0px 18px 18px;
              border-top: 1px solid #6c7885;
            "
          >
            <p
              style="
                color: #ffff;
                font-weight: 700;
                margin-left: 15px;
                margin-right: 15px;
                margin-top: 10px;
                margin-bottom: 10px;
                display: flex;
                text-align: center;
              "
            >
              Empleos
            </p>
          </vs-row>
        </vs-col>
        <vs-col lg="9" sm="12" xs="12">
          <vs-card
            :key="i"
            :data="v"
            v-for="(v, i) in vacantes"
            style="margin-bottom: 10px"
          >
            <template #title>
              <vs-row>
                <!-- Avatar -->
                <vs-col lg="2" sm="3" xs="3" style="align-self: center">
                  <vs-avatar size="50">
                    <img
                      src="https://www.muycomputer.com/wp-content/uploads/2021/02/google.png"
                    />
                  </vs-avatar>
                </vs-col>
                <!-- Datos -->
                <vs-col lg="8" sm="9" xs="9">
                  <h3
                    class="puesto"
                    style="text-decoration: underline"
                    @click="active = !active"
                  >
                    {{ v.nombre }}
                  </h3>
                  <div class="empresa">{{ v.reclutador }}</div>
                  <div class="place">
                    <i class="bx bx-current-location bg-primary"></i>
                    {{ v.lugar }}
                  </div>
                </vs-col>
                <!-- Precio mas icono -->
                <vs-col lg="2" sm="3" xs="3">
                  <vs-button icon color="danger" border>
                    <i class="bx bxs-heart"></i>
                  </vs-button>
                </vs-col>
              </vs-row>
            </template>
            <template #text>
              <vs-row>
                <vs-row justify="flex-end">
                  <div class="detalles-contenido">{{ v.sueldo }} MXN</div>
                </vs-row>
              </vs-row>
            </template>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>
    <!-- Dialog detalles vacante-->
    <vs-dialog
      width="450px"
      class="text-center"
      v-model="active"
      scroll
      overflow
      not-close
      auto-width
    >
      <template #header>
        <vs-col w="12" sm="10" xs="10">
          <div class="detalles">Detalles Vacante</div>
          <div class="text-start">
            <vs-row justify="flex-end">
              <vs-col lg="11" sm="10" xs="12">
                <p class="title-card">Programador backend</p>
              </vs-col>
              <vs-col lg="1" sm="12" xs="12">
                <vs-tooltip>
                  <vs-button
                    icon
                    animation-type="rotate"
                    background-color="bg-primary"
                    @click="(active2 = !active2), Confirmar(c)"
                  >
                    <i class="bx bxs-share-alt"></i>
                    <template #animate
                      ><i class="bx bxs-share-alt"></i
                    ></template>
                  </vs-button>
                  <template #tooltip> Compartir </template>
                </vs-tooltip>
              </vs-col>
            </vs-row>
            <!-- Datos principales -->
            <vs-row>
              <vs-col w="4" sm="4" xs="10" class="detalles3">Microsoft</vs-col>
              <vs-col w="4" sm="4" xs="10" class="detalles2"
                >Cuernavaca, Mor</vs-col
              >
              <vs-col w="4" sm="4" xs="10" class="detalles2"
                >Hace dos días</vs-col
              >
            </vs-row>
            <!-- Tipo, Modalidad, Sueldo -->
            <vs-col class="detalles-contenido">
              <div>
                <vs-row>
                  <div class="detalles-contenido">15,000 al mes</div>
                </vs-row>
                <vs-row style="margin-top: 5px">
                  <i class="bx bxs-briefcase bg-primary"></i> Tiempo completo
                </vs-row>
                <vs-row style="margin-top: 5px">
                  <i class="bx bxs-city bg-primary"></i> Remoto
                </vs-row>
              </div>
            </vs-col>
            <!-- Botones -->
            <vs-row style="margin-top: 90px">
              <vs-col lg="2" sm="5" xs="5">
                <vs-button color="#1E88E5" style="width: 80%">
                  Aplicar</vs-button
                >
              </vs-col>
              <vs-button icon color="danger" border :active="active == 2">
                <i class="bx bxs-heart"></i>
              </vs-button>
            </vs-row>
            <!-- Info -->
            <div style="margin-top: 10px">
              Perfil<br />
              Mínimo de 2/3 años de experiencia en ventas, preferiblemente en
              retail Gran entendimiento del servicio al cliente Excepcional
              técnica de ventas y habilidades de relación y comunicación
              Habilidades organizativas Mínimo de 2/3 años de experiencia en
              ventas, preferiblemente en retail Gran entendimiento del servicio
              al cliente Excepcional técnica de ventas y habilidades de relación
              y comunicación Habilidades organizativas Mínimo de 2/3 años de
              experiencia en ventas, preferiblemente en retail Gran
              entendimiento del servicio al cliente Excepcional técnica de
              ventas y habilidades de relación y comunicación Habilidades
              organizativas Mínimo de 2/3 años de experiencia en ventas,
              preferiblemente en retail Gran entendimiento del servicio al
              cliente Excepcional técnica de ventas y habilidades de relación y
              comunicación Habilidades organizativas Mínimo de 2/3 años de
              experiencia en ventas, preferiblemente en retail Gran
              entendimiento del servicio al cliente Excepcional técnica de
              ventas y habilidades de relación y comunicación Habilidades
              organizativas Mínimo de 2/3 años de experiencia en ventas,
              preferiblemente en retail Gran entendimiento del servicio al
              cliente Excepcional técnica de ventas y habilidades de relación y
              comunicación Habilidades organizativas
            </div>
            <!-- Tabla -->
            <vs-table
              style="
                margin-top: 20px;
                border: 1px solid #6c7885;
                border-radius: 15px;
              "
            >
              <template #thead>
                <vs-tr style="border-bottom: 1px solid #6c7885">
                  <vs-th style="color: #009acb"> Rango de sueldo </vs-th>
                  <vs-th style="color: #009acb"> Monto </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr
                  style="border-top: 1px solid #6c7885"
                  :key="i"
                  v-for="(tr, i) in vacantes"
                  :data="tr"
                >
                  <vs-td>
                    {{ tr.name }}
                  </vs-td>
                  <vs-td>
                    {{ tr.username }}
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-col>
      </template>

      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="3">
            <vs-button transparent dark @click="active = false" block>
              Cerrar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
    <!-- Dialog compartir -->
    <vs-dialog width="450px" class="text-center" v-model="active2">
      <template #header>
        <h4><b>Confirmación</b></h4>
      </template>
      <div class="text-gray">
        <p>¿Seguro de compartir <b></b> con tus contactos?</p>
      </div>
      <template #footer>
        <vs-row justify="space-between">
          <vs-col w="5">
            <vs-button
              color="bg-primary"
              class="background-color: #ffff"
              @click="active = false"
              block
            >
              Aceptar
            </vs-button>
          </vs-col>
          <vs-col w="5">
            <vs-button transparent dark @click="active2 = false" block>
              Cancelar
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  name: "Favorites",
  data: () => ({
    active: false,
    active2: false,
    max: 5,
    checkbox1: false,
    vacantes: [
      {
        nombre: "Análista de datos",
        reclutador: "Google",
        lugar: "Cuernavaca, Mor",
        sueldo: "$12000",
        descripcion:
          "Perfil Mínimo de 2/3 años de experiencia en ventas, preferiblemente en retail Gran entendimiento del servicio al cliente Excepcional técnica de ventas y habilidades de relación y comunicación Habilidades organizativas y saber priorizar Dinámico Orientado al detalle",
      },
      {
        nombre: "Diseñador Web",
        reclutador: "Microsoft",
        lugar: "Cuernavaca, Mor",
        sueldo: "15000",
        descripcion:
          "Perfil Mínimo de 2/3 años de experiencia en ventas, preferiblemente en retail Gran entendimiento del servicio al cliente Excepcional técnica de ventas y habilidades de relación y comunicación Habilidades organizativas y saber priorizar Dinámico Orientado al detalle",
      },
    ],
  }),
};
</script>
