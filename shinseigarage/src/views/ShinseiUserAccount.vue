<template>
    <div class="account-layout">
      <aside class="sidebar">
        <AccountSideOpitons/>
      </aside>
      
      <main class="main-content">
        <AccountFormUser />
      </main>
    </div>
  </template>
  
  <script setup>
  import AccountFormUser from '@/components/Account/AccountFormUser.vue';
  import AccountSideOpitons from '@/components/Account/AccountSideOpitons.vue';

  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/userStore';
  import { useToast } from 'vue-toastification';

  
  const userStore = useUserStore()
  const router = useRouter()
  const toast = useToast()

    const HandleUser = function(){
      if(!userStore.isLoggedIn()){
        toast.error('Para acessar está pagina, você deve estar autenticado em uma conta!')
        setTimeout(()=> {
          router.push('/login')
        }, 3500)
      }
    }
    
    onMounted(() => {
      HandleUser()
    })
  </script>
  
  <style scoped>
  .account-layout {
    display: flex;
    width: 100%;
    min-height: 100vh;
  }
  
  .sidebar {
    width: 270px;
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