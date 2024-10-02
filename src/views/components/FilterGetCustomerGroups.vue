
<style>
  .dropdown_cus_group {
    position: relative;
  }
  .dropdown-menu_cus_group {
    display: block;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    z-index: 1000;
}
  
  </style>
<template>
<div class="form-group">
<label for="cus_groupSelect">Customer</label>
<div class="dropdown_cus_group">
    <button  class="btn btn-dropdown dropdown-toggle"  type="button"  id="dropdownSelectCustomerGroups" @click.stop="ToggleSelectGetCustomerGroups">
    {{ selectedGetCustomerGroups.length ? truncateText(selectedGetCustomerGroups.join(', '), 2) : 'Select Customer' }}
    </button>
    <div class="dropdown-menu_cus_group" v-if="isDropdownOpenAcc">
        <!-- ตัวเลือก Select All -->
    <label for="select-all" class="dropdown-item">
        <input  type="checkbox"  id="select-all" :checked="isAllSelectedGetCustomerGroups"  @change="toggleSelectAllGroup" />  All
    </label>
    <div v-for="(cus_group, index) in GetCustomerGroups" :key="index">
        <label :for="'cus_group-' + index" class="dropdown-item">
        <input 
            type="checkbox" 
            :id="'cus_group-' + index" 
            :name="'cus_group[]'" 
            :value="cus_group.code" 
            v-model="selectedCustomerGroupsIDs" 
            @change="updateSelectedGetCustomerGroups" 
        />
        {{ cus_group.code }}
        </label>
    </div>
    </div>
</div>
</div>
</template>
<script>
 import {  fetchGetCustomerGroups } from '../../services/reportapi/getdataApi';
export default {
 
 
  data() {
   
    return {
     
      GetCustomerGroups: [],
      selectedCustomerGroupsIDs: [],
      isDropdownOpenAcc: false,
      //
     
      error: null,
      loading: false,
      
    };
  },
  methods: {
  
    async fetchData() {
      this.loading = true;
      this.error = null;
    //  const chanelid = this.selectedGetCustomerGroups;
      try {
        this.GetCustomerGroups = await fetchGetCustomerGroups();
        
      } catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
    ToggleSelectGetCustomerGroups() {
      this.isDropdownOpenAcc = !this.isDropdownOpenAcc;
    },
    updateSelectedGetCustomerGroups() {
      this.$emit('update:customergroups', this.selectedCustomerGroupsIDs); // ส่งค่า selectedCustomerGroupsIDs ไปยังคอมโพเนนต์หลัก
    },
    toggleSelectAllGroup(event) {
      this.selectedCustomerGroupsIDs = event.target.checked ? this.GetCustomerGroups.map(cus_group => cus_group.code) : [];
      this.updateSelectedGetCustomerGroups(); // อัปเดตค่าหลังจากเลือกหรือยกเลิกการเลือกทั้งหมด
    },
   
   
    truncateText(text, colCount) {
      const maxLength = colCount * 10; // ปรับขนาดตามความกว้างของคอลัมน์
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    closeDropdownGetCustomerGroups(event) {
        if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_cus_group')) {
          this.isDropdownOpenAcc = false;
        }
      }
      
  },
  computed: {
  
    ///dropdown cus_groups
    selectedGetCustomerGroups() {
      return this.selectedCustomerGroupsIDs;
    },
    isAllSelectedGetCustomerGroups() {
      return this.selectedCustomerGroupsIDs.length === this.GetCustomerGroups.length;
    }
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
   document.addEventListener('click', this.closeDropdownGetCustomerGroups);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownGetCustomerGroups);
  }
  
};


</script>
