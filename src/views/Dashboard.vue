
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
  import {  fetchSalesSummary } from '../services/reportapi/getdataApi';

         
import "../../src/assets/css/styleGlobal.css";

import DatePicker from './components/Datepicker.vue';
import FilterBrand from './components/FilterBrands.vue';
import FilterChannel from './components/FilterChannels.vue';
import FilterStoreType from './components/FilterStoreTypes.vue';
import FilterAcGroup from './components/FilterKeyAccountGroups.vue';
import FilterAccountName from './components/FilterCustomerNames.vue';

</script>


<template>
  <div hidden>
    <h1>ข้อมูลจาก API {{ lastYear }}</h1>
    <div v-if="loading">กำลังโหลด...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <h2>Sales Summary:</h2>
      <h2>ข้อมูลเพิ่มเติม:</h2>
    </div>
  </div>

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
            <div class="col-md-2">
              <FilterAccountName @update:accountnames="updateSelectedKeyAccountName"/>
            </div>

            <div class="col-md-2">
              <FilterAcGroup @update:accgroups="updateSelectedKeyAccountGroup"/>
            </div>

          
    
          </div>
          <div class="row">
            <div class="col-md-10"></div>
              <div class="col-md-1">
                <div class="form-group">
                  <label for="exampleSelect"></label>
                  <button class="btn mb-0  fw-lighter  btn-md null  " style="position: absolute;" @click="resetForm">Reset</button>
                
                </div>
            </div>
              <div class="col-md-1">
                <div class="form-group">
                  <label for="exampleSelect"></label>
                  <button class="btn mb-0 btn-md text-white fw-lighter null bg-primary" style="position: absolute;" @click="applySearch">Apply</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

   
  <div class="py-4 container-fluid bg-white shadow-lg" v-if="SalesTargetsSummary" >
    <div class="row mb-3">
      <div class="col-lg-4 col-md-6 col-6 text-left">
        <h6 class="text-dark font-weight-bolder align-middle" > Total Company : {{ SalesTargetsSummary[0].month_txt}} {{ SalesTargetsSummary[0].current_year }}</h6> 
      </div>  
      <div class="col-lg-4 text-left"> 
        <div class="">
          <button class="btn mb-0 bg-button-orange btn-md w-100 null "><i class="fa fa-exclamation-circle"></i> New Customer Group</button>
        </div>
      </div>
      <div class="col-lg-4 text-end  ">
        <span class="text-date"> Ass Of <i class="fa fa-calendar" aria-hidden="true"></i> {{month_txt_current }} {{ day_now }}
        </span>


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

  <div class="py-4 container-fluid bg-white shadow-lg" v-else >
    <div class="row mb-3">
      <div class="col-lg-6 col-md-6 col-6 text-left">
        <h6 class="text-dark font-weight-bolder align-middle" > Total Company : {{ month_txt_current}} {{ currentYaer }}</h6> 
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
                    <p class="text-sm mb-0">Actual {{ month_txt_current}} {{ lastYear }}</p>
                  </div>
                  <div class=' text-md text-dark font-weight-bolder '>
                    <h5 class="mb-0"><b> - </b></h5>
                  </div>
                </div>
              </div>

              <div class="mt-1 card move-on-hover">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0">%A {{currentYaer }} /A {{lastYear }}</p>
                  </div>
                  <div class=' text-md text-dark font-weight-bolder '>
                    <h5 class="mb-0"><b>0 %</b></h5>
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
                      <h4 class="mb-6 text-white"><b> - </b></h4>
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
                    <p class="font-weight-bolder mb-0 mr-5 fz-12 mt-1 text-white"> % toTarget {{ currentYaer }}  </p>
                    <div class='mt-4  text-md  font-weight-bolder '>
                      <h4 class="mb-6 text-white"><b>0 %</b></h4>
                     
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
                    <h5 class="mb-0 text-white"><b>0 </b></h5>
                  </div>
                </div>
              </div>

              <div class="mt-1 card move-on-hover text-white bg-card_blue">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0 font-weight-bolder text-white">Estimate</p>
                  </div>
                  <div class=' text-md  font-weight-bolder '>
                    <h5 class="mb-0 text-white"><b>0 </b></h5>
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
                    <h5 class="mb-0"><b> 0 </b></h5>
                  </div>
                </div>
              </div>

              <div class="mt-1 card move-on-hover">
                <div class="card-body">
                  <div class="">
                    <p class="text-sm mb-0">%T {{ currentYaer }} /A {{ lastYear }}</p>
                  </div>
                  <div class=' text-md text-dark font-weight-bolder '>
                    <h5 class="mb-0"><b> 0  %</b></h5>
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
                      <h4 class="mb-6 text-white"><b>0</b></h4>
                    </div>
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
            <h4 class="font-weight-bolder">Details</h4>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0" v-if="SalesTargetsSummary.length > 0">
                <thead >
                  <tr class=" bg-light bd_spc ">
                    <th style="text-align: left !important;" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark" >
                    Product
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
                  
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark" style="position: relative; height: 100%;">
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
                <tbody>
                  <tr class="text-center" v-for="(item, data_brands) in brandSales" :key="data_brands">
                    <td style="text-align: left !important;">
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
                    <template v-for="(customerItem, itemIndex) in subgroup.subgroup.customers_items" :key="itemIndex">
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
                    </template>
                    <!-- Subgroup -->
                    <tr class="text-xs font-weight-bold mb-0 bg_subgroub">
                      <td class="text-left rounded-left"> TOTAL {{ subgroup.subgroup.subgroup }}</td>
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
                    <tr class="text-xs font-weight-bold mb-0 bg_groub ">
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
                    </tr>
                  </template>
                </template>
                    <tr v-for="(customer, index) in customers" :key="index" class="bg_grandtotal">
                      <td class="rounded-left">
                        <p class="text-xs font-weight-bold mb-0 pd-5 ">GRAND TOTAL {{ customer.name}}</p>
                      </td>
                      <td  class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_last_actual) }}</p>
                      </td>
                      <td  class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_target) }}</p>
                      </td>
                      <td  class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_last_target_percent) }} %</p>
                      </td>
                      <td  class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate) }}</p>
                      </td>
                      <td v-if="isColumnVisible"  class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w1) }}</p>
                      </td>
                      <td v-if="isColumnVisible" class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w2) }}</p>
                      </td>
                      <td v-if="isColumnVisible" class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w3) }}</p>
                      </td>
                      <td v-if="isColumnVisible" class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w4) }}</p>
                      </td>
                      <td v-if="isColumnVisible" class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_estimate_w5) }}</p>
                      </td>
                      <td class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.last_return) }}</p>
                      </td>
                      <td class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_actual) }}</p>
                      </td>
                      <td class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.current_target) }} %</p>
                      </td>
                      <td class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.display_current_last_actual_percent) }} %</p>
                      </td>
                      <td class="text-center">
                        <p class="text-xs font-weight-bold mb-0">{{ formatNumber(customer.saleData.last_return) }}</p>
                      </td>
                      <td class="text-center rounded-right">
                        <p class="text-xs font-weight-bold mb-0 ">{{ formatNumber(customer.saleData.current_return) }}</p>
                      </td>    
                    </tr>
              </tbody>
            </table>

   
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
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0" v-if="accountName.length > 0">
                <thead class="bg-light">
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"
                    >
                    Key Account Name
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
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark" style="position: relative; height: 100%;">
                      Estimate {{ SalesTargetsSummary[0].month_txt_last}}
                      <span @click="toggleColumnCusName"  class="span_toggle">
                        <i class="fa" :class="isColumnVisibleCusName ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
                      </span>
                    </th>
                    <th v-if="isColumnVisibleCusName" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 1</th>
                    <th v-if="isColumnVisibleCusName" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 2</th>
                    <th v-if="isColumnVisibleCusName" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 3</th>
                    <th v-if="isColumnVisibleCusName" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 4</th>
                    <th v-if="isColumnVisibleCusName" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 5</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Sales before return</th>
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
                <tbody>
                  <tr class="text-center" v-for="(item, data_acc) in accountName" :key="data_acc">
                    <td style="text-align: left !important;">
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
                    <td v-if="isColumnVisibleCusName">
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w1) }}</p>
                  </td>
                  <td v-if="isColumnVisibleCusName">
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w2) }}</p>
                  </td>
                  <td v-if="isColumnVisibleCusName">
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w3) }}</p>
                  </td>
                  <td v-if="isColumnVisibleCusName">
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w4) }}</p>
                  </td>
                  <td v-if="isColumnVisibleCusName" >
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

  <div class="py-4 mt-4 container-fluid" v-if="SalesTargetsSummary" >
    <div class="row">
      <div class="col-12">
        
        <div class="card">
         
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0" v-if="SalesTargetsSummary.length > 0">
                <thead >
                  <tr class="bg-light">
                    <th style="text-align: left !important;"
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
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark" style="position: relative; height: 100%;" >
                      Estimate {{ SalesTargetsSummary[0].month_txt_last}}
                      <span @click="toggleColumnCusGroup"  class="span_toggle">
                        <i class="fa" :class="isColumnVisibleCusGroup ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
                      </span>
                    </th>
                    <th v-if="isColumnVisibleCusGroup" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 1</th>
                    <th v-if="isColumnVisibleCusGroup" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 2</th>
                    <th v-if="isColumnVisibleCusGroup" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 3</th>
                    <th v-if="isColumnVisibleCusGroup" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 4</th>
                    <th v-if="isColumnVisibleCusGroup" class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Week 5</th>
                    <th class="text-uppercase text-secondary text-sm font-weight-bolder text-dark"> Sales before return</th>
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
                <tbody v-if="accountGroub.length > 0">
                  <tr class="text-center" v-for="(item, data_group) in accountGroub" :key="data_group">
                    <td style="text-align: left !important;">
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
                    <td v-if="isColumnVisibleCusGroup">
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w1) }}</p>
                  </td>
                  <td v-if="isColumnVisibleCusGroup">
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w2) }}</p>
                  </td>
                  <td v-if="isColumnVisibleCusGroup">
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w3) }}</p>
                  </td>
                  <td v-if="isColumnVisibleCusGroup">
                    <p class="text-xs font-weight-bold mb-0">{{ formatNumber(item.saleData.current_estimate_w4) }}</p>
                  </td>
                  <td v-if="isColumnVisibleCusGroup">
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

