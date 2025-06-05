<template>
  <div class="car-card">
    <div class="image-container">
      <img 
        :src="car.image" 
        :alt="car.name"
        class="car-image"
        @error="handleImageError"
      />
      <div class="price-badge">
        {{ formatPrice(car.price) }}
      </div>
    </div>
    
    <div class="card-content">
      <div class="car-info">
        <h3 class="car-name">{{ car.name }}</h3>
        <p class="car-details">{{ car.year }} • {{ car.mileage }} km</p>
        <p class="car-location">{{ car.location }}</p>
      </div>
      
      <button 
        class="details-button"
        @click="handleViewDetails"
      >
        Ver Detalhes
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  car: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      name: 'BMW X5 M Sport',
      year: 2023,
      price: 450000,
      mileage: 15000,
      location: 'São Paulo, SP',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
    })
  }
})

const emit = defineEmits(['view-details'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0
  }).format(price)
}

const handleViewDetails = () => {
  emit('view-details', props.car)
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300/f5f5f5/999999?text=Imagem+Indisponível'
}
</script>

<style scoped>
.car-card {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 380px;
  margin: 0 auto;
  position: relative;
}

.car-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(202, 202, 202, 0.315),
    0 8px 16px rgba(117, 117, 117, 0.253);
}

.image-container {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.car-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.car-card:hover .car-image {
  transform: scale(1.05);
}

.price-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #000000, #1d1d1d);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: 0.5s ease !important;
}

.price-badge:hover {
  background: linear-gradient(135deg, #1d1d1d, #000000);
  transition: 0.6s ease !important;
}


.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.car-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.car-name {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.5px;
  line-height: 1.3;
}

.car-details {
  font-size: 14px;
  color: #666;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.car-location {
  font-size: 13px;
  color: #999;
  margin: 0;
  font-weight: 400;
}

.details-button {
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.details-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.details-button:hover::before {
  left: 100%;
}

.details-button:hover {
  background: linear-gradient(135deg, #2d2d2d, #404040);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.details-button:active {
  transform: translateY(0);
}

@media (max-width: 480px) {
  .car-card {
    max-width: 100%;
    margin: 0 16px;
  }
  
  .image-container {
    height: 200px;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .car-name {
    font-size: 18px;
  }
}
</style>