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
  },
  mutations: {
    
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    SET_USER(state, user) {
      state.user = user; // เก็บข้อมูลผู้ใช้
      state.isAuthenticated = true; // เปลี่ยนสถานะเป็นล็อกอิน
    },
    RESET_STATE(state) {
      // รีเซ็ตสถานะของ store กลับไปเป็นค่าดีฟอลต์
      Object.assign(state, {
        // กำหนดค่าที่คุณต้องการรีเซ็ต เช่น:
        user: null,
        isAuthenticated: false,
        // คุณสามารถเพิ่มข้อมูลอื่น ๆ ที่ต้องการรีเซ็ตที่นี่
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
