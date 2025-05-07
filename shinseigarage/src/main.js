import { createApp } from 'vue' 
import { createPinia } from 'pinia';
import App from './App.vue' 
import router from './router/router' 
import Toast, { POSITION } from 'vue-toastification' 
import axios from './axios';

import 'vue-toastification/dist/index.css' 
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

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

import {
  // Ícones que você já tem
  faCar,
  faUser,
  faEnvelope,
  faLock,
  faGaugeHigh,
  faEye,
  faEyeSlash,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faUserPlus,
  
  // Ícones adicionais para perfil/conta de usuário
  faUserCircle,
  faUserEdit,
  
  // Configurações e preferências
  faCog,
  faWrench,
  faBell,
  
  // Segurança
  faShieldAlt,
  faKey,
  faFingerprint,
  faLockOpen,
  
  // Pagamento e faturamento
  faCreditCard,
  faMoneyBillWave,
  faWallet,
  faDollarSign,
  faFileInvoice,
  faFileInvoiceDollar,
  
  // Ajuda e suporte
  faQuestionCircle,
  faInfoCircle,
  faHeadset,
  faCommentDots,
  faComments,
  
  // Navegação
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faBars,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faAngleUp,
  faEllipsisV,
  
  // Notificações e alertas
  faExclamationCircle,
  faExclamationTriangle,
  faCheckCircle,
  faBan,
  
  // Ações
  faSave,
  faTrash,
  faEdit,
  faPlus,
  faMinus,
  faCheck,
  faPen,
  
  // Arquivos e documentos
  faFile,
  faFileAlt,
  faFileUpload,
  faFileDownload,
  faFileExport,
  faFileImport,
  
  // Comunicação
  faPaperPlane,
  faReply,
  faShare,
  
  // Calendário e tempo
  faCalendar,
  faCalendarAlt,
  faClock,
  faHistory,
  
  // Localização
  faMapMarkerAlt,
  faCompass,
  
  // Pesquisa e filtros
  faSearch,
  faFilter,
  faSort,
  faSortUp,
  faSortDown,
  
  // Social e comunidade
  faUsers,
  faUserFriends,
  faShareAlt,
  
  // Dispositivos e tecnologia
  faMobile,
  faTablet,
  faDesktop,
  faPrint,
  
  // Outros ícones úteis
  faStar,
  faHeart,
  faBookmark,
  faGlobe,
  faSync,
  faSpinner,
  faTag,
  faTags,
  faMailBulk

} from '@fortawesome/free-solid-svg-icons';

library.add(
  // Ícones que você já tem
  faCar,
  faUser,
  faEnvelope,
  faLock,
  faGaugeHigh,
  faEye,
  faEyeSlash,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faUserPlus,
  
  // Ícones adicionais para perfil/conta de usuário
  faUserCircle,
  faUserEdit,
  
  // Configurações e preferências
  faCog,
  faWrench,
  faBell,
  
  // Segurança
  faShieldAlt,
  faKey,
  faFingerprint,
  faLockOpen,
  
  // Pagamento e faturamento
  faCreditCard,
  faMoneyBillWave,
  faWallet,
  faDollarSign,
  faFileInvoice,
  faFileInvoiceDollar,
  
  // Ajuda e suporte
  faQuestionCircle,
  faInfoCircle,
  faHeadset,
  faCommentDots,
  faComments,
  
  // Navegação
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faBars,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faAngleUp,
  faEllipsisV,
  
  // Notificações e alertas
  faExclamationCircle,
  faExclamationTriangle,
  faCheckCircle,
  faBan,
  
  // Ações
  faSave,
  faTrash,
  faEdit,
  faPlus,
  faMinus,
  faCheck,
  faPen,
  
  // Arquivos e documentos
  faFile,
  faFileAlt,
  faFileUpload,
  faFileDownload,
  faFileExport,
  faFileImport,
  
  // Comunicação
  faPaperPlane,
  faReply,
  faShare,
  
  // Calendário e tempo
  faCalendar,
  faCalendarAlt,
  faClock,
  faHistory,
  
  // Localização
  faMapMarkerAlt,
  faCompass,
  
  // Pesquisa e filtros
  faSearch,
  faFilter,
  faSort,
  faSortUp,
  faSortDown,
  
  // Social e comunidade
  faUsers,
  faUserFriends,
  faShareAlt,
  
  // Dispositivos e tecnologia
  faMobile,
  faTablet,
  faDesktop,
  faPrint,
  
  // Outros ícones úteis
  faStar,
  faHeart,
  faBookmark,
  faGlobe,
  faSync,
  faSpinner,
  faTag,
  faTags,
  faUserCircle,
  faMailBulk

);

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.config.globalProperties.$axios = axios;
app.use(router)
app.use(Toast, toastOptions)
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')