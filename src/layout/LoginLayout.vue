<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Access",
  beforeCreate: function () {
    document.body.className = "login";
  },
};
</script>