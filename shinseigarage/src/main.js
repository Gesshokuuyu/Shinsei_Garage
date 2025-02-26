import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import Toast, { POSITION } from 'vue-toastification'
import axios from './axios'; 
import 'vue-toastification/dist/index.css'

const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  hideProgressBar: false,
  icon: true,
  rtl: false
}

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCar, faUser, faEnvelope, faLock,faGaugeHigh  } from '@fortawesome/free-solid-svg-icons'

library.add(faCar, faUser, faEnvelope, faLock,faGaugeHigh )

const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.use(router)
app.use(Toast, toastOptions)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
