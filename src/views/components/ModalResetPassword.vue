<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <h3>Reset Password</h3>
        <form @submit.prevent="handleReset">
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div>
            <label for="newPassword">New Password</label>
            <input type="password" id="newPassword" v-model="newPassword" required />
          </div>
          <div>
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required />
          </div>
          <button type="submit">Reset Password</button>
          <button type="button" @click="closeModal">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps(['isVisible', 'onClose']);
  const email = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  const handleReset = () => {
    if (newPassword.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }
    // Implement your reset password logic here
    console.log('Resetting password for:', email.value);
    // Close modal after success
    onClose();
  };
  
  const closeModal = () => {
    email.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    onClose();
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
  }
  </style>
  