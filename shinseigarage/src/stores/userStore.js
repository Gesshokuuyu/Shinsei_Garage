import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      username: '',
      name: '',
      password: '',
    },
    isAuthenticated: false,
  }),
  actions: {
    login(userData) {
      this.user = {
        id: userData.id,
        username: userData.username,
        name: userData.name,
        password: userData.password,
      };
      this.isAuthenticated = true;

      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('isAuthenticated', true);
    },

    logout() {
      this.user = { id: null, username: '', name: '', password: '' };
      this.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    },

    isLoggedIn() {
      return this.isAuthenticated;
    },


    loadUserFromStorage() {
      const user = localStorage.getItem('user');
      const isAuthenticated = localStorage.getItem('isAuthenticated');

      if (user && isAuthenticated === 'true') {
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
      }
    },
  },
  persist: true,
});
