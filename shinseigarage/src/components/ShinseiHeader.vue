<template>
  <header class="main-header">
    <div class="header-container">
      <nav class="main-nav main-nav-left">
        <a href="/Itens" class="nav-link">Itens</a>
        <a href="/cars" class="nav-link">Carros</a>
        <a href="/Import" class="nav-link">Importação</a>
        <a href="/contact" class="nav-link">Contato</a>
      </nav>

      <div class="logo">
        <router-link to="/home" class="logo-link">
          <span class="logo-text">Shinsei</span>
          <span class="logo-subtext">GARAGE</span>
        </router-link>
      </div>

      <div class="header-right">
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Buscar..." 
            class="search-input"
            v-model="searchQuery"
            @keyup.enter="performSearch"
          >
          <button class="search-button" @click="performSearch">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
          </button>
        </div>

        <div class="profile-menu">
          <template v-if="userStore.isLoggedIn()">
            <div class="user-profile dropdown">
              <span class="user-name">{{ userStore.getUserName() }}</span>
              <div class="dropdown-content">
                <a href="/Account" class="dropdown-link">Perfil</a>
                <a href="/settings" class="dropdown-link">Configurações</a>
                <a class="dropdown-link exit" @click="logOut">Sair</a>
              </div>
            </div>
          </template>
          <template v-else>
            <a href="/Login" class="nav-link login-link">Login</a>
          </template>
        </div>
      </div>
    </div>
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
const router = useRouter()
const searchQuery = ref('')

userStore.loadUserFromStorage()

const logOut = function(){
  modalLogOut.value = true 
}

const performSearch = function() {
  if (searchQuery.value.trim()) {
    router.push({ 
      path: '/search', 
      query: { q: searchQuery.value }
    })
  }
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  background-color: rgb(0, 0, 0);
  z-index: 100;
  transition: background-color 0.3s ease;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 5%;
}

.logo-link{
  text-decoration: none;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.logo {
  display: flex;
  text-decoration: none !important;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.logo-text {
  font-size: 1.8rem;
  text-decoration: none !important;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
}

.logo-subtext {
  font-size: 0.8rem;
  color: #cecccc;
  letter-spacing: 2px;
}


.nav-link {
  color: #ffffff;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-link:hover {
  transform: translateY(-5px);
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #cecccc;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0.3rem 0.5rem;
}

.search-input {
  background: transparent;
  border: none;
  padding: 3px;
  color: #ffffff;
  width: 150px;
  outline: none;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.search-icon {
  color: #ffffff;
}

.profile-menu {
  position: relative;
}

.user-profile {
  color: #cecccc;
  cursor: pointer;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 20px 20px 35px 20px;
  padding: 0.7rem;
  transition: background-color 0.7s ease;
}

.dropdown:hover .dropdown-content {
  display: block;
  transition: background-color 0.7s ease;
}

.dropdown-link {
  color: #ffffff;
  padding: 0.5rem;
  text-decoration: none;
  border-radius: 10px;
  display: block;
  transition: background-color 0.7s ease;
}

.dropdown-link:hover {
  background-color: rgba(105, 105, 105, 0.411);
  transition: background-color 0.3s ease;
  border-radius: 10px;

}

.exit {
  color: rgba(143, 24, 24, 0.836);
}

@media (max-width: 768px) {
  .header-container {
    flex-wrap: wrap;
    height: auto;
    padding: 1rem 5%;
  }

  .main-nav-left, .header-right {
    width: 100%;
    justify-content: center;
  }

  .logo {
    order: -1;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }

  .search-input {
    width: 100px;
  }
}
</style>