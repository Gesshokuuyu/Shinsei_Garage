<template>
    <div class="car-card">
      <div class="car-image-container">
        <img 
          :src="car.imageUrl" 
          :alt="car.name" 
          class="car-image"
        />
      </div>
      
      <div class="car-details">
        <div class="car-header">
          <h2 class="car-name">{{ car.name }}</h2>
          <span class="car-year">{{ car.year }}</span>
        </div>
        
        <div class="car-specs">
          <div class="spec-item">
            <svg viewBox="0 0 24 24" class="spec-icon">
              <path d="M16 5l3 3 2-2-3-3zM1 18.5L5.5 23l11-11-3.5-3.5z"/>
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            <span>{{ car.brand }}</span>
          </div>
          
          <div class="spec-item">
            <svg viewBox="0 0 24 24" class="spec-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
              <path d="M13 9h-2v2h2V9zm0 4h-2v2h2v-2z"/>
            </svg>
            <span>{{ car.mileage }} km</span>
          </div>
        </div>
        
        <div class="car-price-action">
          <div class="car-price">{{ formatPrice(car.price) }}</div>
          <button 
            class="details-button"
            @click="viewDetails"
          >
            Detalhes
            <svg viewBox="0 0 24 24" class="button-icon">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MercedesCarCard',
    props: {
      car: {
        type: Object,
        required: true,
        validator: (value) => {
          return value.name && value.brand && value.price && value.year && value.imageUrl && value.mileage
        }
      }
    },
    methods: {
      formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price)
      },
      viewDetails() {
        this.$emit('view-details', this.car)
      }
    }
  }
  </script>
  
  <style scoped>
  .car-card {
    width: 100%;
    max-width: 350px;
    background-color: #f4f4f4;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .car-card:hover {
    transform: translateY(-10px);
  }
  
  .car-image-container {
    width: 100%;
    height: 250px;
    overflow: hidden;
  }
  
  .car-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .car-card:hover .car-image {
    transform: scale(1.05);
  }
  
  .car-details {
    padding: 20px;
    background-color: white;
  }
  
  .car-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .car-name {
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
  }
  
  .car-year {
    background-color: #000;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
  .car-specs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    color: #666;
  }
  
  .spec-item {
    display: flex;
    align-items: center;
  }
  
  .spec-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    fill: currentColor;
  }
  
  .car-price-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .car-price {
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
  }
  
  .details-button {
    display: flex;
    align-items: center;
    background-color: #000;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .details-button:hover {
    background-color: #333;
  }
  
  .button-icon {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    fill: white;
  }
  </style>