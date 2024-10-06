
<style>
  .dropdown_group_oms {
    position: relative;
  }
  .dropdown-menu_group_oms {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
}

  </style>
<template>
<div class="form-group">
<label for="group_omsSelect">Customer Group  Form OMS : </label>
<div class="dropdown_group_oms">
    <button  class="btn btn-dropdown dropdown-toggle"  type="button"  id="dropdownSelectGroupOms" @click.stop="ToggleSelectGroupOms">
    {{ selectedGroupOms.length ? truncateText(selectedGroupOms.join(', '), 2) : 'Select GroupOms' }}
    </button>
    <div class="dropdown-menu_group_oms" v-if="isDropdownOpen">
        <!-- ตัวเลือก Select All -->
    <label for="select-all" class="dropdown-item">
        <input  type="checkbox"  id="select-all" :checked="isAllSelected"  @change="toggleSelectAll" />  All
    </label>
    <div v-for="(group_oms, index) in GetGroupOms" :key="index">
        <label :for="'group_oms-' + index" class="dropdown-item">
        <input 
            type="checkbox" 
            :id="'group_oms-' + index" 
            :name="'group_oms[]'" 
            :value="group_oms.code" 
            v-model="selectedGroupOmsIDs" 
            @change="updateSelectedGroupOms" 
        />
        {{ group_oms.code }}
        </label>
    </div>
    </div>
</div>
</div>
</template>
<script>
 import {  fetchGetGroupOms } from '../../services/reportapi/getdataApi';
export default {
 
 
  data() {
   
    return {
     

      //GetGroupOms: null,
      GetGroupOms: [],
      selectedGroupOmsIDs: [],
      isDropdownOpen: false,
      //
     
      error: null,
      loading: false,
      
    };
  },
  methods: {
  
    async fetchData() {
      this.loading = true;
      this.error = null;
    //  const chanelid = this.selectedGroupOms;
      try {
        this.GetGroupOms = await fetchGetGroupOms();
        
        
      } catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
    ToggleSelectGroupOms() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
   
    updateSelectedGroupOms() {
      this.$emit('update:group_omss', this.selectedGroupOmsIDs); // ส่งค่า selectedGroupOmsIDs ไปยังคอมโพเนนต์หลัก
     
    },
    

    toggleSelectAll(event) {
      this.selectedGroupOmsIDs = event.target.checked ? this.GetGroupOms.map(group_oms => group_oms.code) : [];
      
      this.updateSelectedGroupOms(); // อัปเดตค่าหลังจากเลือกหรือยกเลิกการเลือกทั้งหมด
    },
   
   
    truncateText(text, colCount) {
      const maxLength = colCount * 10; // ปรับขนาดตามความกว้างของคอลัมน์
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    closeDropdownGroupOms(event) {
        if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_group_oms')) {
          this.isDropdownOpen = false;
        }
      }
      
  },
  computed: {
  
    ///dropdown group_omss
    selectedGroupOms() {
      return this.selectedGroupOmsIDs;
    },
    isAllSelected() {
      return this.selectedGroupOmsIDs.length === this.GetGroupOms.length;
    }
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
   document.addEventListener('click', this.closeDropdownGroupOms);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownGroupOms);
  }
  
};


</script>
