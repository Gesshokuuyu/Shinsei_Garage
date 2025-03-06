<template>
    <div class="homepage">
      <header class="main-header">
        <div class="logo">
          <span class="logo-text">Shinsei</span>
          <span class="logo-subtext">GARAGE</span>
        </div>
        <nav class="main-nav">
          <a href="/Itens" class="nav-link">Itens</a>
          <a href="/cars" class="nav-link">Carros</a>
          <a href="/Import" class="nav-link">Importação</a>
          <a href="/contact" class="nav-link">Entre em contato</a>
          <a href="/Login" class="nav-link" v-if="!userStore.isLoggedIn()">Login</a>
          <a class="nav-link exit" @click="logOut()" v-if="userStore.isLoggedIn()" >Sair</a>
        </nav>
      </header>
      <ShinseiSubMenu v-if="userStore.isLoggedIn()"></ShinseiSubMenu>
  
      <div class="hero-carousel">
  <div 
    v-for="(slide, index) in heroSlides" 
    :key="index" 
    class="slide"
    :class="{ active: currentSlide === index }"
  >
  <img :src="slide.image" class="slide-image" alt="Slide image">
    <div class="slide-content">
      <div class="content-wrapper">
        <h1 class="slide-title">{{ slide.title }}</h1>
        <p class="slide-description">{{ slide.description }}</p>
        <a :href="slide.ctaLink" class="cta-button">{{ slide.ctaText }}</a>
      </div>
    </div>
  </div>
  <div class="carousel-controls">
    <button @click="prevSlide" class="carousel-btn-right prev-btn">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button @click="nextSlide" class="carousel-btn-left next-btn">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
  <div class="slide-indicators">
    <span 
      v-for="(slide, index) in heroSlides" 
      :key="index"
      class="indicator"
      :class="{ active: currentSlide === index }"
      @click="currentSlide = index"
    ></span>
  </div>
</div>
  <hr class="divise">
  
  
      <!-- Services Section -->
      <section id="services" class="services-section">
        <h2 class="section-title">Our Services</h2>
        <div class="services-grid">
          <div 
            v-for="service in services" 
            :key="service.id" 
            class="service-item"
            @mouseenter="service.hover = true"
            @mouseleave="service.hover = false"
          >
            <div 
              class="service-icon-wrapper" 
              :class="{ 'icon-hover': service.hover }"
            >
              <div v-html="service.icon" class="service-icon"></div>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <div 
              class="service-hover-effect" 
              :class="{ 'active': service.hover }"
            ></div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="main-footer">
        <div class="footer-content">
          <div class="footer-column">
            <h4>Shinsei Garage</h4>
            <p>Onde a velocidade se colide com a inovação.</p>
          </div>
          <div class="footer-column">
            <h4> Links Rápidos</h4>
            <nav>
              <a href="/itens">Itens</a>
              <a href="/cars">Carros</a>
              <a href="/import">Importação</a>
            </nav>
          </div>
          <div class="footer-column">
            <h4>Contact Info</h4>
            <p>Email: contact@shinseigarage.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Automotive Lane, Tech City</p>
          </div>
        </div>
        <div class="footer-copyright">
          © 2025 Andrei Dietrich. All Rights Reserved.
        </div>
      </footer>
      <ModalLogOut @action="LogOutAction" :is-visible="modalLogOut"/>
    </div>
  </template>
  
  <script setup>
  import F40 from '@/assets/imgs/f40.png'
  import Nsx from '@/assets/imgs/nsx.png'
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import { useRouter } from 'vue-router'
  import ModalLogOut from '@/components/modais/ModalLogOut.vue'
