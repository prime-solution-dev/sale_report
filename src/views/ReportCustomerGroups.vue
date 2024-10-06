
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
.btn-dropdown{
  display: block;
    width: 100%;
    padding: 0.5rem 0.75rem!important;
   
    font-weight: 0!important;
    line-height: 1.4rem;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d2d6da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.3rem;
    transition: box-shadow 0.15s ease;
    font-size: 12px!important;
}
.hasDatepicker{
    text-align: center;
    padding: 0.4rem;
    border: none;
    margin-bottom: 1rem;
    letter-spacing: -0.025rem;
    text-transform: none;
    border-radius: 0.3rem;
    background-color: #fff;
    background-clip: padding-box;
    /* border: 1px solid #d2d6da; */
    width: -webkit-fill-available;
    font-size: 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)!important;

}

.ui-widget.ui-widget-content {
    border: 1px solid #c5c5c5 /*{borderColorDefault}*/;
    display: none;
}
</style>
<script setup>

 
  import { formatNumber } from 'chart.js/helpers';
  import {  fetchReportCustomerGroups } from '../services/reportapi/getdataApi';

         
import "../../src/assets/css/styleGlobal.css";

import DatePicker from './components/Datepicker.vue';
import FilterBrand from './components/FilterBrands.vue';
import FilterChannel from './components/FilterChannels.vue';
import FilterStoreType from './components/FilterStoreTypes.vue';
import FilterGetCustomerGroup from './components/FilterGetCustomerGroups.vue';
</script>


