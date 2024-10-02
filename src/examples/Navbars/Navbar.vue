<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Breadcrumbs from "../Breadcrumbs.vue";

const showMenu = ref(false);
const store = useStore();
const isRTL = computed(() => store.state.isRTL);

const route = useRoute();

const currentRouteName = computed(() => {
  return route.name;
});
const currentDirectory = computed(() => {
  let dir = route.path.split("/")[1];
  return dir.charAt(0).toUpperCase() + dir.slice(1);
});

// const minimizeSidebar = () => store.commit("sidebarMinimize");
// const toggleConfigurator = () => store.commit("toggleConfigurator");

// const closeMenu = () => {
//   setTimeout(() => {
//     showMenu.value = false;
//   }, 100);
// };
</script>
<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="isRTL ? 'top-0 position-sticky z-index-sticky' : ''"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs
        :current-page="currentRouteName"
        :current-directory="currentDirectory"
      />

      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <div class="input-group">
         
          
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
           
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
        
           
          </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <!-- <a class="p-0 nav-link text-white" @click="toggleConfigurator">
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a> -->
          </li>
          <li
            class="nav-item dropdown d-flex align-items-center"
            :class="isRTL ? 'ps-2' : 'pe-2'"
          >
           
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2">
              
              </li>
            
            
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
