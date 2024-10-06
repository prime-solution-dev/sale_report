<script setup>
import { onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import background_login from "@/assets/img/bg-loginpage.png";
const body = document.getElementsByTagName("body")[0];

const store = useStore();
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
                  <form role="form">
                    <div class="mb-4">
                      <label class="fs-6 fw-normal"> Email address: </label>
                      <argon-input
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="lg"
                      />
                    </div>
                    <div class="">
                      <label class="fs-6 fw-normal"> Password : </label>
                      <argon-input
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                      />
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Remember Password
                      </label>
                    </div>

                    <div class="text-center mb-5">
                      <argon-button
                        class="mt-4"
                       
                        style="background-color:#4880FF;color:white;"
                        fullWidth
                        size="lg"
                        >Sign in</argon-button
                      >
                    </div>
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
