
<style>
.dropdown-menu_2 {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
}

.dropdown-menu_channel {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
}

.dropdown-menu_storetype {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
}

.dropdown-menu_acgroup {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
}
.dropdown-menu_accountname {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
}


</style>
<script setup>

import {  fetchGetActaulSales } from '../services/reportapi/getdataApi';
import "../../src/assets/css/styleGlobal.css";

import DatePicker from './components/Datepicker.vue';
import FilterBrand from './components/FilterBrands.vue';
import FilterGetGroupOm from './components/FilterGetGroupOms.vue';

</script>
<template>
  <div class="py-4 container-fluid bg-white shadow-md">
    <div class="row mb-3">
      <div class="col-lg-12 col-md-12 col-12">
        <div class="container">
          <div class="row mt-3">
            <div class="col-md-2">
              <label for="storetypesSelect">Month</label>
              <DatePicker @dateSelected="handleDateSelected" />
            </div>
            <div class="col-md-2">
              <FilterBrand @update:brands="updateSelectedBrands" />
            </div>
            <div class="col-md-2 text-nowrap">
              <FilterGetGroupOm @update:group_omss="updateSelectedGroupOms" />
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label for="exampleSelect">SKU</label>
                <input type="text" class="form-control" v-model="selectedSKU" />
              </div>
            </div>
            <div class="col-md-1">
              <label for="exampleSelect"></label>
              <button class="btn mb-0 fw-lighter btn-md" @click="resetForm">Reset</button>
            </div>
            <div class="col-md-1">
              <label for="exampleSelect"></label>
              <button class="btn mb-0 btn-md text-white fw-lighter bg-primary" @click="applySearch">Apply</button>
            </div>

            <div class="col-md-2">
              <label for="exportButton"></label>
              <br>
              <button class="btn mb-0 btn-md  fw-lighter export-button export-button" @click="exportToExcel">
                <i class="fa fa-cloud-download" aria-hidden="true"></i>

                 Download</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 mt-4 container-fluid" v-if="GetActaulSales && GetActaulSales.length > 0">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header pb-0">
              <h4 class="font-weight-bolder">ActualSales QTY Report</h4>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-3">
                <table class="table align-items-center mb-0">
                  <thead class="bg-light">
                    <tr>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Customer</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Brand</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">SKU Type</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">SKU</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Child Code</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Description</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">QTY</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Invoice Net Amount WO Vat</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Return Base Unit</th>
                      <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Return Net Amount WO Vat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item, index) in GetActaulSales" :key="index">
                      <tr >
                        <td class="text-xs font-weight-bold mb-0">{{ item.customer_group_oms }}</td>
                        <td class="text-xs font-weight-bold mb-0">{{ item.brand }}</td>
                        <td class="text-xs font-weight-bold mb-0">FG</td>
                        <td class="text-xs font-weight-bold mb-0">{{ item.product_code }}</td>
                        <td class="text-xs font-weight-bold mb-0">-</td>
                        <td class="text-xs font-weight-bold mb-0">{{ item.product_name }}</td>
                        <td class="text-xs font-weight-bold mb-0">{{ item.qty_sale }}</td>
                        <td class="text-xs font-weight-bold mb-0">{{ item.price_sale }}</td>
                        <td class="text-xs font-weight-bold mb-0" >{{ item.qty_return }}</td>
                        <td class="text-xs font-weight-bold mb-0">{{ item.price_return }}</td>
                      </tr>
                      <template v-if="item.components && item.components.length">
                        <tr v-for="(component, compIndex) in item.components" :key="compIndex">
                          <td class="text-xs font-weight-bold mb-0">{{ component.product_code }}</td>
                          <td class="text-xs font-weight-bold mb-0">{{ item.brand }}</td>
                          <td class="text-xs font-weight-bold mb-0">CH</td>
                          <td class="text-xs font-weight-bold mb-0">{{ component.product_hierarchy }}</td>
                          <td class="text-xs font-weight-bold mb-0">{{ component.product_code }}</td>
                          <td class="text-xs font-weight-bold mb-0">{{ component.product_name }}</td>
                          <td class="text-xs font-weight-bold mb-0">{{ component.qty }}</td>
                          <td class="text-xs font-weight-bold mb-0">0</td>
                          <td class="text-xs font-weight-bold mb-0">0</td>
                        </tr>
                      </template>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
