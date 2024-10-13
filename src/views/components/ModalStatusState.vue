<template>
  <div v-if="isVisible" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <!-- <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> -->
        </div>
        <div class="modal-body text-center">
          <div v-if="isLoading">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
          </div>
          <div v-else>
            <p>{{ message }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  

  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        default: ''
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4880FF; /* เปลี่ยนสีของ spinner */
  border-radius: 50%;
  width: 40px; /* ขนาดของ spinner */
  height: 40px; /* ขนาดของ spinner */
  animation: spin 1s linear infinite; /* การหมุน */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>