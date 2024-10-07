<script setup>
import { computed, ref } from "vue";
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

const submenuOpen = ref({
  report: false,
});

const toggleSubmenu = (menu) => {
  submenuOpen.value[menu] = !submenuOpen.value[menu];
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
          :navText="isRTL ? '' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item" @click="toggleSubmenu('report')">
      <sidenav-item
  to="/report"
  :navText="isRTL ? '' : ''"
  :class="['navmain', (getRoute() === 'report-customer.groups' || getRoute() === 'report-keyaccount.groups' || getRoute() === 'report-actaulsales') ? 'active' : '']"
>
          <template v-slot:icon >
            <div class="div-flex">
              <div class="div-flex-sub" >
                <div class="icon-active">
                  <i class="ni ni-chart-bar-32 text-white text-sm opacity-10"></i>
                </div>
                <span class="span-text-menu">Report</span> 
              </div>
              <i :class="submenuOpen.report ? 'ni ni-bold-down' : 'ni ni-bold-right'" class="sub-icon"></i>
            </div>
          </template>
        </sidenav-item>
      </li>

      <ul class="navbar-nav" v-if="submenuOpen.report">
        <li class="nav-item submenu" >
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
        <li class="nav-item submenu">
          <sidenav-item
            to="/report-keyaccount.groups"
            :class="getRoute() === 'report-keyaccount.groups' ? 'active' : ''"
            :navText="isRTL ? '' : 'Key Account Group '"
          >
            <template v-slot:icon>
              <i class="ni ni-chart-bar-32  text-info text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        
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

        <li class="nav-item submenu">
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

        <li class="nav-item submenu">
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
      </ul> 
      
      <li class="nav-item">
        <sidenav-item
          to="/upload"
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
<style scoped>

.navbar-nav .nav-item.active {
  background-color: #007bff; 
  color: white; 
}

.submenu {
  list-style-type: none; 
  padding-left: 5px; 
}
.sub-icon{
  color:#007bff; 
  text-align: right;
  margin-left: 5rem;
}
.div-flex{
  display: flex; 
  align-items: center;
   justify-content: space-between; 
   width: 100%;
}
.div-flex-sub{
  display: flex; 
  align-items: center;
}
.icon-active{
  background-color: rgb(183, 228, 255);
   padding: 4px 10px; 
   border-radius: 11px;
}
.span-text-menu{
  margin-left: 5px;

}

</style>