
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
import {  fetchReportKeyAccountGroup } from '../services/reportapi/getdataApi';

         
import "../../src/assets/css/styleGlobal.css";

import DatePicker from './components/Datepicker.vue';
import FilterBrand from './components/FilterBrands.vue';
import FilterChannel from './components/FilterChannels.vue';
import FilterStoreType from './components/FilterStoreTypes.vue';
import FilterAcGroup from './components/FilterKeyAccountGroups.vue';
import FilterKeyAccountNameByGroup from './components/FilterKeyAccountNameByGroup.vue';
import FilterGetCustomerGroup from './components/FilterGetCustomerGroups.vue';
</script>


<template>
  

  <div class="py-1 container-fluid bg-white shadow-md bx-filterData">
    <div class="row mb-3">
      <div class="col-lg-12 col-md-12 col-12">
        <div class="container">
          <div class="row mt-3">
            <div class="col-md-1">
              <label for="storetypesSelect">Month</label>
                <div>
                  <DatePicker @dateSelected="handleDateSelected"/>
                </div>
              </div>
            <div class="col-md-2">
              <FilterBrand @update:brands="updateSelectedBrands"/>
            </div>

            <div class="col-md-2" hidden>
              <FilterChannel @update:channels="updateSelectedChannels"/>
            </div>

            <div class="col-md-2" hidden> 
              <FilterStoreType ref="storeTypeComponent"  :selectedChannelIDs="selectedChannelIDs" @update:storetypes="updateSelectedStoreType"   />
            </div>
            <div class="col-md-2" >
              <FilterAcGroup @update:accgroups="updateSelectedKeyAccountGroup"/>
            </div>

            <div class="col-md-2">
              <FilterKeyAccountNameByGroup ref="KeyAccountNameComponent"  :selectedAccountGroupIDs="selectedAccountGroupIDs" @update:accountnames="updateSelectedKeyAccountName"/>
            </div>

            <div class="col-md-2" >
              <FilterGetCustomerGroup @update:customergroups="updateSelectedGetCustomerGroups"/>
            </div>

            <div class="col-md-3 box_btn_action">
                <div class="form-group">
                  <label for="cus_groupSelect" style="color:white!important;">x</label>
                  <div>
                  <button class="btn mb-0 mr5 ml5 fw-lighter  btn-md null fs-12 "  @click="resetForm">Reset</button>
                  <button class="btn mb-0 mr5 ml5  btn-md text-white fw-lighter null bg-primary fs-12"  @click="applySearch">Apply</button>
                  <button class="btn mb-0 ml0 btn-md  fw-lighter export-button export-button float-right fs-12" @click="exportToExcel">
                    <i class="fa fa-cloud-download" aria-hidden="true"></i> Download</button>
                </div>
              </div>
            </div>

            <!-- <div class="col-md-1">
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
            </div> -->
          </div>
       
        </div>
      </div>
    </div>
  </div>

   
  <div class="py-3 mt-1 container-fluid" v-if="ReportKeyAccountGroup" >
    <div class="row">
      <div class="col-12">
        
        <div class="card">
          <div class="card-header pb-0">
            <h4 class="font-weight-bolder mb-0"  style="font-size: 20px;">DAILY SALES REPORT - By Key Account Group  
              <!-- <button class="btn mb-0 btn-md  fw-lighter export-button export-button float-right" @click="exportToExcel">
              <i class="fa fa-cloud-download" aria-hidden="true"></i> Download</button> -->
            </h4>
          </div>
          <div class="px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0" v-if="ReportKeyAccountGroup.length > 0">
                <thead >
                  <tr class="bg-light">
                    <th style="text-align: left !important;"
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Key Account Name
                    </th>

                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Actual {{ accountGroub[0].monthtxt }} {{ ReportKeyAccountGroup[0].last_year }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Target {{ accountGroub[0].monthtxt }} {{ ReportKeyAccountGroup[0].current_year }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    %T {{ ReportKeyAccountGroup[0].current_year }} /A {{ ReportKeyAccountGroup[0].last_year }}

                    </th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark" style="position: relative; height: 100%;" >
                      Estimate {{ accountGroub[0].monthtxt }}
                    </th>
                   
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Sales before return</th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Actual Sales {{ accountGroub[0].monthtxt }} {{ ReportKeyAccountGroup[0].current_year }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    %To Target 24

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    %A {{ ReportKeyAccountGroup[0].current_year }} /A {{ ReportKeyAccountGroup[0].last_year }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    {{ accountGroub[0].monthtxt }} Return

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Balance to go
                    </th>
                  </tr>
                </thead>
                <tbody v-if="accountGroub.length > 0">
                  <tr class="text-center" v-for="(item, data_group) in accountGroub" :key="data_group">
                    <td style="text-align: left !important;">
                      <p class="text-left text-xs font-weight-bold mb-0">{{ item.name}}</p>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_last_actual) }}</p>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_target) }}</p>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_current_last_target_percent) }} %</p>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate) }}</p>
                    </td>
                   
                  <td>
                    <p class="text-center text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_sale) }}</p><!-- SALE Before Return -->
                  </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_current_actual) }}</p>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_current_to_target_percent) }} %</p><!-- %To Target 24 -->
                 
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_current_last_actual_percent) }} %</p>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0" > 
                        <a v-if="item.saleData.display_current_balance < 0 && item.saleData.current_return !== 0 || item.saleData.current_return < item.saleData.display_current_actual && item.saleData.current_return !== 0"  style="color:red;">  - {{ formatNumber(item.saleData.current_return) }} </a>
                        <a v-else >  {{ formatNumber(item.saleData.current_return) }} </a>
                        <!-- {{ formatNumber(item.saleData.current_return) }} -->
                        <!-- RETURN -->
                      </p>
                    </td>
                    <td>
                      <p class="text-center text-xs font-weight-bold mb-0" >
                        <a v-if="item.saleData.display_current_balance < 0  " style="color:red;"> {{ formatNumber(item.saleData.display_current_balance) }} </a>
                        <a v-else >  {{ formatNumber(item.saleData.display_current_balance) }} </a>
                      </p>
                     
                      <!-- <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_current_balance) }}</p> -->
                    </td>
                    
                  </tr>
                
                </tbody>
              </table>

              <table  v-else>
                <tr>
                  <td> No data.</td>
                </tr>

              </table>
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
    FilterChannel,
    FilterAcGroup,
    FilterKeyAccountNameByGroup,
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
      ReportKeyAccountGroup: null,
      selectedAccountGroupIDs:[],
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
    data.push([`Brand: ${this.selectedBrandIDs || "ALL"}`]);
    data.push([`Key Account Group: ${this.selectedAccountGroupIDs || "ALL"}`]);
    //data.push([`Customer: ${this.selectedCustomerGroupsIDs || "ALL"}`]);
    data.push([` `]);

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
    const worksheet = workbook.addWorksheet("keyaccountgroup");

    // เพิ่มข้อมูล
    data.forEach((row, rowIndex) => {
        const excelRow = worksheet.addRow(row);
        // ตั้งค่าสไตล์สำหรับ header
        if (rowIndex === 4) {
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

      const fileName = `Daily_Sales_ByKeyAccountGroup_Report-${month}.xlsx`;
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
      return parseFloat(value.replace(/,/g, '').replace('%', '').trim()) || 0; // Handle both percentage and comma formats
    }
    ,

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
        this.selectedAccountNameIDs,
        this.selectedAccountGroupIDs,
        
        this.ReportKeyAccountGroup = await fetchReportKeyAccountGroup(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedChannelIDs,this.selectedStortTypeIDs,this.selectedAccountNameIDs,this.selectedAccountGroupIDs);
      
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
    updateSelectedChannels(channels) {
     
      this.selectedChannelIDs = channels;
      this.$refs.storeTypeComponent.fetchStoreType(channels); // เรียกใช้ฟังก์ชัน fetchStoreType ใน StoreType
     // this.handleChannelsSelected(channels);
    },
 
    updateSelectedStoreType(storetypes) {
      this.selectedStortTypeIDs = storetypes; 
    },
    
    updateSelectedKeyAccountGroup(accgroups) {
      this.selectedAccountGroupIDs = accgroups; 
      this.$refs.KeyAccountNameComponent.fetchAccountNameByGroup(accgroups); // เรียกใช้ฟังก์ชัน fetchStoreType ใน StoreType
    },
    updateSelectedKeyAccountName(accountname) {
      this.selectedAccountNameIDs = accountname; 
      
    },

    updateSelectedGetCustomerGroups(customergroups) {
      this.selectedCustomerGroupsIDs = customergroups; 
    },
   

   
    async applySearch() {
      this.ReportKeyAccountGroup = await fetchReportKeyAccountGroup(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedChannelIDs,this.selectedStortTypeIDs,this.selectedAccountNameIDs,this.selectedAccountGroupIDs,this.selectedCustomerGroupsIDs);
      //console.log('Select  selectedCustomerGroupsIDs', this.selectedCustomerGroupsIDs);
    },
    async resetForm() {
      window.location.reload();
     // this.$router.go(0);
    },
  
    
  },
  computed: {
    brandSales() {
    return this.ReportKeyAccountGroup.filter(item => item.type === 'brand');
    },
    overallSummary() {
      return this.ReportKeyAccountGroup.find(item => item.type === 'overall');
    },
    
    accountGroub() {
    return this.ReportKeyAccountGroup.filter(item => item.type === 'name');
   // return this.ReportKeyAccountGroup.filter(item => item.type === 'account');
    },
    accountName() {
    return this.ReportKeyAccountGroup.filter(item => item.type === 'name');
    },
    customers() {
      return this.ReportKeyAccountGroup.filter(item => item.type === 'customer' );
    },
    getCustomersItem() {
      return (this.ReportKeyAccountGroup || []).filter(item => item.type === 'customerItem');
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
