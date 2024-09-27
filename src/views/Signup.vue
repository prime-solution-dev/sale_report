<script setup>
import { onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";

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
  <div>
    <h1>SalesTargets </h1>
    <button @click="fetchSalesSummary">Fetch SalesTargets</button>
    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: red;">Error: {{ error }}</div>
    <pre v-if="summary">{{ summary }}</pre>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      summary: null,
      error: null,
      loading: false
    };
  },
  methods: {
    async fetchSalesSummary() {
      this.loading = true;
      this.error = null;  //

      const url = 'http://61.91.5.227:8099/Sales/GetSummarySalesTargets';
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4';

      const body = {
        year: 2024,
        month: 9,
        brands: [],
        customers: ['LMT', 'WATSONS'],
        store_types: [],
        channels: [],
        account_groups: [],
        account_names: []
      };

      try {
        const response = await axios.post(url, body, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          }
        });
        this.summary = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data : 'An error occurred';
        console.error(this.error);
      } finally {
        this.loading = false; // Reset loading state
      }
    }
  }
};

</script> 

