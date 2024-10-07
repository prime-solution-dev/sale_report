<script setup>
import { onBeforeUnmount, onBeforeMount, nextTick , ref } from "vue";
import { useStore } from "vuex";
import ModalResetPassword from '/src/views/components/ModalResetPassword'; // นำเข้า Modal
import "../../src/assets/css/styleMainpage.css";
import background_paper from "@/assets/img/background-paper.png";



const body = document.getElementsByTagName("body")[0];
const store = useStore();
const day_now = ref('');


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
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

// กำหนด showModal เป็น ref
const showModal = ref(false);

// ฟังก์ชันเปิด modal
const openModal = () => {
  showModal.value = true;
  nextTick(() => {
    const modalContent = document.querySelector('.modal-content');
    const modalOverlay = document.querySelector('.modal-overlay');

    modalContent.classList.add('show');
    modalOverlay.classList.add('show');
  });
};



</script>

<template>
 <main class="mt-0 main-content">
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
                      <router-link to="/dashboard-default" class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 menu-button">
                        <i class="fas fa-chart-line"></i> 
                        <span class="text-span-menu">Dashboard</span>
                      </router-link>
                   
                    
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
                  <button @click="openModal" class="btn btn-primary mt-4">Reset Password</button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
  <main class="mt-0 main-content">
    <ModalResetPassword :isVisible="showModal" @close="showModal = false">
      <!-- <h2>Modal Title</h2>
      <p>This is the content of the modal.</p> -->
    </ModalResetPassword>
  </main>

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
