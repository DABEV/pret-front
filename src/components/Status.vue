<template>
  <div class="center">
    <div class="space space-top content-card">
      <h2>Postulaciones realizadas</h2>
      <div class="space-top content-data space datos text-start bg-gray">
        <div class="center">
          <vs-table>
            <template #header>
              <vs-input
                v-model="search"
                color="#1e88e5"
                border
                placeholder="Buscar"
              >
                <template #icon>
                  <i class="bx bx-search"></i>
                </template>
              </vs-input>
            </template>
            <template #thead>
              <vs-tr>
                <vs-th
                  sort
                  @click="
                    postulaciones = $vs.sortData(
                      $event,
                      postulaciones,
                      'puesto'
                    )
                  "
                >
                  Puesto
                </vs-th>
                <vs-th
                  sort
                  @click="
                    postulaciones = $vs.sortData(
                      $event,
                      postulaciones,
                      'modalidad'
                    )
                  "
                >
                  Modalidad
                </vs-th>
                <vs-th
                  sort
                  @click="
                    postulaciones = $vs.sortData($event, postulaciones, 'tipo')
                  "
                >
                  Tipo</vs-th
                >
                <vs-th
                  sort
                  @click="
                    postulaciones = $vs.sortData(
                      $event,
                      postulaciones,
                      'estado'
                    )
                  "
                >
                  Edo. Rep</vs-th
                >
                <vs-th
                  sort
                  @click="
                    postulaciones = $vs.sortData(
                      $event,
                      postulaciones,
                      'estatus'
                    )
                  "
                >
                  Estatus</vs-th
                >
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage(
                  $vs.getSearch(postulaciones, search),
                  page,
                  max
                )"
                :data="tr"
              >
                <vs-td>
                  {{ tr.puesto }}
                </vs-td>
                <vs-td>
                  {{ tr.modalidad }}
                </vs-td>
                <vs-td>
                  {{ tr.tipo }}
                </vs-td>
                <vs-td>
                  {{ tr.estado }}
                </vs-td>
                <vs-td>
                  <p v-if="tr.estatus == 'Idóneo'" class="bg-success">
                    {{ tr.estatus }}
                  </p>
                  <p v-else-if="tr.estatus == 'Postulado'" class="bg-primary">
                    {{ tr.estatus }}
                  </p>
                  <p v-else-if="tr.estatus == 'CV visto'" class="bg-warning">
                    {{ tr.estatus }}
                  </p>
                  <p v-else-if="tr.estatus == 'Cancelado'" class="bg-danger">
                    {{ tr.estatus }}
                  </p>
                  <p v-else class="bg-gray">{{ tr.estatus }}</p>
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
                :length="$vs.getLength(postulaciones, max)"
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
    max: 7,
    search: "",
    postulaciones: [
      {
        puesto: "Analista de datos",
        modalidad: "Presencial",
        tipo: "Tiempo completo",
        estado: "Morelos",
        estatus: "Postulado",
      },
      {
        puesto: "Administrador de BD",
        modalidad: "Remoto",
        tipo: "Tiempo completo",
        estado: "Morelos",
        estatus: "CV visto",
      },
      {
        puesto: "Gerente de BD en la nube",
        modalidad: "Presencial",
        tipo: "Medio tiempo",
        estado: "Guerrero",
        estatus: "Postulado",
      },
      {
        puesto: "Administrador de BD",
        modalidad: "Híbrido",
        tipo: "Horario flexible",
        estado: "CDMX",
        estatus: "CV visto",
      },
      {
        puesto: "Diseñador de BD relacionales",
        modalidad: "Remoto",
        tipo: "Presencial",
        estado: "Sonora",
        estatus: "Cancelado",
      },
      {
        puesto: "Subgerente de Cómputo en la nube",
        modalidad: "Presencial",
        tipo: "Tiempo completo",
        estado: "Morelos",
        estatus: "Idóneo",
      },
      {
        puesto: "Analista en servicios AWS",
        modalidad: "Remoto",
        tipo: "Horario flexible",
        estado: "Querétaro",
        estatus: "Idóneo",
      },
      {
        puesto: "Experto machine learning",
        modalidad: "Híbrido",
        tipo: "Tiempo completo",
        estado: "CDMX",
        estatus: "Postulado",
      },
    ],
  }),
};
</script>
