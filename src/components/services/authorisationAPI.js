import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL:
        'http://slim-apla-nike.com/'
});

export default {
    getData: (parameter) =>
        instance({
            method: 'GET',
            url: '/api/v2/inventory-user-details', //has to be changed
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
