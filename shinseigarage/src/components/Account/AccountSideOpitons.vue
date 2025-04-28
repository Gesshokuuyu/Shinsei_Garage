<template>
    <div class="sidebar-container">
        
        <div class="top-nav">
            <router-link to="/Home" class="back-home">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            <span>Voltar</span>
            </router-link>
        </div>
        
      <div class="profile-section">
        <div class="avatar">
          <font-awesome-icon :icon="['fas', 'user-circle']" />
        </div>
        <div class="user-info">
          <h3>{{ username }}</h3>
          <p>{{ userEmail }}</p>
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
        <button class="logout-button" @click="logout">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const userStore = useUserStore()
  const router = useRouter();
  

  const username = ref(userStore.getUserName());
  const userEmail = ref(userStore.getUserEmail());
  
  // Menu options with their respective routes and icons
  const menuOptions = [
    { 
      label: 'My Profile', 
      path: '/account/profile', 
      icon: ['fas', 'user']
    },
    { 
      label: 'Settings', 
      path: '/account/settings', 
      icon: ['fas', 'cog']
    },
    { 
      label: 'Security', 
      path: '/account/security', 
      icon: ['fas', 'shield-alt']
    },
    { 
      label: 'Notifications', 
      path: '/account/notifications', 
      icon: ['fas', 'bell']
    },
    { 
      label: 'Billing', 
      path: '/account/billing', 
      icon: ['fas', 'credit-card']
    },
    { 
      label: 'Help Center', 
      path: '/account/help', 
      icon: ['fas', 'question-circle']
    }
  ];
  
  // Logout function
  const logout = () => {
    // Here you would implement your logout logic
    // For example, clear authentication tokens, etc.
    
    // Redirect to login page
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .sidebar-container {
    background-color: #000;
    color: #fff;
    width: 250px;
    height: 147vh;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
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
    margin-right: 15px;
  }
  
  .user-info h3 {
    margin: 0;
    font-size: 1.1rem;
  }
  
  .user-info p {
    margin: 5px 0 0;
    font-size: 0.8rem;
    opacity: 0.7;
  }
  
  .menu-options {
    flex: 1;
    padding: 20px 0;
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
  </style>