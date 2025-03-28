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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import fundoPage from '@/assets/videos/fundoShinsei.mp4'


const videoSrc = fundoPage

const videoElement = ref(null)

const handleVideoError = (error) => {
  console.error('Erro ao carregar o vídeo:', error)
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
  height: 100vh;
  z-index: -1; /* Coloca o vídeo atrás de outros conteúdos */
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
  background: rgba(0, 0, 0, 0.4); /* Overlay escuro para melhorar legibilidade */
}
</style>