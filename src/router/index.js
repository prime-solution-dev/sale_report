import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import ReportCustomers from "../views/ReportCustomerGroups.vue";
import ReportKeyAccountGroups from "../views/ReportKeyAccountGroups.vue";
import ReportActaulSales from "../views/ReportActaulSales.vue";

import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
