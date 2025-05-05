<template>
    <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style>
body{
  background-color: rgb(29, 29, 29);
  overflow-y: scroll;
  border: 0;
  margin: 0;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background:  rgba(0, 0, 0, 0.801);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: rgb(124, 124, 124); 
  border-radius: 15px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(124, 124, 124); 
}

* {
  border: none !important;
  outline: none !important;
  scrollbar-width: thin;
  scrollbar-color: rgb(0, 0, 0) rgba(0, 0, 0, 0.801);
}
</style>