<template>
  <div>
    <vs-tooltip>
      <vs-button
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
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1100"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      ref="html2Pdf"
      :margin="20"
    >
      <ContentPdf slot="pdf-content" />
    </vue-html2pdf>
  </div>
</template>
<script>
import ContentPdf from "./ContentPdf";
import html2pdf from "html2pdf.js";

export default {
  name: "App",
  methods: {
    exportToPDF() {
      html2pdf(this.$refs.html2Pdf, {
        margin: 0.5,
        filename: "CV.pdf",
        image: { type: "jpg", quality: 0.98 },
        html2canvas: {
          dpi: 192,
          letterRendering: true,
          scale: 3,
          useCORS: true,
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      });
    },
  },
  components: {
    ContentPdf,
  },
};
</script>
