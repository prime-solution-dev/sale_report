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

// export default {
//   data() {
//     return {
//       summary: null,
//       error: null,
//       loading: false
//     };
//   },
//   methods: {
//     async fetchSalesSummary() {
//       this.loading = true;
//       this.error = null;  //

//       const url = 'http://61.91.5.227:8099/Authen/Login';
//       const body = {
//         "user": "supachai",
//         "password": "ABC"
      
//       };

//       try {
//         const response = await axios.post(url, body, {
//           headers: {
//             //'Authorization': token,
//             'Content-Type': 'application/json',
//           }
//         });
//         this.summary = response.data;
//       } catch (error) {
//         this.error = error.response ? error.response.data : 'An error occurred';
//         console.error(this.error);
//       } finally {
//         this.loading = false; // Reset loading state
//       }
//     }
//   }
//};
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


// export async function getSalesTargets() {
//   const https = "http://61.91.5.227:8099";
//   const url = https+'/Sales/GetSummarySalesTargets';

//   const userToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY2Nzg2NTc2MTAsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.cVx1DXdDpf3uL4eb_Mig8KzvdioCPB1Pk1mpn-TzgE4";

//   const authStr = "Bearer ".concat(userToken);

//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: authStr,
//       'Content-Type': 'application/json',
//     },
//     url: url,
//     body : {
//         year: 2024,
//         month: 8,
//         brands: ['brand01', 'brand02', 'brand05'],
//         customers: ['cust01', 'cust02', 'cust05'],
//         store_types: [],
//         channels: [],
//         account_groups: [],
//         account_names: []
//       }
//   };
// console.log(options);


//   const response = await axios(options)
//     // this returns undefined (response) => console.log()
    
//     .catch((error) => console.log(error.toJSON()));

//   const fetchedSalesTargets = response;
//   console.log(
//     "",
//     fetchedSalesTargets
//   );

//   return fetchedSalesTargets; 
//   }
</script>
<!-- <script>
//  export default {
//   data() {
//     return {
//       responseData: null,
//       errorMessage: ''
//     };
//   },
//   methods: {
//     fetchData() {
//       const url = 'http://61.91.5.227:8099';
//       const body = {
//         year: 2024,
//         month: 8,
//         brands: ['brand01', 'brand02', 'brand05'],
//         customers: ['cust01', 'cust02', 'cust05'],
//         store_types: [],
//         channels: [],
//         account_groups: [],
//         account_names: []
       
//       };
//       const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg2NTc2MTAsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.cVx1DXdDpf3uL4eb_Mig8KzvdioCPB1Pk1mpn-TzgE4'; // Replace with your actual token

//       console.log('Making POST request to:', url);

//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Bearer ' + authToken,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//       })
//       .then(response => {
//         console.log('Response Status:', response.status);
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error('Network response was not ok.');
//         }
//       })
//       .then(data => {
//         console.log('Response Data:', data);
//         this.responseData = data;
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         this.errorMessage = 'There was an error fetching the data.';
//       });
//     }
//   },
//   mounted() {
//     this.fetchData();
//   }
// };

</script> -->
<style scoped>
/* Add your styles here */
</style>
