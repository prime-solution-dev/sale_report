import { createStore } from "vuex";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    user: null,
    isAuthenticated: false,
    activeModules: [],
  },
  mutations: {
    SET_ACTIVE_MODULES(state, modules) {
      state.activeModules = modules;
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    SET_USER(state, user) {
      state.user = user; // เก็บข้อมูลผู้ใช้
      state.isAuthenticated = true; // เปลี่ยนสถานะเป็นล็อกอิน
    },
    RESET_STATE(state) {
      
      Object.assign(state, {
        // กำหนดค่าreset
        user: null,
        isAuthenticated: false,
        // addother
      });
    },
    sidebarMinimize(state) {
      let sidenav_show = document.querySelector("#app");
      if (state.isPinned) {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav_show.classList.remove("g-sidenav-hidden");
        state.isPinned = true;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    login({ commit }, userData) {
      commit('SET_USER', userData); // เรียกใช้ mutation เพื่อบันทึกข้อมูลผู้ใช้
    },
    logout({ commit }) {
      commit('LOGOUT'); // เรียกใช้ mutation เพื่อล็อกเอาต์
    },
  },
  getters: {},
});
