<template>
    <div 
      v-if="isVisible"
      class="modal-overlay"
    >
      <div class="modal-container">
        <div class="modal-content">
          <h2 class="modal-title">Deseja realmente sair?</h2>
          <p class="modal-description">Você será desconectado da sua conta atual.</p>
          
          <div class="modal-actions">
            <button
              @click="$emit('action', 'cancel')"
              class="btn btn-cancel"
            >
              Cancelar
            </button>
            <button
              @click="$emit('action', 'confirm')"
              class="btn btn-logout"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  defineProps({
    isVisible: {
      type: Boolean,
      default: false
    }
  })
  
  // Emitindo evento para o componente pai
  defineEmits(['action'])
  </script>
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    padding: 24px;
  }
  
  .modal-content {
    text-align: center;
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }
  
  .modal-description {
    color: #666;
    margin-bottom: 24px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: 500;
  }
  
  .btn-cancel {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .btn-cancel:hover {
    background-color: #e0e0e0;
  }
  
  .btn-logout {
    background-color: #ff4d4d;
    color: white;
  }
  
  .btn-logout:hover {
    background-color: #ff3333;
  }
  </style>