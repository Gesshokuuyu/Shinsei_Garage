<template>
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Início</router-link></li>
          <li><router-link to="/sobre">Sobre Nós</router-link></li>
          <li><router-link to="/catálogo">Catálogo</router-link></li>
          <li><router-link to="/contato">Contato</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'ShinseiHeader',
  };
  </script>
  
  <style scoped>
  /* Adicione estilos para o cabeçalho aqui */
  </style>
  