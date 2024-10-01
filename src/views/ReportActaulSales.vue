
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

 
  //import { formatNumber } from 'chart.js/helpers';
  import {  fetchGetActaulSales } from '../services/reportapi/getdataApi';

         
import "../../src/assets/css/styleGlobal.css";

import DatePicker from './components/Datepicker.vue';
import FilterBrand from './components/FilterBrands.vue';
import FilterAcGroup from './components/FilterKeyAccountGroups.vue';
import FilterAccountName from './components/FilterCustomerNames.vue';

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

            <div class="col-md-2" hidden>
              <FilterAcGroup @update:accgroups="updateSelectedKeyAccountGroup"/>
            </div>

            <div class="col-md-2">
              <FilterAccountName @update:accountnames="updateSelectedKeyAccountName"/>
            </div>

            <div class="col-md-2">
              <div class="form-group">
                <label for="exampleSelect">SKU</label>
                <input type="text" class="form-control">
              
              </div>
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

   









  <div class="py-4 mt-4 container-fluid" v-if="GetActaulSales" >
    <div class="row">
      <div class="col-12">
        
        <div class="card">
          <div class="card-header pb-0">
            <h4 class="font-weight-bolder">ActualSales QTY Report</h4>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0" v-if="GetActaulSales.length > 0">
                <thead >
                  <tr class="bg-light">
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Customer   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Brand   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> SKU Type   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> SKU   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Child Code   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Description   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> QTY   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Invoice Net Amount WO Vat   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Return Base Unit   </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Return Net Amount WO Vat   </th>

                  </tr>
                </thead>
                <tbody v-if="GetActaulSales.length > 0">
                  <tr class="text-center" v-for="(item, data) in GetActaulSales" :key="data">
                    <td style="text-align: left !important;">
                      <p class="text-xs font-weight-bold mb-0">{{ item.customer_group_oms}}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ item.brand }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0"> sku type</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0"> sku </p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">childcode</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">des</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ item.qty_sale }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ item.price_sale }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ item.qty_return }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ item.price_return }}</p>
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

export default {
 
  components: {
    DatePicker,
    FilterBrand,
    FilterAcGroup,
    FilterAccountName,
    
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
      GetActaulSales: null,
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
        this.GetActaulSales = await fetchGetActaulSales(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedAccountNameIDs,this.selectedAccountGroupIDs);
      
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
   
    
    updateSelectedKeyAccountGroup(accgroups) {
      this.selectedAccountGroupIDs = accgroups; 
    },
    updateSelectedKeyAccountName(accountname) {
      this.selectedAccountNameIDs = accountname; 
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
      this.GetActaulSales = await fetchGetActaulSales(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedAccountNameIDs,this.selectedAccountGroupIDs);
      // console.log('Select  selectedBrandIDs', this.selectedBrandIDs);
      // console.log('Select  selectedChannelIDs', this.selectedChannelIDs);
      // console.log('Select  selectedAccountNameIDs', this.selectedAccountNameIDs);
      // console.log('Select  selectedAccountGroupIDs', this.selectedAccountGroupIDs);
      // console.log('Select  selectedStortTypeIDs', this.selectedStortTypeIDs);
    },
    async resetForm() {
      window.location.reload();
    },
  
    
  },
  computed: {
    // brandSales() {
    // return this.GetActaulSales.filter(item => item.type === 'brand');
    // },
    // overallSummary() {
    //   return this.GetActaulSales.find(item => item.type === 'overall');
    // },
    
    // accountGroub() {
    // return this.GetActaulSales.filter(item => item.type === 'account');
    // },
    // accountName() {
    // return this.GetActaulSales.filter(item => item.type === 'name');
    // },
    // customers() {
    //   return this.GetActaulSales.filter(item => item.type === 'customer' );
    // },
    // getCustomersItem() {
    //   return (this.GetActaulSales || []).filter(item => item.type === 'customerItem');
    // },
   
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
