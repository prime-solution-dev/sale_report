<script setup>
 
import {  loginUser } from '../services/reportapi/state.userApi';
import { onBeforeUnmount, onBeforeMount , ref , onMounted} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import background_login from "@/assets/img/bg-loginpage.png";
import Modal from '/src/views/components/ModalStatusState';

const router = useRouter(); 
const isLoading = ref(false); 

const body = document.getElementsByTagName("body")[0];

const store = useStore();

const isModalVisible = ref(false);
const message = ref(''); // ประกาศ message

onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});
onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');

// Local Storage When Component > loading
onMounted(() => {
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');
  
  if (savedUsername) {
    username.value = savedUsername;
  }
  if (savedPassword) {
    password.value = savedPassword;
  }
  
  // const token = localStorage.getItem('token');
  // if (token) {
  //   // นำทางไปยังหน้าหลัก
  //   // this.$router.push('/dashboard'); // ใช้ router 
  // }
});

const isButtonDisabled = ref(false);
const handleLogin = async () => {
  errorMessage.value = ''; // เคลียร์ข้อความผิดพลาดก่อน
  isButtonDisabled.value = true; 
  try {
    const userData = await loginUser(username.value, password.value);
    store.dispatch('login', userData);
    // ตรวจสอบว่าใช้ "Remember Password" หรือไม่
    if (rememberMe.value) {
        localStorage.setItem('username', username.value);
        localStorage.setItem('password', password.value); // เพิ่มการบันทึกรหัสผ่านถ้าต้องการ
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password'); 
    }

      isModalVisible.value = true;
      message.value = 'Login successful!'; 
      isLoading.value = false; 
      setTimeout(() => {
        router.push('/Main'); 
      }, 3000); 

   
    console.log('Login successful  :', userData.token);
  
  } catch (error) {
    errorMessage.value = error.message || 'invalid username or password';
  }
  finally {
    isButtonDisabled.value = false;
  }
};


</script>
<template>
 
 <main class="mt-0 main-content" :style="{ backgroundImage: 'url(' + background_login + ')', backgroundSize: 'cover' }">

    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-5 col-lg-5 col-md-6 d-flex  justify-content-center bg-white rounded-3"
            >
              <div class="card card-plain mt-4 mb-4">
                <div class="pb-0 card-header text-center">
                  <h4 class="font-weight-bolder">  Login to Account </h4>
                  <p class="mb-0">Please enter your email and password to continue</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="handleLogin">
                    <div class="mb-4">
                      <label class="fs-6 fw-normal"> Email address: </label>
                      <argon-input
                        v-model="username" 
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="lg"
                        autocomplete="username"
                        aria-label="Email address"
                         :error="!!errorMessage"
                      />
                    </div>
                    <div class="">
                      <label class="fs-6 fw-normal"> Password : </label>
                      <argon-input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                        autocomplete="current-password" 
                         :error="!!errorMessage"
                      />

                      
                      <span v-if="errorMessage" style="color: red;">
                        {{ errorMessage }}</span>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" v-model="rememberMe" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Remember Password
                      </label>
                    </div>

                    <div class="text-center mb-5">
                      <argon-button
                        class="mt-4"
                        style="background-color:#4880FF;
                        color:white;"
                        fullWidth
                        size="lg"
                        type="submit" :class="{ Disabled: isButtonDisabled }" :disabled="isButtonDisabled">Sign in</argon-button
                      >
                      
                    </div>

                    <!-- <Modal
                    :isVisible="isModalVisible"
                    title="Success"
                    message="Login successful!"
                    @close="handleCloseModal"
                  /> -->

                  <!-- <Modal
                    title="Status"
                    :message="message"
                    :isLoading="isLoading"
                  /> -->

                  <!-- <Modal
                    v-if="isModalVisible"
                    title="Status"
                    :message="message"
                    :isLoading="isLoading"
                    @close="isModalVisible = false"
                  /> -->

                  <Modal
                    v-if="isModalVisible"
                    title="Status"
                    :message="message"
                    :isLoading="isLoading"
                    @close="isModalVisible = false"
                  />

                 
                  </form>
                </div>
              
              </div>
            </div>
       
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
  //import ArgonAlert from "@/components/ArgonAlert.vue";

  export default {
    components: {
     // ArgonAlert , 
      ArgonInput
    },
  }
</script>