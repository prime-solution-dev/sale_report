<script setup>
import { onBeforeUnmount, onBeforeMount, nextTick , ref , watch , defineEmits } from "vue";
import {  setPasswordStateAPI } from '../services/reportapi/state.userApi';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ModalResetPassword from '/src/views/components/ModalResetPassword'; // นำเข้า Modal
import Swal from 'sweetalert2';
import "../../src/assets/css/styleMainpage.css";
import "../../src/assets/css/stlyeSwalAlert.css";
import background_paper from "@/assets/img/background-paper.png";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const day_now = ref('');
const userData = ref(null);
const emit = defineEmits(['close']);
const formatDate = (date) => {
  const day = date.getDate(); 
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getMonth()]; 
  const year = date.getFullYear(); 
  return `${day} ${month} ${year}`; 
};

const currentDate = new Date();
day_now.value = formatDate(currentDate);

onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");

  fetchUserDataFromLocalStorage();
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

// กำหนด showModal เป็น ref
const showModalResetPassword = ref(false);

// ฟังก์ชันเปิด modal
const openModal = () => {
  showModalResetPassword.value = true;
  nextTick(() => {
    const modalContent = document.querySelector('.modal-content');
    const modalOverlay = document.querySelector('.modal-overlay');

    modalContent.classList.add('show');
    modalOverlay.classList.add('show');
  });
};

watch(userData, (newValue) => {
  if (newValue && newValue.isForceChangePassword) {
    openModal(); // เปิด modal ถ้าจำเป็นต้องเปลี่ยนรหัสผ่าน
  }
});
// ฟังก์ชัน fetchUserDataFromLocalStorage

const fetchUserDataFromLocalStorage = () => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    userData.value = JSON.parse(storedData);
  } else {
    userData.value = null; 
  }
};

// ตรวจสอบ userData ทุกครั้งที่มีการเปลี่ยนแปลง
watch(userData, (newValue) => {
  if (newValue && newValue.isForceChangePassword) {
    openModal(); // เปิด modal ถ้าจำเป็นต้องเปลี่ยนรหัสผ่าน
  }
});


const router = useRouter(); 
// ฟังก์ชัน Logout
const handleLogout = () => {
  localStorage.clear(); // ลบข้อมูลทั้งหมดใน localStorage
  store.commit('RESET_STATE'); // เคลียร์สถานะใน Vuex
  router.push('/Signin'); // เปลี่ยนเส้นทางไปยังหน้า Login
};

///
const checkPasswordChange = (menuitem) => {
  const menupage = menuitem;
  
  if (userData.value && userData.value.isForceChangePassword == true) {
    //alert('55555555');
    openModal(); // เปิดโมดอล
  }
  else if (userData.value && userData.value.isForceChangePassword == false) {
    if(menupage=='menu1'){
      router.push('/dashboard-default'); 
    }
  }
  
  else {
    if(menupage=='menu1'){
      router.push('/dashboard-default'); 
    }
  }
};
// const isModalVisible = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const setDataNewPassword= async (currentPassword, newPassword) => {
  errorMessage.value = ''; // เคลียร์ข้อความผิดพลาดก่อน
  try {

    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    const user = 'marymile.remymeaw@gmail.com';
    const passwordnew = '123456';

  //  const userData = await setPasswordStateAPI(userData.user, this.confirmPassword);
    const userData = await setPasswordStateAPI(user,passwordnew);
      // แสดงข้อความสำเร็จ
    //   Swal.fire({
    //   title: 'Success!',
    //   text: "Your password has been reset successfully.",
    //   icon: 'success',
    //   confirmButtonText: 'OK',
    // });
    //   emit('close');
    //   setTimeout(() => {
    //     router.push('/Main'); 
    //   }, 2500); 

      // แสดงข้อความสำเร็จ
      Swal.fire({
      title: 'Success!',
      text: "Your password has been reset successfully.",
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      emit('close');
      // ปิด modal หลังจากผู้ใช้กด OK
      showModalResetPassword.value = false; // ปิด modal
      setTimeout(() => {
        router.push('/Main'); 
      }, 2500);
    });

      console.log('SetPassword:', userData);
  
  
  } catch (error) {
    console.log('ERROR STATE:');
 //   errorMessage.value = error.message || 'ERROR STATE';
  }
};

</script>

