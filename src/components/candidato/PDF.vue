<template>
  <div>
    <vs-tooltip>
      <vs-button
        v-if="!charge"
        @click="exportToPDF"
        icon
        animation-type="rotate"
        color="#B13CD2"
      >
        <i class="bx bx-download"></i>
        <template #animate>
          <i class="bx bx-import"></i>
        </template>
      </vs-button>
      <template #tooltip> Descargar CV </template>
    </vs-tooltip>
    <div v-show="showLayout">
      <vue-html2pdf
        :show-layout="showLayout"
        :float-layout="floatLayout"
        :enable-download="enableDownload"
        :preview-modal="previewModal"
        paginate-elements-by-height="1100"
        pdf-quality="2"
        :manual-pagination="manualPagination"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
        :margin="margin"
      >
        <ContentPdf slot="pdf-content" />
      </vue-html2pdf>
    </div>
  </div>
</template>
<script>
import ContentPdf from "./ContentPdf";
import html2pdf from "html2pdf.js";

export default {
  name: "PDF",
  data: () => ({
    showLayout: false,
    floatLayout: false,
    enableDownload: true,
    previewModal: false,
    manualPagination: false,
    charge: false,
    margin: 0,
  }),
  methods: {
    exportToPDF() {
      this.charge = true;
      html2pdf(this.$refs.html2Pdf, {
        margin: 0.5,
        filename:
          "CV_" +
          this.nombre +
          "_" +
          this.apellido1 +
          "_" +
          this.apellido2 +
          ".pdf",
        image: { type: "jpg", quality: 0.98 },
        html2canvas: {
          dpi: 192,
          letterRendering: true,
          scale: 3,
          useCORS: true,
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      });
      this.charge = false;
    },
  },
  props: {
    nombre: String,
    apellido1: String,
    apellido2: String,
  },
  components: {
    ContentPdf,
  },
};
</script>
