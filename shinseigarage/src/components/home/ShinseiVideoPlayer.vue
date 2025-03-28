<template> 
  <div class="full-page-video-container"> 
    <video 
      ref="videoElement" 
      class="full-page-video" 
      :src="videoSrc" 
      autoplay 
      loop 
      muted 
      playsinline 
    > 
      Seu navegador não suporta vídeo. 
    </video> 
    <div class="video-overlay"></div> 
     
    <div class="toggle-container"> 
      <div  
        class="toggle-switch"  
        :class="{ 'toggled': isRyuMode }" 
        @click="toggleMode" 
      > 
        <div class="toggle-handle"></div> 
        <span class="toggle-label toggle-label-default">Shinsei</span> 
        <span class="toggle-label toggle-label-alternative">Ryu</span> 
      </div> 
    </div>
  </div> 
</template> 
 
<script setup> 
import { ref, onMounted, onUnmounted } from 'vue' 
import fundoPage from '@/assets/videos/fundo2.mp4' 
 
const videoSrc = fundoPage 
const videoElement = ref(null) 
const isRyuMode = ref(false) 
 
const handleVideoError = (error) => { 
  console.error('Erro ao carregar o vídeo:', error) 
} 
 
const toggleMode = () => { 
  isRyuMode.value = !isRyuMode.value 
  console.log('Modo alternativo:', isRyuMode.value) 
} 
 
onMounted(() => { 
  if (videoElement.value) { 
    videoElement.value.addEventListener('error', handleVideoError) 
  } 
}) 
 
onUnmounted(() => { 
  if (videoElement.value) { 
    videoElement.value.removeEventListener('error', handleVideoError) 
  } 
}) 
</script> 
 
<style scoped> 
.full-page-video-container { 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100vw; 
  height: 85vh; 
  overflow: hidden; 
} 
 
.full-page-video { 
  position: absolute; 
  top: 50%; 
  left: 50%; 
  min-width: 100%; 
  min-height: 100%; 
  width: auto; 
  height: auto; 
  transform: translateX(-50%) translateY(-50%); 
  object-fit: cover; 
} 
 
.video-overlay { 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  background: rgba(0, 0, 0, 0.4); 
} 
 
.toggle-container { 
  position: absolute; 
  bottom: 20px; 
  left: 50%; 
  transform: translateX(-50%); 
  display: flex; 
  justify-content: center; 
  align-items: center; 
} 
 
.toggle-switch { 
  width: 220px; 
  height: 60px; 
  background-color: rgba(255, 255, 255, 0.2); 
  border-radius: 10px; 
  position: relative; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  overflow: hidden; 
  transition: all 0.3s ease; 
  border: 1px solid rgba(255,255,255,0.3); 
} 
 
.toggle-handle { 
  position: absolute; 
  width: 50%; 
  height: 100%; 
  background-color: rgb(37, 37, 37); 
  border-radius: 8px; 
  left: 0; 
  transition: all 0.3s ease; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); 
  z-index: 1; 
} 
 
.toggle-switch.toggled .toggle-handle { 
  left: 50%; 
} 
 
.toggle-label { 
  width: 50%; 
  text-align: center; 
  color: white; 
  z-index: 2; 
  font-weight: bold; 
  position: relative; 
  text-transform: uppercase;
  letter-spacing: 1px;
} 
 
.toggle-label-default { 
  left: 0; 
} 
 
.toggle-label-alternative { 
  right: 0; 
} 
 
.toggle-switch:not(.toggled) .toggle-label-default { 
  color: white; 
} 
 
.toggle-switch:not(.toggled) .toggle-label-alternative { 
  color: rgba(255,255,255,0.5); 
} 
 
.toggle-switch.toggled .toggle-label-default { 
  color: rgba(255,255,255,0.5); 
} 
 
.toggle-switch.toggled .toggle-label-alternative { 
  color: white; 
} 
</style>