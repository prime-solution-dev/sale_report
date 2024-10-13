
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
 import { formatNumber } from 'chart.js/helpers';
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
                        <td class=" text-xs font-weight-bold mb-0">{{ item.brand }}</td>
                        <td class="text-xs font-weight-bold mb-0">FG</td>
                        <td class="text-xs font-weight-bold mb-0">{{ item.product_code }}</td>
                        <td class="text-xs font-weight-bold mb-0"> {{ item.product_hierarchy }} </td>
                        <td class=" text-xs font-weight-bold mb-0">{{ item.product_name }}</td>
                        <td class="text-center text-xs font-weight-bold mb-0">{{ item.qty_sale }}</td>
                        <td class="text-center text-xs font-weight-bold mb-0">{{ item.price_sale }}</td>
                        <td class="text-center text-xs font-weight-bold mb-0" :style="{ color: item.qty_return !== 0 ? 'red' : 'inherit' }">
                            {{ item.qty_return !== 0 ? '-' + formatNumber(Math.abs(item.qty_return)) : formatNumber(item.qty_return) }}
                        </td>
                        <td class="text-center text-xs font-weight-bold mb-0" :style="{ color: item.price_return !== 0 ? 'red' : 'inherit' }">
                            {{ item.price_return !== 0 ? '-' + formatNumber(Math.abs(item.price_return)) : formatNumber(item.price_return) }}
                        </td>
                        <!-- <td class="text-xs font-weight-bold mb-0"  >
                          -{{ item.price_return }}
                        </td> -->
                      </tr>
                      <template v-if="item.components && item.components.length">
                        <tr v-for="(component, compIndex) in item.components" :key="compIndex">
                          <td class=" text-xs font-weight-bold mb-0">{{ component.product_code }}</td>
                          <td class=" text-xs font-weight-bold mb-0">{{ item.brand }}</td>
                          <td class="text-xs font-weight-bold mb-0">Child</td>
                          <td class=" text-xs font-weight-bold mb-0">{{ component.product_hierarchy }}</td>
                          <td class=" text-xs font-weight-bold mb-0">{{ component.product_code }}</td>
                          <td class=" text-xs font-weight-bold mb-0">{{ component.product_name }}</td>
                          <td class="text-center text-xs font-weight-bold mb-0">{{ component.qty }}</td>
                          <td class="text-center text-xs font-weight-bold mb-0"></td>
                          <td class="text-center text-xs font-weight-bold mb-0"></td>
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
import ExcelJS from 'exceljs';
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
      selectedSKU:null,
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

    getMonthAbbreviation(monthNumber) {
      const monthAbbreviations = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
      ];
      if (monthNumber < 1 || monthNumber > 12) {
        throw new Error("Month must be between 1 and 12");
      }
      return monthAbbreviations[monthNumber - 1];
    },


    exportToExcel() {
    const currentDate = new Date();
    const currentMonth = new Date(currentDate.setMonth(currentDate.getMonth())).getMonth() + 1; 
    const currentYear = currentDate.getFullYear(); 

    const monthdefult = this.selectedMonth || currentMonth;
    const yeardefault = this.selectedYear || currentYear;

    const monthAbbr = this.getMonthAbbreviation(monthdefult);
    const table = document.querySelector(".table");
    const headerRow = table.querySelector("thead tr");
    const rows = table.querySelectorAll("tbody tr");

    if (rows.length === 0) {
      alert("No Data");
      return;
    }

    const data = [];
    const month = `${monthAbbr}${yeardefault}`;
    data.push([`Month: ${month}`]);
    // data.push([`Brand: ${this.selectedBrandIDs || "ALL"}`]);
    // data.push([`Key Account Group: ${this.selectedAccountGroupIDs || "ALL"}`]);
    // //data.push([`Customer: ${this.selectedCustomerGroupsIDs || "ALL"}`]);
    // data.push([` `]);

    const headers = [];
    const headerCells = headerRow.querySelectorAll("th");
    headerCells.forEach(header => {
      headers.push(header.innerText.trim());
    });

    data.push(headers);

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length) {
        const rowData = [];
        cells.forEach(cell => {
          rowData.push(cell.innerText.trim());
        });
        data.push(rowData);
      }
    });

    // สร้าง workbook และ worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ActualSales");

    // เพิ่มข้อมูล
    data.forEach((row, rowIndex) => {
        const excelRow = worksheet.addRow(row);
        // ตั้งค่าสไตล์สำหรับ header
        if (rowIndex === 1) {
          excelRow.eachCell((cell) => {
            cell.style.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFADD8E6' } 
            };
            cell.style.font = {
              bold: true,
              color: { argb: 'FF000000' } 
            };
            cell.style.border = {
              top: { style: 'thin', color: { argb: 'FF000000' } },
              left: { style: 'thin', color: { argb: 'FF000000' } },
              bottom: { style: 'thin', color: { argb: 'FF000000' } },
              right: { style: 'thin', color: { argb: 'FF000000' } }
            };
            cell.alignment = {
              horizontal: 'center',
              vertical: 'middle'
            };
          });
        }else{
        
          excelRow.eachCell((cell, colIndex) => {
        // กำหนดให้คอลัมน์ A 
          if (colIndex === 1 ) {
            cell.alignment = {
              horizontal: 'left', 
              vertical: 'middle'
            };
          } else {
              cell.alignment = {
                horizontal: 'right', // ชิดขวาสำหรับคอลัมน์อื่น
                vertical: 'middle'
              };
            }
          });
          
        }
      });
      worksheet.columns.forEach(column => {
        const maxLength = column.values.reduce((max, value) => {
          return Math.max(max, value ? value.toString().length : 0);
        }, 0);
        column.width = maxLength < 18 ? 30 : maxLength; 
      });

      const fileName = `Actual_Sales_QTY_Report-${month}.xlsx`;
        workbook.xlsx.writeBuffer()
        .then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((error) => {
          console.error("Error creating Excel file:", error);
        });
    },

    // Helper function to format numbers if needed
    formatNumber(value) {
        return parseFloat(value.replace(/,/g, '').trim()) || 0;
    },
        


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
  
       // เช็คว่า selectedSKU เป็น string แล้วแปลงเป็นอาเรย์
    if (typeof this.selectedSKU === 'string' && this.selectedSKU.trim() !== '') {
        this.selectedSKU = [this.selectedSKU]; // แปลงเป็นอาเรย์
    }

    // เช็คว่า selectedSKU เป็นอาเรย์ที่ไม่ว่าง
    if (!Array.isArray(this.selectedSKU) || this.selectedSKU.length === 0 || this.selectedSKU.every(sku => sku.trim() === '')) {
        console.log('SKU is empty or invalid. Setting to empty array.');
        this.selectedSKU = []; // ตั้งค่าเป็นอาเรย์ว่าง
    }


     
      this.GetActaulSales = await fetchGetActaulSales(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedGroupOmsIDs,this.selectedSKU);
     
      // console.log('Sending to API:', {
      //     year: this.selectedYear,
      //     month: this.selectedMonth,
      //     brands: this.selectedBrandIDs,
      //     group_omss: this.selectedGroupOmsIDs,
      //     products: this.selectedSKU,
      // });
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
