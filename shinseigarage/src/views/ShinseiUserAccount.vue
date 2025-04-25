<template>
    <div class="account-layout">
      <aside class="sidebar">
        <div class="sidebar-placeholder">Sidebar Content</div>
      </aside>
      
      <main class="main-content">
        <AccountFormUser />
      </main>
    </div>
  </template>
  
  <script setup>
  import AccountFormUser from '@/components/Account/AccountFormUser.vue';
  </script>
  
  <style scoped>
  .account-layout {
    display: flex;
    width: 100%;
    min-height: 100vh;
  }
  
  .sidebar {
    width: 250px;
    background-color: #242323;
    border-right: 1px solid #e0e0e0;
    padding: 1rem;
  }
  
  .sidebar-placeholder {
    color: #888;
  }
  
  .main-content {
    flex: 1;
    padding: 1rem;
  }
  </style>