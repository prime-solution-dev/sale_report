import axios from 'axios';
const hostapi = 'http://61.91.5.227:8099';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjY1Nzg4MzY0MDUsInVzZXJuYW1lIjoic3VwYWNoYWkifQ.mxBs7cDNGcfdz6eCRTd3dOfxIMtLTMwwdfObYWmyeV4'; // แทนที่ด้วย token ของคุณ

export const getPermission = async () => {
    try {
        const url = hostapi + '/Authorize/GetPermissions';

        const body = {
            permission_group_codes: []
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

export const getModuleItems = async () => {
    try {
        const url = hostapi + '/Authorize/GetModuleItems';

        const body = {
            module_code: []
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

export const createPermissions = async (data) => {
    try {
        const url = hostapi + '/Authorize/CreatePermissions';

        const body = data
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

export const updatePermissions = async (data) => {
    try {
        const url = hostapi + '/Authorize/UpdatePermission';

        const body = data
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

export const deletePermissions = async (data) => {
    try {
        const url = hostapi + '/Authorize/DeletePermissions';

        const body = data
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

export const getUser = async () => {
    try {
        const url = hostapi + '/Authen/GetUsers';

        const body = {
            users: []
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