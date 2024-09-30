import axios from 'axios';
const hostapi = 'http://61.91.5.227:8099';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4';

export const getCustomers = async () => {
    try {
        const url = hostapi + '/Customer/GetCustomers';

        const body = {
            customers: []
        };
        const response = await axios.post(url, body, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
    }
};

export const getLastUploadCustomers = async () => {
    try {
        const url = hostapi + '/Customer/GetLastUpdatedCustomer';

        const body = {
        };
        const response = await axios.post(url, body, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
    }
};

export const uploadCustomers = async (file) => {
    try {
        const url = hostapi + '/Customer/UploadCustomers';

        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
    }
};

export const getSalesTargets = async (data) => {
    try {
        const url = hostapi + '/Sales/GetSalesTargets';

        const body = {
            customers: [],
            year: data.year,
            months: [data.month]
        };
        const response = await axios.post(url, body, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
    }
};

export const getLastUploadSalesTargets = async () => {
    try {
        const url = hostapi + '/Sales/GetLastUpdatedSalesTarget';

        const body = {
        };
        
        const response = await axios.post(url, body, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
    }
};

export const uploadSalesTargets = async (file, year, month) => {
    try {
        const url = hostapi + '/Sales/UploadSalesTargets';
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('year', year);
        formData.append('month', month);

        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
    }
};
