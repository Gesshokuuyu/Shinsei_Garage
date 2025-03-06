<template>

<header class="main-header">
        <div class="logo">
          <span class="logo-text">Shinsei</span>
          <span class="logo-subtext">GARAGE</span>
        </div>
        <nav class="main-nav">
          <a href="/Itens" class="nav-link">Itens</a>
          <a href="/cars" class="nav-link">Carros</a>
          <a href="/Import" class="nav-link">Importação</a>
          <a href="/contact" class="nav-link">Entre em contato</a>
          <a href="/Login" class="nav-link" v-if="!userStore.isLoggedIn()">Login</a>
          <a class="nav-link exit" @click="logOut()" v-if="userStore.isLoggedIn()" >Sair</a>
        </nav>
    </header>

    <ModalLogOut @action="LogOutAction" :is-visible="modalLogOut"/>

</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import ModalLogOut from '@/components/modais/ModalLogOut.vue'
import { ref } from 'vue'

  const modalLogOut = ref(false)
  const userStore = useUserStore()
  userStore.loadUserFromStorage()
  const router = useRouter()
  
  const logOut = function(){
    modalLogOut.value = true 
  }
  
  const LogOutAction = function(data){
      switch(data){
        case 'confirm':
          userStore.logout()
          router.push('/Login')
          break;
        case 'cancel':
          modalLogOut.value = false
          break
      }
    }
</script>

<style scoped>

.main-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    background-color: transparent;
    z-index: 100;
    transition: background-color 0.3s ease;
  }
  
  
  .logo {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }
  
  .logo-text {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--white);
    text-transform: uppercase;
  }
  
  .logo-subtext {
    font-size: 0.8rem;
    color: var(--primary-color);
    letter-spacing: 2px;
  }
  
  .main-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-link {
    color: var(--white);
    text-decoration: none;
    position: relative;
    cursor: pointer;
    transition: color 0.3s ease;
    transition: 0.4s;
  
  }
  
  .exit{
    color: rgba(197, 45, 45, 0.836);
  }
  
  .exit:hover{
    color: rgba(197, 45, 45, 0.836);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
    transition: 0.4s;
  
  }
  
  .nav-link:hover {
    /* color: var(--primary-color); */
    transition: 0.4s;
    transform: translateY(-5px);
  }
  
  .nav-link:hover::after {
    width: 100%;
    transition: 0.4s;
  }
</style>