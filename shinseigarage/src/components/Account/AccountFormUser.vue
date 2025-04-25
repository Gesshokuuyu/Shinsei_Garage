<template>
  <div class="profile-container">
    <h2 class="profile-title">Editar Perfil</h2>
    
    <div class="profile-content">
      <!-- Seção de upload de imagem -->
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

      <!-- Formulário principal -->
      <form @submit.prevent="saveProfile" class="profile-form">
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

        <!-- Seção de informações adicionais -->
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

        <!-- Redes sociais -->
        <div class="social-media-section">
          <h3>Redes Sociais</h3>
          
          <div class="form-row">
            <div class="form-group social-input">
              <div class="social-icon instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <input 
                type="text" 
                id="instagram" 
                v-model="userProfile.instagram" 
                placeholder="Username do Instagram"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group social-input">
              <div class="social-icon linkedin">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <input 
                type="text" 
                id="linkedin" 
                v-model="userProfile.linkedin" 
                placeholder="URL do LinkedIn"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group social-input">
              <div class="social-icon twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <input 
                type="text" 
                id="twitter" 
                v-model="userProfile.twitter" 
                placeholder="Username do Twitter"
              />
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
import { ref, reactive } from 'vue';

export default {
  name: 'UserProfileEdit',
  
  setup() {
    const fileInput = ref(null);
    const previewImage = ref(null);
    
    const userProfile = reactive({
      name: '',
      email: '',
      bio: '',
      phone: '',
      website: '',
      location: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      profileImage: null
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
    
    const saveProfile = () => {
      // Aqui você implementaria a lógica para salvar os dados
      console.log('Perfil salvo:', userProfile);
      
      // Simulação de envio com sucesso
      alert('Perfil atualizado com sucesso!');
    };
    
    const cancelEdit = () => {
      if (confirm('Deseja cancelar as alterações?')) {
        // Aqui você poderia adicionar lógica para redirecionar
        console.log('Edição cancelada');
      }
    };
    
    return {
      fileInput,
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
  background: #1a1a1a; /* Fundo escuro acinzentado */
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #fff; /* Texto branco para contraste */
}

.profile-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff; /* Título em branco */
  margin-bottom: 40px;
  text-align: center;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* Seção de upload de imagem */
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
  color: #ff6b6b; /* Cor de remoção mais brilhante para contraste */
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

/* Formulário principal */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-row {
  margin-bottom: 5px;
}

.form-group {
  position: relative;
  width: 100%;
}

/* Estilo de campo flutuante */
.floating-label {
  position: relative;
}

.floating-label input,
.floating-label textarea {
  width: 100%;
  padding: 15px 0 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #444; /* Borda mais escura */
  background: transparent;
  color: #fff; /* Texto branco */
  transition: border-color 0.3s;
}

.floating-label textarea {
  min-height: 120px;
  resize: vertical;
}

.floating-label input:focus,
.floating-label textarea:focus {
  outline: none;
  border-color: #fff; /* Borda branca em foco */
}

.floating-label label {
  position: absolute;
  left: 0;
  top: 15px;
  font-size: 16px;
  color: #aaa; /* Label em cinza claro */
  pointer-events: none;
  transition: all 0.3s ease;
}

.floating-label input:focus ~ label,
.floating-label textarea:focus ~ label,
.floating-label input:not(:placeholder-shown) ~ label,
.floating-label textarea:not(:placeholder-shown) ~ label {
  top: -5px;
  font-size: 14px;
  color: #fff; /* Label em branco quando ativo */
  font-weight: 500;
}

.input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #fff; /* Linha branca */
  transition: width 0.3s ease;
}

.floating-label input:focus ~ .input-underline,
.floating-label textarea:focus ~ .input-underline {
  width: 100%;
}

/* Seções com títulos */
.additional-info-section,
.social-media-section {
  margin-top: 10px;
  padding-top: 10px;
}

.additional-info-section h3,
.social-media-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: #fff; /* Título em branco */
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
  background-color: #fff; /* Linha branca */
}

/* Estilo para inputs de redes sociais */
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
  border: 1px solid #444; /* Borda escura */
  border-radius: 6px;
  font-size: 14px;
  background-color: #2a2a2a; /* Fundo escuro para input */
  color: #fff; /* Texto branco */
  transition: all 0.3s ease;
}

.social-input input:focus {
  outline: none;
  border-color: #fff; /* Borda branca em foco */
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.social-input input::placeholder {
  color: #777; /* Placeholder em cinza */
}

/* Botões de ação */
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
  background-color: #333; /* Cinza escuro */
  color: #fff; /* Texto branco */
}

.cancel-btn:hover {
  background-color: #444; /* Cinza mais claro no hover */
}

.save-btn {
  background-color: #fff; /* Botão branco */
  color: #000; /* Texto preto */
}

.save-btn:hover {
  background-color: #eee; /* Branco ligeiramente mais escuro no hover */
}

/* Responsividade */
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