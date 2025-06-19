<template>
  <div class="page-container">
    <div class="header">
      <ShinseiHeader/>
    </div>
    <main class="main-content">
      <div class="content-wrapper">
        <div class="filters-section">
          <h1 class="filters-title">Carros em Destaque</h1>
          <p class="filters-description">
            Navegue por nossa seleção de carros premium e encontre o veículo perfeito para você.
          </p>
          <div class="filters-options">
            <button 
              v-for="category in categorys" 
              :key="category.id" 
              :class="['filter-button', { 'filter-selected': selectedCategory === category.id }]"
              @click="filter(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
          <div class="filter-text-section">
            <input type="text" class="filter-input-text" placeholder="Pesquisar">
            
          </div>
        </div>
        <div class="cars-section">
          <TransitionGroup 
            name="car-list" 
            tag="div" 
            class="cars-grid"
          >
            <CarCard 
              v-for="car in carsFiltered" 
              :key="car.id"
              :car="car"
              @view-details="handleViewDetails"
            />
          </TransitionGroup>
        </div>
      </div>
    </main>
  </div>
  <FooterComponent/>
</template>

<script setup>
import CarCard from '@/components/Cars/carCard.vue';
import FooterComponent from '../components/FooterComponent.vue';
import ShinseiHeader from '../components/ShinseiHeader.vue';
import { ref } from 'vue';

// Dados de exemplo para demonstração
const cars = ref([
  {
    id: 1,
    name: 'BMW X5 M Sport',
    year: 2023,
    price: 450000,
    class: 'SUV',
    mileage: 15000,
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Mercedes-Benz GLE',
    year: 2022,
    class: 'SED',
    price: 380000,
    mileage: 25000,
    location: 'Rio de Janeiro, RJ',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Audi Q7 Quattro',
    year: 2023,
    class: 'SUV',
    price: 420000,
    mileage: 18000,
    location: 'Belo Horizonte, MG',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Porsche Macan',
    year: 2024,
    price: 520000,
    mileage: 8000,
    location: 'Curitiba, PR',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Range Rover Evoque',
    year: 2022,
    class: 'SUV',
    price: 350000,
    mileage: 32000,
    location: 'Brasília, DF',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Volvo XC90',
    year: 2023,
    class: 'HAT',
    price: 390000,
    mileage: 22000,
    location: 'Porto Alegre, RS',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
  }
]);

const categorys = ref([
  { id: 'All', name: 'Todos' },
  { id: 'SUV', name: 'SUVs' },
  { id: 'SED', name: 'Sedans' },
  { id: 'HAT', name: 'Hatchbacks' },
  { id: 'CAM', name: 'Caminhonetes' }
]);

const selectedCategory = ref('All');

// const searchInput = ref('');

const filter = function(category) {
 selectedCategory.value = category;

  if(category === 'All'){
    carsFiltered.value = cars.value;
  } else {
    carsFiltered.value = cars.value.filter(car => car.class === category);
  }
};

const carsFiltered = ref(cars.value);

const handleViewDetails = (car) => {
  console.log('Ver detalhes do carro:', car);
};
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
  padding: 40px 20px;
  margin-top: 6vh;
}

.content-wrapper {
  display: flex;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;
}

.filters-section {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 40px;
}

.cars-section {
  flex: 1;
  min-width: 0;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  width: 100%;
}

.filters-title {
  font-size: 2.5rem;
  color: #ebe9e9;
  margin: 0;
  line-height: 1.2;
}

.filters-description {
  font-size: 0.95rem;
  text-align: justify;
  color: #c0c0c0;
  line-height: 1.5;
  margin: 0;
}

.filters-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-button {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff !important;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-button:hover {
  background-color: #ffffff20;
  transform: translateY(-2px);
}

.filter-selected {
  background-color: #ffffff;
  color: #000000;
  border-color: #ffffff !important;
  transform: scale(1.05);
}

/* Transições para filtragem */
.car-list-enter-active,
.car-list-leave-active {
  transition: all 0.5s ease;
}

.car-list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.car-list-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.car-list-move {
  transition: transform 0.5s ease;
}

/* Media Queries Responsivos */
@media (min-width: 1200px) {
  .cars-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
  
  .main-content {
    padding: 60px 40px;
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .cars-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  .main-content {
    padding: 40px 30px;
  }
  
  .filters-section {
    flex: 0 0 250px;
  }
  
  .filters-title {
    font-size: 2rem;
  }
}

@media (max-width: 767px) {
  .content-wrapper {
    flex-direction: column;
    gap: 30px;
  }
  
  .filters-section {
    flex: none;
    position: static;
    width: 100%;
  }
  
  .cars-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .main-content {
    padding: 20px 15px;
  }
  
  .filters-title {
    font-size: 1.8rem;
  }
  
  .filters-options {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .cars-grid {
    gap: 20px;
  }
  
  .main-content {
    padding: 20px 10px;
  }
  
  .filters-title {
    font-size: 1.5rem;
  }
  
  .filter-button {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
  
}
.filter-text-section {
  margin-top: 10px;
  max-width: 20vw;
  max-height: 5vh;
}

.filter-input-text{
  width: 19vw;
  height: 4vh;
  border-radius: 20px;
  padding-left: 10px;
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff !important;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-input-text:hover {
  background-color: #ffffff4d;
  transform: translateY(-2px);
}
</style>