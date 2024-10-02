import axios from 'axios';
const hostapi = 'http://61.91.5.227:8099';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4';

export const exportCustomer = async () => {
    try {
        const url = hostapi + '/Template/ExportCustomer';

        const body = {
        };
        
        const response = await axios.post(url, body, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
    }
};

export const exportSalesTarget = async () => {
    try {
        const url = hostapi + '/Template/ExportSalesTarget';

        const body = {
        };

        const response = await axios.post(url, body, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : 'เกิดข้อผิดพลาด';
    }
};