<template>
  <div class="signupSection">
    <div class="info">
      <h2>Bem Vindo(a) a Shinsei Garage</h2>
      <div class="logo-container">
        <font-awesome-icon :icon="['fas', 'gauge-high']" size="6x" class="icon pulse" />
      </div>
      <p class="fade-in">Onde a velocidade se colide com a inovação</p>
      <transition name="fade">
        <div v-if="!formSubmitted">
          <router-link to="/Login">
            <button id="info-btn" class="glow-effect">
              Login
              <span class="btn-line"></span>
            </button>
      </router-link>
        </div>
      </transition>
    </div>
    
    <div v-if="!formSubmitted" class="signupForm">
      <h2>Create Account</h2>
      <div class="step-indicator">
        <div 
          v-for="(step, index) in 3" 
          :key="index"
          :class="{
            'step': true,
            'active': formStep === index,
            'completed': formStep > index
          }"
          @click="setStep(index)"
        >
          {{ index + 1 }}
        </div>
      </div>
      
      <!-- Step 1: Basic Info -->
      <transition name="slide-fade">
        <form v-if="formStep === 0" @submit.prevent="nextStep" class="step-form">
          <div class="inputContainer">
            <label :class="{ active: Account.name || isFocused.name }" for="name">Nome</label>
            <input 
              type="text" 
              class="inputFields" 
              id="name" 
              v-model="Account.name" 
              @focus="toggleLabel('name', true)" 
              @blur="toggleLabel('name', false)" 
              required 
            />
            <font-awesome-icon 
              v-if="name.length > 0" 
              :icon="['fas', 'check']" 
              class="validation-icon success" 
            />
          </div>
          
          <div class="inputContainer">
            <label :class="{ active: Account.username || isFocused.username }" for="username">Username</label>
            <input 
              type="text" 
              class="inputFields" 
              id="username" 
              v-model="Account.username" 
              @input="userNameValidation" 
              @focus="toggleLabel('username', true)" 
              @blur="toggleLabel('username', false)" 
              required 
            />
            <font-awesome-icon 
              v-if="username.length > 0" 
              :icon="['fas', usernameValid ? 'check' : 'exclamation-circle']" 
              class="validation-icon" 
              :class="usernameValid ? 'success' : 'error'" 
            />
            <div v-if="errors.username.length > 0" class="error-message">
              {{ errors.username[0] }}
            </div>
          </div>
          
          <div class="inputContainer">
            <label :class="{ active: Account.email || isFocused.email }" for="email">Email</label>
            <input 
              type="email" 
              class="inputFields" 
              id="email" 
              v-model="Account.email" 
              @input="emailValidation"
              @focus="toggleLabel('email', true)" 
              @blur="toggleLabel('email', false)" 
              required 
            />
            <font-awesome-icon 
              v-if="email.length > 0" 
              :icon="['fas', emailValid ? 'check' : 'exclamation-circle']" 
              class="validation-icon" 
              :class="emailValid ? 'success' : 'error'" 
            />
            <div v-if="errors.email.length > 0" class="error-message">
              {{ errors.email[0] }}
            </div>
          </div>
          
          <div class="btn-container">
            <button type="submit" class="action-btn next-btn" :disabled="!canProceedStep1">
              Próximo
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </button>
          </div>
        </form>
      </transition>
      
      <!-- Step 2: Password -->
      <transition name="slide-fade">
        <form v-if="formStep === 1" @submit.prevent="nextStep" class="step-form">
          <div class="inputContainer">
            <label :class="{ active: Account.password || isFocused.password }" for="password">Password</label>
            <input 
              :type="showPassword ? 'text' : 'password'"
              class="inputFields" 
              id="password" 
              v-model="Account.password" 
              @input="passwordValidation" 
              @focus="toggleLabel('password', true)" 
              @blur="toggleLabel('password', false)" 
              required 
            />
            <button type="button" class="password-toggle" @click="showPassword = !showPassword">
              <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
            </button>
            <font-awesome-icon 
              v-if="password.length > 0" 
              :icon="['fas', passwordValid ? 'check' : 'exclamation-circle']" 
              class="validation-icon" 
              :class="passwordValid ? 'success' : 'error'" 
            />
          </div>
          
          <!-- Password strength meter -->
          <div v-if="Account.password.length > 0" class="password-strength">
            <div class="strength-bar">
              <div 
                class="strength-progress" 
                :style="{ width: passwordStrength + '%', backgroundColor: passwordStrengthColor }"
              ></div>
            </div>
            <span>{{ passwordStrengthText }}</span>
          </div>
          
          <div v-if="errors.password.length > 0" class="password-requirements">
            <div 
              v-for="(error, index) in errors.password" 
              :key="index"
              class="requirement"
            >
              <font-awesome-icon :icon="['fas', 'times']" class="error" />
              {{ error }}
            </div>
          </div>
          
          <div class="inputContainer">
            <label :class="{ active: Account.confirmPassword || isFocused.confirmPassword }" for="confirmPassword">Confirmar Senha</label>
            <input 
            :type="showConfirmPassword ? 'text' : 'password'"
              class="inputFields" 
              id="confirmPassword" 
              v-model="Account.confirmPassword" 
              @input="confirmPasswordValidation" 
              @focus="toggleLabel('confirmPassword', true)" 
              @blur="toggleLabel('confirmPassword', false)" 
              required 
            />
            <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
              <font-awesome-icon :icon="showConfirmPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
            </button>
            <font-awesome-icon 
              v-if="confirmPassword.length > 0" 
              :icon="['fas', passwordsMatch ? 'check' : 'times']" 
              class="validation-icon" 
              :class="passwordsMatch ? 'success' : 'error'" 
            />
            <div v-if="errors.confirmPassword.length > 0" class="error-message">
              {{ errors.confirmPassword[0] }}
            </div>
          </div>
          
          <div class="btn-container">
            <button type="button" class="action-btn back-btn" @click="formStep = 0">
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
              Voltar
            </button>
            <button type="submit" class="action-btn next-btn" :disabled="!canProceedStep2">
              Próximo
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </button>
          </div>
        </form>
      </transition>
      
      <!-- Step 3: Review -->
      <transition name="slide-fade">
        <div v-if="formStep === 2" class="step-form review-step">
          <h3>Revise suas informações</h3>
          
          <div class="review-info">
            <div class="review-item">
              <span class="review-label">Nome:</span>
              <span class="review-value">{{ Account.name }}</span>
            </div>
            <div class="review-item">
              <span class="review-label">Username:</span>
              <span class="review-value">{{ Account.username }}</span>
            </div>
            <div class="review-item">
              <span class="review-label">Email:</span>
              <span class="review-value">{{ Account.email }}</span>
            </div>
            <div class="review-item">
              <span class="review-label">Password:</span>
              <span class="review-value">{{ Account.password }}</span>
            </div>
          </div>
          
          <div class="terms-container">
            
            <input type="checkbox" id="termsAgree" v-model="termsAgreed">
            <label for="termsAgree" class="terms-label">Eu concordo com os 
              <span class="terms-link" @click="showTermsModal = true">Termos e Condições</span>
            </label>
          </div>
          
          <div class="btn-container">
            <button type="button" class="action-btn back-btn" @click="formStep = 1, createAccount()">
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
              Voltar
            </button>
            <button 
              type="button" 
              class="action-btn submit-btn" 
              @click="submitForm"
              :disabled="!termsAgreed"
            >
              <font-awesome-icon :icon="['fas', 'user-plus']" />
              Criar Conta
            </button>
          </div>
        </div>
      </transition>
    </div>
    
    <!-- Success screen after submission -->
    <transition name="scale">
      <div v-if="formSubmitted" class="success-screen">
        <font-awesome-icon :icon="['fas', 'check-circle']" size="5x" class="success-icon" />
        <h2>Registro Completo!</h2>
        <p>Bem-vindo à Shinsei Garage, {{ Account.name }}!</p>
        <p class="sub-text">Sua conta foi criada com sucesso.</p>
        <router-link to="/Login">
          <button class="action-btn dashboard-btn">
            <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
            Ir para o Login
          </button>
        </router-link>
      </div>
    </transition>
  </div>
  <div v-if="showTermsModal" class="modal-overlay">
    <div class="modal">
      <h2>Termos e Condições</h2>
      <p>
        Aqui estão os termos de uso.
      </p>
      <div class="btn-container">
        <button @click="showTermsModal = false" class="action-btn center-terms">Fechar</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import api from '@/axios'; 
