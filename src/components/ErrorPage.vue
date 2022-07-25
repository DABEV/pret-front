<template>
  <div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="main">
      <h1 class="error-header">404</h1>
      <p class="error-text space">
        Parece que estás perdido...<br />¿Eso es un problema?
      </p>
      <vs-row>
        <vs-button block animation-type="vertical" class="space-top">
          Volver
          <template #animate> <em class="bx bx-arrow-back"></em></template>
        </vs-button>
      </vs-row>
    </div>
  </div>
</template>
