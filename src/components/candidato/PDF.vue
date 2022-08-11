<template>
  <div id="app">
    <div @click="generatePDF()" class="np-btn">Generate PDF</div>

    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1100"
      filename="CV"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      @progress="onProgress($event)"
      ref="html2Pdf"
      :margin="20"
    >
      <ContentPdf slot="pdf-content" />
    </vue-html2pdf>
    <div>
      <ContentPdf />
    </div>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import ContentPdf from "./ContentPdf";

export default {
  name: "App",
  methods: {
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    hasGenerated() {
      alert("PDF generated successfully!");
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
  components: {
    VueHtml2pdf,
    ContentPdf,
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.np-btn {
  padding: 2px 8px;
  margin-top: 50px;
  margin: 12px 8px;
  border: 1px solid #da1010;
  width: 110px;
  background: #da1010;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
}
</style>
