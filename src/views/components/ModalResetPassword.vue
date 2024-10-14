
<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">×</button>
      <span class="text-center text-head-modal" >Change your password</span>
      <form @submit.prevent="handleResetPassword" class="p-4">

        <div class="form-group mt-2">
          <div class="row">
            <div class="col-5"> 
              <label class="text-lable-modal col-2 align-middle mb-0" for="new-password"> Password </label>
            </div>
            <div class="col-7">
                <input
                type="password"
                id="current-password"
                v-model="currentPassword"
                class="form-control text-lable-modal align-middle mb-0"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-group  mt-4">
          <div class="row">
            <div class="col-5"> 
              <label class="text-lable-modal align-middle mb-0" for="new-password">New Password</label>
            </div>
            <div class="col-7">
              <input
                type="password"
                id="new-password"
                v-model="newPassword"
                class="form-control text-lable-modal"
                required
              />
               
            </div>
          </div>
        </div>

        <div class="form-group  mt-4">
          <div class="row">
            <div class="col-5"> 
              <label class="text-lable-modal align-middle" for="confirm-password">Confirm Password </label>
            </div>
            <div class="col-7">
              <input
                type="password"
                id="confirm-password"
                v-model="confirmPassword"
                class="form-control text-lable-modal"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block text-white btn-submitform mb-3 mt-3">Set Password</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import Swal from 'sweetalert2';
import { defineProps, defineEmits, nextTick , ref } from 'vue';
 // eslint-disable-next-line no-unused-vars
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }, 
  setDataNewPassword: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['close']);
const closeModal = () => {
  nextTick(() => {
    const modalContent = document.querySelector('.modal-content');
    const modalOverlay = document.querySelector('.modal-overlay');

    modalContent.classList.remove('show');
    modalOverlay.classList.remove('show');

    setTimeout(() => {
      emit('close'); // แจ้งว่ามีการปิด modal
    }, 300); // ต้องใช้เวลาเดียวกับ transition
  });
};


const newPassword = ref('');
const confirmPassword = ref('');
const currentPassword = ref('');

const handleResetPassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    Swal.fire({
      icon: 'error',
      title: 'An error has occurred. Please try again.',
      text: "Passwords do not match!!",
    });
    return;
  }

  
  Swal.fire({
    title: 'Are you sure ?',
    text: "Do you really want to reset your password?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, reset it',
    cancelButtonText: 'No, keep it',
  }).then(async (result) => {
    if (result.isConfirmed) {
      props.setDataNewPassword(currentPassword.value, newPassword.value); // เรียกใช้ฟังก์ชัน
      
     
    }
  });
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
    align-items: center;
    justify-content: center;
    z-index: 1050;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .modal-overlay.show {
    opacity: 1;
  }

  .modal-content {
    background: white;
    padding: 15px;
    border-radius: 10px;
    max-width: 480px;
    width: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .modal-content.show {
    opacity: 1;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  .text-head-modal{
    color:#0081CC;
    font-weight: bold;
    font-size: 18px;
  }

  .text-lable-modal{
    color:#0081CC;
    font-size: 16px!important;
    font-weight: normal;
    border-color: cornflowerblue;
  }
  .btn-submitform{
    background-color: #49BCFF!important;
    width: 100%;
  }

  .close-button{
    font-size: 12px!important;
    text-align: end!important;
    color:#0081CC;
  }
</style>
