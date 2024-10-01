
<style>.dropdown_brand {
    position: relative;
  }</style>
<template>
<div class="form-group">
<label for="brandSelect">Brand</label>
<div class="dropdown_brand">
    <button 
    class="btn btn-dropdown dropdown-toggle" 
    type="button" 
    id="dropdownMenuButton" 
    @click.stop="toggleDropdown"
    >
    {{ selectedBrands.length ? truncateText(selectedBrands.join(', '), 2) : 'Select Customer Group' }}
    <!-- {{ selectedBrands.length ? selectedBrands.join(', ') : 'เลือกแบรนด์' }} -->
    </button>
    <div class="dropdown-menu_2" v-if="isDropdownOpen">

        <!-- ตัวเลือก Select All -->
    <label for="select-all" class="dropdown-item">
        <input 
        type="checkbox" 
        id="select-all" 
        :checked="isAllSelected" 
        @change="toggleSelectAll"
        />
        All
    </label>
    <div v-for="(brand, index) in GetBrand" :key="index">
        <label :for="'brand-' + index" class="dropdown-item">
        <input 
            type="checkbox" 
            :id="'brand-' + index" 
            :name="'brand[]'" 
            :value="brand.code" 
            v-model="selectedBrandIDs" 
            @change="updateSelectedBrands" 
        />
        {{ brand.code }}
        </label>
    </div>
    </div>
</div>
</div>
</template>
<script>
 import {  fetchGetBrand } from '../../services/reportapi/getdataApi';
export default {
 
 
  data() {
   
    return {
     
      selectedBrandID: null, 
     
      //GetBrand: null,
      GetBrand: [],
      selectedBrandIDs: [],
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
    //  const chanelid = this.selectedChannel;
      try {
        this.GetBrand = await fetchGetBrand();
       
      
        
      } catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    updateSelectedBrands() {
      this.$emit('update:brands', this.selectedBrandIDs); // ส่งค่า selectedBrandIDs ไปยังคอมโพเนนต์หลัก
    },
    toggleSelectAll(event) {
      this.selectedBrandIDs = event.target.checked ? this.GetBrand.map(brand => brand.code) : [];
      this.updateSelectedBrands(); // อัปเดตค่าหลังจากเลือกหรือยกเลิกการเลือกทั้งหมด
    },
   
    // //DropdownBrand
    // toggleDropdown() {
    //   this.isDropdownOpen = !this.isDropdownOpen;
    //   //alert('toggleDropdown');
    // },
    // updateSelectedBrands() {
    // //   console.log('Select Customer Group', this.selectedBrandIDs);
    // },
    // toggleSelectAll(event) {
    //   if (event.target.checked) {
    //     // ถ้าติ๊กเลือก "All" ให้เลือกแบรนด์ทั้งหมด
    //     this.selectedBrandIDs = this.GetBrand.map(brand => brand.code);
    //   } else {
    //     // ถ้าไม่ติ๊ก "All" ให้ยกเลิกการเลือกทั้งหมด
    //     this.selectedBrandIDs = [];
    //   }
    // },
    truncateText(text, colCount) {
      const maxLength = colCount * 10; // ปรับขนาดตามความกว้างของคอลัมน์
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    closeDropdown(event) {
        if (!this.$el.contains(event.target) && !event.target.closest('.dropdown_brand')) {
          this.isDropdownOpen = false;
        }
      }
      
  },
  computed: {
  
    ///dropdown brands
    selectedBrands() {
      return this.selectedBrandIDs;
    },
    isAllSelected() {
      return this.selectedBrandIDs.length === this.GetBrand.length;
    }
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
   document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
  
};


</script>
