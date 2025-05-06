<template>
  <div class="hero-video-container">
    <video class="hero-video" autoplay muted loop playsinline>
      <source :src="fUndo3" type="video/mp4" />
      Seu navegador não suporta vídeo HTML5.
    </video>
    <div class="video-overlay">
      <h1 class="hero-title">Mais do que carros. Uma experiência.</h1>
      <router-link to="/cars" class="cta-button">
        Ver Ofertas exclusivas
      </router-link>
    </div>
  </div>
</template>

<script setup>
import fUndo3 from '@/assets/videos/fUndo3.mp4';
</script>

<style scoped>
.hero-video-container {
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.hero-video {
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: brightness(0.7);
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5); /* leve escurecimento para melhor legibilidade */
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  margin-bottom: 1.5rem;

}

.cta-button {
  background: transparent;
  color: #74726cce;
  border: 2px solid #74726cce;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #ffffff;
  color: #000000;
  transform: translate(0, -2px);
  box-shadow: 0 4px 20px rgba(250, 250, 250, 0.2);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  border: 2px solid #ffffff;
}
</style>
