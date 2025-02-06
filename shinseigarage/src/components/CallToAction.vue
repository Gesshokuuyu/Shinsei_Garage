<template>
    <section class="call-to-action">
      <h2>Pronto para encontrar o carro dos seus sonhos?</h2>
      <div>
        <router-link to="/catálogo" class="cta-button">Ver Catálogo</router-link>
        <router-link to="/orçamento" class="cta-button">Solicitar Orçamento</router-link>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'CallToAction',
  };
  </script>
  
  <style scoped>
  /* Estilos para a chamada para ação */
  .cta-button {
    padding: 10px 20px;
    margin: 10px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
  }
  </style>
  