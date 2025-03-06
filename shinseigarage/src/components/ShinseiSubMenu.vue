<template>
    <div class="submenu" :class="{ 'submenu-scrolled': scrolled }">
      <div class="submenu-container">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button class="search-button" @click="handleSearch">
            <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
          </button>
        </div>
        
        <div class="submenu-links">
          <a href="/novidades" class="submenu-link">Novidades</a>
          <a href="/promocoes" class="submenu-link">Promoções</a>
          <div class="submenu-dropdown">
            <span class="submenu-link dropdown-trigger">Categorias <span class="arrow">&#9662;</span></span>
            <div class="dropdown-content">
              <a href="/categoria/sedan">Sedan</a>
              <a href="/categoria/suv">SUV</a>
              <a href="/categoria/esportivo">Esportivo</a>
              <a href="/categoria/Especiais">Especiais</a>
            </div>
          </div>
          <a href="/agendar" class="submenu-link special">Agendar visita</a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const searchQuery = ref('');
  const scrolled = ref(false);
  
  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      console.log('Pesquisando por:', searchQuery.value);
      
    }
  };
  
  const checkScroll = () => {
    scrolled.value = window.scrollY > 100;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verifique o estado inicial
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll);
  });
  </script>
  
  <style scoped>
  .submenu {
    position: absolute;
    top: 80px; 
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.801);
    backdrop-filter: blur(10px);
    padding: 0.8rem 5%;
    z-index: 99;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .submenu-scrolled {
    background-color: rgba(0, 0, 0, 0.85);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .submenu-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .search-box {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 0.3rem 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.192);
    transition: all 0.3s ease;
  }
  
  .search-box:focus-within {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: var(--primary-color);
  }
  
  .search-box input {
    background: transparent;
    border: none;
    color:rgba(255, 255, 255, 0.76);
    padding: 0.3rem 0;
    width: 200px;
    outline: none;
  }
  
  .search-box input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  .search-button {
    background: transparent;
    border: none;
    color: var(--white);
    cursor: pointer;
    padding: 0 0.3rem;
  }
  
  .search-icon {
    font-size: 1rem;
    color:rgba(255, 255, 255, 0.6) !important;
  }
  
  .submenu-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  
  .submenu-link {
    color: rgb(197, 195, 195);
    text-decoration: none;
    font-size: 0.9rem;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .submenu-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -3px;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
    transition: 0.4s ease;

  }
  
  .submenu-link:hover {
    color: rgb(134, 134, 134);
    transform: translateY(-5px);
    transition: 0.4s ease;
  }
  
  .submenu-link:hover::after {
    width: 100%;
  }
  
  .submenu-link.special {
    background-color: var(--primary-color);
    padding: 0.4rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .submenu-link.special:hover {
    background-color: rgba(var(--primary-color-rgb), 0.8);
    transform: translateY(-2px);
  }
  
  .submenu-link.special::after {
    display: none;
  }
  
  /* Estilo para o dropdown */
  .submenu-dropdown {
    position: relative;
  }
  
  .dropdown-trigger {
    display: flex;
    align-items: center;
  }
  
  .arrow {
    font-size: 0.7rem;
    margin-left: 5px;
    transition: transform 0.3s;
    display: inline-block;
  }
  
  .submenu-dropdown:hover .arrow {
    transform: rotate(180deg);
  }
  
  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: rgba(59, 59, 59, 0.9);
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 0;
    border-radius: 4px;
    z-index: 101;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
  
  .submenu-dropdown:hover .dropdown-content {
    opacity: 1;
    visibility: visible;
    transform: translateY(5px);
  }
  
  .dropdown-content a {
    color: var(--white);
    padding: 0.5rem 1rem;
    text-decoration: none;
    display: block;
    transition: all 0.2s;
  }
  
  .dropdown-content a:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--white);
  }
  
  /* Responsividade para telas menores */
  @media (max-width: 768px) {
    .submenu-container {
      flex-direction: column;
      gap: 0.8rem;
    }
    
    .search-box {
      width: 100%;
    }
    
    .search-box input {
      width: 100%;
    }
    
    .submenu-links {
      width: 100%;
      justify-content: space-between;
    }
  }
  </style>