<template>
 <main class="mt-0 main-content">

  <!-- ปุ่ม Logout -->
  <button @click="handleLogout">Logout</button>
    <section>
      <div class="page-header min-vh-100" :style="{ backgroundImage: 'url(' + background_paper + ')', backgroundSize: 'cover' }">
        <div class="container">
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 ">
              <div class="mt-4 mb-4 text-center">
                <p class="font-weight-bolder text-welcome mb-0">Welcome to Daily</p>
                <p class="font-weight-bolder text-head mt-0 mb-0">Sales Report</p>
                <p class="mb-0 text-head-sub">{{ day_now }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12">
              <div class="mb-4">
                <div class="card-body">
                  <div class="row">
                      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 menu-button"
                      @click.prevent="checkPasswordChange('menu1')">
                        <i class="fas fa-chart-line"></i> 
                        <span class="text-span-menu">Dashboard</span>
                        </div>
                   
                    
                    <router-link to="/report" class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 menu-button" >
                      <i class="ni ni-chart-bar-32"></i>
                      <span class="text-span-menu">Report</span>
                    </router-link>
                    <router-link to="/upload" class="col-xl-3 col-lg-3 col-md-3  col-sm-12 col-12 menu-button">
                      <i class="ni ni-spaceship"></i>
                      <span class="text-span-menu">Upload</span>
                    </router-link>
                    <router-link to="/profile" class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 menu-button">
                      <i class="fas fa-user"></i> 
                      <span class="text-span-menu">User</span>
                    </router-link>
                  </div>
<!-- 
                  <Modal
                  v-if="isModalVisible" 
                  :title="modalTitle" 
                  :message="modalMessage" 
                  :isLoading="isLoading" 
                  :type="modalType" 
                  @close="isModalVisible = false" 
                  /> -->

                  <!-- <ModalResetPassword 
                    v-if="isModalVisible" 
                    :title="modalTitle" 
                    :message="modalMessage" 
                    :isLoading="isLoading" 
                    :type="modalType" 
                    @close="isModalVisible = false" 
                /> -->
                  <!-- <ModalResetPassword :isVisible="showModalResetPassword" @close="showModalResetPassword = false" :setDataNewPassword="setDataNewPassword"/> -->
                  <ModalResetPassword 
                    v-if="showModalResetPassword" 
                    :isVisible="showModalResetPassword" 
                    :isLoading="isLoading" 
                    @close="showModalResetPassword = false" 
                    :setDataNewPassword="setDataNewPassword"
                    
                />

                  <button @click="openModal" class="btn btn-primary mt-4">Reset Password</button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   
    <!-- <div v-if="userData">
      <p><strong>ชื่อ:</strong> {{ userData.name }}</p>
      <p><strong>จำเป็นต้องเปลี่ยนรหัสผ่าน:</strong> {{ userData.isForceChangePassword }}</p>
      <p><strong>Token:</strong> {{ userData.token }}</p>
      <p><strong>tokenExpire:</strong> {{ userData.tokenExpire }}</p>
      
     
      <ul>
        <li v-for="permission in userData.permissions" :key="permission.module_item_code">
          {{ permission.module_item_name }} ({{ permission.module_item_code }})
        </li>
      </ul>
    </div>
    <div v-else>
      <p>ไม่มีข้อมูลใน LocalStorage</p>
    </div> -->

  </main>
  <!-- <main class="mt-0 main-content">
    <ModalResetPassword :isVisible="showModalResetPassword" @close="showModalResetPassword = false" :setDataNewPassword="setDataNewPassword"/>
   
  </main> -->

</template>

<style scoped>
.row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.col-sm-12 ,.col-12{
  flex: 1 1 33%!important;
  margin: 10px;
  max-width: 200px;
}

.col-xl-3, .col-lg-3, .col-md-3 {
  flex: 1 1 22%!important;
  margin: 10px;
  max-width: 170px;
}


</style>
<script>
const storedData = localStorage.getItem('userData');
// eslint-disable-next-line no-empty
if (storedData) {
  // const userData = JSON.parse(storedData);
  //   console.log(userData); 
}
export default {
  components: {
        ModalResetPassword
    },
  data() {
    return {
      isAuthenticated: false,
      userData: null, // storeUser
    };
  },
  mounted() {
    this.checkSession();
  //  this.fetchUserDataFromLocalStorage();
  },
  methods: {
    checkSession() {
      const token = localStorage.getItem('token'); // checktoken
      if (token) {
        this.isAuthenticated = true; // ถ้ามี ให้ตั้งค่า isAuthenticated เป็น true
      } else {
        this.isAuthenticated = false; // ถ้าไม่มี ให้ตั้งค่า false
      //  this.$router.push('/login'); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบถ้าไม่มี session
      }
    },
    // fetchUserDataFromLocalStorage() {
    //   // const storedData = localStorage.getItem('userData'); 
    //   // if (storedData) {
    //   //   this.userData = JSON.parse(storedData); // แปลงข้อมูล JSON
    //   // } else {
    //   //   this.userData = null; 
    //   // }
    
    //   if (storedData) {
    //     userData.value = JSON.parse(storedData); // แปลงข้อมูล JSON
    //   } else {
    //     userData.value = null; 
    //   }
    // },
    
  },
  
};


</script>