

<script setup>
import { onMounted,onBeforeUnmount, onBeforeMount, nextTick, ref, watch } from "vue";
import { setPasswordStateAPI, fetchGetDataUser } from '../services/reportapi/state.userApi';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ModalResetPassword from '/src/views/components/ModalResetPassword'; 
import Swal from 'sweetalert2';
import "../../src/assets/css/styleMainpage.css";
import "../../src/assets/css/stlyeSwalAlert.css";
import background_paper from "@/assets/img/background-paper.png";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const day_now = ref('');
const userData = ref(null);
const fetchedDataGetUser = ref(null);
const showModalResetPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const emit = defineEmits(['close']);

const formatDate = (date) => {
  const day = date.getDate(); 
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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


const openModal = () => {
  showModalResetPassword.value = true; // ตั้งค่าให้แสดงโมดอล
  nextTick(() => {
    const modalContent = document.querySelector('.modal-content');
    const modalOverlay = document.querySelector('.modal-overlay');

    // แสดงโมดอลและเพิ่มคลาส 'show' หลังจากแสดง
    modalContent.style.display = 'block'; // แสดงโมดอล
    requestAnimationFrame(() => {
      modalContent.classList.add('show');
      modalOverlay.classList.add('show');
    });
  });
};


watch(fetchedDataGetUser, (ValUser) => {
  //console.log("Fetched Data:", ValUser); 
  if (ValUser && ValUser.length > 0 && ValUser[0].is_force_change_password === true) {
    //openModal(); 

    setTimeout(() => {
      openModal(); 
    }, 1500); 
  }
});

const CheckPermissions = (menuitem) => {
  const menupage = menuitem;
  if (fetchedDataGetUser.value[0] && fetchedDataGetUser.value[0].is_force_change_password) {
    openModal();
  } else if (menupage === 'DASHBORD') {
    router.push('/dashboard-default'); 
  }
  else if (menupage === 'REPORT') {
    router.push('/report'); 
  }
  else if (menupage === 'UPLOAD') {
    router.push('/upload'); 
  }
  else if (menupage === 'USER') {
    router.push('/profile'); 
  }
};

const fetchUserDataFromLocalStorage = () => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    userData.value = JSON.parse(storedData);
  } else {
    userData.value = null; 
  }
};

const router = useRouter(); 
const handleLogout = () => {
  localStorage.clear();
  store.commit('RESET_STATE');
  router.push('/Signin');
};



const CalUserDataApi = async () => {
  if (!userData.value || !userData.value.username) {
    errorMessage.value = 'Username is missing.';
    return; 
  }
  
  const usernamelog = userData.value.username;
  isLoading.value = true;
  
  try {
    fetchedDataGetUser.value = await fetchGetDataUser(usernamelog);
  } catch (err) {
    errorMessage.value = err.response ? err.response.data : 'Error fetching user data.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    CalUserDataApi();
  }
});

const setDataNewPassword = async (currentPassword, newPassword) => {
  errorMessage.value = '';
  try {
    if (!userData.value || !userData.value.username) {
      throw new Error('Username is missing.');
    }

    const username = userData.value.username; 
    const response = await setPasswordStateAPI(username, currentPassword, newPassword);
    console.log(response); 
    
    Swal.fire({
      title: 'Success!',
      text: "Your password has been reset successfully.",
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
       emit('close');
      showModalResetPassword.value = false; 
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  
  } catch (error) {
    console.error('ERROR STATE:', error);
    Swal.fire({
      title: 'Data saving was unsuccessful.',
      text: "Please verify the information.",
      icon: 'error',
      confirmButtonText: 'OK',
    });
    setTimeout(() => {
        location.reload();
      }, 1000);
    errorMessage.value = error.message || 'Invalid password';
  }
};
</script>

<template>
 <main class="mt-0 main-content">

  <button hidden @click="handleLogout">Logout</button>
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
                      @click.prevent="CheckPermissions('DASHBORD')">
                        <i class="fas fa-chart-line"></i> 
                        <span class="text-span-menu">Dashboard</span>
                        </div>
                   
                    
                    <div @click.prevent="CheckPermissions('REPORT')" class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 menu-button" >
                      <i class="ni ni-chart-bar-32"></i>
                      <span class="text-span-menu">Report</span>
                    </div>
                    <div @click.prevent="CheckPermissions('UPLOAD')"  class="col-xl-3 col-lg-3 col-md-3  col-sm-12 col-12 menu-button">
                      <i class="ni ni-spaceship"></i>
                      <span class="text-span-menu">Upload</span>
                    </div>
                    <div @click.prevent="CheckPermissions('USER')" class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 menu-button">
                      <i class="fas fa-user"></i> 
                      <span class="text-span-menu">User</span>
                    </div>
                  </div>

                  <ModalResetPassword 
                    v-if="showModalResetPassword" 
                    :isVisible="showModalResetPassword" 
                    :isLoading="isLoading" 
                    @close="showModalResetPassword = false" 
                    :setDataNewPassword="setDataNewPassword"
                    
                />

                  <button hidden @click="openModal"  class="btn btn-primary mt-4">Reset Password</button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   
    <div v-if="userData" hidden>
      <p><strong>ชื่อ:</strong> {{ userData.name }}</p>
      <p><strong>user:</strong> {{ userData.username }}</p>
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
      <p> nodata . </p>
    </div>
  </main>

  <pre hidden> {{ fetchedDataGetUser  }}</pre>

</template>

<style scoped>

.modal {
  display: none; 
  opacity: 0; 
  transition: opacity 0.5s ease; 
}


.modal.show {
  display: block;
  opacity: 1; 
}
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
