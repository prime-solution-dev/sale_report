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
</style>
<script setup>
 // import AuthorsTable from "./components/AuthorsTable.vue";
  import { formatNumber } from 'chart.js/helpers';
import {  fetchGetBrand, fetchGetChannel,fetchStoreType , 
            fetchAccountGroup , fetchAccountName ,fetchSalesSummary
         } from '../services/reportapi/getdataApi';
</script>


<template>
  <div hidden>
    <h1>ข้อมูลจาก API</h1>
    <div v-if="loading">กำลังโหลด...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <h2>Sales Summary:</h2>
      <!-- <pre>{{ summary }}</pre> -->
      <h2>ข้อมูลเพิ่มเติม:</h2>
      <pre>{{ GetBrand }}</pre>
     
    </div>
  </div>

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

   
  <div class="py-4 container-fluid bg-white shadow-lg" v-if="SalesTargetsSummary">
    <div class="row mb-3">
      <div class="col-lg-6 col-md-6 col-6 text-left">
        <h6 class="text-dark font-weight-bolder align-middle" > Total Company : {{ SalesTargetsSummary[0].month_txt}} {{ SalesTargetsSummary[0].current_year }}</h6> 
      </div>  
      <div class="col-lg-4 text-left"> 
        <div class="">
          <button class="btn mb-0 bg-button-orange btn-md w-100 null "><i class="fa fa-exclamation-circle"></i> New Customer Group</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="row ">
          <div class="col-lg-2 col-md-6 col-12 text-center">
            <div class="card move-on-hover">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0">Actual {{ SalesTargetsSummary[0].month_txt}} {{ SalesTargetsSummary[0].last_year }}</p>
                  </div>
                  <div class=' text-md text-dark font-weight-bolder '>
                    <h5 class="mb-0"><b>{{ formatNumber(overallSummary.saleData.display_last_actual) }}</b></h5>
                  </div>
                </div>
              </div>

              <div class="mt-1 card move-on-hover">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0">%A {{ SalesTargetsSummary[0].current_year }} /A {{ SalesTargetsSummary[0].last_year }}</p>
                  </div>
                  <div class=' text-md text-dark font-weight-bolder '>
                    <h5 class="mb-0"><b>{{ formatNumber(overallSummary.saleData.display_current_last_actual_percent) }} %</b></h5>
                  </div>
                </div>
              </div>
        </div>
          
          <div class="col-lg-2 col-md-6 col-12 text-center  flex-row" >
            <div class="card move-on-hover text-white bg-card_blue ">
                <div class="card-body">
                    <div class="">
                      <p class="font-weight-bolder mb-0 mr-5 fz-12">
                        <span class="text-primary text-right bg-icon_card "> 
                          <i class="ni ni-chart-bar-32"></i>
                        </span> 
                      </p>
                    </div>
                    <p class="font-weight-bolder mb-0 mr-5 fz-14 mt-1">&nbsp;Actual MTD  </p>
                    <div class='mt-4  text-md  font-weight-bolder '>
                      <h4 class="mb-6 text-white"><b>{{ formatNumber(overallSummary.saleData.display_current_actual) }}</b></h4>
                    </div>
                </div>
              </div>
          </div>

          <div class="col-lg-2 col-md-6 col-12 text-center  flex-row" >
            <div class="card move-on-hover text-white bg-card_blue ">
                <div class="card-body">
                    <div class="">
                      <p class="font-weight-bolder mb-0 mr-5 fz-12">
                        <span class="text-primary text-right bg-icon_card "> 
                          <i class="ni ni-chart-bar-32"></i>
                        </span> 
                      </p>
                    </div>
                    <p class="font-weight-bolder mb-0 mr-5 fz-12 mt-1 text-white"> % toTarget {{ SalesTargetsSummary[0].current_year }}  </p>
                    <div class='mt-4  text-md  font-weight-bolder '>
                      <h4 class="mb-6 text-white"><b>{{ formatNumber(overallSummary.saleData.display_current_to_target_percent) }}%</b></h4>
                     
                    </div>
                </div>
              </div>
          </div>

          <div class="col-lg-2 col-md-6 col-12 text-center">
              <div class="card move-on-hover text-white bg-card_blue">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0 text-white font-weight-bolder">Target</p>
                  </div>
                  <div class=' text-md font-weight-bolder '>
                    <h5 class="mb-0 text-white"><b>{{ formatNumber(overallSummary.saleData.current_target) }}</b></h5>
                  </div>
                </div>
              </div>

              <div class="mt-1 card move-on-hover text-white bg-card_blue">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0 font-weight-bolder text-white">Estimate</p>
                  </div>
                  <div class=' text-md  font-weight-bolder '>
                    <h5 class="mb-0 text-white"><b>{{ formatNumber(overallSummary.saleData.current_estimate) }}</b></h5>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-lg-2 col-md-6 col-12 text-center">
            <div class="card move-on-hover">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0">Return</p>
                  </div>
                  <div class=' text-md text-dark font-weight-bolder '>
                    <h5 class="mb-0"><b>{{ formatNumber(overallSummary.saleData.current_return) }}</b></h5>
                  </div>
                </div>
              </div>

              <div class="mt-1 card move-on-hover">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0">%T {{ SalesTargetsSummary[0].current_year }} /A {{ SalesTargetsSummary[0].last_year }}</p>
                  </div>
                  <div class=' text-md text-dark font-weight-bolder '>
                    <h5 class="mb-0"><b>{{ formatNumber(overallSummary.saleData.display_current_last_target_percent) }} %</b></h5>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-6 col-12 text-center  flex-row" >
            <div class="card move-on-hover text-white bg-card_blue ">
                <div class="card-body">
                    <div class="">
                      <p class="font-weight-bolder mb-0 mr-5 fz-12">
                        <span class="text-primary text-right bg-icon_card "> 
                          <i class="ni ni-chart-bar-32"></i>
                        </span> 
                      </p>
                    </div>
                    <p class="font-weight-bolder mb-0 mr-5 fz-12 mt-1">&nbsp;&nbsp;&nbsp; Balance to go  </p>
                    <div class='mt-4  text-md  font-weight-bolder '>
                      <h4 class="mb-6 text-white"><b>{{ formatNumber(overallSummary.saleData.display_current_balance) }}</b></h4>
                    </div>
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
            <h4 class="font-weight-bolder">Details</h4>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0" v-if="SalesTargetsSummary.length > 0">
                <thead class="bg-light">
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Products
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
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Estimate {{ SalesTargetsSummary[0].month_txt_last}}

                    </th>
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
                  <tr class="text-center" v-for="(item, data_brands) in brandSales" :key="data_brands">
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


  <div class="py-4 mt-4 container-fluid" v-if="SalesTargetsSummary">
    <div class="row">
      <div class="col-12">
        
        <div class="card">
         
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0">
              <thead class="bg-light">
                <tr>
                  <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Channel
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
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Estimate {{ SalesTargetsSummary[0].month_txt_last}}

                    </th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Week 1</th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Week 2</th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Week 3</th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Week 4</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark" >Week 5</th>
                    <th  class="text-uppercase text-secondary text-sm font-weight-bolder text-dark">Sales before Return</th>
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
              <tbody class="text-center">
   
                <!-- <tr v-for="(group, index) in customerGroups" :key="index">
                  <td>Customer Group</td>
                  <td>{{ group.name }}</td>
                  <td>{{ formatNumber(group.saleData.current_sale) }}</td>
                  <td>{{ formatNumber(group.saleData.current_target) }}</td>
                  <td>{{ formatNumber(group.saleData.current_estimate) }}</td>
                  <td>{{ formatNumber(group.saleData.current_balance) }}</td>
                </tr>

                <tr v-for="(subgroup, idx) in customerSubgroups" :key="idx">
                  <td>Customer Subgroup</td>
                  <td>{{ subgroup.name }}</td>
                  <td>{{ formatNumber(subgroup.saleData.current_sale) }}</td>
                  <td>{{ formatNumber(subgroup.saleData.current_target) }}</td>
                  <td>{{ formatNumber(subgroup.saleData.current_estimate) }}</td>
                  <td>{{ formatNumber(subgroup.saleData.current_balance) }}</td>
                </tr>

                <tr v-for="(item, itemIndex) in customerItems" :key="itemIndex">
                  <td>Customer Item</td>
                  <td>{{ item.name }}</td>
                  <td>{{ formatNumber(item.saleData.current_sale) }}</td>
                  <td>{{ formatNumber(item.saleData.current_target) }}</td>
                  <td>{{ formatNumber(item.saleData.current_estimate) }}</td>
                  <td>{{ formatNumber(item.saleData.current_balance) }}</td>
                </tr>
                <tr v-for="(customer, index) in customers" :key="index">
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ customer.name}}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_last_actual) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_target) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_last_target_percent) }} %</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w1) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w2) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w3) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w4) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w5) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.last_return) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_actual) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_target) }} %</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_last_actual_percent) }} %</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.last_return) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_return) }}</p>
                  </td>    
                </tr> -->

          <!-- <tr v-for="item in SalesTargetsSummary" :key="item.name">
          <td>{{ item.type }}</td>
          <td>{{ item.name }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr> -->
        <!-- <tr v-for="customerGroup in customerGroups" :key="customerGroup.name">
          <td>Customer Group</td>
          <td>{{ customerGroup.name }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="customerSubgroup in customerSubgroups" :key="customerSubgroup.name">
          <td>Customer Subgroup</td>
          <td>{{ customerSubgroup.name }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr> -->
       
      <!-- <tr v-for="customerGroup in customerGroups" :key="customerGroup.name">
          <td>
              <p class="text-xs font-weight-bold mb-0">{{ customerGroup.type }} {{ customerGroup.name }}</p>
          </td>
          
    </tr> -->

 

              <tr v-for="(customer, index) in customers" :key="index">
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ customer.name}}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_last_actual) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_target) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_last_target_percent) }} %</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w1) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w2) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w3) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w4) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w5) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.last_return) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_actual) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_target) }} %</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_last_actual_percent) }} %</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.last_return) }}</p>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_return) }}</p>
                  </td>    
                </tr>
            <!-- <tr v-for="customerGroup in customerGroups" :key="customerGroup.name">
              <td>Customer Group</td>
              <td>{{ customerGroup.name }}</td>
            </tr>
            <tr v-for="customerSubgroup in customerSubgroups" :key="customerSubgroup.name">
              <td>Customer Subgroup</td>
              <td>{{ customerSubgroup.name }}</td>
              
            </tr>
            <tr v-for="customerItem in customerItems" :key="customerItem.name">
              <td>Customer Item</td>
              <td>{{ customerItem.name }}</td>
            </tr> -->
              </tbody>
    </table>

   
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
         
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0" v-if="SalesTargetsSummary.length > 0">
                <thead class="bg-light">
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    KeyAccountName
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
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 1</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 2</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 3</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 4</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 5</th>
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
                  <tr class="text-center" v-for="(item, data_acc) in accountName" :key="data_acc">
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
                    <td>
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
                  </td>
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

  <div class="py-4 mt-4 container-fluid" v-if="SalesTargetsSummary">
    <div class="row">
      <div class="col-12">
        
        <div class="card">
         
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
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 1</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 2</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 3</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 4</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 5</th>
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
                    <td>
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
                  </td>
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

  <!-- <table>
  <thead>
    <tr>
      <th>Customer Group</th>
      <th>Customer Subgroup</th>
      <th>Customer Item</th>
      <th>Sale Data</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="group in customerGroups" :key="group.cus">
      <td>{{ group.topic_name }}</td>
      <td>
        <table>
          <tr v-for="subgroup in customerSubgroups.filter(sub => sub.group.cus === group.cus)" :key="subgroup.cus">
            <td>{{ subgroup.topic_name }}</td>
            <td>
              <table>
                <tr v-for="item in customerItems.filter(i => i.subgroup.cus === subgroup.cus)" :key="item.cus">
                  <td>{{ item.topic_name }}</td>
                  <td>{{ item.sale_data.current_sale }}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </tbody>
