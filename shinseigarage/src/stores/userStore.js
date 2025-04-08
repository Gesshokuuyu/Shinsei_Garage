import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      username: '',
      name: '',
      email: '', // Adicionado campo de email
      roles: [], // Adicionado para controle de permissões
    },
    isAuthenticated: false,
    token: null, // Token de autenticação separado
  }),

  actions: {
    // Método de login mais robusto
    login(userData) {
      // Validate input data
      if (!userData) {
        console.error('Dados de usuário inválidos');
        return false;
      }

      // Atualiza o estado do usuário
      this.user = {
        id: userData.id || null,
        username: userData.username || '',
        name: userData.name || '',
        email: userData.email || '',
        roles: userData.roles || []
      };

      // Armazena o token de forma segura
      this.token = userData.token || null;
      this.isAuthenticated = true;

      // Armazenamento seguro
      try {
        // Não armazena dados sensíveis como token
        const safeUserData = {
          id: this.user.id,
          username: this.user.username,
          name: this.user.name,
          email: this.user.email
        };

        localStorage.setItem('user', JSON.stringify(safeUserData));
        localStorage.setItem('isAuthenticated', 'true');
        
        return true;
      } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
        return false;
      }
    },

    // Método de logout aprimorado
    logout() {
      // Limpa todos os dados sensíveis
      this.user = {
        id: null,
        username: '',
        name: '',
        email: '',
        roles: []
      };
      this.isAuthenticated = false;
      this.token = null;

      // Limpa o armazenamento
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        
        // Opcional: limpar outros dados de sessão
        sessionStorage.clear();
      } catch (error) {
        console.error('Erro ao limpar dados de usuário:', error);
      }
    },

    // Verifica se o usuário está autenticado
    isLoggedIn() {
      return this.isAuthenticated;
    },

    // Carrega dados do usuário do armazenamento
    loadUserFromStorage() {
      try {
        const storedUser = localStorage.getItem('user');
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (storedUser && isAuthenticated === 'true') {
          const parsedUser = JSON.parse(storedUser);
          
          // Restaura apenas dados seguros
          this.user = {
            id: parsedUser.id,
            username: parsedUser.username,
            name: parsedUser.name,
            email: parsedUser.email,
            roles: []
          };
          this.isAuthenticated = true;

          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        this.logout(); // Limpa dados em caso de erro
        return false;
      }
    },

    // Métodos auxiliares
    getUserName() {
      return this.user.name || this.user.username || 'Usuário';
    },

    getUserEmail() {
      return this.user.email;
    },

    hasRole(role) {
      return this.user.roles.includes(role);
    },

    // Método para atualizar parte dos dados do usuário
    updateUserData(newData) {
      this.user = {
        ...this.user,
        ...newData
      };

      // Atualiza armazenamento local
      try {
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
      }
    }
  },

  // Configuração de persistência
  persist: {
    storage: localStorage,
    paths: [
      'user.id', 
      'user.username', 
      'user.name', 
      'user.email', 
      'isAuthenticated'
    ]
  }
});