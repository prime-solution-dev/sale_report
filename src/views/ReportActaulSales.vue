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
  /* .bg_groub{
    background-color: #E6FAD2!important;
  }
  .bg_subgroub{
    background-color: #FFE0CA!important;
  }
  .bg_grandtotal{
    background-color: #D2E1FA!important;
  } */

</style>
<script setup>
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
            <label for="exampleSelect">Month</label>
          
          </div>
        </div>

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
            <label for="exampleSelect">Customer Group</label>
            <select class="form-control" id="acc_name_id">
              <option> Select Key account Name </option>
              <option v-for="(acc_name, index) in GetAccountName" :key="index" :value="acc_name.code" > {{ acc_name.code }} </option>

            </select>
          </div>
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

   


  <div class="py-4 mt-4 container-fluid" v-if="SalesTargetsSummary">
    <div class="row">
      <div class="col-12">
        
        <div class="card">
          <div class="card-header pb-0">
            <h4 class="font-weight-bolder">ActualSales QTY Report </h4>
          </div>
         
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-3">
              <table class="table align-items-center mb-0 table-borderless">
              <thead class="bg-light">
                <tr class= "text-uppercase text-secondary text-sm font-weight-bolder text-dark">
                  <th > Customer   </th>
                  <th > Brand   </th>
                  <th > SKU Type   </th>
                  <th > SKU   </th>
                  <th > Child Code   </th>
                  <th > Description   </th>
                  <th > QTY   </th>
                  <th > Invoice Net Amount WO Vat   </th>
                  <th > Return Base Unit   </th>
                  <th > Return Net Amount WO Vat   </th>


                   
                </tr>
              </thead>
              <tbody>
               <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
               </tr>
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
