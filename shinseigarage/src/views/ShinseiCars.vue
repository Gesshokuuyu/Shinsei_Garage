<template>
  <div class="page-container">
    <div class="header">
      <ShinseiHeader/>
    </div>
    <main class="main-content">
      <div class="filters-grid">
        <h1 class="filters-title">Carros em Destaque</h1>
        <p class="filters-description">
          Navegue por nossa seleção de carros premium e encontre o veículo perfeito para você.
        </p>
        <div class="filters-options">
          <button class="filter-button">Todos</button>
          <button class="filter-button">SUVs</button>
          <button class="filter-button">Sedans</button>
          <button class="filter-button">Hatchbacks</button>
          <button class="filter-button">Elétricos</button>
        </div>
      </div>
      <div class="cars-grid">
        <CarCard 
          v-for="car in cars" 
          :key="car.id"
          :car="car"
          @view-details="handleViewDetails"
        />
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
    mileage: 15000,
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Mercedes-Benz GLE',
    year: 2022,
    price: 380000,
    mileage: 25000,
    location: 'Rio de Janeiro, RJ',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Audi Q7 Quattro',
    year: 2023,
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
    price: 350000,
    mileage: 32000,
    location: 'Brasília, DF',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Volvo XC90',
    year: 2023,
    price: 390000,
    mileage: 22000,
    location: 'Porto Alegre, RS',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
  }
]);

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

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  max-width: 70vw;
  margin-left: 18vw ;
  padding: 0 20px;
}

.filters-grid {
  margin-top: auto;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: left;
  max-width: 18vw;  
}

.filters-title {
  font-size: 3rem;
  color: #ebe9e9;
  word-break: break-word;
}

.filters-description {
  font-size: 0.9rem;
  max-width: 12vw;
  text-align: justify;
  text-wrap: balance;
  color: #c0c0c0;
}

.filters-options{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  max-width: 7vw;
}

.filter-button {
  background-color: #ffffff00;
  color: #ffffff;
  border: 1px solid #ffffff !important;
  padding: 7px 20px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}


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
}

@media (max-width: 767px) {
  .cars-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 10px;
  }
  
  .main-content {
    padding: 20px 15px;
  }
}

@media (max-width: 480px) {
  .cars-grid {
    gap: 20px;
    padding: 0 5px;
  }
  
  .main-content {
    padding: 20px 10px;
  }
}
</style>