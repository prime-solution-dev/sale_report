

<script setup>
import { onBeforeUnmount, onBeforeMount, onMounted ,ref } from "vue";
import { AuthenLogoutUser} from '../services/reportapi/state.userApi';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import "../../src/assets/css/stlyeSwalAlert.css";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const userData = ref(null);
const errorMessage = ref('');

onBeforeMount(() => {
 
  fetchUserDataFromLocalStorage();
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

const fetchUserDataFromLocalStorage = () => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    userData.value = JSON.parse(storedData);
  } else {
    userData.value = null; 
  }
};

const router = useRouter(); 
// const handleLogout = () => {
//   localStorage.clear();
//   store.commit('RESET_STATE');
//   router.push('/Signin');
// };

onMounted(() => {
  SignOutData();
});

const SignOutData = async () => {
  errorMessage.value = '';
  try {
    if (!userData.value || !userData.value.username) {
      throw new Error('Username is missing.');
    }

    const username = userData.value.username; 
    const response = await AuthenLogoutUser(username);
    console.log(response); 

    localStorage.clear();
    store.commit('RESET_STATE');
    router.push('/Signin');
    
    // Swal.fire({
    //   title: 'Success!',
    //   text: "Your password has been reset successfully.",
    //   icon: 'success',
    //   confirmButtonText: 'OK',
    // }).then(() => {
    //    emit('close');
    //   setTimeout(() => {
    //     location.reload();
    //   }, 1000);
    // });
  
  } catch (error) {
    console.error('ERROR STATE:', error);
  
    setTimeout(() => {
        location.reload();
      }, 1000);
    errorMessage.value = error.message || 'Invalid password';
  }
};
</script>

<template>
  <div>

    <!-- <pre hidden> {{ fetchedDataGetUser  }}</pre>  -->
  </div>
 

  

</template>


