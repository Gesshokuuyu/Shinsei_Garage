<template>
  <div class="profile-container">
    <h2 class="profile-title">Editar Perfil</h2>
    
    <div class="profile-content">
      <div class="image-upload-section">
        <div class="image-container" @click="triggerFileInput">
          <img v-if="previewImage" :src="previewImage" alt="Imagem de perfil" class="profile-image" />
          <div v-else class="image-placeholder">
            <span class="upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
            </span>
            <span class="upload-text">Adicionar foto</span>
          </div>
        </div>
        <input 
          type="file" 
          ref="fileInput" 
          accept="image/*" 
          @change="handleImageUpload" 
          class="file-input" 
        />
        <button v-if="previewImage" @click="removeImage" class="remove-image-btn">
          <span>Remover</span>
        </button>
      </div>

      <form @submit.prevent="saveProfile" class="profile-form">
        <div class="form-row">
          <div class="form-group floating-label">
            <input 
              type="text" 
              id="name" 
              v-model="userProfile.username" 
              required
              placeholder=" "
            />
            <label for="name">Nome de Usuário</label>
            <div class="input-underline"></div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group floating-label">
            <input 
              type="text" 
              id="name" 
              v-model="userProfile.name" 
              required
              placeholder=" "
            />
            <label for="name">Nome Completo</label>
            <div class="input-underline"></div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group floating-label">
            <input 
              type="email" 
              id="email" 
              v-model="userProfile.email" 
              required
              placeholder=" "
            />
            <label for="email">Email</label>
            <div class="input-underline"></div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group floating-label">
            <textarea 
              id="bio" 
              v-model="userProfile.bio" 
              rows="4"
              placeholder=" "
            ></textarea>
            <label for="bio">Biografia</label>
            <div class="input-underline"></div>
          </div>
        </div>

        <div class="additional-info-section">
          <h3>Informações Adicionais</h3>
          
          <div class="form-row">
            <div class="form-group floating-label">
              <input 
                type="tel" 
                id="phone" 
                v-model="userProfile.phone" 
                placeholder=" "
              />
              <label for="phone">Telefone</label>
              <div class="input-underline"></div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group floating-label">
              <input 
                type="url" 
                id="website" 
                v-model="userProfile.website" 
                placeholder=" "
              />
              <label for="website">Website</label>
              <div class="input-underline"></div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group floating-label">
              <input 
                type="text" 
                id="location" 
                v-model="userProfile.location" 
                placeholder=" "
              />
              <label for="location">Localização</label>
              <div class="input-underline"></div>
            </div>
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="form-actions">
          <button type="button" @click="cancelEdit" class="cancel-btn">Cancelar</button>
          <button type="submit" class="save-btn">Salvar Alterações</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'UserProfileEdit',
  
  setup() {

    const userStore = useUserStore();
    

    const fileInput = ref(null);
    const previewImage = ref(null);
    const userExtraData = ref(null);
    onMounted(async () => {
      userExtraData.value = await userStore.loadUserExtraData()

      previewImage.value = userExtraData.value?.imagePath 
      ? `http://localhost:8000${userExtraData.value.imagePath}` 
      : null
    })

    const userProfile = reactive({
      name: userStore.getUserSocialName() || '',
      username: userStore.getUserName() || '',
      email: userStore.getUserEmail() || '',
      bio: userExtraData.value?.biografia || '',
      phone: userExtraData.value?.telefone || '',
      website: userExtraData.value?.website || '',
      location: userExtraData.value?.localizacao || '',
      profileImage: userExtraData.value?.imagePath 
      ? `http://localhost:8000${userExtraData.value.imagePath}` 
      : null,
    });
    
    const triggerFileInput = () => {
      fileInput.value.click();
    };
    
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        userProfile.profileImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    
    const removeImage = () => {
      previewImage.value = null;
      userProfile.profileImage = null;
      fileInput.value.value = '';
    };
    
    const  saveProfile = async () => {
      const formData = new FormData();

      formData.append('name', userProfile.name || '');
      formData.append('username', userProfile.username || '');
      formData.append('email', userProfile.email || '');
      formData.append('bio', userProfile.bio || '');
      formData.append('phone', userProfile.phone || '');
      formData.append('website', userProfile.website || '');
      formData.append('location', userProfile.location || '');
      formData.append('id', userStore.getUserId());

      if(userProfile.profileImage){
        formData.append('profileImage', userProfile.profileImage)
      }

      try{
        await userStore.saveProfileUser(formData)
      }catch(error){
        console.error('Erro ao salvar Perfil: ', error);
        
      }
    };
    
    const cancelEdit = () => {
      if (confirm('Deseja cancelar as alterações?')) {
        console.log('Edição cancelada');
      }
    };
    
    return {
      fileInput,
      userExtraData,
      previewImage,
      userProfile,
      triggerFileInput,
      handleImageUpload,
      removeImage,
      saveProfile,
      cancelEdit
    };
  }
};
</script>

