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
