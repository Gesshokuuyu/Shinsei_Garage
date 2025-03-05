<template>
  <div class="carousel-container">
    <div 
      class="carousel" 
      ref="carousel"
      @mouseenter="pauseAutoSlide"
      @mouseleave="resumeAutoSlide"
    >
      <div 
        v-for="(car, index) in cars" 
        :key="index" 
        class="carousel-item"
        :class="{ 'active': index === currentSlide.value }"
        :style="{ backgroundImage: `url(${car.image})` }"
      >
        <div class="car-info">
          <h2 class="car-name">{{ car.name }}</h2>
          <p class="car-description">{{ car.description }}</p>
          <div class="car-specs">
            <div class="spec">
              <i class="fas fa-tachometer-alt"></i>
              <span>{{ car.topSpeed }} km/h</span>
            </div>
            <div class="spec">
              <i class="fas fa-horse"></i>
              <span>{{ car.horsepower }} HP</span>
            </div>
            <div class="spec">
              <i class="fas fa-stopwatch"></i>
              <span>0-100: {{ car.acceleration }}s</span>
            </div>
          </div>
          <button 
            class="details-btn"
            @click="showCarDetails(car)"
          >
            <i class="fas fa-info-circle"></i> More Details
          </button>
        </div>
      </div>
    </div>
    
    <div class="carousel-controls">
      <button 
        v-for="(car, index) in cars" 
        :key="index"
        @click="goToSlide(index)"
        class="dot-control"
        :class="{ 'active': index === currentSlide.value }"
      ></button>
    </div>
    
    <div class="navigation-controls">
      <button @click="prevSlide" class="control-btn prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button @click="nextSlide" class="control-btn next">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Modal for Car Details -->
    <div 
      v-if="selectedCar" 
      class="car-details-modal"
      @click.self="selectedCar = null"
    >
      <div class="modal-content">
        <button class="close-btn" @click="selectedCar = null">
          <i class="fas fa-times"></i>
        </button>
        <h2>{{ selectedCar.name }} Details</h2>
        <img :src="selectedCar.image" :alt="selectedCar.name">
        <div class="modal-specs">
          <p>{{ selectedCar.fullDescription }}</p>
          <div class="detailed-specs">
            <div><strong>Top Speed:</strong> {{ selectedCar.topSpeed }} km/h</div>
            <div><strong>Horsepower:</strong> {{ selectedCar.horsepower }} HP</div>
            <div><strong>0-100 km/h:</strong> {{ selectedCar.acceleration }} seconds</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cars = ref([
  {
    name: 'Nissan GTR R35',
    description: 'The legendary performance machine',
    fullDescription: 'The Nissan GT-R R35 is a high-performance sports car that has become an icon of Japanese automotive engineering, known for its incredible acceleration and advanced technology.',
    image: '/api/placeholder/800/400',
    topSpeed: 315,
    horsepower: 570,
    acceleration: 2.9
  },
  {
    name: 'Toyota Supra MK4',
    description: 'Iconic Japanese sports car',
    fullDescription: 'The Toyota Supra MK4 is a legendary sports car that gained worldwide fame, particularly after its appearance in popular media, known for its incredible tuning potential.',
    image: '/api/placeholder/800/400',
    topSpeed: 250,
    horsepower: 326,
    acceleration: 4.6
  },
  {
    name: 'Mazda RX-7',
    description: 'Rotary engine masterpiece',
    fullDescription: 'The Mazda RX-7 is a unique sports car featuring a distinctive rotary engine, celebrated for its lightweight design and exceptional handling characteristics.',
    image: '/api/placeholder/800/400',
    topSpeed: 240,
    horsepower: 276,
    acceleration: 5.3
  }
])

const carousel = ref(null)
const currentSlide = ref(0)
const selectedCar = ref(null)
let autoSlideInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % cars.value.length
  updateCarousel()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + cars.value.length) % cars.value.length
  updateCarousel()
}

const goToSlide = (index) => {
  currentSlide.value = index
  updateCarousel()
}

const updateCarousel = () => {
  if (carousel.value) {
    carousel.value.style.transform = `translateX(-${currentSlide.value * 100}%)`
  }
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 5000)
}

const pauseAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
}

const resumeAutoSlide = () => {
  startAutoSlide()
}

const showCarDetails = (car) => {
  selectedCar.value = car
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
})
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(200, 200, 200, 0.2);
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  min-width: 100%;
  height: 70vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0.6;
  transition: opacity 0.5s ease;
}

.carousel-item.active {
  opacity: 1;
}

.car-info {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  color: rgba(30, 30, 30, 1);
  max-width: 500px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  transform: scale(0.9);
  transition: all 0.5s ease;
}

.carousel-item.active .car-info {
  transform: scale(1);
}

.car-name {
  font-size: 2rem;
  margin-bottom: 10px;
  color: rgba(255, 0, 0, 1);
}

.car-description {
  margin-bottom: 15px;
  font-style: italic;
}

.car-specs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.spec {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.spec i {
  color: rgba(255, 0, 0, 1);
  font-size: 1.5rem;
}

.details-btn {
  background: rgba(255, 0, 0, 1);
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  margin-right: auto;
  transition: background 0.3s ease;
}

.details-btn:hover {
  background: rgba(255, 50, 50, 1);
}

.carousel-controls {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.dot-control {
  width: 12px;
  height: 12px;
  background: rgba(100, 100, 100, 0.5);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dot-control.active {
  background: rgba(255, 0, 0, 1);
  width: 20px;
  border-radius: 10px;
}

.navigation-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.control-btn {
  background: rgba(30, 30, 30, 0.5);
  color: rgba(255, 0, 0, 1);
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.control-btn:hover {
  background: rgba(30, 30, 30, 0.7);
}

.car-details-modal {
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
  padding: 2rem;
  border-radius: 15px;
  max-width: 600px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgba(255, 0, 0, 1);
}

.modal-content img {
  max-width: 100%;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.detailed-specs {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
</style>