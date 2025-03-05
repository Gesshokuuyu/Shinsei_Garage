<template>
  <nav class="navbar">
    <div class="logo">
       Shinsei Garage
    </div>
    <div class="nav-links">
      <a href="/home" class="nav-link"><i class="fas fa-home"></i> Home</a>
      <a href="/vehichles" class="nav-link"><i class="fas fa-car"></i> Carros</a>
      <a href="/Itens" class="nav-link"><i class="fas fa-tools"></i> Itens</a>
      <a href="/history" class="nav-link"><i class="fas fa-envelope"></i> História</a>
      <a href="/login" class="nav-link" v-if="!userStore.isLoggedIn()"><i class="fas fa-user"></i>Entrar</a>
      <a href="/signin" class="nav-link" v-if="!userStore.isLoggedIn()"><i class="fas fa-user"></i>Registre-se</a>
      <a class="nav-link" @click="logout" v-if="userStore.isLoggedIn()" ><i class="fas fa-user"></i>Sair</a>
    </div>
  </nav>
</template>

<script setup>
  import { useUserStore } from '@/stores/userStore'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore();
  userStore.loadUserFromStorage(); 

  const router = useRouter();  

  const logout = function() {
    userStore.logout();
    router.push('/Login');  
  }
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(30, 30, 30, 0.9);
  color: rgba(255, 0, 0, 1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: rgba(255, 0, 0, 1);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-link:hover {
  color: rgba(255, 100, 100, 1);
}
</style>