<template>
  

  <div class="py-4 container-fluid bg-white shadow-md">
    <div class="row mb-3">
      <div class="col-lg-12 col-md-12 col-12">
        <div class="container">
          <div class="row mt-3">
            <div class="col-md-2">
              <label for="storetypesSelect">Month</label>
                <div>
                  <DatePicker @dateSelected="handleDateSelected"/>
                </div>
              </div>
            <div class="col-md-2">
              <FilterBrand @update:brands="updateSelectedBrands"/>
            </div>

            <div class="col-md-2">
              <FilterChannel @update:channels="updateSelectedChannels"/>
            </div>

            <div class="col-md-2">
              <FilterStoreType ref="storeTypeComponent"  :selectedChannelIDs="selectedChannelIDs" @update:storetypes="updateSelectedStoreType"   />
            </div>
      

            <div class="col-md-2" >
              <FilterGetCustomerGroup @update:customergroups="updateSelectedGetCustomerGroups"/>
            </div>

          
            <div class="col-md-1">
                <div class="form-group">
                  <label for="exampleSelect"></label>
                  <button class="btn mb-0  fw-lighter  btn-md null  "  @click="resetForm">Reset</button>
                
                </div>
            </div>
              <div class="col-md-1">
                <div class="form-group">
                  <label for="exampleSelect"></label>
                  <button class="btn mb-0 btn-md text-white fw-lighter null bg-primary"  @click="applySearch">Apply</button>
                </div>
            </div>

            
          </div>
       
        </div>
      </div>
    </div>
  </div>

   






  <div class="py-4 mt-4 container-fluid" v-if="SalesTargetsSummary">
    <div class="row">
      <div class="col-12">
        
        <div class="card">
          <div class="card-header pb-0">
            <h4 class="font-weight-bolder">DAILY SALES REPORT - By Customer Group
              <button class="btn mb-0 btn-md  fw-lighter export-button export-button float-right" @click="exportToExcel">
                <i class="fa fa-cloud-download" aria-hidden="true"></i> Download</button>
            </h4>
           
             
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0">
              <thead class="bg-light">
                <tr>
                  <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Customer
                    </th>

                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Actual {{ SalesTargetsSummary[0].month_txt}} {{ SalesTargetsSummary[0].last_year }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Target {{ SalesTargetsSummary[0].month_txt}} {{ SalesTargetsSummary[0].current_year }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    %T {{ SalesTargetsSummary[0].current_year }} /A {{ SalesTargetsSummary[0].last_year }}

                    </th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark" style="position: relative; height: 100%;" >
                    Estimate {{ SalesTargetsSummary[0].month_txt_last}} 
                      <span @click="toggleColumnChannel"  class="span_toggle">
                        <i class="fa" :class="isColumnVisible ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
                      </span>
                    </th>
                    <th v-if="isColumnVisible" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Week 1</th>
                    <th v-if="isColumnVisible" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Week 2</th>
                    <th v-if="isColumnVisible" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Week 3</th>
                    <th v-if="isColumnVisible" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Week 4</th>
                    <th v-if="isColumnVisible" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark" >Week 5</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Sales before Return</th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Actual Sales {{ SalesTargetsSummary[0].month_txt}} {{ SalesTargetsSummary[0].current_year }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    %To Target 24

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    %A {{ SalesTargetsSummary[0].current_year }} /A {{ SalesTargetsSummary[0].current_last }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    {{ SalesTargetsSummary[0].month_txt_last}} Return

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Balance to go
                    </th>
                </tr>
              </thead>
              <tbody class="">
                <template v-for="(item, index) in getCustomersItem" :key="index">
                <template v-for="(customerGroup, groupIndex) in item.customerItem" :key="groupIndex">
                  <template v-for="(subgroup, subgroupIndex) in customerGroup.group.customers_subgroups" :key="subgroupIndex">
                    <!-- Item -->
                    <!-- <template v-for="(customerItem, itemIndex) in subgroup.subgroup.customers_items" :key="itemIndex">
                      <tr class="text-xs font-weight-bold mb-0">
                        <td class="text-left">{{ customerItem.item.topic_name }}</td>
                        <td class="text-center">{{ formatNumber(customerItem.item.sale_data_item.display_last_actual) }}</td>
                        <td class="text-center">{{ formatNumber(customerItem.item.sale_data_item.current_target) }}  </td>
                        <td class="text-center">{{ formatNumber(customerItem.item.sale_data_item.display_current_last_target_percent) }} % </td>
                        <td class="text-center">{{ formatNumber(customerItem.item.sale_data_item.current_estimate) }}</td>
                        <td v-if="isColumnVisible" class="text-center">{{ formatNumber(customerItem.item.sale_data_item.current_estimate_w1) }} </td>
                        <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(customerItem.item.sale_data_item.current_estimate_w2) }} </td>
                        <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(customerItem.item.sale_data_item.current_estimate_w3) }} </td>
                        <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(customerItem.item.sale_data_item.current_estimate_w4) }} </td>
                        <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(customerItem.item.sale_data_item.current_estimate_w5) }} </td>
                        <td class="text-center"> {{ formatNumber(customerItem.item.sale_data_item.last_return) }}</td>
                        <td class="text-center">   {{ formatNumber(customerItem.item.sale_data_item.display_current_actual) }} </td>
                        <td class="text-center" > {{ formatNumber(customerItem.item.sale_data_item.current_target) }} % </td>
                        <td class="text-center"> {{ formatNumber(customerItem.item.sale_data_item.display_current_last_actual_percent) }} % </td>
                        <td class="text-center"> {{ formatNumber(customerItem.item.sale_data_item.last_return) }}   </td>
                        <td class="text-center">{{ formatNumber(customerItem.item.sale_data_item.current_return) }} </td>    
                      </tr>
                    </template> -->
                    <!-- Subgroup -->
                    <tr class="text-xs font-weight-bold mb-0 ">
                      <td class="text-left rounded-left">  {{ subgroup.subgroup.subgroup }}</td>
                      <td class="text-center">{{ formatNumber(subgroup.subgroup.sale_data_subg.display_last_actual) }}</td>
                      <td class="text-center">{{ formatNumber(subgroup.subgroup.sale_data_subg.current_target) }}  </td>
                      <td class="text-center">{{ formatNumber(subgroup.subgroup.sale_data_subg.display_current_last_target_percent) }} % </td>
                      <td class="text-center">{{ formatNumber(subgroup.subgroup.sale_data_subg.current_estimate) }}</td>
                      <td v-if="isColumnVisible" class="text-center">{{ formatNumber(subgroup.subgroup.sale_data_subg.current_estimate_w1) }} </td>
                      <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(subgroup.subgroup.sale_data_subg.current_estimate_w2) }} </td>
                      <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(subgroup.subgroup.sale_data_subg.current_estimate_w3) }} </td>
                      <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(subgroup.subgroup.sale_data_subg.current_estimate_w4) }} </td>
                      <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(subgroup.subgroup.sale_data_subg.current_estimate_w5) }} </td>
                      <td class="text-center"> {{ formatNumber(subgroup.subgroup.sale_data_subg.last_return) }}</td>
                      <td class="text-center">   {{ formatNumber(subgroup.subgroup.sale_data_subg.display_current_actual) }} </td>
                      <td class="text-center"> {{ formatNumber(subgroup.subgroup.sale_data_subg.current_target) }} % </td>
                      <td class="text-center"> {{ formatNumber(subgroup.subgroup.sale_data_subg.display_current_last_actual_percent) }} % </td>
                      <td class="text-center"> {{ formatNumber(subgroup.subgroup.sale_data_subg.last_return) }}   </td>
                      <td class="text-center rounded-right">{{ formatNumber(subgroup.subgroup.sale_data_subg.current_return) }} </td>   
                    </tr>
                  </template>
                    <!--  Group -->
                    <!-- <tr class="text-xs font-weight-bold mb-0 bg_groub ">
                      <td class="text-left rounded-left">TOTAL {{ customerGroup.group.topic_name }}</td>
                      <td class="text-center">{{ formatNumber(customerGroup.group.sale_data_groub.display_last_actual) }}</td>
                      <td class="text-center">{{ formatNumber(customerGroup.group.sale_data_groub.current_target) }}  </td>
                      <td class="text-center">{{ formatNumber(customerGroup.group.sale_data_groub.display_current_last_target_percent) }} % </td>
                      <td class="text-center">{{ formatNumber(customerGroup.group.sale_data_groub.current_estimate) }}</td>
                      <td v-if="isColumnVisible" class="text-center">{{ formatNumber(customerGroup.group.sale_data_groub.current_estimate_w1) }} </td>
                      <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(customerGroup.group.sale_data_groub.current_estimate_w2) }} </td>
                      <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(customerGroup.group.sale_data_groub.current_estimate_w3) }} </td>
                      <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(customerGroup.group.sale_data_groub.current_estimate_w4) }} </td>
                      <td v-if="isColumnVisible" class="text-center"> {{ formatNumber(customerGroup.group.sale_data_groub.current_estimate_w5) }} </td>
                      <td class="text-center"> {{ formatNumber(customerGroup.group.sale_data_groub.last_return) }}</td>
                      <td class="text-center">   {{ formatNumber(customerGroup.group.sale_data_groub.display_current_actual) }} </td>
                      <td class="text-center"> {{ formatNumber(customerGroup.group.sale_data_groub.current_target) }} % </td>
                      <td class="text-center"> {{ formatNumber(customerGroup.group.sale_data_groub.display_current_last_actual_percent) }} % </td>
                      <td class="text-center"> {{ formatNumber(customerGroup.group.sale_data_groub.last_return) }}   </td>
                      <td class="text-center rounded-right">{{ formatNumber(customerGroup.group.sale_data_groub.current_return) }} </td>   
                    </tr> -->
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

  




