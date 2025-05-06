<template>
  <footer class="main-footer">
    <div class="footer-container">
      <div class="footer-section footer-logo-section">
        <div class="logo-container">
          <div class="logo-image">
            <img :src="ShinseiLogo" alt="Shinsei Garage Logo" />
          </div>
          <div class="logo">
            <span class="logo-text">Shinsei</span>
            <span class="logo-subtext">GARAGE</span>
          </div>
        </div>
        <p class="footer-slogan"> Excelência automotiva </p>
      </div>
      
      <div class="footer-section footer-links">
        <div class="link-column">
          <h4>Navegação</h4>
          <a href="/Itens" class="footer-link"><i class="fa-solid fa-box"></i> Itens</a>
          <a href="/cars" class="footer-link"><i class="fa-solid fa-car"></i> Carros</a>
          <a href="/Import" class="footer-link"><i class="fa-solid fa-ship"></i> Importação</a>
          <a href="/contact" class="footer-link"><i class="fa-solid fa-message"></i> Contato</a>
        </div>
        
        <div class="link-column">
          <h4>Contato</h4>
          <p class="footer-info"><i class="fa-solid fa-location-dot"></i> Av. Beira Mar, 1000</p>
          <p class="footer-info"><i class="fa-solid fa-phone"></i> (11) 3456-7890</p>
          <p class="footer-info"><i class="fa-solid fa-envelope"></i> contato@shinseigarage.com</p>
        </div>
        
        <div class="link-column">
          <h4>Redes Sociais</h4>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer-section footer-newsletter">
        <h4>Newsletter</h4>
        <p>Receba novidades e ofertas exclusivas</p>
        <div class="newsletter-form">
          <input 
            type="email" 
            placeholder="Seu e-mail" 
            class="newsletter-input"
            v-model="emailSubscribe"
          >
          <button class="newsletter-button" @click="subscribeNewsletter">
            <i :class="buttonIcon" :style="iconStyle"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Shinsei Garage. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import logo from '../../public/images/ShinseiFavIcon/android-chrome-192x192.png';
import { useUserStore } from '@/stores/userStore';
import { useToast } from 'vue-toastification';

const toast = useToast();

const userStore = useUserStore();


const emailSubscribe = ref('')
const currentYear = computed(() => new Date().getFullYear())
const ShinseiLogo = ref(null)


onMounted(()=>{
  ShinseiLogo.value = logo
})

const buttonIcon = ref('fa-solid fa-paper-plane');
const iconStyle = ref({});
const isAnimating = ref(false);

const handleKeyPress = (event) => {

  if (event.ctrlKey && event.keyCode === 13) {
    event.preventDefault(); 
    subscribeNewsletter();
  }
};

document.addEventListener('keydown', handleKeyPress);

const subscribeNewsletter = () => {
  if (!emailSubscribe.value) {
    toast.error('Por favor, insira um e-mail válido.');
    return;
  }
  if (!/\S+@\S+\.\S+/.test(emailSubscribe.value)) {
    toast.error('Por favor, insira um e-mail válido.');
    return;
  }
  if (isAnimating.value) return;
  isAnimating.value = true;
  
  iconStyle.value = { transform: 'translate(30px, -30px)', opacity: '0', transition: 'all 0.5s ease' };
  
  setTimeout(() => {
    buttonIcon.value = 'fa-solid fa-check';
    iconStyle.value = { transform: 'translateX(0)', opacity: '0' };
    
    setTimeout(() => {
      iconStyle.value = { transform: 'translateX(0)', opacity: '1', transition: 'all 0.3s ease' };
      setTimeout(() => {
        iconStyle.value = { opacity: '0', transition: 'opacity 0.3s ease' };
        
        setTimeout(() => {
          buttonIcon.value = 'fa-solid fa-paper-plane';
          iconStyle.value = { opacity: '1', transition: 'opacity 0.3s ease' };
          isAnimating.value = false;
        }, 300);
      }, 2000);
    }, 100);
  }, 500);
  userStore.subscribeToNewsletter(emailSubscribe.value)
};
</script>

<style scoped>
.main-footer {
  background-color: rgb(0, 0, 0);
  color: #ffffff;
  padding: 3rem 0 0 0;
  margin-top: auto;
  width: 100%;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5%;
}

.footer-section {
  margin-bottom: 2rem;
}

.footer-logo-section {
  flex: 1;
  min-width: 200px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.logo-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
}

.logo-subtext {
  font-size: 0.8rem;
  color: #cecccc;
  letter-spacing: 2px;
}

.footer-slogan {
  color: #aaaaaa;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.footer-links {
  display: flex;
  flex: 2;
  gap: 2rem;
  justify-content: space-between;
  flex-wrap: wrap;
}

.link-column {
  min-width: 160px;
}

.link-column h4 {
  font-size: 1rem;
  margin-bottom: 1.2rem;
  color: #ffffff;
  position: relative;
}

.link-column h4::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: #cecccc;
}

.footer-link, .footer-info {
  color: #aaaaaa;
  text-decoration: none;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #ffffff;
  transform: translateX(5px);
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: rgba(105, 105, 105, 0.411);
  transform: translateY(-5px);
}

.footer-newsletter {
  flex: 1;
  min-width: 250px;
}

.newsletter-form {
  display: flex;
  margin-top: 1rem;
}

.newsletter-input {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  padding: 0.7rem 1rem;
  border-radius: 20px 0 0 20px;
  width: 70%;
  outline: none;
}

.newsletter-button {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  padding: 0 1rem;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 40px;
  position: relative;
  overflow: hidden;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter-button:hover {
  background-color: rgba(105, 105, 105, 0.411);
}

.newsletter-button i {
  display: inline-block;
  position: relative;
  font-size: 16px;
  transform-origin: center;
}

.fa-paper-plane {
  transform: rotate(-15deg);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
  color: #aaaaaa;
}

@media (max-width: 900px) {
  .footer-links {
    flex-direction: column;
    gap: 2rem;
  }
  
  .link-column {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
  }
  
  .footer-logo-section, .footer-newsletter {
    width: 100%;
  }
  
  .social-icons {
    justify-content: flex-start;
  }
}
</style>