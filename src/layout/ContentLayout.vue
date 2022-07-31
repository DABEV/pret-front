<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "ContentLayout",
  beforeCreate: function () {
    document.body.className = "default";
  },
  components: {},
};
</script>

<style>
@import "../assets/css/CustomStyle.css";
@import "../assets/css/Body_aligment.css";
@import "../assets/css/Color_text.css";
@import "../assets/css/HtmlElemts.css";
</style>