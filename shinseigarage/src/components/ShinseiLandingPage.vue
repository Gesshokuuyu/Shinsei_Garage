<template>
  <div class="page-container">
    <ShinseiHeader/>
    <main class="main-content">
     <ShinseiVideoPlayer/>      
    </main>
  </div>
  <FooterComponent/>
</template>

<script setup>
import FooterComponent from './FooterComponent.vue';
import ShinseiHeader from './ShinseiHeader.vue';
import ShinseiVideoPlayer from './home/ShinseiVideoPlayer.vue';
</script>

<style scoped>
.page-container *,
.main-content *,
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
  height: 100%;
  border: 5px solid transparent; 
}

</style>