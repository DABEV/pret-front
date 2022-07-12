<template>
    <vs-card type="3">
    <template #title>
      <h3>Pot with a plant</h3>
    </template>
    <template #img>
      <img src="/foto5.png" alt="">
    </template>
    <template #text>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
    </template>
    <template #interactions>
      <vs-button danger icon>
        <i class='bx bx-heart'></i>
      </vs-button>
      <vs-button class="btn-chat" shadow primary>
        <i class='bx bx-chat' ></i>
        <span class="span">
          54
        </span>
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
  data: () => ({
    active: 0,
    currentx: 4,
    username: "",
    password: "",
  }),
};
</script>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
body {
  min-height: 100vh;
  background-image: radial-gradient(
    circle 621px at 25.3% 13.8%,
    rgba(255, 255, 255, 1) 0%,
    rgba(234, 236, 255, 1) 90%
  );
  margin-top: 50px;
  font-family: "Roboto", sans-serif;
}
</style>
