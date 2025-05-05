<template>
  <div class="sidebar-container">
      
    <div class="top-nav">
      <router-link to="/Home" class="back-home">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        <span> Home</span>
      </router-link>
    </div>
      
    <div class="profile-section">
      <div class="avatar">
        <img v-if="userImage" :src="userImage" alt="Foto do usuário" class="user-image" />
        <font-awesome-icon v-else :icon="['fas', 'user-circle']" />
      </div>
      <div class="user-info">
        <h3>{{ username }}</h3>
        <p>{{ userEmail }}</p>
        <input 
          type="file" 
          ref="fileInput" 
          accept="image/*" 
          style="display: none" 
          @change="handleImageUpload"
        />
      </div>
    </div>

    <nav class="menu-options">
      <router-link 
        v-for="option in menuOptions" 
        :key="option.path" 
        :to="option.path" 
        class="menu-option"
        :class="{ active: $route.path === option.path }"
      >
        <font-awesome-icon :icon="option.icon" class="option-icon" />
        <span class="option-text">{{ option.label }}</span>
      </router-link>
    </nav>

    <div class="logout-section">
      <button class="logout-button" @click="HandleLogout">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const fileInput = ref(null);

const username = ref(userStore.getUserName());
const userEmail = ref(userStore.getUserEmail());
const userImage = ref(null );

onMounted( async () => {
  userImage.value = await userStore.getUserImage()
})

const menuOptions = [
  { 
    label: 'Meu Perfil', 
    path: '/Account', 
    icon: ['fas', 'user']
  },
  { 
    label: 'Configurações', 
    path: '/settings', 
    icon: ['fas', 'cog']
  },
  { 
    label: 'Segurança', 
    path: '/security', 
    icon: ['fas', 'shield-alt']
  },
  { 
    label: 'Notificações', 
    path: '/notifications', 
    icon: ['fas', 'bell']
  },
  { 
    label: 'Formas de Pagamento', 
    path: '/billing', 
    icon: ['fas', 'credit-card']
  },
  { 
    label: 'Centro de Ajuda', 
    path: '/help', 
    icon: ['fas', 'question-circle']
  }
];

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  if (!file.type.match('image.*')) {
    alert('Por favor, selecione apenas arquivos de imagem.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const imageData = e.target.result;
    userImage.value = imageData;
    
    // Salva a imagem no userStore
    if (userStore.setUserImage) {
      userStore.setUserImage(imageData);
    } else {
      console.warn('Método setUserImage não disponível no userStore');
    }
  };
  reader.readAsDataURL(file);
};

const HandleLogout = () => {
  userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar-container {
  background-color: #000000b4;
  color: #fff;
  width: 270px;
  min-height: 100vh;
  padding: 20px 0;
  border-radius: 5px 5px 20px 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: sticky;
  top: 0;
  overflow-y: auto;
  z-index: 100;
}

.profile-section {
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
  border-bottom: 1px solid #333;
}

.back-home {
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.back-home:hover {
  opacity: 0.8;
}

.back-home span {
  margin-left: 8px;
}

.avatar {
  font-size: 2.5rem;
  margin-right: 7px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #444;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-info {
  flex: 1;
  overflow: hidden;
}

.user-info h3 {
  margin: 0;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info p {
  margin: 5px 0 0;
  font-size: 0.8rem;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload-button {
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 0.7rem;
  padding: 0;
  margin-top: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.upload-button:hover {
  color: #fff;
}

.upload-button span {
  margin-left: 5px;
}

.menu-options {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
}

.menu-option {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.2s;
}

.menu-option:hover {
  background-color: #222;
}

.menu-option.active {
  background-color: #333;
  border-left: 3px solid #fff;
}

.option-icon {
  width: 20px;
  margin-right: 15px;
  flex-shrink: 0;
}

.option-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-section {
  padding: 0 20px 20px;
  border-top: 1px solid #333;
  padding-top: 20px;
}

.top-nav {
  padding: 12px 15px;
  border-bottom: 1px solid #333;
}

.logout-button {
  width: 100%;
  padding: 12px;
  background-color: transparent;
  border: 1px solid #555;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #333;
}

.logout-button span {
  margin-left: 10px;
}

/* Media queries para responsividade */
@media screen and (max-width: 1024px) {
  .sidebar-container {
    width: 220px;
  }
  
  .profile-section {
    padding: 0 15px 15px;
  }
  
  .menu-option {
    padding: 10px 15px;
  }
  
  .option-icon {
    margin-right: 10px;
  }
  
  .logout-section {
    padding: 0 15px 15px;
    padding-top: 15px;
  }
}

@media screen and (max-width: 768px) {
  .sidebar-container {
    width: 100%;
    height: auto;
    min-height: unset;
    border-radius: 5px 5px 0 0;
    position: relative;
  }
  
  .menu-options {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
  }
  
  .menu-option {
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
  }
  
  .option-text {
    font-size: 0.9rem;
  }
  
  .logout-section {
    padding: 10px 15px;
  }
}

@media screen and (max-width: 480px) {
  .sidebar-container {
    padding: 10px 0;
  }
  
  .profile-section {
    flex-direction: column;
    text-align: center;
    padding: 10px;
  }
  
  .avatar {
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .user-info h3 {
    font-size: 1rem;
  }
  
  .user-info p {
    font-size: 0.75rem;
  }
  
  .menu-option {
    width: 100%;
    padding: 8px 15px;
  }
  
  .option-icon {
    font-size: 0.9rem;
  }
  
  .option-text {
    font-size: 0.85rem;
  }
  
  .logout-button {
    padding: 10px;
    font-size: 0.9rem;
  }
  
  .top-nav {
    padding: 10px;
  }
}

/* Para compatibilidade com modo escuro e claro */
@media (prefers-color-scheme: light) {
  .sidebar-container {
    background-color: rgba(0, 0, 0, 0.8);
  }
}

/* Suporte para sidebar colapsável */
.collapsed .sidebar-container {
  width: 60px;
}

.collapsed .user-info,
.collapsed .option-text,
.collapsed .logout-button span,
.collapsed .back-home span {
  display: none;
}

.collapsed .menu-option {
  justify-content: center;
}

.collapsed .option-icon {
  margin-right: 0;
}

.collapsed .avatar {
  margin-right: 0;
}

.collapsed .profile-section,
.collapsed .logout-section {
  justify-content: center;
}
</style>