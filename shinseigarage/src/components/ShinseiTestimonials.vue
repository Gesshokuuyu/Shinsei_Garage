<template>
    <section class="testimonials">
      <h2>O Que Nossos Clientes Dizem</h2>
      <div class="testimonial">
        <img src="cliente1.jpg" alt="Cliente 1" />
        <p>"A Shinsei Garage me entregou um carro impecável, muito além das minhas
        expectativas!"</p>
      </div>
      <div class="testimonial">
        <img src="cliente2.jpg" alt="Cliente 2" />
        <p>"Excelente serviço! Meu carro está como novo, super recomendo."</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ShinseiTestimonials',
  };
  </script>
  
  <style scoped>
  /* Estilos para testemunhos */
  .testimonial {
    margin: 20px 0;
  }
  </style>
  