export default {
 
  components: {
    DatePicker,
    FilterBrand,
    FilterGetGroupOm,
    
  },
  
  data() {

    const getMonthAbbreviation = (monthNumber) => {
      const monthAbbreviations = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
      ];

      if (monthNumber < 1 || monthNumber > 12) {
        throw new Error("Month must be between 1 and 12");
      }

      return monthAbbreviations[monthNumber - 1];
    };
      const currentDate = new Date();
      const daynow = currentDate.getDate();
      const currentYear = currentDate.getFullYear(); 
      const currentMonth = new Date(currentDate.setMonth(currentDate.getMonth())).getMonth() + 1; 
      const lastYear = currentYear-1;
      const lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).getMonth() + 1; // เดือนที่แล้ว (1-12)

      const monthNumber = currentMonth; 
      const monthAbbr = getMonthAbbreviation(monthNumber); 
      const monthAbbr_last = getMonthAbbreviation(monthNumber-1); 
     // console.log(currentYear,previousMonth);
    return {
    
      selectedChannelIDs:[],
      selectedGroupOmsIDs:[],
      selectedSKU:[],
      selectedChannel: null, 
      selectedStoreType: null, 
      GetActaulSales: null,
      //

      error: null,
      loading: false,

      currentMonth:currentMonth,
      currentYaer:currentYear,
      lastMonth :lastMonth,
      lastYear:lastYear,
      month_txt_current:monthAbbr,
      month_txt_last:monthAbbr_last,
      day_now:daynow,
     
      selectedMonth: null,
      selectedYear: null,
    };
  },
  methods: {
    exportToExcel() {
  if (!this.GetActaulSales || this.GetActaulSales.length === 0) {
    alert("ไม่มีข้อมูลให้ส่งออก");
    return;
  }

  // สร้างข้อมูลสำหรับ Excel
  const data = [];
  this.GetActaulSales.forEach(item => {
    // ข้อมูลหลัก
    data.push({
      "Customer": item.customer_group_oms,
      "Brand": item.brand,
      "SKU Type" : 'FG',
      "SKU": item.product_code,
      "Child Code" : '-',
      "Description": item.product_name,
      "QTY": item.qty_sale,
      "Invoice Net Amount WO Vat": item.price_sale,
      "Return Base Unit": item.qty_return,
      "Return Net Amount WO": item.price_return,
    });

    // ข้อมูล components ถ้ามี
    if (item.components && item.components.length) {
      item.components.forEach(component => {
        data.push({
          "Customer": item.customer_group_oms,
          "Brand": item.brand,
          "SKU Type": 'CH',
          "SKU": component.product_hierarchy,
          "Child Code": component.product_code,
          "Description": component.product_name,
          "QTY": component.qty,
          "Invoice Net Amount WO Vat": 0,
          "Return Base Unit": 0,
          "Return Net Amount WO": 0,
        });
      });
    }
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "ActualSalesQTYReport");
  XLSX.writeFile(workbook, "ActualSalesQTYReport.xlsx");
},
    // async exportToExcel() {
    //   if (!this.GetActaulSales || this.GetActaulSales.length === 0) {
    //     alert("ไม่มีข้อมูลให้ส่งออก");
    //     return;
    //   }

    //   const worksheet = XLSX.utils.json_to_sheet(this.GetActaulSales);
    //   const workbook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(workbook, worksheet, "รายงานยอดขายจริง");
    //   XLSX.writeFile(workbook, "รายงานยอดขายจริง.xlsx");
    // },


    async handleDateSelected({ year, month }) {
      this.selectedYear = year;
      this.selectedMonth = month + 1;  // month เริ่มจาก 0
      console.log('selected : ', this.selectedMonth, ' year: ', this.selectedYear);
    },

  
    async fetchData() {
      this.loading = true;
      this.error = null;
      try {
        this.selectedBrandIDs, // รับค่าจาก selectedBrandIDs
        this.selectedChannelIDs,
        this.selectedStortTypeIDs,
        this.selectedGroupOmsIDs,
        this.selectedSKU,
        this.GetActaulSales = await fetchGetActaulSales(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedGroupOmsIDs,this.selectedSKU);
      
        // console.log('Selected Brands:', this.selectedBrandIDs); 
        // console.log('Selected Channels:', this.selectedChannelIDs); 
      } 
      
      catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
    ////////////
    updateSelectedBrands(brands) {
      this.selectedBrandIDs = brands; // อัปเดต selectedBrandIDs ตามค่าที่ได้รับจาก filter.vue
    },
   
    
   

    updateSelectedGroupOms(group_omss) {
      this.selectedGroupOmsIDs = group_omss; 
    },
    

   
    async applySearch() {
      this.GetActaulSales = await fetchGetActaulSales(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedGroupOmsIDs,this.selectedSKU);
     
      // console.log('Select  selectedStortTypeIDs', this.selectedStortTypeIDs);
    },
    async resetForm() {
      // this.$router.go(0);
      window.location.reload();
    },
  
    
  },
  computed: {
 
   
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
  
  },
  beforeUnmount() {
  }
  
};


</script>
