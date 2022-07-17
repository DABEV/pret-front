<template>
  <div>
    <profile></profile>
  </div>
</template>

<script>
import Profile from "../components/Profile.vue";
export default {
  name: "ProfileLayout",
  components: {
    Profile,
  },
};
</script>

<style>
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-wrap: wrap;
}
body {
  background-color: #F4F7F8;
  font-family: "Poppins";
}

button {
  font-family: "Poppins";
}
</style>