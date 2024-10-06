<script setup>
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import "../../src/assets/css/styleMainpage.css";
import background_paper from "@/assets/img/background-paper.png";
import ResetPasswordModal from '/components/ModalResetPassword.vue';

const showModal = ref(false);

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
</script>

<template>
 
 <main class="mt-0 main-content" >

    <section  >
      <div class="page-header min-vh-100" :style="{ backgroundImage: 'url(' + background_paper + ')', backgroundSize: 'cover' }">
        <div class="container">
          <div class="row">
            <div class=" col-xl-12 col-lg-12 col-md-12 ">
              <div class="  mt-4 mb-4">
                <div class="pb-0  text-center">
                  <p class="font-weight-bolder text-welcome mb-0">  Welcome to Daily </p>
                  <p class="font-weight-bolder text-head mt-0 mb-0">  Sales Report</p>
                  <p class="mb-0 text-head-sub">  {{ day_now }}</p>
                </div>
              
              </div>
            </div>
       
          </div>
          <div class="row">
            <div class=" col-xl-12 col-lg-12 col-md-12 "  >
              <div class="mb-4">
              
                <div class="card-body">
                  <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-12 menu-button">
                      <i class="fas fa-chart-line"></i> 
                      <span class="text-span-menu">Dashboard</span>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-12 menu-button">
                      <i class="ni ni-chart-bar-32"></i>
                      <span class="text-span-menu ">Report</span>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-12 menu-button">
                      <i class="ni ni-spaceship"></i>
                      <span class="text-span-menu">Upload</span>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-12 menu-button">
                      <i class="fas fa-user"></i> 
                      <span class="text-span-menu">User</span>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
       
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>


</style>


<template>
  <div>
    <button @click="showModal = true">Reset Password</button>
    <ResetPasswordModal
      :isVisible="showModal"
      @onClose="showModal = false"
    />
  </div>
</template>