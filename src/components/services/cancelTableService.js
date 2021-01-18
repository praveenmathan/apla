import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL:
        'http://localhost:57657/'
});

export default {
    getData: (parameter) =>
        instance({
            method: 'GET',
            url: '/api/v1/inventory-cancel-details',
            params: {
                userName: parameter,
            },
        }),
    postData: (reqData) =>
        instance({
            method: 'POST',
            url: '/api/v1/inventory-cancel-details',
            data: reqData,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer Token`
            }
        }),
};
