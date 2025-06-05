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
        <div class="search-wrapper" v-if="userStore.isLoggedIn()">
          <div class="search-container" :class="{ 'search-active': isSearchActive }">
            <input 
              type="text" 
              placeholder="Buscar..." 
              class="search-input"
              v-model="searchQuery"
              @input="filterRoutes"
              @keyup.enter="performSearch"
              @focus="isSearchActive = true"
              @blur="handleBlur"
              ref="searchInput"
            >
            <button class="search-button" @click="performSearch">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
            </button>
          </div>

          <div 
            v-if="showSuggestions && filteredRoutes.length" 
            class="search-suggestions-wrapper"
          >
            <transition name="fade">
              <ul class="search-suggestions">
                <li 
                  v-for="(route, index) in filteredRoutes" 
                  :key="route.path"
                  @click="navigateTo(route.path)"
                  @mouseenter="selectedIndex = index"
                  :class="{ 'suggestion-selected': selectedIndex === index }"
                  class="suggestion-item"
                >
                  <i :class="route.icon" class="suggestion-icon"></i>
                  <span class="suggestion-text">{{ route.name }}</span>
                </li>
                <li v-if="noExactMatch && searchQuery.trim()" class="suggestion-item search-all" @click="searchAll">
                  <i class="fa-solid fa-search suggestion-icon"></i>
                  <span class="suggestion-text">Buscar por "{{ searchQuery }}"</span>
                </li>
              </ul>
            </transition>
          </div>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const modalLogOut = ref(false)
const userStore = useUserStore()
const router = useRouter()
const searchQuery = ref('')
const isSearchActive = ref(false)
const showSuggestions = ref(false)
const searchInput = ref(null)
const selectedIndex = ref(-1)
const closeTimeout = ref(null)

userStore.loadUserFromStorage()

const logOut = function(){
  modalLogOut.value = true 
}

const filteredRoutes = ref([])

const availableRoutes = [
  { name: 'Home', path: '/Home', icon: 'fa-solid fa-house' },
  { name: 'Configurações', path: '/Account', icon: 'fa-solid fa-gear' },
  { name: 'Carros', path: '/Cars', icon: 'fa-solid fa-car' },
  { name: 'Itens', path: '/Itens', icon: 'fa-solid fa-box-open' },
  { name: 'Importação', path: '/Import', icon: 'fa-solid fa-ship' },
  { name: 'Contato', path: '/contact', icon: 'fa-solid fa-envelope' },
]

const noExactMatch = computed(() => {
  if (!searchQuery.value.trim()) return false
  return !availableRoutes.some(r => 
    r.name.toLowerCase() === searchQuery.value.trim().toLowerCase()
  )
})

function filterRoutes() {
  const query = searchQuery.value.trim().toLowerCase()
  
  if (!query) {
    filteredRoutes.value = []
    return
  }
  
  // Reset selected index when filtering
  selectedIndex.value = -1
  
  // Find routes that match the query
  filteredRoutes.value = availableRoutes.filter(r => 
    r.name.toLowerCase().includes(query)
  )
  
  // Sort results - exact matches first, then startsWith, then includes
  filteredRoutes.value.sort((a, b) => {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    
    // Exact match gets highest priority
    if (aName === query) return -1
    if (bName === query) return 1
    
    // Then prioritize matches that start with the query
    const aStartsWith = aName.startsWith(query)
    const bStartsWith = bName.startsWith(query)
    
    if (aStartsWith && !bStartsWith) return -1
    if (!aStartsWith && bStartsWith) return 1
    
    // Finally sort alphabetically
    return aName.localeCompare(bName)
  })
  
  showSuggestions.value = true
}

function performSearch() {
  if (searchQuery.value.trim() === '') return
  
  // If there's at least one result and an item is selected, navigate to it
  if (filteredRoutes.value.length > 0 && selectedIndex.value >= 0) {
    navigateTo(filteredRoutes.value[selectedIndex.value].path)
    return
  }
  
  // If there's exactly one result, navigate to it
  if (filteredRoutes.value.length === 1) {
    navigateTo(filteredRoutes.value[0].path)
    return
  }
  
  // If no items selected but we have results, select the first one
  if (filteredRoutes.value.length > 0) {
    navigateTo(filteredRoutes.value[0].path)
    return
  }
  
  // As a fallback, redirect to a search results page
  searchAll()
}

function searchAll() {
  // Implement global search - could redirect to a dedicated search page
  router.push({ 
    path: '/search', 
    query: { q: searchQuery.value } 
  })
  resetSearch()
}

function navigateTo(path) {
  router.push({ path })
  resetSearch()
}

function resetSearch() {
  searchQuery.value = ''
  filteredRoutes.value = []
  showSuggestions.value = false
  isSearchActive.value = false
  selectedIndex.value = -1
}

function handleBlur() {
  // Use timeout to allow click events on suggestions to fire before hiding
  closeTimeout.value = setTimeout(() => {
    showSuggestions.value = false
    isSearchActive.value = false
  }, 150)
}

function handleKeyDown(event) {
  if (!showSuggestions.value || filteredRoutes.value.length === 0) return
  
  // Navigate up through results
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    selectedIndex.value = selectedIndex.value <= 0 
      ? filteredRoutes.value.length - 1 
      : selectedIndex.value - 1
  } 
  // Navigate down through results
  else if (event.key === 'ArrowDown') {
    event.preventDefault()
    selectedIndex.value = selectedIndex.value >= filteredRoutes.value.length - 1 
      ? 0 
      : selectedIndex.value + 1
  }
  // Handle escape key to close suggestions
  else if (event.key === 'Escape') {
    showSuggestions.value = false
    isSearchActive.value = false
    searchInput.value.blur()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (closeTimeout.value) clearTimeout(closeTimeout.value)
})

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

/* Search Styles - Improved */
.search-wrapper {
  position: relative;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0.3rem 0.5rem;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.search-active {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.search-input {
  background: transparent;
  border: none;
  padding: 5px 8px;
  color: #ffffff;
  width: 150px;
  outline: none;
  transition: width 0.3s ease;
  font-size: 0.9rem;
}

.search-active .search-input {
  width: 180px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.3s ease;
}

.search-button:hover {
  transform: scale(1.1);
}

.search-icon {
  color: #ffffff;
  font-size: 0.9rem;
}

.search-suggestions-wrapper {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 8px;
  z-index: 100;
}

.search-suggestions {
  background-color: rgba(15, 15, 15, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  width: 100%;
  min-width: 200px;
}

.suggestion-item {
  padding: 0.6rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  transition: background-color 0.2s ease;
}

.suggestion-item:hover,
.suggestion-selected {
  background-color: rgba(255, 255, 255, 0.1);
}

.suggestion-icon {
  margin-right: 10px;
  width: 18px;
  text-align: center;
  color: #cecccc;
}

.suggestion-text {
  flex: 1;
}

.search-all {
  margin-top: 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-style: italic;
  color: #cecccc;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Profile Menu */
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

/* Responsive styles */
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

  .search-container, .search-active .search-input {
    width: 100%;
  }
  
  .search-input {
    width: 100%;
    max-width: 150px;
  }
  
  .search-suggestions {
    position: fixed;
    top: auto;
    left: 5%;
    right: 5%;
    width: 90%;
  }
}
</style>