</template>

<script>

export default {
 
  components: {
    DatePicker,
    FilterBrand,
    FilterChannel,
    FilterAcGroup,
    FilterAccountName,
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
        this.SalesTargetsSummary = await fetchSalesSummary(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedChannelIDs,this.selectedStortTypeIDs,this.selectedAccountNameIDs,this.selectedAccountGroupIDs);
      
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
      this.SalesTargetsSummary = await fetchSalesSummary(this.selectedYear,this.selectedMonth,this.selectedBrandIDs,this.selectedChannelIDs,this.selectedStortTypeIDs,this.selectedAccountNameIDs,this.selectedAccountGroupIDs);
      console.log('Select  selectedBrandIDs', this.selectedBrandIDs);
      console.log('Select  selectedChannelIDs', this.selectedChannelIDs);
      console.log('Select  selectedAccountNameIDs', this.selectedAccountNameIDs);
      console.log('Select  selectedAccountGroupIDs', this.selectedAccountGroupIDs);
      console.log('Select  selectedStortTypeIDs', this.selectedStortTypeIDs);
    },
    async resetForm() {
      window.location.reload();
    },
  
    
  },
  computed: {
    brandSales() {
    return this.SalesTargetsSummary.filter(item => item.type === 'brand');
    },
    overallSummary() {
      return this.SalesTargetsSummary.find(item => item.type === 'overall');
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
