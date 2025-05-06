<template>
  <div class="signupSection">
    <div class="info">
      <h2>Bem Vindo(a) à Shinsei Garage</h2>
      <div class="logo-container">
        <font-awesome-icon :icon="['fas', 'gauge-high']" size="6x" class="icon pulse" />
      </div>
      <p class="fade-in">Onde a velocidade se colide com a inovação</p>
      <transition name="fade">
        <router-link to="/Signin">
          <button id="info-btn" class="glow-effect">
            Sign in
            <span class="btn-line"></span>
          </button>
        </router-link>
      </transition>
      </div>
    <form @submit.prevent="validateForm" class="signupForm">
      <h2 class="form-title">Login</h2>
      <ul class="noBullet">
        <li class="inputContainer">
          <label :class="{ active: username || isFocused.username }" for="username">Username</label>
          <input
            type="text"
            class="inputFields"
            id="username"
            v-model="username"
            @input="userNameValidation"
            @focus="toggleLabel('username', true)"
            @blur="toggleLabel('username', false)"
            required
          />
          <span class="validation-message" v-if="errorMessages.username">{{ errorMessages.username }}</span>
        </li>

        <li class="inputContainer">
          <label :class="{ active: password || isFocused.password }" for="password">Password</label>
          <div class="password-container">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="inputFields"
              id="password"
              v-model="password"
              @focus="toggleLabel('password', true)"
              @blur="toggleLabel('password', false)"
              required
            />
            <button type="button" class="password-toggle" @click="showPassword = !showPassword">
              <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
            </button>
          </div>
          <div class="password-strength" v-if="password">
            <span class="strength-text">{{ passwordStrengthText }}</span>
          </div>
        </li>

        <li class="inputContainer">
          <label :class="{ active: email || isFocused.email }" for="email">Email</label>
          <input
            type="email"
            class="inputFields"
            id="email"
            v-model="email"
            @input="emailValidation"
            @focus="toggleLabel('email', true)"
            @blur="toggleLabel('email', false)"
            required
          />
          <span class="validation-message" v-if="errorMessages.email">{{ errorMessages.email }}</span>
        </li>

        <li id="center-btn">
          <button
            type="submit"
            id="login-btn"
            class="submit-btn"
            :class="{ 'btn-loading': isLoading }"
            @click="Login()"
            :disabled="isLoading || !isFormValid"
          >
            <span v-if="!isLoading">Login</span>
            <span v-else class="loader"></span>
          </button>
        </li>
        
        <li class="signup-link">
          <p>Não tem uma conta? <router-link to="/Signin" class="register-link">Registre-se</router-link></p>
        </li>
      </ul>
    </form>
    <div class="notification" :class="{ show: showNotification, success: notificationType === 'success', error: notificationType === 'error' }">
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script>
import api from '@/axios'; 
import { useUserStore } from '@/stores/userStore';
export default {
  name: "ShinseiLoginUI",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      alertRedInput: "#8C1010",
      defaultInput: "rgba(10, 180, 180, 1)",
      isFocused: {
        username: false,
        password: false,
        email: false
      },
      errorMessages: {
        username: "",
        password: "",
        email: ""
      },
      user: {},
      isLoading: false,
      showPassword: false,
      passwordStrength: 0,
      passwordStrengthText: "",
      passwordStrengthClass: "",
      showNotification: false,
      notificationMessage: "",
      notificationType: "success"
    };
  },
  computed: {
    isFormValid() {
      return (
        this.username && 
        this.password && 
        this.email 
      );
    }
  },
  methods: {
    userNameValidation() {
      let issueArr = [];
      if (/[-!@#$%^&*()_+|~=`{}\]:";'<>?,.]/.test(this.username)) {
        issueArr.push("Sem caracteres especiais!");
      }
      
      const usernameField = document.getElementById("username");
      if (issueArr.length > 0) {
        this.errorMessages.username = issueArr.join(", ");
        usernameField.style.borderColor = this.alertRedInput;
      } else {
        this.errorMessages.username = "";
        usernameField.style.borderColor = this.defaultInput;
      }
    },
    
    toggleLabel(field, status) {
      this.isFocused[field] = status;
    },

    passwordValidation() {
      let issueArr = [];
      
      // Validações
      if (!/^.{7,15}$/.test(this.password)) {
        issueArr.push("A senha deve ter entre 7-15 caracteres");
      } 
      
      if (!/\d/.test(this.password)) {
        issueArr.push("Deve conter um número");
      } 
      
      if (!/[a-z]/.test(this.password)) {
        issueArr.push("Deve conter uma letra minúscula");
      } 
      
      if (!/[A-Z]/.test(this.password)) {
        issueArr.push("Deve conter uma letra maiúscula");
      } 
      
      // Força da senha
      
      
      const passwordField = document.getElementById("password");
      if (issueArr.length > 0) {
        this.errorMessages.password = issueArr.join(", ");
        passwordField.style.borderColor = this.alertRedInput;
      } else {
        this.errorMessages.password = "";
        passwordField.style.borderColor = this.defaultInput;
      }
    },

    emailValidation() {
      let issueArr = [];
      
      if (!this.email.includes("@")) {
        issueArr.push("Deve conter '@'");
      }
      
      if (!this.email.endsWith(".com")) {
        issueArr.push("Deve terminar com '.com'");
      }

      const emailField = document.getElementById("email");
      if (issueArr.length > 0) {
        this.errorMessages.email = issueArr.join(", ");
        emailField.style.borderColor = this.alertRedInput;
      } else {
        this.errorMessages.email = "";
        emailField.style.borderColor = this.defaultInput;
      }
    },
    
    validateForm() {
      this.userNameValidation();
      this.passwordValidation();
      this.emailValidation();
      return this.isFormValid;
    },
    
    async Login() {
      if (!this.validateForm()) {
        this.showNotificationMessage('Por favor, preencha todos os campos corretamente', 'error');
        return;
      }

      const loginData = {
        email: this.email.trim(),
        password: this.password,
        userName: this.username.trim()
      };

      this.isLoading = true;

      const createLoadingOverlay = () => {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
          <div class="loader-container">
            <div class="loader"></div>
          </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
      };

      const loadingOverlay = createLoadingOverlay();
      const userStore = useUserStore();

      try {
        // Chamada à API de login
        const response = await api.post('/account/login', loginData, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          const { user, token } = response.data;

          const userData = {
            id: user.id,
            email: user.email,
            username: loginData.userName,
            name: user.name || loginData.userName,
            token: token,
            role: user.role
          };

          const loginSuccess = userStore.login(userData);

          if (loginSuccess) {
            this.showNotificationMessage("Login realizado com sucesso!", "success");
          
            this.handlePostLoginRedirect();
          } else {
            throw new Error('Falha ao salvar dados do usuário');
          }
        } else {
          // Tratamento de credenciais inválidas
          throw new Error(response.data.error || 'Credenciais inválidas');
        }

      } catch (error) {
        console.error('Erro de login:', error);

        const errorMessage = this.handleLoginError(error);
        this.showNotificationMessage(errorMessage, 'error');

      } finally {
        if (loadingOverlay && document.body.contains(loadingOverlay)) {
          document.body.removeChild(loadingOverlay);
        }
        this.isLoading = false;
        this.clearSensitiveData();
      }
  },

clearSensitiveData() {
  this.password = '';
  this.email = '';
  this.username = '';
},
handleLoginError(error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return 'Credenciais inválidas. Verifique seu email e senha.';
      case 403:
        return 'Acesso negado. Verifique suas permissões.';
      case 404:
        return 'Serviço de login não encontrado.';
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.';
      default:
        return error.response.data.message || 'Erro no login. Tente novamente.';
    }
  } else if (error.request) {
    return 'Sem resposta do servidor. Verifique sua conexão de internet.';
  } else {
    return 'Erro ao processar o login. Tente novamente.';
  }
},
handlePostLoginRedirect() {
    this.$router.push('/home');
},
    
    showNotificationMessage(message, type) {
      this.notificationMessage = message;
      this.notificationType = type;
      this.showNotification = true;
      
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

* {
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000000;
  background-size: cover;
  background-position: center;
}

.signupSection {
  background-color: #000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 550px;
  text-align: center;
  display: flex;
  color: white;
  box-shadow: 3px 10px 20px 5px rgba(0, 0, 0, .5);
  border-radius: 10px;
  overflow: hidden;
}

/* Left side styling */
.info {
  width: 45%;
  background: rgba(30, 30, 30, .9);
  padding: 30px 0;
  border-right: 5px solid rgba(241, 241, 241, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info h2 {
  font-weight: 300;
  margin-bottom: 20px;
  animation: fadeSlideIn 1s ease;
}

.logo-container {
  margin: 20px 0 !important;
  height: 100px !important;
}

.icon {
  color: rgb(236, 235, 235);
  filter: drop-shadow(0 0 10px rgba(238, 237, 237, 0.7));
}

.pulse {
  animation: pulse 2s infinite;
}

.info p {
  font-size: 18px;
  padding: 0 20px;
  margin-bottom: 30px;
}

.fade-in {
  animation: fadeIn 1.5s ease;
}

/* Form styling */
.signupForm {
  width: 70%;
  padding: 30px 20px;
  background: rgba(20, 20, 20, .9);
  transition: .2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-title {
  font-weight: 300;
  margin-bottom: 25px;
  position: relative;
  animation: slideDown 0.5s ease;
}

.form-title:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  width: 50px;
  height: 2px;
  background: rgba(230, 229, 229, 0.8);
}

.noBullet {
  list-style-type: none;
  padding: 0;
  width: 80%;
}

/* Input styling */
.inputContainer {
  position: relative;
  margin-bottom: 25px;
  transition: all 0.3s ease;
}

.inputContainer:hover label {
  color: rgba(224, 224, 224, 0.8);
}

.inputContainer label {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-30%);
  font-size: 16px;
  color: #aaa;
  transition: all 0.3s ease;
  pointer-events: none;
}


.inputContainer label.active {
  top: -5px;
  font-size: 12px;
  color: rgb(202, 202, 202);
  font-weight: 600;
  /* margin-left: -50px; */
}

.inputFields {
  margin: 15px 0 5px;
  font-size: 16px;
  padding: 15px 10px;
  width: 100%;
  border: 1px solid rgba(221, 221, 221, 0.5);
  border-radius: 5px;
  background: rgba(20, 20, 20, .6);
  color: white;
  outline: none;
  transition: all 0.3s ease;
}

.inputFields:focus {
  border-color: rgb(214, 214, 214);
  box-shadow: 0 0 8px rgba(211, 211, 211, 0.5);
}

/* Password field styling */
.password-container {
  position: relative;
  width: 100%;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-30%);
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s;
}

.password-toggle:hover {
  color: rgba(212, 212, 212, 0.8);
}

.password-strength {
  width: 100%;
  margin-top: 8px;
  font-size: 12px;
  text-align: left;
  padding-left: 5px;
}

.strength-meter {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.weak {
  background-color: #c40101;
}

.medium {
  background-color: #ffa500;
}

.strong {
  background-color: #47ff47;
}

.strength-text {
  color: #aaa;
  font-size: 11px;
}

/* Validation messages */
.validation-message {
  color: #ccc9c9;
  font-size: 11px;
  text-align: left;
  display: block;
  padding-left: 5px;
  opacity: 0;
  height: 0;
  animation: slideDown 0.3s ease forwards;
}

/* Button styling */
#center-btn {
  text-align: center;
  margin-top: 20px;
}

.submit-btn {
  border: 1px solid rgb(216, 216, 216);
  background: rgba(20, 20, 20, .6) !important;
  font-size: 18px;
  color: white;
  padding: 12px 60px;
  cursor: pointer;
  transition: all 0.4s ease;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(170, 141, 141, 0.3);
}

.submit-btn:hover {
  background: rgba(207, 207, 207, 0.7);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(211, 211, 211, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: rgba(100, 100, 100, 0.5);
}

/* Loading spinner */
.btn-loading {
  padding: 12px 40px;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(250, 250, 250, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

#info-btn {
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(30, 30, 30, .8);
  font-size: 16px;
  color: white;
  padding: 10px 40px;
  cursor: pointer;
  transition: all 0.4s ease;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
}

.glow-effect {
  position: relative;
}

.glow-effect:before {
  content: '';
  background: linear-gradient(45deg, #ffffff, #777777, #ffffff);
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-effect:hover:before {
  opacity: 1;
}

.glow-effect:active {
  color: white;
}

.glow-effect:after {
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(30, 30, 30, .8);
  left: 0;
  top: 0;
  border-radius: 5px;
}

.btn-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(245, 245, 245);
  transition: width 0.3s ease;
}

#info-btn:hover .btn-line {
  width: 100%;
}

/* Notification styling */
.notification {
  position: fixed;
  top: 20px;
  right: -300px;
  width: 280px;
  padding: 15px;
  border-radius: 5px;
  color: white;
  font-weight: 400;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: right 0.5s ease;
  z-index: 1000;
}

.notification.show {
  right: 20px;
}

.notification.success {
  background: linear-gradient(45deg, #28a745, #218838);
  border-left: 5px solid #1e7e34;
}

.notification.error {
  background: linear-gradient(45deg, #dc3545, #c82333);
  border-left: 5px solid #bd2130;
}

/* Registration link */
.signup-link {
  margin-top: 15px;
  padding-bottom:15px ;
  font-size: 14px;
  color: #aaa;
}

.register-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.register-link:hover {
  color: rgb(95, 89, 89);
  text-decoration: underline;
}

/* Animations */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    height: auto;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

/* Responsivo */
@media screen and (max-width: 850px) {
  .signupSection {
    width: 95%;
    height: auto;
    flex-direction: column;
  }
  
  .info {
    width: 100%;
    border-right: none;
    border-bottom: 5px solid rgba(240, 235, 235, 0.8);
    padding: 20px 0;
  }
  
  .signupForm {
    width: 100%;
    padding: 30px 20px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: all 0.5s;
}
.scale-enter, .scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

@media screen and (max-width: 500px) {
  .noBullet {
    width: 95%;
  }
  
  .inputFields {
    font-size: 14px;
  }
  
  .submit-btn {
    padding: 10px 40px;
    font-size: 16px;
  }
}
</style>
