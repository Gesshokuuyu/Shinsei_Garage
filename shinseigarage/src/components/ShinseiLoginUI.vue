<template>
  <div class="signupSection">
    <div class="info">
      <h2>Bem Vindo(a) a Shinsei Garage </h2>
      <font-awesome-icon :icon="['fas', 'gauge-high']" size="6x" />
      <p>Onde a velocidade se colide com a inovação</p>
      <router-link to="/Signin">
        <Button id="login-btn">Sign in</Button>
      </router-link>
    </div>
    <form @submit.prevent="validateForm" class="signupForm">
      <h2>Login</h2>
      <ul class="noBullet">
        <li class="inputContainer">
            <label :class="{ active: username || isFocused.username }" for="username">Username</label>
            <input type="text" class="inputFields" id="username" 
                  v-model="username" 
                  @input="userNameValidation" 
                  @focus="toggleLabel('username', true)" 
                  @blur="toggleLabel('username', false)" required/>
          </li>

          <li class="inputContainer">
            <label :class="{ active: password || isFocused.password }" for="password">Password</label>
            <input type="password" class="inputFields" id="password" 
                  v-model="password" 
                  @input="passwordValidation" 
                  @focus="toggleLabel('password', true)" 
                  @blur="toggleLabel('password', false)" required/>
          </li>

          <li class="inputContainer">
            <label :class="{ active: email || isFocused.email }" for="email">Email</label>
            <input type="email" class="inputFields" id="email" 
                  v-model="email" 
                  @focus="toggleLabel('email', true)" 
                  @blur="toggleLabel('email', false)" required/>
          </li>
            <li id="center-btn">
              
          <input type="submit" id="login-btn" value="Login" @click="SignIn()">
        </li>
      </ul>
    </form>
  </div>
</template>

<script>

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
    }
    };
  },
  methods: {

    userNameValidation() {
      let issueArr = [];
      if (/[-!@#$%^&*()_+|~=`{}\]:";'<>?,.]/.test(this.username)) {
        issueArr.push("No special characters!");
      }
      const usernameField = document.getElementById("username");
      if (issueArr.length > 0) {
        usernameField.setCustomValidity(issueArr.join("\n"));
        usernameField.style.borderColor = this.alertRedInput;
      } else {
        usernameField.setCustomValidity("");
        usernameField.style.borderColor = this.defaultInput;
      }
    },
    toggleLabel(field, status) {
        this.isFocused[field] = status;
    },

    passwordValidation() {
      let issueArr = [];
      if (!/^.{7,15}$/.test(this.password)) {
        issueArr.push("A senha deve ter entre 7-15 caracteres.");
      }
      if (!/\d/.test(this.password)) {
        issueArr.push("Deve conter um número.");
      }
      if (!/[a-z]/.test(this.password)) {
        issueArr.push("Deve conter uma letra minuscula.");
      }
      if (!/[A-Z]/.test(this.password)) {
        issueArr.push("Deve conter uma letra maiuscula.");
      }
      const passwordField = document.getElementById("password");
      if (issueArr.length > 0) {
        passwordField.setCustomValidity(issueArr.join("\n"));
        passwordField.style.borderColor = this.alertRedInput;
      } else {
        passwordField.setCustomValidity("");
        passwordField.style.borderColor = this.defaultInput;
      }
    },

    emailValidation() {
    let issueArr = [];
    if (!this.email.includes("@")) {
      issueArr.push("Deve conter '@'.");
    }
    if (!this.email.endsWith(".com")) {
      issueArr.push("Deve terminar com '.com'.");
    }

    const emailField = document.getElementById("email");
    if (issueArr.length > 0) {
      emailField.setCustomValidity(issueArr.join("\n"));
      emailField.style.borderColor = this.alertRedInput; // Muda a borda para vermelho
    } else {
      emailField.setCustomValidity("");
      emailField.style.borderColor = this.defaultInput; // Restaura a borda
    }
  },
  
    validateForm() {
      this.userNameValidation();
      this.passwordValidation();
      this.emailValidation()
    },
    SignIn(){
      this.validateForm()
      
    }

  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

* {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000000;
  /* background-image: url('https://source.unsplash.com/1600x900/?sports-car,night'); */
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
  height: 450px;
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
  h2 {
    padding-top: 30px;
    font-weight: 300;
  }
  p {
    font-size: 18px;
  }
  .icon {
    font-size: 8em;
    padding: 20px 0;
    color: rgba(255, 0, 0, 1);
  }
}

.signupForm {
  width: 70%;
  padding: 30px 0;
  background: rgba(20, 20, 20, .9);
  transition: .2s;
  h2 {
    font-weight: 300;
  }
}

.inputContainer {
  position: relative;
}

.inputContainer label {
  margin-left: 3px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  transition: all 0.3s;
  pointer-events: none;
}

.inputContainer label.active {
  top: 5px;
  font-size: 12px;
  color: rgba(255, 0, 0, 1);
}

.inputFields {

  margin: 15px 0;
  font-size: 16px;
  padding: 10px;
  width: 250px;
  border: 1px solid rgba(255, 0, 0, 1);
  border-top: none;
  border-left: none;
  border-right: none;
  background: rgba(20, 20, 20, .2);
  color: white;
  outline: none;
}

.noBullet {
  list-style-type: none;
  padding: 0;
}

#login-btn {
  border: 1px solid rgba(255, 0, 0, 1);
  background: rgba(20, 20, 20, .6);
  font-size: 18px;
  color: white;
  margin-top: 20px;
  padding: 10px 50px;
  cursor: pointer;
  transition: .4s;
  margin: 4px;
  border-radius: 5px;
  &:hover {
    background: rgba(255, 0, 0, .8);
    padding: 10px 80px;
  }
}
</style>
