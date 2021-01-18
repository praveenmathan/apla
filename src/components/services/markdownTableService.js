import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL:
        'http://slim-apla.nike.com:5500/'
});

export default {
    getData: (parameter) =>
        instance({
            method: 'GET',
            url: '/api/v1/inventory-markdown-details',
            params: {
                userName: parameter,
            },
        }),
    postData: (reqData) =>
        instance({
            method: 'POST',
            url: '/api/v1/inventory-markdown-details',
            data: reqData,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer Token`
            }
        }),
};
