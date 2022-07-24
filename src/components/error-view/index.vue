<template>
  <div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="main">
      <h1>404</h1>
      <p>Parece que estás perdido...<br />¿Eso es un problema?</p>
      <vs-row>
        <vs-button block animation-type="vertical">
          Volver
          <template #animate> <em class="bx bx-arrow-back"></em>&nbsp; </template>
        </vs-button>
      </vs-row>
    </div>
  </div>
</template>
<style>
@import "./style.css";
</style>
