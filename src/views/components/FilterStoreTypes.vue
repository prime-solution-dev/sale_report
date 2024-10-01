
<style>
  .dropdown_storetypes {
    position: relative;
  }</style>
<template>
<div class="form-group">
<label for="storetypesSelect">Store Type</label>
<div class="dropdown_storetypes">
    <button  class="btn btn-dropdown dropdown-toggle"  type="button"  id="dropdownSelectStoreType" @click.stop="ToggleSelectStoreType">
    {{ selectedStoreType.length ? truncateText(selectedStoreType.join(', '), 2) : 'Select StoreType ' }}
    </button>
    <div class="dropdown-menu_storetype" v-if="isDropdownOpenStoreType">
        <!-- ตัวเลือก Select All -->
    <label for="select-all" class="dropdown-item">
        <input  type="checkbox"  id="select-all" :checked="isAllSelectedStoreType"  @change="toggleSelectAllStoreType" />  All
    </label>
    <div v-for="(storetypes, index) in GetStoreType" :key="index">
        <label :for="'storetypes-' + index" class="dropdown-item">
        <input 
            type="checkbox" 
            :id="'storetypes-' + index" 
            :name="'storetypes[]'" 
            :value="storetypes.code" 
            v-model="selectedStoreTypeIDs" 
            @change="updateSelectedStoreType" 
        />
        {{ storetypes.code }}
        </label>
    </div>
    </div>
</div>
</div>
</template>
<script>
 import {  fetchStoreType } from '../../services/reportapi/getdataApi';
export default {
 
  props: {
  selectedChannelIDs: {
    type: Array,
    default: () => [],
  },
},
watch: {
  selectedChannelIDs: {
    immediate: true,
    handler(newVal) {
      if (newVal.length) {
        this.fetchStoreType(newVal);
      } else {
        this.GetStoreType = []; // เคลียร์เมื่อไม่มีการเลือก channel
      }
    },
  },
},

  data() {
   
    return {
     
      GetStoreType: [],
      selectedStoreTypeIDs: [],
      isDropdownOpenStoreType: false,
      selectedChannel: null, // เก็บช่องที่เลือก
      //
     
      error: null,
      loading: false,
      
    };
  },
  methods: {

    async fetchStoreType(channelIDs) {
    this.loading = true;
    this.error = null;
    try {
      // รับค่า store type ตาม channel IDs
      this.GetStoreType = await fetchStoreType(channelIDs);
    } catch (error) {
      this.error = error; // จัดการข้อผิดพลาด
      console.error(this.error);
    } finally {
      this.loading = false; // ปิดสถานะโหลด
    }
  },
  
    async fetchData() {
      this.loading = true;
      this.error = null;
    //  const chanelid = this.selectedStoreType;
      try {
        this.GetStoreType = await fetchStoreType();
        
      } catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
    ToggleSelectStoreType() {
      this.isDropdownOpenStoreType = !this.isDropdownOpenStoreType;
    },
    // updateSelectedStoreType() {
    //   this.$emit('update:storetypes', this.selectedStoreTypeIDs); // ส่งค่า selectedStoreTypeIDs ไปยังคอมโพเนนต์หลัก
    // },
        async updateSelectedStoreType() {
        this.$emit('update:storetypes', this.selectedStoreTypeIDs); // ส่งค่า selectedStoreTypeIDs ไปยังคอมโพเนนต์หลัก
        if (this.selectedStoreTypeIDs.length) {
            try {
                // อาจจะใช้ fetchStoreType ตามประเภทที่เลือก
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    ,
    toggleSelectAllStoreType(event) {
      this.selectedStoreTypeIDs = event.target.checked ? this.GetStoreType.map(storetypes => storetypes.code) : [];
      this.updateSelectedStoreType(); // อัปเดตค่าหลังจากเลือกหรือยกเลิกการเลือกทั้งหมด
    },
   
   
    truncateText(text, colCount) {
      const maxLength = colCount * 10; // ปรับขนาดตามความกว้างของคอลัมน์
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    closeDropdownStoreType(event) {
        if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_storetypes')) {
          this.isDropdownOpenStoreType = false;
        }
      }
      
  },
  computed: {
  
    selectedStoreType() {
      return this.selectedStoreTypeIDs;
    },
    isAllSelectedStoreType() {
      return this.selectedStoreTypeIDs.length === this.GetStoreType.length;
    }
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
   document.addEventListener('click', this.closeDropdownStoreType);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownStoreType);
  }
  
};


</script>
