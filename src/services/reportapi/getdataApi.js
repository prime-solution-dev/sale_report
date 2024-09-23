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



  export const fetchSalesSummaryBKUP = async () => {
    const url = hostapi+'Sales/GetSummarySalesTargets';
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; // แทนที่ด้วย token ของคุณ

    const body = {
      year: 2024,
      month: 9,
      brands: [],
      customers: [],
      store_types: [],
      channels: [],
      account_groups: [],
      account_names: []
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
      return response.data; // ส่งค่ากลับ
    } catch (error) {
      throw error.response ? error.response.data : 'เกิดข้อผิดพลาด'; 
    }
  };


  export const fetchSalesSummary = async () => {
    const url = hostapi + 'Sales/GetSummarySalesTargets';
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; // แทนที่ด้วย token ของคุณ

      // ประกาศค่าปีปัจจุบันและเดือนที่แล้ว
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear(); // ปีปัจจุบัน
      const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).getMonth() + 1; // เดือนที่แล้ว (1-12)
      console.log(currentYear,previousMonth);
     
  
    const body = {
      year: 2024,
      month: 9,
      brands: [],
      customers: [],
      store_types: [],
      channels: [],
      account_groups: [],
      account_names: []
    };
  
    try {
      const response = await axios.post(url, body, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });

    
      
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

    // ข้อมูลจาก brands
    response.data.brands.forEach(brand => {
      salesDataArray.push({
        type: 'brand',
        name: brand.topic_name,
        saleData: brand.sale_data
      });
    });

    // ข้อมูลจาก customers
    salesDataArray.push({
      type: 'customer',
      name: response.data.customers.topic_name,
      saleData: response.data.customers.sale_data
    });

    response.data.accounts.forEach(account => {
      salesDataArray.push({
        type: 'account',
        name: account.topic_name,
        saleData: account.sale_data
      });
    });

    // ข้อมูลจาก names
    response.data.names.forEach(name => {
      salesDataArray.push({
        type: 'name',
        name: name.topic_name,
        saleData: name.sale_data
      });
    });

   // if (response.data && response.data.customers) {
      //  response.data.customers.customers_groups.map((group, groupIndex) => {
      //   return {
      //     group: {
      //       cus: groupIndex,
      //       topic_name: group.topic_name,
      //       sale_data: group.sale_data,
      //       customers_subgroups: group.customers_subgroups.map((subgroup, subgroupIndex) => {
      //         return {
      //           subgroup: {
      //             cus: subgroupIndex,
      //             topic_name: subgroup.topic_name,
      //             sale_data: subgroup.sale_data,
      //             customers_items: subgroup.customers_items.map((item, itemIndex) => {
      //               return {
      //                 item: {
      //                   cus: itemIndex,
      //                   topic_name: item.topic_name,
      //                   sale_data: item.sale_data,
      //                 }
      //               };
      //             })
      //           }
      //         };
      //       })
      //     }
      //   };
      // });
      
    // } else {
    //   this.error = "No sales summary data available.";
    // }
    
  const customerGroupsWithKeys = response.data.customers.customers_groups.map((group, groupIndex) => {
  return {
    group: {
      cus: groupIndex,
      topic_name: group.topic_name,
      sale_data: group.sale_data,
      customers_subgroups: group.customers_subgroups.map((subgroup, subgroupIndex) => {
        return {
          subgroup: {
            cus: subgroupIndex,
            topic_name: subgroup.topic_name,
            sale_data: subgroup.sale_data,
            customers_items: subgroup.customers_items.map((item, itemIndex) => {
              return {
                item: {
                  cus: itemIndex,
                  topic_name: item.topic_name,
                  sale_data: item.sale_data,
                }
              };
            })
          }
        };
      })
    }
  };
});

// เพิ่ม customerGroupsWithKeys เข้าไปใน salesDataArray
salesDataArray.push(...customerGroupsWithKeys);

    return salesDataArray; // ส่งค่ากลับเป็น array

     
    } catch (error) {
      throw error.response ? error.response.data : 'เกิดข้อผิดพลาด'; 
    }
  };

  
  export const fetchGetBrand = async () => {
    const GetBrandApiUrl = hostapi+'Product/GetBrands'; // แทนที่ด้วย API ที่สอง
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; // แทนที่ด้วย token ของคุณ
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
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; // แทนที่ด้วย token ของคุณ
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
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; // แทนที่ด้วย token ของคุณ
    const body = {
      customer_groups: [],
      store_types: [],
      channels:[]
    };
  
    if (v_code) { 
      body.channels.push(v_code);
    } else {
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
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; // แทนที่ด้วย token ของคุณ
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
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; // แทนที่ด้วย token ของคุณ
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

  