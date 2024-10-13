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
        permissions: response.data.permissions,
        tokenExpire: response.data.token_expire,
        isForceChangePassword: response.data.is_force_change_password,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return userData; // คืนค่า userData เพื่อใช้งานต่อ
    } else {
      throw new Error('Login failed: No token received');
    }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
  }
};
