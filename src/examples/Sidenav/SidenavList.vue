<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import SidenavItem from "./SidenavItem.vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);

const getRoute = () => {
  const route = useRoute();
  const routeArr = route.path.split("/");
  return routeArr[1];
};
</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          to="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="isRTL ? ' لقيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          to=""
          :class="getRoute() === 'report-customer.groups' || getRoute() === 'report-keyaccount.groups' || getRoute() === 'report-actaulsales' ? 'active' : ''"
          :navText="isRTL ? '' : ' Report'"
        >
          <template v-slot:icon >
            <div style="background-color: rgb(183, 228, 255);
    padding: 6px 10px 5px 10px;
    border-radius: 11px;"><i class="ni ni-chart-bar-32  text-white text-sm opacity-10" ></i></div>
            
          </template>
        </sidenav-item>
      </li>

      
      <li class="nav-item">
        <sidenav-item
          to="/report-customer.groups"
          :class="getRoute() === 'report-customer.groups' ? 'active' : ''"
          :navText="isRTL ? '' : 'Customer Group Report'"
        >
          <template v-slot:icon>
            <i class="ni ni-chart-bar-32  text-info text-sm opacity-10"></i>
         
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          to="/report-keyaccount.groups"
          :class="getRoute() === 'report-keyaccount.groups' ? 'active' : ''"
          :navText="isRTL ? '' : 'KeyAccount Group Report'"
        >
          <template v-slot:icon>
            <i class="ni ni-chart-bar-32  text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
        <!-- Sub-navbar for Report -->
        <ul class="navbar-nav ms-3" v-if="getRoute() === 'tables'">
          <li class="nav-item">
            <sidenav-item
              to="/tables/template"
              :class="getRoute() === 'template' ? 'active' : ''"
              :navText="isRTL ? 'تقرير 1' : 'Template'"
            >
              <template v-slot:icon>
                <i class="ni ni-chart-bar-32 text-sm"></i>
              </template>
            </sidenav-item>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/report-actaulsales"
          :class="getRoute() === 'report-actaulsales' ? 'active' : ''"
          :navText="isRTL ? '' : 'ActaulSales Report'"
        >
          <template v-slot:icon>
            <i class="ni ni-chart-bar-32  text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/report-template"
          :class="getRoute() === 'report-template' ? 'active' : ''"
          :navText="isRTL ? '' : 'Template'"
        >
          <template v-slot:icon>
            <i class="ni ni-chart-bar-32  text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      
      
      <li class="nav-item">
        <sidenav-item
          to="/"
          :class="getRoute() === '' ? 'active' : ''"
          :navText="isRTL ? 'الفواتیر' : 'Upload'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

    

      <li class="nav-item">
        <sidenav-item
          to="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="isRTL ? '' : 'User'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item ">
        <sidenav-item
          to="/signin"
          :class="getRoute() === 'signin' ? 'active' : ''"
          :navText="isRTL ? '' : 'Sign In'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

    
    </ul>
  </div>

  
</template>
