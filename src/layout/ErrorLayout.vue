<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "ErrorLayout",
  beforeCreate: function () {
    document.body.className = "error-page";
  },
};
</script>

<style>
@import "../assets/css/ErrorStyle.css";
</style>