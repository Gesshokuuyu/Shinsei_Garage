import api from '@/axios';
import { useUserStore } from '@/stores/userStore';

export const apiService = {
  async getDashboardData() {
    const userStore = useUserStore();
    userStore.loadUserFromStorage()

    try {
      const response = await api.get('/api/dashboard', {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      throw error;
    }
  },

  async updateProfile(data) {
    const userStore = useUserStore();

    try {
      const response = await api.put('/api/profile', data, {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },

};
