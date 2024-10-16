<script setup>
import { computed, ref ,onMounted ,onBeforeMount } from "vue";

import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { fetchGetDataUser } from '../../services/reportapi/state.userApi';
import SidenavItem from "./SidenavItem.vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);
const userData = ref(null);
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

///// STATE USER
const fetchedDataGetUser = ref(null);
const isLoading = ref(false);
const errorMessage = ref('');
const activeModules = ref([]);

const CalUserDataApi = async () => {
  if (!userData.value || !userData.value.username) {
    errorMessage.value = 'Username is missing.';
    return; 
  }
  
  const usernamelog = userData.value.username;
  isLoading.value = true;
  
  try {
    fetchedDataGetUser.value = await fetchGetDataUser(usernamelog);
    //console.log('Fetched data:', fetchedDataGetUser.value); 

   if (fetchedDataGetUser.value && fetchedDataGetUser.value.length > 0) {
      const user = fetchedDataGetUser.value[0]; // เข้าถึงอ็อบเจ็กต์แรก
      if (user.permission_groups) {
        activeModules.value = user.permission_groups.flatMap(group => 
          group.permission_items.map(item => ({
            module_item_code: item.module_item_code,
            module_item_name: item.module_item_name
          }))
        );
         // Commit activeModules ไปยัง Vuex store
        store.commit('SET_ACTIVE_MODULES', activeModules.value);
        console.log('Updated Active Modules:', activeModules.value);
      }
    }

   

  } catch (err) {
    errorMessage.value = err.response ? err.response.data : 'Error fetching user data.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const token = localStorage.getItem('userData');
  if (token) {
    CalUserDataApi();
  }
});


onBeforeMount(() => {
 
  fetchUserDataFromLocalStorage();
});


const fetchUserDataFromLocalStorage = () => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    userData.value = JSON.parse(storedData);
   // console.log('Local Storage  : ', userData.value); //
  } else {
    userData.value = null; 
  }
};

//////////


// const activeModules = ref([
//   { module_item_code: 'HOME', module_item_name: 'Home' },
//   { module_item_code: 'REPORT01', module_item_name: 'Report 01' },
//   { module_item_code: 'REPORT02', module_item_name: 'Report 02' },
// 
// ]);

const hasModule = (moduleCode) => {
  console.log('Side nav Checking module:', moduleCode);
  return activeModules.value.some(module => module.module_item_code === moduleCode);
  
};


</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item" v-if="hasModule('Dashbord')">
        <sidenav-item
          to="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="isRTL ? '' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="fas fa-chart-line" style="font-size: 18px; color:#0281cc;bottom: auto;top: auto;"></i> 
            <!-- <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i> -->
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item"  @click="toggleSubmenu('report')">
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
        <li class="nav-item submenu" v-if="hasModule('Report_CustomerName')">
          <sidenav-item
            to="/report-customer.groups"
            :class="getRoute() === 'report-customer.groups' ? 'active' : ''"
            :navText="isRTL ? '' : 'Daily Sales by Customer Group'"
          >
            <template v-slot:icon>
              <i class="ni ni-chart-bar-32  text-info text-sm opacity-10"></i>
          
            </template>
          </sidenav-item>
        </li>
        <li class="nav-item submenu" v-if="hasModule('Report_KeyaccountGroup')">
          <sidenav-item
            to="/report-keyaccount.groups"
            :class="getRoute() === 'report-keyaccount.groups' ? 'active' : ''"
            :navText="isRTL ? '' : 'Daily Sales by KeyAccount Group'"
          >
            <template v-slot:icon>
              <i class="ni ni-chart-bar-32  text-info text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>

        <li class="nav-item submenu" v-if="hasModule('Report_ActualSales')">
          <sidenav-item
            to="/report-actaulsales"
            :class="getRoute() === 'report-actaulsales' ? 'active' : ''"
            :navText="isRTL ? '' : 'Actual Sales'"
          >
            <template v-slot:icon>
              <i class="ni ni-chart-bar-32  text-info text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>

        <li class="nav-item submenu" v-if="hasModule('Report_Template')">
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
      
      <li class="nav-item" v-if="hasModule('Upload')">
        <sidenav-item
          to="/upload"
          :class="getRoute() === '' ? 'active' : ''"
          :navText="isRTL ? 'ر' : 'Upload'"
        >
          <template v-slot:icon>
            <i class="ni ni-spaceship " style="font-size: 18px; color:#0281cc; bottom: auto;top: auto;" ></i>
            <!-- <i class="ni ni-credit-card text-success text-sm opacity-10"></i> -->
          </template>
        </sidenav-item>
      </li>

    

      <li class="nav-item" v-if="hasModule('User')">
        <sidenav-item
          to="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="isRTL ? '' : 'User'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 opacity-10" style="font-size: 18px; color:#0281cc; bottom: auto;top: auto;"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item " >
        <sidenav-item
         to="/logout"
          :class="getRoute() === 'logout' ? 'active' : ''"
          :navText="isRTL ? '' : 'Logout'"
        >
          <template v-slot:icon>
            <i class="fa fa-sign-out opacity-10" style="font-size: 16px;color: red; bottom: auto;top: auto;" aria-hidden="true"></i>
            
          </template>
        </sidenav-item>
      </li>

    
    </ul>
  </div>

  <div hidden style="font-size: 9px;"> 
    <pre> {{ fetchedDataGetUser  }}</pre> 
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
  font-size: 0.8rem;
}
.sub-icon{
  color:#007bff; 
  text-align: right;
  margin-left: 8rem;
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