export default {
  name: "ShinseiSignupUI",
  data() {
    return {
      formStep: 0,
      formSubmitted: false,
      termsAgreed: false,
      Account:{
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      },
      showTermsModal: false,
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      alertRedInput: "#8C1010",
      defaultInput: "rgba(10, 180, 180, 1)",
      usernameValid: false,
      passwordValid: false,
      showPassword: false,
      showConfirmPassword: false,
      emailValid: false,
      passwordsMatch: false,
      errors: {
        username: [],
        password: [],
        confirmPassword: [],
        email: []
      },
      isFocused: {
        name: false,
        username: false,
        password: false,
        confirmPassword: false,
        email: false
      },
      loadingOverlay: ''
    };
  },
  computed: {
    canProceedStep1() {
      return this.Account.name.length > 0 && this.usernameValid && this.emailValid;
    },
    canProceedStep2() {
      return this.passwordValid && this.passwordsMatch;
    },
    passwordStrength() {
      if (this.Account.password.length === 0) return 0;
      
      let strength = 0;
      
      if (this.Account.password.length >= 7) strength += 25;
      
      if (/\d/.test(this.Account.password)) strength += 25;
      
      if (/[a-z]/.test(this.Account.password)) strength += 25;
      
      if (/[A-Z]/.test(this.Account.password)) strength += 25;
      
      return strength;
    },
    passwordStrengthText() {
      if (this.passwordStrength <= 25) return "Fraca";
      if (this.passwordStrength <= 50) return "Média";
      if (this.passwordStrength <= 75) return "Boa";
      return "Forte";
    },
    passwordStrengthColor() {
      if (this.passwordStrength <= 25) return "#ff3e36";
      if (this.passwordStrength <= 50) return "#ffce36";
      if (this.passwordStrength <= 75) return "#3ec4ff";
      return "#36ff3e";
    }
  },
  methods: {
    toggleLabel(field, status) {
      this.isFocused[field] = status;
    },
    
    userNameValidation() {
      this.errors.username = [];
      this.usernameValid = true;
      
      if (this.Account.username.length < 3) {
        this.errors.username.push("Nome de usuário deve ter pelo menos 3 caracteres");
        this.usernameValid = false;
      }
      
      if (/[-!@#$%^&*()_+|~=`{}\]:";'<>?,.]/.test(this.username)) {
        this.errors.username.push("Não são permitidos caracteres especiais!");
        this.usernameValid = false;
      }
      
      this.setFieldValidity("username", this.errors.username);
    },

    passwordValidation() {
      this.errors.password = [];
      this.passwordValid = true;
      
      if (!/^.{7,15}$/.test(this.Account.password)) {
        this.errors.password.push("A senha deve ter entre 7-15 caracteres.");
        this.passwordValid = false;
      }
      
      if (!/\d/.test(this.Account.password)) {
        this.errors.password.push("Deve conter um número.");
        this.passwordValid = false;
      }
      
      if (!/[a-z]/.test(this.Account.password)) {
        this.errors.password.push("Deve conter uma letra minúscula.");
        this.passwordValid = false;
      }
      
      if (!/[A-Z]/.test(this.Account.password)) {
        this.errors.password.push("Deve conter uma letra maiúscula.");
        this.passwordValid = false;
      }
      
      this.setFieldValidity("password", this.errors.password);
      this.confirmPasswordValidation();
    },

    confirmPasswordValidation() {
      this.errors.confirmPassword = [];
      this.passwordsMatch = true;
      
      if (this.Account.confirmPassword !== this.Account.password) {
        this.errors.confirmPassword.push("As senhas não coincidem.");
        this.passwordsMatch = false;
      }
      
      this.setFieldValidity("confirmPassword", this.errors.confirmPassword);
    },

    emailValidation() {
      this.errors.email = [];
      this.emailValid = true;
      
      if (!this.Account.email.includes("@")) {
        this.errors.email.push("Email deve conter '@'.");
        this.emailValid = false;
      }
      
      if (!this.Account.email.endsWith(".com")) {
        this.errors.email.push("Email deve terminar com '.com'.");
        this.emailValid = false;
      }
      
      this.setFieldValidity("email", this.errors.email);
    },

    setFieldValidity(field, issueArr) {
      const fieldElement = document.getElementById(field);
      if (issueArr.length > 0) {
        fieldElement.setCustomValidity(issueArr.join("\n"));
        fieldElement.style.borderColor = this.alertRedInput;
      } else {
        fieldElement.setCustomValidity("");
        fieldElement.style.borderColor = this.defaultInput;
      }
    },
    
    nextStep() {
      if (this.formStep === 0 && this.canProceedStep1) {
        this.formStep = 1;
      } else if (this.formStep === 1 && this.canProceedStep2) {
        this.formStep = 2;
      }
    },
    
    setStep(step) {
      if (step <= this.formStep) {
        this.formStep = step;
      }
    },

    createAccount(){
      
    },
    
    async submitForm() {
        if (this.termsAgreed) {
            try {
              
              this.loadingOverlay = document.createElement('div');
              this.loadingOverlay.className = 'loading-overlay';
              this.loadingOverlay.innerHTML = '<div class="loader"></div>';
              document.body.appendChild(this.loadingOverlay);

             
              const response = await api.post('/account/create', this.Account);

              console.log('Resposta da API:', response.data);

              this.formSubmitted = true;
            } catch (error) {
              console.error('Erro ao criar conta:', error);
              alert('Erro ao criar conta. Verifique sua conexão.');
            } finally {
              if (this.loadingOverlay && document.body.contains(this.loadingOverlay)) {
                document.body.removeChild(this.loadingOverlay);
              }
            }
      }
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

.icon {
  color: rgba(255, 0, 0, 1);
  filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.7));
}

.pulse {
  animation: pulse 2s infinite;
}

.terms-link {
  color: rgba(255, 0, 0, 1);
  cursor: pointer;
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: rgba(30, 30, 30, 0.911);
  color: rgba(194, 15, 15, 0.87);
  border: 1px solid rgba(255, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px 8px 8px 30px;
  width: 400px;
  text-align: center;
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

.glow-effect {
  position: relative;
}

.btn-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: rgba(255, 0, 0, 1);
  transition: width 0.3s ease;
}

#info-btn {
  border: 1px solid rgba(255, 0, 0, 0.8);
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

.logo-container {
  margin: 20px 0;
  height: 100px;
}

.signupSection {
  background-color: #000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  text-align: center;
  display: flex;
  color: white;
  box-shadow: 3px 10px 20px 5px rgba(0, 0, 0, .5);
  border-radius: 10px;
  overflow: hidden;
}

.info {
  width: 45%;
  background: rgba(30, 30, 30, .9);
  padding: 30px 0;
  border-right: 5px solid rgba(255, 0, 0, .8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info h2 {
  padding-top: 30px;
  font-weight: 300;
  margin-bottom: 20px;
}

.fade-in {
  animation: fadeIn 1.5s ease;
}

.info p {
  font-size: 18px;
  padding: 20px 10px;
}

.info .icon {
  font-size: 8em;
  color: rgba(255, 0, 0, 1);
  margin: 20px 0;
}

.signupForm {
  width: 70%;
  padding: 30px 20px;
  background: rgba(20, 20, 20, .9);
  transition: .2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signupForm h2 {
  font-weight: 300;
  margin-bottom: 30px;
}

/* Step indicator styles */
.step-indicator {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.step {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(50, 50, 50, .8);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}
.center-terms{
 margin-left: 120px !important;
}

.step:not(:last-child):after {
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  background: rgba(50, 50, 50, .8);
  left: 100%;
}

.step.active {
  background: rgba(255, 0, 0, .8);
  transform: scale(1.2);
}

.step.completed {
  background: rgba(0, 200, 0, .8);
}

.step.completed:not(:last-child):after,
.step.active:not(:last-child):after {
  background: rgba(255, 0, 0, .8);
}

/* Form steps */
.step-form {
  width: 100%;
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.inputContainer {
  position: relative;
  margin-bottom: 25px;
  transition: all 0.3s ease;
}

.inputContainer:hover label {
  color: rgba(255, 0, 0, 0.8);
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
  color: rgba(255, 0, 0, 1);
  font-weight: 600;
  /* margin-left: -50px; */
}

.inputFields {
  margin: 15px 0 5px;
  font-size: 16px;
  padding: 15px 10px;
  width: 100%;
  border: 1px solid rgba(255, 0, 0, 0.5);
  border-radius: 5px;
  background: rgba(20, 20, 20, .6);
  color: white;
  outline: none;
  transition: all 0.3s ease;
}

.inputFields:focus {
  box-shadow: 0 0 5px rgba(255, 0, 0, .5);
}

.validation-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.success {
  color: rgba(0, 200, 0, .8);
}

.error {
  color: rgba(255, 0, 0, .8);
}

.error-message {
  color: rgba(255, 0, 0, .8);
  font-size: 12px;
  margin-top: 5px;
  text-align: left;
}

/* Password strength meter */
.password-strength {
  width: 100%;
  margin-bottom: 15px;
}

#info-btn:hover .btn-line {
  width: 100%;
}

.strength-bar {
  height: 5px;
  background: rgba(50, 50, 50, .8);
  border-radius: 3px;
  margin-bottom: 5px;
}

.strength-progress {
  height: 100%;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.password-requirements {
  text-align: left;
  margin-bottom: 20px;
}

.requirement {
  font-size: 12px;
  margin: 5px 0;
  display: flex;
  align-items: center;
}

.requirement .error {
  margin-right: 5px;
}

/* Button styles */
.btn-container {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 20px 0;
  width: 100%;
}

.action-btn {
  border: 1px solid rgba(255, 0, 0, 1);
  background: rgba(20, 20, 20, .6);
  font-size: 16px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover:not(:disabled) {
  background: rgba(255, 0, 0, .8);
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
}

.action-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-btn, .next-btn {
  min-width: 100px;
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
  color: rgba(255, 0, 0, 0.8);
}

.back-btn svg, .next-btn svg {
  margin: 0 5px;
}

.submit-btn {
  margin: 0 auto;
  padding: 10px 30px;
}

.submit-btn svg {
  margin-right: 8px;
}

/* Review step */
.review-step {
  text-align: left;
}

.review-step h3 {
  text-align: center;
  margin-bottom: 30px;
}

.review-info {
  background: rgba(30, 30, 30, .6);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 30px;
}

.review-item {
  margin: 10px 0;
  display: flex;
}

.review-label {
  font-weight: 600;
  min-width: 100px;
}

.terms-container {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.terms-label {
  margin-left: 10px;
  cursor: pointer;
}

/* Success screen */
.success-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(20, 20, 20, .9), rgba(30, 30, 30, .9));
  padding: 30px;
}

.success-icon {
  color: rgba(0, 200, 0, .8);
  margin-bottom: 20px;
}

.success-screen h2 {
  margin-bottom: 10px;
}

.sub-text {
  opacity: 0.8;
  margin-bottom: 30px;
}

.dashboard-btn {
  padding: 12px 25px;
  text-transform: none;
}

.dashboard-btn svg {
  margin-right: 8px;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loader {
  border: 5px solid rgba(30, 30, 30, .3);
  border-radius: 50%;
  border-top: 5px solid rgba(255, 0, 0, .8);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Animations */
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

/* Responsive design */
@media (max-width: 800px) {
  .signupSection {
    width: 90%;
    flex-direction: column;
    height: 80vh;
  }
  
  .info {
    width: 100%;
    border-right: none;
    border-bottom: 5px solid rgba(255, 0, 0, .8);
    padding: 15px 0;
  }
  
  .signupForm {
    width: 100%;
  }
}
</style>
  