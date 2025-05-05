<template>
  <div class="page-container">
    <ShinseiHeader/>
    <main class="main-content">
      <div class="carousel-wrapper">
      </div>
    </main>
  </div>
  <FooterComponent/>
</template>

<script setup>
import FooterComponent from './FooterComponent.vue';
import ShinseiHeader from './ShinseiHeader.vue';
</script>

<style scoped>
/* Remover todas as bordas dentro deste componente */
.page-container *,
.main-content *,
.carousel-wrapper *,
main * {
  border: none !important;
  outline: none !important;
}

.page-container {
  position: relative;
  min-height: 100vh;
  border: none;
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 2rem;
  height: 100%;
  border: none;
}

.carousel-wrapper {
  width: 100%;
  max-width: 800px;
  border: none;
}
</style>