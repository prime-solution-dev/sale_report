<style>
  .bg-card_blue{
      background-color:  #0081CC!important;
  }

  .bg-icon_card{
    background-color: white;
    padding: 6px;
    float: right;
    border-radius: 7px;
    width: 24px;
    height: 26px;
    
  }
  .fz-14{
    font-size:14px;
  }
  .fz-12{
    font-size:12px;
  }
  .fz-10{
    font-size:10px;
  }
  .bg-button-orange{
    background-color: #F35746!important;
    color:white!important;
  }
  .bg_groub{
    background-color: #E6FAD2!important;
  }
  .bg_subgroub{
    background-color: #FFE0CA!important;
  }
  .bg_grandtotal{
    background-color: #D2E1FA!important;
  }

</style>
<script setup>
 // import AuthorsTable from "./components/AuthorsTable.vue";
  import { formatNumber } from 'chart.js/helpers';
  import {  fetchGetBrand, fetchGetChannel,fetchStoreType , 
            fetchAccountGroup , fetchAccountName ,fetchSalesSummary
         } from '../services/reportapi/getdataApi';
</script>


<template>
 

<div class="py-4 container-fluid bg-white shadow-md">

<div class="row mb-3">
  <div class="col-lg-12 col-md-12 col-12">
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <div class="form-group">
            <label for="exampleSelect">Brand</label>
            <select class="form-control" id="brand_id">
              <option> Select Brand </option>
              <option v-for="(brands, index) in GetBrand" :key="index" :value="brands.code" > {{ brands.code }} </option>
            </select>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group">
            <label for="exampleSelect">Channel</label>
            <select class="form-control" id="channel_id" v-model="selectedChannel" @change="handleChannelChange">
              <option value=""> Select Chanel</option>
              <option v-for="(channels, index) in GetChannel" :key="index" :value="channels.code">{{ channels.code }} </option>
            </select>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group">
            <label for="exampleSelect">Store type</label>
            <select class="form-control" id="store_types_id" v-model="selectedStoreType">
              <option> Select Store type</option>
              <option v-for="(store_types, index) in GetStoreType" :key="index" :value="store_types.code" > {{ store_types.code }} </option>
            </select>
          </div>
        </div>

     

        <div class="col-md-2">
          <div class="form-group">
            <label for="exampleSelect">Key account Name</label>
            <select class="form-control" id="acc_name_id">
              <option> Select Key account Name </option>
              <option v-for="(acc_name, index) in GetAccountName" :key="index" :value="acc_name.code" > {{ acc_name.code }} </option>

            </select>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group">
            <label for="exampleSelect">Key account group</label>
            <select class="form-control" id="acc_group_id">
              <option> Select Key account group </option>
              <option v-for="(acc_group, index) in GetAccountGroup" :key="index" :value="acc_group.code" > {{ acc_group.code }} </option>

              
            </select>
          </div>
        </div>

        <div class="col-md-1">
          <div class="form-group">
            <label for="exampleSelect"></label>
            <button class="btn mb-0  fw-lighter  btn-md null  ">Reset</button>
          
          </div>
        </div>
        <div class="col-md-1">
          <div class="form-group">
            <label for="exampleSelect"></label>
            <button class="btn mb-0 btn-md text-white fw-lighter null bg-primary">Apply</button>
          </div>
        </div>
 
      </div>
    </div>
  </div>
</div>
</div>


  <div class="py-4 mt-4 container-fluid" v-if="SalesTargetsSummary" >
    <div class="row">
      <div class="col-12">
        
        <div class="card">
          <div class="card-header pb-0">
            <h4 class="font-weight-bolder">DAILY SALES REPORT - By Key account group</h4>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0" v-if="SalesTargetsSummary.length > 0">
                <thead class="bg-light">
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Key Account Group
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
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">
                      Estimate {{ SalesTargetsSummary[0].month_txt_last}}
                    </th>
                    <!-- <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 1</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 2</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 3</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 4</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 5</th> -->
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Sales before return</th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Actual Sales {{ SalesTargetsSummary[0].month_txt}} {{ SalesTargetsSummary[0].current_year }}

                    </th>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    %%To Target 24

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
                <tbody>
                  <tr class="text-center" v-for="(item, data_group) in accountGroub" :key="data_group">
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ item.name}}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_last_actual) }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_target) }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_current_last_target_percent) }} %</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate) }}</p>
                    </td>
                    <!-- <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w1) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w2) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w3) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w4) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w5) }}</p>
                  </td> -->
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.last_return) }}</p>
                  </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_current_actual) }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_target) }} %</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.display_current_last_actual_percent) }} %</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.last_return) }}</p>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_return) }}</p>
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
  data() {
    return {
      GetChannel: [],
      GetStoreType: [],
      selectedChannel: null, 
      selectedStoreType: null, 
      SalesTargetsSummary: null,
      GetBrand: null,
      GetAccountGroup: null,
      GetAccountName: null,
      customersItem:null,
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
        this.GetChannel = await fetchGetChannel();
        this.GetAccountGroup = await fetchAccountGroup();
        this.GetAccountName = await fetchAccountName();
        this.GetStoreType = await fetchStoreType(this.selectedChannel);
        this.SalesTargetsSummary = await fetchSalesSummary();
      
        
      } catch (error) {
        this.error = error; // จัดการข้อผิดพลาด
        console.error(this.error);
      } finally {
        this.loading = false; // ปิดสถานะโหลด
      }
     
    },
  
    async handleChannelChange() {
        if (this.selectedChannel) {
         // console.log('Channel value is: ' + this.selectedChannel);
          try {
            this.GetStoreType = await fetchStoreType(this.selectedChannel);
          } catch (error) {
         //   console.error('Error fetching store types:', error);
          }
        } else {
       //   console.log('No channel selected');
          this.GetStoreType = []; // เคลียร์เมื่อไม่มีการเลือก channel
        }
      }
  },
  computed: {
    overallSummary() {
      return this.SalesTargetsSummary.find(item => item.type === 'overall');
    },
    brandSales() {
    return this.SalesTargetsSummary.filter(item => item.type === 'brand');
    },
    accountGroub() {
    return this.SalesTargetsSummary.filter(item => item.type === 'account');
    },
    accountName() {
    return this.SalesTargetsSummary.filter(item => item.type === 'name');
    },
    customers() {
      return this.SalesTargetsSummary.filter(item => item.type === 'customer' );
    },
    // customersItem() {
    //   return this.SalesTargetsSummary.filter(item => item.type === 'customerItem' );
      
    // },
    //   customersItem() {
    //   return (this.SalesTargetsSummary || []).filter(item => item.type === 'customerItem');
    // },

    getCustomersItem() {
      return (this.SalesTargetsSummary || []).filter(item => item.type === 'customerItem');
    },
    
  }
  ,
  created() {
    
    this.fetchData(); // component created
    
  }
  
};


</script>
