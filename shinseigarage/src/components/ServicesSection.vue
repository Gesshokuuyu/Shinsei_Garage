<template>
    <section class="services">
      <h2>Serviços de Restauração e Manutenção</h2>
      <p>
        Nosso time de experts cuida de cada detalhe para garantir que seu carro
        esteja sempre na melhor forma possível.
      </p>
      <div class="service-icons">
        <div class="service-item">
          <h3>Restauração</h3>
        </div>
        <div class="service-item">
          <h3>Manutenção</h3>
        </div>
        <div class="service-item">
          <h3>Personalização</h3>
        </div>
        <div class="service-item">
          <h3>Consultoria</h3>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ServicesSection',
  };
  </script>
  
  <style scoped>
  /* Estilos para serviços */
  .service-icons {
    display: flex;
    justify-content: space-around;
  }
  .service-item {
    text-align: center;
  }
  </style>
  