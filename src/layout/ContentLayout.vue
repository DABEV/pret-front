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
</style>