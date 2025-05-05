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

// Função para garantir que o vídeo seja redimensionado adequadamente
const handleResize = () => {
  if (!videoElement.value) return
  
  // Ajustes adicionais podem ser feitos aqui se necessário
  // Por exemplo, adaptar o vídeo para larguras específicas
  if (window.innerWidth < 768) {
    // Ajustes para dispositivos móveis
  }
}

onMounted(() => {
  if (videoElement.value) {
    videoElement.value.addEventListener('error', handleVideoError)
    window.addEventListener('resize', handleResize)
    
    // Garantir que o vídeo seja carregado e inicializado corretamente
    videoElement.value.load()
    
    // Aplicar o resize inicial
    handleResize()
  }
})

onUnmounted(() => {
  if (videoElement.value) {
    videoElement.value.removeEventListener('error', handleVideoError)
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
.full-page-video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 85vh;
  overflow: hidden;
  z-index: 0;
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
  z-index: 1;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.toggle-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  z-index: 3;
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
  user-select: none;
  -webkit-tap-highlight-color: transparent;
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

/* Media queries para responsividade */
@media screen and (max-width: 768px) {
  .toggle-switch {
    width: 180px;
    height: 50px;
    font-size: 0.9rem;
  }
  
  .toggle-container {
    bottom: 15px;
  }
}

@media screen and (max-width: 480px) {
  .toggle-switch {
    width: 160px;
    height: 45px;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }
  
  .toggle-container {
    bottom: 10px;
  }
  
  .full-page-video-container {
    height: 80vh; /* Ajuste para dispositivos móveis */
  }
}

/* Para dispositivos muito pequenos */
@media screen and (max-width: 360px) {
  .toggle-switch {
    width: 140px;
    height: 40px;
    font-size: 0.7rem;
  }
  
  .toggle-label {
    letter-spacing: 0;
  }
}

/* Para telas altas/largas (orientação paisagem em dispositivos móveis) */
@media screen and (max-height: 500px) and (orientation: landscape) {
  .full-page-video-container {
    height: 100vh;
  }
  
  .toggle-container {
    bottom: 10px;
  }
  
  .toggle-switch {
    width: 160px;
    height: 40px;
  }
}

/* Para iPads e tablets */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .full-page-video-container {
    height: 90vh;
  }
}

/* Para garantir compatibilidade com dispositivos de alta resolução */
@media screen and (min-width: 1920px) {
  .toggle-switch {
    width: 250px;
    height: 70px;
    font-size: 1.1rem;
  }
}
</style>