<style scoped>
/* Estilos gerais e reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
}

.profile-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 30px;
  background: #1a1818;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #fff; 
}

.profile-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff; 
  margin-bottom: 40px;
  text-align: center;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.image-upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.image-container {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.image-container:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #222, #333);
  color: #fff;
}

.upload-icon {
  margin-bottom: 8px;
  color: #fff;
}

.upload-text {
  font-size: 14px;
  font-weight: 500;
}

.file-input {
  display: none;
}

.remove-image-btn {
  background: none;
  border: none;
  color: #ff6b6b; 
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 5px 0;
  position: relative;
}

.remove-image-btn::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #ff6b6b;
  transition: width 0.3s ease;
}

.remove-image-btn:hover::after {
  width: 100%;
}


.profile-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-row {
  margin-bottom: 10px;
}

.form-group {
  position: relative;
  width: 100%;
}

.floating-label {
  position: relative;
}

.floating-label input,
.floating-label textarea {
  width: 100%;
  padding: 15px 0 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #444; 
  background: transparent;
  color: #fff; 
  transition: border-color 0.3s;
}

.floating-label textarea {
  min-height: 120px;
  resize: vertical;
}

.floating-label input:focus,
.floating-label textarea:focus {
  outline: none;
  border-color: #fff; 
}

.floating-label label {
  position: absolute;
  left: 0;
  top: 15px;
  font-size: 16px;
  color: #aaa; 
  pointer-events: none;
  transition: all 0.3s ease;
}

.floating-label input:focus ~ label,
.floating-label textarea:focus ~ label,
.floating-label input:not(:placeholder-shown) ~ label,
.floating-label textarea:not(:placeholder-shown) ~ label {
  top: -5px;
  font-size: 14px;
  color: #fff; 
  font-weight: 500;
}

.input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #fff; 
  transition: width 0.3s ease;
}

.floating-label input:focus ~ .input-underline,
.floating-label textarea:focus ~ .input-underline {
  width: 100%;
}

.additional-info-section,
.social-media-section {
  margin-top: 10px;
  padding-top: 10px;
}

.additional-info-section h3,
.social-media-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
}

.additional-info-section h3::after,
.social-media-section h3::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #fff; 
}


.social-input {
  display: flex;
  align-items: center;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 10px;
  color: white;
}

.instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.linkedin {
  background-color: #0077b5;
}

.twitter {
  background-color: #1da1f2;
}

.social-input input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #444; 
  border-radius: 6px;
  font-size: 14px;
  background-color: #2a2a2a; 
  color: #fff; 
  transition: all 0.3s ease;
}

.social-input input:focus {
  outline: none;
  border-color: #fff; 
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.social-input input::placeholder {
  color: #777; 
}


.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.cancel-btn, .save-btn {
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.cancel-btn {
  background-color: #333; 
  color: #fff; 
}

.cancel-btn:hover {
  background-color: #444; 
}

.save-btn {
  background-color: #fff; 
  color: #000;
  
}

.save-btn:hover {
  background-color: #eee;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.281);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 25px 20px;
    border-radius: 8px;
  }
  
  .profile-title {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .form-actions {
    flex-direction: column-reverse;
    width: 100%;
  }
  
  .cancel-btn, .save-btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .profile-title {
    font-size: 22px;
    margin-bottom: 25px;
  }
  
  .image-container {
    width: 120px;
    height: 120px;
  }
  
  .floating-label input,
  .floating-label textarea {
    font-size: 15px;
  }
  
  .floating-label label {
    font-size: 15px;
  }
  
  .additional-info-section h3,
  .social-media-section h3 {
    font-size: 18px;
  }
}
</style>