<template>
    <footer>
      <div class="footer-links">
        <router-link to="/privacidade">Política de Privacidade</router-link>
        <router-link to="/termos">Termos de Uso</router-link>
      </div>
      <div class="social-media">
        <a href="https://instagram.com/shinseigarage">Instagram</a>
        <a href="https://facebook.com/shinseigarage">Facebook</a>
        <a href="https://twitter.com/shinseigarage">Twitter</a>
      </div>
      <p>&copy; 2025 Shinsei Garage. Todos os direitos reservados.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'ShinseiFooter',
  };
  </script>
  
  <style scoped>
  /* Estilos para rodapé */
  .footer-links, .social-media {
    display: flex;
    justify-content: center;
  }
  </style>
  