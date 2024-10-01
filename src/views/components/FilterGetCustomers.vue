
<style>
  .dropdown_acgroup {
    position: relative;
  }</style>
<template>
<div class="form-group">
<label for="acgroupSelect">Key account group</label>
<div class="dropdown_acgroup">
    <button  class="btn btn-dropdown dropdown-toggle"  type="button"  id="dropdownSelectAccountGroup" @click.stop="ToggleSelectAcGroup">
    {{ selectedAcGroups.length ? truncateText(selectedAcGroups.join(', '), 2) : 'Select AcGroup' }}
    </button>
    <div class="dropdown-menu_acgroup" v-if="isDropdownOpenAcc">
        <!-- ตัวเลือก Select All -->
    <label for="select-all" class="dropdown-item">
        <input  type="checkbox"  id="select-all" :checked="isAllSelectedAcGroup"  @change="toggleSelectAllGroup" />  All
    </label>
    <div v-for="(acgroup, index) in GetAccountGroup" :key="index">
        <label :for="'acgroup-' + index" class="dropdown-item">
        <input 
            type="checkbox" 
            :id="'acgroup-' + index" 
            :name="'acgroup[]'" 
            :value="acgroup.code" 
            v-model="selectedAccountGroupIDs" 
            @change="updateSelectedKeyAccountGroup" 
        />
        {{ acgroup.code }}
        </label>
    </div>
    </div>
</div>
</div>
</template>
<script>
 import {  fetchAccountGroup } from '../../services/reportapi/getdataApi';
export default {
 
 
  data() {
   
    return {
     
      GetAccountGroup: [],
      selectedAccountGroupIDs: [],
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
    //  const chanelid = this.selectedAcGroup;
      try {
        this.GetAccountGroup = await fetchAccountGroup();
        
      } catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
    ToggleSelectAcGroup() {
      this.isDropdownOpenAcc = !this.isDropdownOpenAcc;
    },
    updateSelectedKeyAccountGroup() {
      this.$emit('update:accgroups', this.selectedAccountGroupIDs); // ส่งค่า selectedAccountGroupIDs ไปยังคอมโพเนนต์หลัก
    },
    toggleSelectAllGroup(event) {
      this.selectedAccountGroupIDs = event.target.checked ? this.GetAccountGroup.map(acgroup => acgroup.code) : [];
      this.updateSelectedKeyAccountGroup(); // อัปเดตค่าหลังจากเลือกหรือยกเลิกการเลือกทั้งหมด
    },
   
   
    truncateText(text, colCount) {
      const maxLength = colCount * 10; // ปรับขนาดตามความกว้างของคอลัมน์
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    closeDropdownAcGroup(event) {
        if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_acgroup')) {
          this.isDropdownOpenAcc = false;
        }
      }
      
  },
  computed: {
  
    ///dropdown acgroups
    selectedAcGroups() {
      return this.selectedAccountGroupIDs;
    },
    isAllSelectedAcGroup() {
      return this.selectedAccountGroupIDs.length === this.GetAccountGroup.length;
    }
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
   document.addEventListener('click', this.closeDropdownAcGroup);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownAcGroup);
  }
  
};


</script>
