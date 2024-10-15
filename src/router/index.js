import { createRouter, createWebHistory } from "vue-router";
import store from '../store';
import Dashboard from "../views/Dashboard.vue";
import ReportCustomers from "../views/ReportCustomerGroups.vue";
import ReportKeyAccountGroups from "../views/ReportKeyAccountGroups.vue";
import ReportActaulSales from "../views/ReportActaulSales.vue";

import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Upload from "../views/Upload.vue";
import Template from "../views/Template.vue";
import MainMenu from "../views/Main.vue";
import MenuReport from "../views/Report.vue";

import UnauthorizedComponent from "../views/UnauthorizedComponent.vue";
import Logout from "../views/Logout.vue";


const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/report-customer.groups",
    name: "report-customer",
    component: ReportCustomers,
  },
  {
    path: "/report-keyaccount.groups",
    name: "report-keyaccount.group",
    component: ReportKeyAccountGroups,
  },
  {
    path: "/report-actaulsales",
    name: "report-actualsales",
    component: ReportActaulSales,
  },
  {
    path: "/report-template",
    name: "report-template",
    component: Template,
  },
  
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "/main",
    name: "Main",
    component: MainMenu,
  },
  {
    path: "/report",
    name: "Report",
    component: MenuReport,
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: UnauthorizedComponent,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});


// Navigation guard
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem('userData'); // ตรวจสอบ token
//   const activeModules = store.state.activeModules || []; // เริ่มต้นเป็น array ถ้าไม่มี
//   console.log('User authenticated:', isAuthenticated);
//   console.log('Active Modules:', activeModules);
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     return next({ path: '/signin' }); // เปลี่ยนเส้นทางไปยังหน้า Signin
//   }

//   if (to.meta.requiredModules) {
//     const hasAccess = to.meta.requiredModules.every(module =>
//       activeModules.some(activeModule => activeModule.module_item_code === module)
//     );

//     if (!hasAccess) {
//       return next({ path: '/unauthorized' }); // เปลี่ยนเส้นทางไปยังหน้า Unauthorized
//     }
//   }

//   next();
// });

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('userData'); // ตรวจสอบ token
//   const isAuthenticated = !!token; // ตรวจสอบว่า user authenticated หรือไม่
//   const activeModules = store.state.activeModules || []; // เริ่มต้นเป็น array ถ้าไม่มี

//   console.log('User authenticated:', isAuthenticated);
//   console.log('Active Modules:', activeModules);

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     return next({ path: '/signin' }); // เปลี่ยนเส้นทางไปยังหน้า Signin
//   }

//   if (to.meta.requiredModules) {
//     const hasAccess = to.meta.requiredModules.every(module =>
//       activeModules.some(activeModule => activeModule.module_item_code === module)
//     );

//     if (!hasAccess) {
//       console.log(`Access denied for modules: ${to.meta.requiredModules}`);
//       return next({ path: '/unauthorized' }); // เปลี่ยนเส้นทางไปยังหน้า Unauthorized
//     }
//   }

//   next();
// });

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('userData'); // ตรวจสอบ token
  const activeModules = store.state.activeModules || []; // เริ่มต้นเป็น array ถ้าไม่มี
  console.log('index.js User authenticated:', isAuthenticated);
  console.log('index.js Active Modules:', activeModules);

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ path: '/signin' }); // เปลี่ยนเส้นทางไปยังหน้า Signin
  }

  // if (to.meta.requiredModules) {
  //   const hasAccess = to.meta.requiredModules.every(module =>
  //     activeModules.some(activeModule => activeModule.module_item_code === module)
  //   );

  //   if (!hasAccess) {
  //     return next({ path: '/unauthorized' }); // เปลี่ยนเส้นทางไปยังหน้า Unauthorized
  //   }
  // }

  if (to.meta.requiredModules) { // ตรวจสอบว่ามีค่าอยู่
    const hasAccess = to.meta.requiredModules.every(module => 
      activeModules.some(activeModule => activeModule.module_item_code === module)
    );
  
    if (!hasAccess) {
      console.log(`Access denied for modules: ${to.meta.requiredModules}`);
      return next({ path: '/unauthorized' });
    } else {
      console.log(`Access granted for modules: ${to.meta.requiredModules}`);
    }
  }
  

  next();
});



export default router;