</table> -->

  <!-- <pre>{{ SalesTargetsSummary}}</pre>  -->
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
//       //  console.log("SalesTargetsSummary:", this.SalesTargetsSummary);
//       console.log("Customer Groups:", this.customerGroups);
// console.log("Customer Subgroups:", this.customerSubgroups);
// console.log("Customer Items:", this.customerItems);

        const summary = await fetchSalesSummary();

        if (summary && summary.length > 0) {
          this.SalesTargetsSummary = summary;
        } else {
          this.error = "No sales summary data available.";
        }
        
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
    
    // customerGroups() {
    //   return this.SalesTargetsSummary.map(group => group.group); // ดึงข้อมูลกลุ่มลูกค้า
      
    // },
    
    // customerSubgroups() {
    //   return this.SalesTargetsSummary.flatMap(group => group.group.customers_subgroups.map(subgroup => subgroup.subgroup)); // แยก subgroup
    // },

    // customerItems() {
    //   return this.SalesTargetsSummary.flatMap(group => 
    //     group.group.customers_subgroups.flatMap(subgroup => 
    //       subgroup.subgroup.customers_items.map(item => item.item)
    //     )
    //   );
    // }
    customerGroups() {
      return this.SalesTargetsSummary(this.SalesTargetsSummary)
        ? this.SalesTargetsSummary.map(group => group.group || {})
        : []; // ส่งคืน array ว่างเมื่อไม่มีข้อมูล
       
    },

    // customerSubgroups() {
    //   return this.SalesTargetsSummary && Array.isArray(this.SalesTargetsSummary)
    //     ? this.SalesTargetsSummary.flatMap(group => 
    //         group.group && group.group.customers_subgroups 
    //           ? group.group.customers_subgroups.map(subgroup => subgroup.subgroup) 
    //           : []
    //       )
    //     : []; // ส่งคืน array ว่างเมื่อไม่มีข้อมูล
    // },

    // customerItems() {
    //   return this.SalesTargetsSummary && Array.isArray(this.SalesTargetsSummary)
    //     ? this.SalesTargetsSummary.flatMap(group => 
    //         group.group && group.group.customers_subgroups 
    //           ? group.group.customers_subgroups.flatMap(subgroup => 
    //               subgroup.subgroup.customers_items 
    //                 ? subgroup.subgroup.customers_items.map(item => item.item) 
    //                 : []
    //             ) 
    //           : []
    //       )
    //     : []; // ส่งคืน array ว่างเมื่อไม่มีข้อมูล
    // }

   
    
    
  }
  
  ,
  created() {
    
    this.fetchData(); // เรียกใช้ฟังก์ชันเมื่อ component ถูกสร้าง
    
  }
  
};


</script>
