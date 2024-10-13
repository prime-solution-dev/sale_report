
<style>
  .dropdown_accountname {
    position: relative;
  }</style>
<template>
<div class="form-group">
<label for="accountnameSelect">Key account Name</label>
<div class="dropdown_accountname">
    <button  class="btn btn-dropdown dropdown-toggle"  type="button"  id="dropdownSelectAccountName" @click.stop="ToggleSelectAccountName">
    {{ selectedAccountName.length ? truncateText(selectedAccountName.join(', '), 2) : 'Select Account Name' }}
    </button>
    <div class="dropdown-menu_accountname" v-if="isDropdownOpenAccountName">
        <!-- ตัวเลือก Select All -->
    <label for="select-all" class="dropdown-item">
        <input  type="checkbox"  id="select-all" :checked="isAllSelectedAccountName"  @change="toggleSelectAllName" />  All
    </label>
    <div v-for="(accountname, index) in GetAccountName" :key="index">
        <label :for="'accountname-' + index" class="dropdown-item">
        <input 
            type="checkbox" 
            :id="'accountname-' + index" 
            :name="'accountname[]'" 
            :value="accountname.code" 
            v-model="selectedAccountNameIDs" 
            @change="updateSelectedKeyAccountName" 
        />
        {{ accountname.code }}
        </label>
    </div>
    </div>
</div>
</div>
</template>
<script>
 import {  fetchAccountName } from '../../services/reportapi/getdataApi';
export default {
 
 
  data() {
   
    return {
     
      GetAccountName: [],
      selectedAccountNameIDs: [],
      isDropdownOpenAccountName: false,
      //
     
      error: null,
      loading: false,
      
    };
  },
  methods: {
  
    async fetchData() {
      this.loading = true;
      this.error = null;
    //  const chanelid = this.selectedAccountName;
      try {
        this.GetAccountName = await fetchAccountName();
        
      } catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
    ToggleSelectAccountName() {
      this.isDropdownOpenAccountName = !this.isDropdownOpenAccountName;
    },
    updateSelectedKeyAccountName() {
      this.$emit('update:accountnames', this.selectedAccountNameIDs); // ส่งค่า selectedAccountNameIDs ไปยังคอมโพเนนต์หลัก
    },
    toggleSelectAllName(event) {
      this.selectedAccountNameIDs = event.target.checked ? this.GetAccountName.map(accountname => accountname.code) : [];
      this.updateSelectedKeyAccountName(); // อัปเดตค่าหลังจากเลือกหรือยกเลิกการเลือกทั้งหมด
    },
   
   
    truncateText(text, colCount) {
      const maxLength = colCount * 10; // ปรับขนาดตามความกว้างของคอลัมน์
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    closeDropdownAccountName(event) {
        if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_accountname')) {
          this.isDropdownOpenAccountName = false;
        }
      }
      
  },
  computed: {
  
    selectedAccountName() {
      return this.selectedAccountNameIDs;
    },
    isAllSelectedAccountName() {
      return this.selectedAccountNameIDs.length === this.GetAccountName.length;
    }
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
   document.addEventListener('click', this.closeDropdownAccountName);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownAccountName);
  }
  
};


</script>
