<template>
  <section class="featured-section">
    <h2><i class="fas fa-star"></i> Featured Vehicles</h2>
    <div class="featured-grid">
      <div 
        v-for="vehicle in featuredVehicles" 
        :key="vehicle.id" 
        class="featured-card"
      >
        <div class="card-image-container">
          <img :src="vehicle.image" :alt="vehicle.name">
          <div class="image-overlay">
            <div class="specs">
              <div class="spec">
                <i class="fas fa-tachometer-alt"></i>
                <span>{{ vehicle.topSpeed }} km/h</span>
              </div>
              <div class="spec">
                <i class="fas fa-horse"></i>
                <span>{{ vehicle.horsepower }} HP</span>
              </div>
              <div class="spec">
                <i class="fas fa-stopwatch"></i>
                <span>0-100: {{ vehicle.acceleration }}s</span>
              </div>
            </div>
          </div>
        </div>
        <div class="vehicle-details">
          <h3>{{ vehicle.name }}</h3>
          <p>{{ vehicle.description }}</p>
          <div class="price-tag">
            <i class="fas fa-tag"></i> 
            {{ vehicle.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
          </div>
          <div class="card-actions">
            <button 
              class="view-btn details-btn"
              @click="showVehicleDetails(vehicle)"
            >
              <i class="fas fa-eye"></i> View Details
            </button>
            <button 
              class="view-btn configure-btn"
              @click="configureVehicle(vehicle)"
            >
              <i class="fas fa-cogs"></i> Configure
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Vehicle Details Modal -->
    <div 
      v-if="selectedVehicle" 
      class="vehicle-details-modal"
      @click.self="selectedVehicle = null"
    >
      <div class="modal-content">
        <button class="close-btn" @click="selectedVehicle = null">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-header">
          <h2>{{ selectedVehicle.name }}</h2>
          <span class="modal-price">
            {{ selectedVehicle.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
          </span>
        </div>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedVehicle.image" :alt="selectedVehicle.name">
          </div>
          <div class="modal-details">
            <div class="detailed-specs">
              <div class="spec-item">
                <i class="fas fa-tachometer-alt"></i>
                <span>Top Speed: {{ selectedVehicle.topSpeed }} km/h</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-horse"></i>
                <span>Horsepower: {{ selectedVehicle.horsepower }} HP</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-stopwatch"></i>
                <span>0-100 km/h: {{ selectedVehicle.acceleration }} seconds</span>
              </div>
            </div>
            <p class="vehicle-description">{{ selectedVehicle.fullDescription }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button 
            class="modal-btn configure-btn"
            @click="configureVehicle(selectedVehicle)"
          >
            <i class="fas fa-cogs"></i> Configure Vehicle
          </button>
          <button 
            class="modal-btn contact-btn"
            @click="contactSales(selectedVehicle)"
          >
            <i class="fas fa-envelope"></i> Contact Sales
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedVehicle = ref(null)

const featuredVehicles = [
  {
    id: 1,
    name: 'Porsche 911 GT3 RS',
    description: 'Track-focused performance',
    fullDescription: 'The Porsche 911 GT3 RS is the ultimate expression of Porsche\'s motorsport heritage, designed for pure driving enthusiasts who demand peak performance and precision engineering.',
    image: '/api/placeholder/300/200',
    topSpeed: 296,
    horsepower: 518,
    acceleration: 3.2,
    price: 223800
  },
  {
    id: 2,
    name: 'Ferrari F40',
    description: 'Legendary supercar',
    fullDescription: 'The Ferrari F40 is an iconic supercar that represents the pinnacle of 1980s automotive engineering, celebrated for its raw performance and minimalist design.',
    image: '/api/placeholder/300/200',
    topSpeed: 324,
    horsepower: 471,
    acceleration: 3.5,
    price: 1600000
  },
  {
    id: 3,
    name: 'McLaren Senna',
    description: 'Ultimate road-legal track car',
    fullDescription: 'Named after the legendary Formula 1 driver Ayrton Senna, this hypercar is a testament to McLaren\'s racing DNA, offering unparalleled performance and aerodynamic excellence.',
    image: '/api/placeholder/300/200',
    topSpeed: 340,
    horsepower: 789,
    acceleration: 2.8,
    price: 1000000
  }
]

const showVehicleDetails = (vehicle) => {
  selectedVehicle.value = vehicle
}

const configureVehicle = (vehicle) => {
  alert(`Configuring ${vehicle.name}. Stay tuned for our customization feature!`)
}

const contactSales = (vehicle) => {
  alert(`Connecting you with sales representative for ${vehicle.name}. Our team will contact you shortly!`)
}
</script>

<style scoped>
.featured-section {
  padding: 2rem;
  background: rgba(240, 240, 240, 0.2);
  color: rgba(255, 0, 0, 1);
}

.featured-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.featured-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  transform: perspective(1000px);
}

.featured-card:hover {
  transform: scale(1.05) perspective(1000px) rotateY(5deg);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.card-image-container {
  position: relative;
  overflow: hidden;
}

.featured-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.featured-card:hover img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.featured-card:hover .image-overlay {
  opacity: 1;
}

.specs {
  display: flex;
  gap: 20px;
  color: white;
}

.spec {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spec i {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: rgba(255, 0, 0, 1);
}

.vehicle-details {
  padding: 1.5rem;
  text-align: center;
}

.vehicle-details h3 {
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 1);
}

.price-tag {
  margin: 10px 0;
  font-weight: bold;
  color: rgba(255, 0, 0, 1);
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.view-btn {
  background: rgba(255, 0, 0, 1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s ease;
}

.view-btn:hover {
  background: rgba(255, 50, 50, 1);
}

.details-btn {
  background: rgba(255, 0, 0, 1);
}

.configure-btn {
  background: rgba(30, 30, 30, 1);
}

/* Modal Styles */
.vehicle-details-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 80%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgba(255, 0, 0, 1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.modal-header h2 {
  margin: 0;
  color: rgba(255, 0, 0, 1);
}

.modal-price {
  font-weight: bold;
  color: rgba(255, 0, 0, 1);
}

.modal-body {
  display: flex;
  padding: 1.5rem;
}

.modal-image {
  flex: 1;
  margin-right: 1.5rem;
}

.modal-image img {
  width: 100%;
  border-radius: 10px;
}

.modal-details {
  flex: 1;
}

.detailed-specs {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 1rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(30, 30, 30, 1);
}

.spec-item i {
  color: rgba(255, 0, 0, 1);
  font-size: 1.2rem;
}

.vehicle-description {
  margin-top: 1rem;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 1.5rem;
  border-top: 1px solid rgba(0,0,0,0.1);
}

.modal-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.configure-btn {
  background: rgba(30, 30, 30, 1);
  color: white;
}

.configure-btn:hover {
  background: rgba(50, 50, 50, 1);
}

.contact-btn {
  background: rgba(255, 0, 0, 1);
  color: white;
}

.contact-btn:hover {
  background: rgba(255, 50, 50, 1);
}
</style>