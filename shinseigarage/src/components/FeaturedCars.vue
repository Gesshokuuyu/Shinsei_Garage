<template>
    <section class="featured-cars">
      <h2>Carros em Destaque</h2>
      <p>
        Aqui você encontra os carros que definiram uma era - de modelos exclusivos
        a edições limitadas, todos com a qualidade e o cuidado que você merece.
      </p>
      <div class="car-gallery">
        <div v-for="car in cars" :key="car.id" class="car-item">
          <img :src="car.image" :alt="car.name" />
          <p>{{ car.name }}</p>
          <router-link :to="'/carro/' + car.id">Ver detalhes</router-link>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'FeaturedCars',
    data() {
      return {
        cars: [
          { id: 1, name: 'Nissan Skyline R34', image: 'skyline.jpg' },
          { id: 2, name: 'Toyota Supra Mk4', image: 'supra.jpg' },
          { id: 3, name: 'Mazda RX-7', image: 'rx7.jpg' },
          { id: 4, name: 'Honda Civic Type-R', image: 'civic.jpg' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para galeria de carros */
  .car-gallery {
    display: flex;
    gap: 20px;
  }
  .car-item {
    text-align: center;
  }
  </style>
  