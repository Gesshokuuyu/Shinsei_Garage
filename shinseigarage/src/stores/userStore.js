import { defineStore } from 'pinia';
import api from '@/axios';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      username: '',
      name: '',
      email: '',
      role: '',
    },
    isAuthenticated: false,
    token: null,
  }),

  actions: {
    login(userData) {
      if (!userData) {
        console.error('Dados de usuário inválidos');
        return false;
      }

      this.user = {
        id: userData.id || null,
        username: userData.username || '',
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || ''
      };

      this.token = userData.token || null;
      this.isAuthenticated = true;

      try {
        const safeUserData = {
          id: this.user.id,
          username: this.user.username,
          name: this.user.name,
          email: this.user.email
        };

        localStorage.setItem('user', JSON.stringify(safeUserData));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', this.token);

        return true;
      } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
        return false;
      }
    },

    async saveProfileUser(userData){
      try {
        const response = await api.post('/api/account/saveUserProfile', userData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.token}`
          }
        });
    
        console.log('Perfil atualizado com sucesso!', response.data);
    
      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
      }
    },


  async loadUserExtraData() {
    if (!this.user.id || !this.token) return;

    try {
      const response = await api.get(`/api/account/details/${this.user.id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }); 

      const { biografia, telefone, website, localizacao } = response.data;


      const safeUserData = {
        id: this.user.id,
        username: this.user.username,
        name: this.user.name,
        email: this.user.email,
        biografia,
        telefone,
        website,
        localizacao
      };

     return safeUserData;

    } catch (error) {
      console.error('Erro ao carregar dados extras do usuário:', error);
    }
  },


    logout() {
      this.user = {
        id: null,
        username: '',
        name: '',
        email: '',
        role: ''
      };
      this.isAuthenticated = false;
      this.token = null;

      try {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        sessionStorage.clear();
      } catch (error) {
        console.error('Erro ao limpar dados de usuário:', error);
      }
    },

    isLoggedIn() {
      return this.isAuthenticated;
    },

    loadUserFromStorage() {
      try {
        const storedUser = localStorage.getItem('user');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const storedToken = localStorage.getItem('token');

        if (storedUser && isAuthenticated === 'true') {
          const parsedUser = JSON.parse(storedUser);
          this.user = {
            id: parsedUser.id,
            username: parsedUser.username,
            name: parsedUser.name,
            email: parsedUser.email,
            role: parsedUser.role || ''
          };
          this.isAuthenticated = true;
          this.token = storedToken || null;

          return true;
        }

        return false;
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        this.logout();
        return false;
      }
    },

    getUserName() {
      return  this.user.username ;
    },

    getUserId(){
      return this.user.id;
    },

    getUserSocialName(){
      return this.user.name ;
    },

    getUserEmail() {
      return this.user.email;
    },

    hasRole(role) {
      return this.user.role.includes(role);
    },


    updateUserData(newData) {
      this.user = {
        ...this.user,
        ...newData
      };

      try {
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
      }
    }
  },

  // ✅ Persistência ajustada
  persist: {
    storage: localStorage,
    paths: ['user', 'isAuthenticated', 'token']
  }
});
