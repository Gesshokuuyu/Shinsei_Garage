<template>   
  <div class="page-container">     
    <ShinseiHeader/>     
    <main class="main-content">       
      <div class="carousel-wrapper">         
        <VideoShinsei/>       
        
      </div>     
    </main>      
  </div> 
</template>  

<script setup> 
import VideoShinsei from './home/ShinseiVideoPlayer.vue'; 
import ShinseiHeader from './ShinseiHeader.vue'; 
</script>  

<style scoped> 
.page-container {   
  position: relative;   
  min-height: 100vh; 
}  

.main-content {   
  display: flex;   
  justify-content: center;   
  align-items: center;   
  padding-top: 80px;   
  padding-bottom: 2rem;   
  height: 100%; 
}  

.carousel-wrapper {   
  width: 100%;   
  max-width: 800px; 
}  

</style>