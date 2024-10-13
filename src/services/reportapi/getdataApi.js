import axios from 'axios';
const hostapi = 'http://61.91.5.227:8099/';

  export const getMonthAbbreviation = (monthNumber) => {
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


  export const fetchSalesSummary = async (yearid,monthid,brandid,channelid,storetypeid,keynameid,keygroup) => {
      
      const url = hostapi + 'Sales/GetSummarySalesTargets';
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 

     
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear(); // ปีปัจจุบัน
      const MonthCurrent = new Date(currentDate.setMonth(currentDate.getMonth())).getMonth() + 1; // เดือนที่แล้ว (1-12)
   //   const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).getMonth() + 1; // เดือนที่แล้ว (1-12)
    //  console.log(currentYear,previousMonth);


      const v_year= yearid;
      const v_month= monthid;


      const v_brandid= brandid;
      const v_channelid= channelid;
      const v_storetypeid= storetypeid;
      const v_keynameid= keynameid;
      const v_keygroup= keygroup;
     //  console.log('fetch_='+v_brandid+' 2:'+v_channelid +' 3:'+v_storetypeid + ' 4:'+v_keynameid+' 5:'+v_keygroup);
     
  
      const body = {
        year: 0,
        month: 0,
        brands: [],
        customers: [],
        store_types: [],
        channels: [],
        account_groups: [],
        account_names: []
      };


        if (v_year) { 
          body.year = v_year;
        } else {
          body.year = currentYear; // ค่าปีปัจจุบันเป็นตัวเลข
        }

        if (v_month) { 
          body.month = v_month;
        } else {
          body.month = MonthCurrent; // ค่าเดือนที่แล้วเป็นตัวเลข
        }
   
    
      // กำหนดค่า brands
      if (v_brandid && Array.isArray(v_brandid)) {
        // กระจายค่าใน v_brandid เข้าไปใน brands
        body.brands.push(...v_brandid);
      }
      if (v_channelid && Array.isArray(v_channelid)) {
        body.channels.push(...v_channelid);
     }
      if (v_storetypeid && Array.isArray(v_storetypeid)) {
         body.store_types.push(...v_storetypeid);
      }
    
      if (v_keynameid && Array.isArray(v_keynameid)) {
        body.account_names.push(...v_keynameid);
     }
      if (v_keygroup && Array.isArray(v_keygroup)) {
        body.account_groups.push(...v_keygroup);
     }
     
      try {
        const response = await axios.post(url, body, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          }
        });
       // console.log(''+body);
      const monthNumber = response.data.current_month; 
      const monthAbbr = getMonthAbbreviation(monthNumber); 
      const monthAbbr_last = getMonthAbbreviation(monthNumber-1); 
    //  console.log(monthAbbr);
        //
        const salesDataArray = [];
        salesDataArray.push({
          type: 'data',
            last_year: response.data.last_year,
            current_month: response.data.current_month,
            current_year: response.data.current_year,
            month_txt:monthAbbr,
            month_txt_last:monthAbbr_last,
          
        });
        salesDataArray.push({
          type: 'overall',
          saleData: {
          
            last_sale: response.data.sale_data.last_sale,
            last_return: response.data.sale_data.last_return,
            current_sale: response.data.sale_data.current_sale,
            current_return: response.data.sale_data.current_return,
            current_target: response.data.sale_data.current_target,
            current_estimate: response.data.sale_data.current_estimate,
            current_estimate_w1: response.data.sale_data.current_estimate_w1,
            current_estimate_w2: response.data.sale_data.current_estimate_w2,
            current_estimate_w3: response.data.sale_data.current_estimate_w3,
            current_estimate_w4: response.data.sale_data.current_estimate_w4,
            current_estimate_w5: response.data.sale_data.current_estimate_w5,
            display_last_actual: response.data.sale_data.display_last_actual,
            display_current_actual: response.data.sale_data.display_current_actual,
            display_current_last_actual_percent: response.data.sale_data.display_current_last_actual_percent,
            display_current_to_target_percent: response.data.sale_data.display_current_to_target_percent,
            display_current_last_target_percent: response.data.sale_data.display_current_last_target_percent,
            display_current_balance: response.data.sale_data.display_current_balance,
          
            
          },
        });

    
        response.data.brands.forEach(brand => {
          salesDataArray.push({
            type: 'brand',
            name: brand.topic_name,
            saleData: brand.sale_data
          });
        });

      // SUM TOTAL 
        salesDataArray.push({
          type: 'customer',
          name: response.data.customers.topic_name,
          saleData: response.data.customers.sale_data
        });

        salesDataArray.push({
          type: 'summary_names',
          saleData: response.data.summary_names
        });


        salesDataArray.push({
          type: 'summary_account',
          saleData: response.data.summary_account
        });

        salesDataArray.push({
          type: 'summary_brands',
          saleData: response.data.summary_brands
        });
        ///////

        response.data.accounts.forEach(account => {
          salesDataArray.push({
            type: 'account',
            name: account.topic_name,
            saleData: account.sale_data
          });
        });

      
        response.data.names.forEach(name => {
          salesDataArray.push({
            type: 'name',
            name: name.topic_name,
            saleData: name.sale_data
          });
        });

  
        
        const customerGroupsWithKeys = response.data.customers.customers_groups.map((group, groupIndex) => {
          const customers_subgroups = group.customers_subgroups.map((subgroup, subgroupIndex) => {
            const items = subgroup.customers_items.map((item, itemIndex) => {
              return {
                item: {
                  item_key: itemIndex,
                  topic_name: item.topic_name,
                  sale_data_item: item.sale_data,
                }
              };
            });
        
            return {
              subgroup: {
                subgroup_key: subgroupIndex,
                subgroup: subgroup.topic_name,
                sale_data_subg: subgroup.sale_data, 
                customers_items: items
              }
            };
          });
        
          return {
            group: {
              groub_key: groupIndex,
              topic_name: group.topic_name,
              sale_data_groub: group.sale_data, 
              customers_subgroups
            }
          };
        });
      
        salesDataArray.push({
          type: 'customerItem',
          customerItem: customerGroupsWithKeys
        });
    //  console.log(JSON.stringify(customerGroupsWithKeys, null, 2));
      return salesDataArray; 
      
      } catch (error) {
       //  throw error.response ? error.response.data : 'เกิดข้อผิดพลาด'; 
      }
  };

  
  export const fetchGetBrand = async () => {
    const GetBrandApiUrl = hostapi+'Product/GetBrands'; // แทนที่ด้วย API ที่สอง
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
    const body = {
        
    };
    try {
      const response = await axios.post(GetBrandApiUrl, body,{
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
      return response.data; // ส่งค่ากลับ
    } catch (error) {
      throw error.response ? error.response.data : 'fetchGetBrand Error'; 
    }
  };

  export const fetchGetChannel= async () => {
    const GetChannelApiUrl = hostapi+'Customer/GetChannel'; 
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
    const body = {
      customer_groups: [],
      store_types: [],
      channels: []
    };
    try {
      const response = await axios.post(GetChannelApiUrl, body,{
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
      return response.data; // ส่งค่ากลับ
    } catch (error) {
      throw error.response ? error.response.data : ' fetchGetChannel Error.'; 
    }
  };
  export const fetchStoreType= async (channelcode) => {
    const v_code= channelcode;
    
  // console.log('channelid_fetch_='+v_code);
    if(v_code!==null){
  //
    }else{
      
  //
    }
    const GetStoreTypeApiUrl = hostapi+'Customer/GetStoreType'; 
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
    const body = {
      customer_groups: [],
      store_types: [],
      channels:[]
    };
  
    // if (v_code) { 
    //   body.channels.push(v_code);
    // } else {
    //   //console.warn('Channel code is empty or null.'); // แสดงคำเตือนถ้าไม่มีค่า
    // }

    if (v_code && Array.isArray(v_code)) {
      body.channels.push(...v_code);
    }else {
      //console.warn('Channel code is empty or null.'); // แสดงคำเตือนถ้าไม่มีค่า
    }
    try {
      const response = await axios.post(GetStoreTypeApiUrl, body,{
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
    const data = response.data; 
    //console.log('API response:', data); // ตรวจสอบ API response
    return data;

    } catch (error) {
      console.error('Error fetching store type:', error);
      throw error.response ? error.response.data : ' fetchGetStoreTypeError.'; 
    }
  };

  export const fetchAccountGroup= async () => {
    const GetAccountGroupApiUrl = hostapi+'Customer/GetAccountGroup'; 
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
    const body = {
  
    };
    try {
      const response = await axios.post(GetAccountGroupApiUrl, body,{
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
      return response.data; // ส่งค่ากลับ
    } catch (error) {
      throw error.response ? error.response.data : ' fetchAccountGroup Error.'; 
    }
  };

  export const fetchAccountName= async () => {
    const GetAccountNameApiUrl = hostapi+'Customer/GetAccountName'; 
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
    const body = {
  
    };
    try {
      const response = await axios.post(GetAccountNameApiUrl, body,{
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
      return response.data; // ส่งค่ากลับ
    } catch (error) {
      throw error.response ? error.response.data : ' fetchAccountName Error.'; 
    }
  };


  export const fetchAccountNameByGroup= async (groupcode) => {
    const GetAccountNameApiUrl = hostapi+'Customer/GetAccountName'; 
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
    const v_code= groupcode;
    if(v_code!==null){
      //
    }else{
      //
    }
    const body = {
      account_groups: [],
    };


    if (v_code && Array.isArray(v_code)) {
      body.account_groups.push(...v_code);
    }else {
      //console.warn('Channel code is empty or null.'); // แสดงคำเตือนถ้าไม่มีค่า
    }

    try {
      const response = await axios.post(GetAccountNameApiUrl, body,{
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
      return response.data; // ส่งค่ากลับ
    } catch (error) {
      throw error.response ? error.response.data : ' fetchAccountName Error.'; 
    }
  };

  export const fetchGetCustomer= async () => {
    const GetCustomeApiUrl = hostapi+'Customer/GetCustomers'; 
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
    const body = {
      "year" : 2024,
      "month" : 9,
      "brands" : [],
      "group_omss" : [],
      "products" : []
    };
    try {
      const response = await axios.post(GetCustomeApiUrl, body,{
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
      return response.data; // ส่งค่ากลับ
    } catch (error) {
      throw error.response ? error.response.data : ' fetchAccountName Error.'; 
    }
  };
  

  
  export const fetchGetActaulSales = async (yearid,monthid,brandid,group_omss,skutype) => {
      
    const url = hostapi + 'Sales/GetActualSales';
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 

   
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // ปีปัจจุบัน
    const currentMonth = new Date(currentDate.setMonth(currentDate.getMonth())).getMonth() + 1;
   // const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).getMonth() + 1; // เดือนที่แล้ว (1-12)
   // console.log(currentYear,previousMonth);


    // const v_year= yearid;
    // const v_month= monthid;
    // const v_brandid= brandid;
    // const v_group_omss= group_omss;
    // const v_skutype= skutype;
   
   //  console.log('v_skutype = '+v_skutype);
   

    const body = {
      year: yearid || currentYear, // ใช้ปีที่ระบุหรือตั้งเป็นปีปัจจุบัน
      month: monthid || currentMonth, // ใช้เดือนที่ระบุหรือตั้งเป็นเดือนปัจจุบัน
      brands: Array.isArray(brandid) ? [...brandid] : [], // กระจายค่าใน brandid
      group_omss: Array.isArray(group_omss) ? [...group_omss] : [], // กระจายค่าใน group_omss
      products: Array.isArray(skutype) ? [...skutype] : [] // ส่งเป็นอาเรย์
    };
    //console.log('Sending body:', body); 

  //     if (v_year) { 
  //       body.year = v_year;
  //     } else {
  //       body.year = currentYear; // ค่าปีปัจจุบันเป็นตัวเลข
  //     }

  //     if (v_month) { 
  //       body.month = v_month;
  //     } else {
  //       body.month = currentMonth; // ค่าเดือนที่แล้วเป็นตัวเลข
  //     }
   
  //   if (v_brandid && Array.isArray(v_brandid)) {
  //     // กระจายค่าใน v_brandid เข้าไปใน brands
  //     body.brands.push(...v_brandid);
  //   }
  //   if (v_group_omss && Array.isArray(v_group_omss)) {
  //     body.group_omss.push(...v_group_omss);
  //  }
  //   // if (v_skutype && Array.isArray(v_skutype)) {
  //   //    body.products.push(...v_skutype);
  //   // }
  //   if (v_skutype) { 
  //     body.products = JSON.stringify(v_skutype);
  //   } else {
  //     body.products = JSON.stringify([]);
  //   }
    try {
      const response = await axios.post(url, body, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });

    return  response.data; 
    
    } catch (error) {
      throw error.response ? error.response.data : 'เกิดข้อผิดพลาด'; 
    }
};


export const fetchGetCustomerGroups = async () => {
      
  const url = hostapi + 'Customer/GetCustomerGroup';
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
  const body = {
    customer_groups: [],
    channels: [],
    store_types: [],
  };
  
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    });
   // console.log(''+body);
  return  response.data; 
  
  } catch (error) {
    throw error.response ? error.response.data : 'fetchGetCustomerGroups'; 
  }
};


export const fetchReportCustomerGroups = async (yearid,monthid,brandid,channelid,storetypeid,customerid) => {
      
  const url = hostapi + 'Sales/GetSummarySalesTargets';
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 

 
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); // ปีปัจจุบัน
  const CurrentMonth = new Date(currentDate.setMonth(currentDate.getMonth())).getMonth() + 1; 


  const v_year= yearid;
  const v_month= monthid;
  //console.log(v_year,v_month,currentDate);

  const v_brandid= brandid;
  const v_channelid= channelid;
  const v_storetypeid= storetypeid;
  const v_customers= customerid;
 //  console.log('fetch_='+v_brandid+' 2:'+v_channelid +' 3:'+v_storetypeid + ' 4:'+v_keynameid+' 5:'+v_keygroup);
 

  const body = {
    year: 0,
    month: 0,
    brands: [],
    customers: [],
    store_types: [],
    channels: [],
    account_groups: [],
    account_names: []
  };


    if (v_year) { 
      body.year = v_year;
    } else {
      body.year = currentYear; 
    }

    if (v_month) { 
      body.month = v_month;
    } else {
      body.month = CurrentMonth; 
    }


  // กำหนดค่า brands
  if (v_brandid && Array.isArray(v_brandid)) {
    // กระจายค่าใน v_brandid เข้าไปใน brands
    body.brands.push(...v_brandid);
  }
  if (v_channelid && Array.isArray(v_channelid)) {
    body.channels.push(...v_channelid);
 }
  if (v_storetypeid && Array.isArray(v_storetypeid)) {
     body.store_types.push(...v_storetypeid);
  }

  if (v_customers && Array.isArray(v_customers)) {
    body.customers.push(...v_customers);
 }
 
 
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    });
   // console.log(''+body);
  const monthNumber = response.data.current_month; 
  const monthAbbr = getMonthAbbreviation(monthNumber); 
  const monthAbbr_last = getMonthAbbreviation(monthNumber-1); 
//  console.log(monthAbbr);
    //
    const salesDataArray = [];
    salesDataArray.push({
      type: 'data',
        last_year: response.data.last_year,
        current_month: response.data.current_month,
        current_year: response.data.current_year,
        month_txt:monthAbbr,
        month_txt_last:monthAbbr_last,
      
    });
    salesDataArray.push({
      type: 'overall',
      saleData: {
      
        last_sale: response.data.sale_data.last_sale,
        last_return: response.data.sale_data.last_return,
        current_sale: response.data.sale_data.current_sale,
        current_return: response.data.sale_data.current_return,
        current_target: response.data.sale_data.current_target,
        current_estimate: response.data.sale_data.current_estimate,
        current_estimate_w1: response.data.sale_data.current_estimate_w1,
        current_estimate_w2: response.data.sale_data.current_estimate_w2,
        current_estimate_w3: response.data.sale_data.current_estimate_w3,
        current_estimate_w4: response.data.sale_data.current_estimate_w4,
        current_estimate_w5: response.data.sale_data.current_estimate_w5,
        display_last_actual: response.data.sale_data.display_last_actual,
        display_current_actual: response.data.sale_data.display_current_actual,
        display_current_last_actual_percent: response.data.sale_data.display_current_last_actual_percent,
        display_current_to_target_percent: response.data.sale_data.display_current_to_target_percent,
        display_current_last_target_percent: response.data.sale_data.display_current_last_target_percent,
        display_current_balance: response.data.sale_data.display_current_balance,
      
        
      },
    });


    response.data.brands.forEach(brand => {
      salesDataArray.push({
        type: 'brand',
        name: brand.topic_name,
        saleData: brand.sale_data
      });
    });
   
    let monthselectd;
    let yearselectd; 

    if (v_year) { 
      yearselectd = v_year;
    } else {
      yearselectd = currentYear; 
    }
    if (v_month) { 
      monthselectd = getMonthAbbreviation(v_month);
      
    } else {
      monthselectd = getMonthAbbreviation(CurrentMonth);
    }


    salesDataArray.push({
      type: 'customer',
      name: response.data.customers.topic_name,
      saleData: response.data.customers.sale_data ,
    });

    response.data.accounts.forEach(account => {
      salesDataArray.push({
        type: 'account',
        name: account.topic_name,
        saleData: account.sale_data
      });
    });

  
    response.data.names.forEach(name => {
      salesDataArray.push({
        type: 'name',
        name: name.topic_name,
        saleData: name.sale_data
      });
    });


    
    const customerGroupsWithKeys = response.data.customers.customers_groups.map((group, groupIndex) => {
      const customers_subgroups = group.customers_subgroups.map((subgroup, subgroupIndex) => {
        const items = subgroup.customers_items.map((item, itemIndex) => {
          return {
            item: {
              item_key: itemIndex,
              topic_name: item.topic_name,
              sale_data_item: item.sale_data,
            }
          };
        });
    
        return {
          subgroup: {
            subgroup_key: subgroupIndex,
            subgroup: subgroup.topic_name,
            sale_data_subg: subgroup.sale_data, 
            customers_items: items
          }
        };
      });
    
      return {
        group: {
          groub_key: groupIndex,
          topic_name: group.topic_name,
          sale_data_groub: group.sale_data, 
          customers_subgroups
        }
      };
    });
  
    salesDataArray.push({
      type: 'customerItem',
      customerItem: customerGroupsWithKeys,
      monthtxt:monthselectd,
      yeartxt:yearselectd,
    });
//  console.log(JSON.stringify(customerGroupsWithKeys, null, 2));
  return salesDataArray; 
  
  } catch (error) {
   //  throw error.response ? error.response.data : 'เกิดข้อผิดพลาด'; 
  }
};



export const fetchReportKeyAccountGroup = async (yearid,monthid,brandid,channelid,storetypeid,keynameid,keygroup,customer) => {
      
  const url = hostapi + 'Sales/GetSummarySalesTargets';
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 

 
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); // ปีปัจจุบัน
  const currentMonth = new Date(currentDate.setMonth(currentDate.getMonth())).getMonth() + 1; // 
  //const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).getMonth() + 1; // เดือนที่แล้ว (1-12)
  //console.log(currentYear,currentMonth);


  const v_year= yearid;
  const v_month= monthid;


  const v_brandid= brandid;
  const v_channelid= channelid;
  const v_storetypeid= storetypeid;
  const v_keynameid= keynameid;
  const v_keygroup= keygroup;
  const v_customer= customer;
 //  console.log('fetch_='+v_brandid+' 2:'+v_channelid +' 3:'+v_storetypeid + ' 4:'+v_keynameid+' 5:'+v_keygroup);
 

  const body = {
    year: 0,
    month: 0,
    brands: [],
    customers: [],
    store_types: [],
    channels: [],
    account_groups: [],
    account_names: []
  };


    if (v_year) { 
      body.year = v_year;
    } else {
      body.year = currentYear; // ค่าปีปัจจุบันเป็นตัวเลข
    }

    if (v_month) { 
      body.month = v_month;
    } else {
      body.month = currentMonth; 
    }



    if (v_brandid && Array.isArray(v_brandid)) {
      body.brands.push(...v_brandid);
    }
    if (v_channelid && Array.isArray(v_channelid)) {
      body.channels.push(...v_channelid);
  }
    if (v_storetypeid && Array.isArray(v_storetypeid)) {
      body.store_types.push(...v_storetypeid);
    }

    if (v_keynameid && Array.isArray(v_keynameid)) {
      body.account_names.push(...v_keynameid);
  }
    if (v_keygroup && Array.isArray(v_keygroup)) {
      body.account_groups.push(...v_keygroup);
  }
  if (v_customer && Array.isArray(v_customer)) {
    body.customers.push(...v_customer);
    } 

 
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    });
   // console.log(''+body);
    const monthNumber = response.data.current_month; 
    const monthAbbr = getMonthAbbreviation(monthNumber); 
    const monthAbbr_last = getMonthAbbreviation(monthNumber-1); 
  //  console.log(monthAbbr);
    //
    const salesDataArray = [];
    salesDataArray.push({
      type: 'data',
        last_year: response.data.last_year,
        current_month: response.data.current_month,
        current_year: response.data.current_year,
        month_txt:monthAbbr,
        month_txt_last:monthAbbr_last,
      
    });
    salesDataArray.push({
      type: 'overall',
      saleData: {
      
        last_sale: response.data.sale_data.last_sale,
        last_return: response.data.sale_data.last_return,
        current_sale: response.data.sale_data.current_sale,
        current_return: response.data.sale_data.current_return,
        current_target: response.data.sale_data.current_target,
        current_estimate: response.data.sale_data.current_estimate,
        current_estimate_w1: response.data.sale_data.current_estimate_w1,
        current_estimate_w2: response.data.sale_data.current_estimate_w2,
        current_estimate_w3: response.data.sale_data.current_estimate_w3,
        current_estimate_w4: response.data.sale_data.current_estimate_w4,
        current_estimate_w5: response.data.sale_data.current_estimate_w5,
        display_last_actual: response.data.sale_data.display_last_actual,
        display_current_actual: response.data.sale_data.display_current_actual,
        display_current_last_actual_percent: response.data.sale_data.display_current_last_actual_percent,
        display_current_to_target_percent: response.data.sale_data.display_current_to_target_percent,
        display_current_last_target_percent: response.data.sale_data.display_current_last_target_percent,
        display_current_balance: response.data.sale_data.display_current_balance,
      
        
      },
    });


    // response.data.brands.forEach(brand => {
    //   salesDataArray.push({
    //     type: 'brand',
    //     name: brand.topic_name,
    //     saleData: brand.sale_data
    //   });
    // });

  
    // salesDataArray.push({
    //   type: 'customer',
    //   name: response.data.customers.topic_name,
    //   saleData: response.data.customers.sale_data
    // });

    let monthselectd;
    let yearselectd; 

    if (v_year) { 
      yearselectd = v_year;
    } else {
      yearselectd = currentYear; 
    }
    if(v_month) { 
      monthselectd = getMonthAbbreviation(v_month);
    }else{
      monthselectd = getMonthAbbreviation(currentMonth);
    }

    response.data.accounts.forEach(account => {
      salesDataArray.push({
        type: 'account',
        name: account.topic_name,
        saleData: account.sale_data,
        monthtxt:monthselectd,
        yeartxt:yearselectd
      });
    });

  
    response.data.names.forEach(name => {
      salesDataArray.push({
        type: 'name',
        name: name.topic_name,
        saleData: name.sale_data,
        monthtxt:monthselectd,
        yeartxt:yearselectd
      });
    });


    
    // const customerGroupsWithKeys = response.data.customers.customers_groups.map((group, groupIndex) => {
    //   const customers_subgroups = group.customers_subgroups.map((subgroup, subgroupIndex) => {
    //     const items = subgroup.customers_items.map((item, itemIndex) => {
    //       return {
    //         item: {
    //           item_key: itemIndex,
    //           topic_name: item.topic_name,
    //           sale_data_item: item.sale_data,
    //         }
    //       };
    //     });
    
    //     return {
    //       subgroup: {
    //         subgroup_key: subgroupIndex,
    //         subgroup: subgroup.topic_name,
    //         sale_data_subg: subgroup.sale_data, 
    //         customers_items: items
    //       }
    //     };
    //   });
    
    //   return {
    //     group: {
    //       groub_key: groupIndex,
    //       topic_name: group.topic_name,
    //       sale_data_groub: group.sale_data, 
    //       customers_subgroups
    //     }
    //   };
    // });
  
    // salesDataArray.push({
    //   type: 'customerItem',
    //   customerItem: customerGroupsWithKeys
    // });
//  console.log(JSON.stringify(customerGroupsWithKeys, null, 2));
  return salesDataArray; 
  
  } catch (error) {
   //  throw error.response ? error.response.data : 'เกิดข้อผิดพลาด'; 
  }
};

export const fetchGetGroupOms = async () => {
  const GetBrandApiUrl = hostapi+'Customer/GetGroupOmss'; // แทนที่ด้วย API ที่สอง
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
  const body = {
      group_Omss : [],
  };
  try {
    const response = await axios.post(GetBrandApiUrl, body,{
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    });
    return response.data; // ส่งค่ากลับ
  } catch (error) {
    throw error.response ? error.response.data : 'fetchGetGroupOms Error'; 
  }
};
