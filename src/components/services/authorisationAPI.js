import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL:
        'https://slim-apla-api.nike.com:500/'
});

export default {
    getData: (parameter) =>
        instance({
            method: 'GET',
            url: '/api/v2/inventory-user-details',
            params: {
                userName: parameter,
            },
        }),
    postData: (dataContent) =>
        instance({
            method: 'POST',
            url: '/api/v2/inventory-user-details',
            data: dataContent.query,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer Token`
            }
        }),
};