</template>

<script>
import * as XLSX from 'xlsx';
export default {
 
  components: {
    DatePicker,
    FilterBrand,
    FilterChannel,
    FilterGetCustomerGroup,
    //FilterStoreType
    
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
      selectedChannel: null, 
      selectedStoreType: null, 
      SalesTargetsSummary: null,
      selectedCustomerGroupsIDs:null,
      //

      customersItem:null,
      error: null,
      loading: false,

      currentMonth:currentMonth,
      currentYaer:currentYear,
      lastMonth :lastMonth,
      lastYear:lastYear,
      month_txt_current:monthAbbr,
      month_txt_last:monthAbbr_last,
      day_now:daynow,
      isColumnVisible: false,
      isColumnVisibleDetail: false,
      isColumnVisibleCusName: false,
      isColumnVisibleCusGroup: false,
      selectedMonth: null,
      selectedYear: null,
    };
  },
  methods: {

    exportToExcel() {
      const table = document.querySelector(".table tbody");
      const rows = table.querySelectorAll("tr");
        if (rows.length === 0) {
          alert("ไม่มีข้อมูลให้ส่งออก");
          return;
        }

        const data = [];

        rows.forEach(row => {
          const cells = row.querySelectorAll("td");
          if (cells.length) {
            const rowData = {
              "Customer": cells[0].innerText.trim(),
              "Actual Sales Last Year": this.formatNumber(cells[1].innerText),
              "Target Current Year": this.formatNumber(cells[2].innerText),
              "%T Current Year / A Last Year": this.formatNumber(cells[3].innerText),
              "Estimate": this.formatNumber(cells[4].innerText),
              "Sales before Return": this.formatNumber(cells[cells.length - 3].innerText),
              "Actual Sales Current Year": this.formatNumber(cells[cells.length - 2].innerText),
              "%To Target": this.formatNumber(cells[cells.length - 1].innerText),
              "Return": this.formatNumber(cells[cells.length - 2].innerText), // Adjust according to your column structure
              "Balance to go": this.formatNumber(cells[cells.length - 1].innerText) // Adjust according to your column structure
            };

            // Add weekly estimates if the column is visible
            if (this.isColumnVisible) {
              for (let i = 5; i <= 9; i++) { // Assuming week columns are from 5 to 9
                rowData[`Week ${i - 4}`] = this.formatNumber(cells[i].innerText);
              }
            }

            data.push(rowData);
          }
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "DAILYSALESREPORT-ByCustomerGroup");
        XLSX.writeFile(workbook, "DAILYSALESREPORT_ByCustomerGroup.xlsx");
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
        this.SelectedGetCustomerGroups,
        this.SalesTargetsSummary = await fetchReportCustomerGroups(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedChannelIDs,this.selectedStortTypeIDs,this.selectedCustomerGroupsIDs);
      
      
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
    updateSelectedChannels(channels) {
     
      this.selectedChannelIDs = channels;
    this.$refs.storeTypeComponent.fetchStoreType(channels); // เรียกใช้ฟังก์ชัน fetchStoreType ใน StoreType
     // this.handleChannelsSelected(channels);
    },
 
    updateSelectedStoreType(storetypes) {
      this.selectedStortTypeIDs = storetypes; 
    },
    
    updateSelectedGetCustomerGroups(customergroups) {
      this.selectedCustomerGroupsIDs = customergroups; 
    },
   

    toggleColumnDetail() {
      this.isColumnVisibleDetail = !this.isColumnVisibleDetail; 
    },
    toggleColumnChannel() {
      this.isColumnVisible = !this.isColumnVisible; 
    },
    toggleColumnCusName() {
      this.isColumnVisibleCusName = !this.isColumnVisibleCusName; 
    },
    toggleColumnCusGroup() {
      this.isColumnVisibleCusGroup = !this.isColumnVisibleCusGroup; 
    },
    async applySearch() {
      this.SalesTargetsSummary = await fetchReportCustomerGroups(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedChannelIDs,this.selectedStortTypeIDs,this.selectedCustomerGroupsIDs);
      // console.log('Select  selectedBrandIDs', this.selectedBrandIDs);
      // console.log('Select  selectedChannelIDs', this.selectedChannelIDs);
      // console.log('Select  selectedStortTypeIDs', this.selectedStortTypeIDs);
      // console.log('Select  selectedCustomerGroupsIDs', this.selectedCustomerGroupsIDs);
    },
    async resetForm() {
      window.location.reload();
    },
  
    
  },
  computed: {
    
    getCustomersItem() {
      return (this.SalesTargetsSummary || []).filter(item => item.type === 'customerItem');
    },
   
  }
  ,
  created() {
    this.fetchData(); // component created
  },
  mounted() {
   // document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
   // document.removeEventListener('click', this.closeDropdown);
  }
  
};


</script>
