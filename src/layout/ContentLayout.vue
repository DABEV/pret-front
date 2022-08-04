<template>
  <div>
    <navigation></navigation>
    <br>
    <div class="space-top">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';
export default {
  name: "ContentLayout",
  beforeCreate: function () {
    document.body.className = "default";
  },
  components: {Navigation},
};
</script>

<style>
@import "../assets/css/CustomStyle.css";
@import "../assets/css/Body_aligment.css";
@import "../assets/css/Color_text.css";
@import "../assets/css/HtmlElemts.css";
</style>