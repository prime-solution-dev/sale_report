import axios from 'axios';
const hostapi = 'http://61.91.5.227:8099/';


// export const loginUser = async (username, password) => {
//     const url = `${hostapi}Authen/Login`;
//    // const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 

//   const body = {
//     user: username,
//     password: password,
//   };

//   try {
//     const response = await axios.post(url, body, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log(response.data);
//     if (response.data.success) {
//       // stote token data - :)
//       const token = response.data.token; // ex API ส่ง token กลับมา
//       return token;
//     } else {
//       throw new Error(response.data.message || 'Login failed');
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
//   }
// };


export const loginUser = async (username, password) => {
  const url = `${hostapi}Authen/Login`;
  const body = {
    user: username,
    password: password,
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // ตรวจการตอบกลับtoken 
    if (response.data.token) {
      //  token  Local Storage / Vuex 
      localStorage.setItem('token', response.data.token);
      
      // ถ้าต้องการจัดเก็บข้อมูลผู้ใช้
      const userData = {
        name: response.data.name,
        username: username,
        active: response.data.active,
        
        permissions: response.data.permissions,
        tokenExpire: response.data.token_expire,
        token: response.data.token,
        isForceChangePassword: response.data.is_force_change_password,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      //

      //  // ตรวจสอบว่า userData มีค่าจริงและเป็นอ็อบเจ็กต์
      //  if (userData && typeof userData === 'object') {
      //   localStorage.setItem('userData', JSON.stringify({
      //     is_force_change_password: userData.is_force_change_password, 
      //     name: userData.name, 
      //     permissions: userData.permissions, 
      //     token: userData.token, 
      //     token_expire: userData.token_expire 
      //   }));
      //   } else {
      //     console.error('UserData is not valid');
      //   }
      
      
      return userData; // คืนค่า userData เพื่อใช้งานต่อ
    } else {
      throw new Error('Login failed: No token received');
    }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
  }
};


export const setPasswordStateAPI = async (username, old_password ,password) => {
  const url = `${hostapi}Authen/ChangePassword`;
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 

  const body = {
    user: username,
    old_password:old_password,
    new_password: password,
  };

   
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    });
  

  return response; 
  
  } catch (error) {
     
    console.error('API Error:', error);
    throw new Error('Failed to set password.'); // ให้ error ขึ้นมาเพื่อจัดการใน catch 
  }


};


export const fetchGetDataUser= async (users) => {
  const GetDataUserApiUrl = hostapi+'Authen/GetUsers'; 
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 
  const body = {
    "users" : [users],
  };
  try {
    const response = await axios.post(GetDataUserApiUrl, body,{
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    });
    return response.data; // ส่งค่ากลับ
  } catch (error) {
    throw error.response ? error.response.data : ' fetchGetDataUser Error.'; 
  }
};

export const AuthenLogoutUser = async (username) => {
  const url = `${hostapi}Authen/Logout`;
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; 

  const body = {
    user: username,
  
  };

   
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    });
  

  return response; 
  
  } catch (error) {
     
    console.error('API Error:', error);
    throw new Error('Failed to AuthenLogoutUser.'); 
  }


};




// export const setPasswordState = async (data) => {
//   try {
//       const url = hostapi + '/Authen/ResetPassword';

//       const body = data
//       const response = await axios.post(url, body, {
//           headers: {
//               'Authorization': token,
//               'Content-Type': 'application/json',
//           }
//       });
//       return response.data;
//   } catch (error) {
//       throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
//   }
// };