import ShinseiSubMenu from './ShinseiSubMenu.vue'
  
  
  const modalLogOut = ref(false)
  const userStore = useUserStore()
  userStore.loadUserFromStorage()
  const router = useRouter()
  
  const logOut = function(){
    modalLogOut.value = true 
  }
  
  const LogOutAction = function(data){
      switch(data){
        case 'confirm':
          userStore.logout()
          router.push('/Login')
          break;
        case 'cancel':
          modalLogOut.value = false
          break
      }
    }
  
  const heroSlides = ref([
    {
      image: F40,
      alt: 'Luxury Sports Car',
      title: 'Itens Personalizados',
      description: 'O melhor estilo dentre todo o mundo automotivo',
      ctaText: 'Explore o catálogo',
      ctaLink: '/itens'
    },
    {
      image: Nsx,
      alt: 'Custom Garage Workshop',
      title: 'História automotiva',
      description: 'Conheça a história de carros lendários que marcaram épocas',
      ctaText: 'Analisar os carros',
      ctaLink: '/cars'
    }
  ])
  console.log(Nsx)
  
  // Carousel Logic
  const currentSlide = ref(0)
  
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.value.length
  }
  
  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + heroSlides.value.length) % heroSlides.value.length
  }
  
  // Auto-slide functionality
  let slideInterval
  onMounted(() => {
    slideInterval = setInterval(nextSlide, 5000)
  })
  
  onUnmounted(() => {
    clearInterval(slideInterval)
  })
  
  // Services Data with SVG Icons
  const services = ref([
    {
      id: 1,
      hover: ref(false),
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" x2="12" y1="15" y2="3"/>
      </svg>`,
      title: 'Simulações de Importações',
      description: 'Compreenda os valores, taxas e encaminhe seu sonho para sua garagem'
    },
    {
      id: 2,
      hover: ref(false),
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"/>
        <path d="M9 17h6"/>
        <rect x="7" y="3" width="10" height="14" rx="1"/>
      </svg>`,
      title: 'Itens Customizados',
      description: 'Tenha o melhor estilo do mundo automotivo'
    },
    {
      id: 3,
      hover: ref(false),
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M14.22 17.48a6 6 0 0 1-2.22.52 6 6 0 0 1-6-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6c0 1.06-.34 2.04-.88 2.87"/>
        <path d="m18 12 1-1 1.5 1.5-1 1z"/>
      </svg>`,
      title: 'Consulte a História',
      description: 'Conheça os lendários carros que marcaram epóca pelo mundo'
    }
  ])
  </script>
  
  <style scoped>
  /* Global Styles */
  :root {
    --primary-color: #d32f2f;
    --secondary-color: #333;
    --accent-color: #ff6b6b;
    --text-color: #333;
    --white: #ffffff;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: whitesmoke;
    /* border-radius: 5px; */
  }
  
  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
  }
  
  /* Header Styles */
  .main-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    background-color: transparent;
    z-index: 100;
    transition: background-color 0.3s ease;
  }
  
  
  .logo {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }
  
  .logo-text {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--white);
    text-transform: uppercase;
  }
  
  .logo-subtext {
    font-size: 0.8rem;
    color: var(--primary-color);
    letter-spacing: 2px;
  }
  
  .main-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-link {
    color: var(--white);
    text-decoration: none;
    position: relative;
    cursor: pointer;
    transition: color 0.3s ease;
    transition: 0.4s;
  
  }
  
  .exit{
    color: rgba(197, 45, 45, 0.836);
  }
  
  .exit:hover{
    color: rgba(197, 45, 45, 0.836);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
    transition: 0.4s;
  
  }
  
  .nav-link:hover {
    /* color: var(--primary-color); */
    transition: 0.4s;
    transform: translateY(-5px);
  }
  
  .nav-link:hover::after {
    width: 100%;
    transition: 0.4s;
  }
  .hero-carousel {
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  
  .slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease, transform 1s ease;
  transform: scale(1.1);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
  
  .divise {
      border: none;
      height: 2px;
      background: linear-gradient(
          to right, 
          transparent, 
          rgba(51, 51, 51, 0.3), 
          transparent
      );
      margin: 20px 0;
      width: 90%;
      max-width: 600px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      overflow: hidden;
  }
  
  .divise::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
          45deg, 
          transparent, 
          rgba(255, 255, 255, 0.1), 
          transparent
      );
      transform: rotate(-45deg);
      animation: shine 3s infinite linear;
  }
  
  @keyframes shine {
      0% {
          left: -50%;
      }
      100% {
          left: 150%;
      }
  }
  
  .slide.active {
    opacity: 1;
    transform: scale(1);
  }
  
  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .slide-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--white);
  }
  
  .content-wrapper {
    max-width: 800px;
    padding: 0 1rem;
    transform: translateY(50px);
    opacity: 0;
    transition: transform 1s ease, opacity 1s ease;
  }
  
  .slide.active .content-wrapper {
    transform: translateY(0);
    opacity: 1;
  }
  
  .slide-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
  
  .slide-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }
  
  .cta-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: var(--white);
    text-decoration: none;
    border-radius: 30px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .cta-button:hover {
    background-color: var(--accent-color);
    transform: scale(1.05);
  }
  
  .carousel-controls {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    pointer-events: none;
  }
  
  .carousel-btn-left {
    /* background-color: white; */
    /* color: var(--white); */
    border: none;
    padding: 1rem;
    font-size: 2rem;
    cursor: pointer;
    border-radius: 10px 0px 0px 10px;
    transition: transform 0.2s ease;
    pointer-events: auto;
    opacity: 0.7;
  }
  
  .carousel-btn-right{
    /* background-color: white !important; */
    /* color: var(--white); */
    border: none;
    padding: 1rem;
    font-size: 2rem;
    cursor: pointer;
    border-radius: 0px 10px 10px 0px;
    transition: transform 0.2s ease;
    pointer-events: auto;
    opacity: 0.7;
  }
  
  .carousel-btn-right:hover {
    transform: scale(1.2);
    transition: 0.3s;
    opacity: 1;
  }
  
  .carousel-btn-left:hover {
    transform: scale(1.2);
    transition: 0.3s;
    opacity: 1;
  }
  
  .slide-indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .indicator.active {
    background-color: var(--primary-color);
    transform: scale(1.3);
  }
  
  /* Services Section Styles */
  .services-section {
    padding: 4rem 5%;
    text-align: center;
    background-color: #f4f4f4;
  }
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: var(--primary-color);
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  .service-item {
    padding: 1.5rem;
    background-color: var(--white);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    transition: transform 1.3s ease, box-shadow 1.3s ease;
  }
  
  .service-item:hover {
    transform: translateY(-10px);
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  
  .service-icon-wrapper {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.7s ease, color 0.7s ease;
  }
  
  .service-icon-wrapper.icon-hover {
    transform: rotate(360deg);
    color: var(--primary-color);
  }
  
  .service-icon {
    width: 100%;
    height: 100%;
  }
  
  .service-item h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    transition: color 0.3s ease;
  }
  
  .service-hover-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center, 
      rgba(88, 88, 88, 0.336) 0%, 
      transparent 80%
  );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .service-hover-effect.active {
    opacity: 1;
  }
  
  .service-item:hover h3 {
    color: var(--primary-color);
  }
  
  /* Footer Styles */
  .main-footer {
    color: var(--white);
    padding: 3rem 5%;
    border-radius: 10px 10px 0px 0px;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .footer-column h4 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .footer-column h4::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: var(--primary-color);
  }
  
  .footer-column a {
    color: var(--white);
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease, transform 0.2s ease;
  }
  
  .footer-column a:hover {
    color: var(--primary-color);
    transform: translateX(5px);
  }
  
  .footer-copyright {
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
    color: rgba(255,255,255,0.7);
  }
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .main-header {
      flex-direction: column;
      padding: 1rem;
    }
  
    .main-nav {
      margin-top: 1rem;
      flex-direction: column;
      align-items: center;
    }
  
    .services-grid {
      grid-template-columns: 1fr;
    }
  
    .footer-content {
      grid-template-columns: 1fr;
    }
  
    .slide-title {
      font-size: 2.5rem;
    }
  
    .slide-description {
      font-size: 1rem;
    }
  }
  </style>