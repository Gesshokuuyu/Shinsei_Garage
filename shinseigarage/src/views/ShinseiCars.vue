<template>
    <ShinseiHeader/>
    <div class="car-showcase-container">
      <h1 class="page-title">Nossos Veículos</h1>
      <carCard  :car="{
      name: 'Model S',
      brand: 'Tesla',
      price: 350000,
      year: 2023,
      imageUrl: 'caminho/para/imagem.jpg',
      mileage: 15000
    }"
    @view-details="handleDetails"/>
      
      <div class="filter-section">
        <div class="filter-group">
          <label>Marca:</label>
          <select v-model="selectedBrand">
            <option value="">Todas</option>
            <option v-for="brand in uniqueBrands" :key="brand">{{ brand }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Categoria:</label>
          <select v-model="selectedCategory">
            <option value="">Todas</option>
            <option v-for="category in uniqueCategories" :key="category">{{ category }}</option>
          </select>
        </div>
      </div>
  
      <div class="cars-grid">
        <div 
          v-for="car in filteredCars" 
          :key="car.id" 
          class="car-card"
        >
          <div class="car-image-container">
            <img :src="car.image" :alt="car.name" class="car-image">
          </div>
          <div class="car-details">
            <h2 class="car-name">{{ car.name }}</h2>
            <div class="car-info">
              <span class="car-brand">{{ car.brand }}</span>
              <span class="car-category">{{ car.category }}</span>
            </div>
            <div class="car-specs">
              <div class="spec">
                <i class="icon-engine"></i>
                <span>{{ car.engine }}</span>
              </div>
              <div class="spec">
                <i class="icon-speed"></i>
                <span>{{ car.speed }} km/h</span>
              </div>
            </div>
            <div class="car-price">
              R$ {{ formatPrice(car.price) }}
            </div>
            <button class="details-button">Ver Detalhes</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import ShinseiHeader from '@/components/ShinseiHeader.vue'
  import carCard from '@/components/cards/carCard.vue'
  
  const cars = ref([
    {
      id: 1,
      name: 'Sportback Elegance',
      brand: 'Audi',
      category: 'Sedan',
      engine: '2.0 TFSI',
      speed: 240,
      price: 250000,
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      name: 'M3 Competition',
      brand: 'BMW',
      category: 'Esportivo',
      engine: '3.0 Biturbo',
      speed: 290,
      price: 350000,
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      name: 'AMG GT',
      brand: 'Mercedes',
      category: 'Esportivo',
      engine: '4.0 V8',
      speed: 315,
      price: 450000,
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      name: 'Cayenne Turbo',
      brand: 'Porsche',
      category: 'SUV',
      engine: '4.0 V8',
      speed: 270,
      price: 380000,
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      name: 'F-Type R',
      brand: 'Jaguar',
      category: 'Conversível',
      engine: '5.0 V8',
      speed: 300,
      price: 420000,
      image: '/api/placeholder/400/250'
    }
  ])
  
  const selectedBrand = ref('')
  const selectedCategory = ref('')
  
  const uniqueBrands = computed(() => {
    return [...new Set(cars.value.map(car => car.brand))]
  })
  
  const uniqueCategories = computed(() => {
    return [...new Set(cars.value.map(car => car.category))]
  })
  
  const filteredCars = computed(() => {
    return cars.value.filter(car => {
      const brandMatch = !selectedBrand.value || car.brand === selectedBrand.value
      const categoryMatch = !selectedCategory.value || car.category === selectedCategory.value
      return brandMatch && categoryMatch
    })
  })
  
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  </script>
  
  <style scoped>
  .car-showcase-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .page-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: #ebebeb;
  }
  
  .filter-section {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .filter-group label {
    font-weight: bold;
  }
  
  .filter-group select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .cars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .car-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .car-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0,0,0,0.15);
  }
  
  .car-image-container {
    height: 200px;
    overflow: hidden;
  }
  
  .car-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .car-details {
    padding: 1rem;
  }
  
  .car-name {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .car-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #666;
  }
  
  .car-specs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .spec {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .car-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .details-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .details-button:hover {
    background-color: #2980b9;
  }
  </style>