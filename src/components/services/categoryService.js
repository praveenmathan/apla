import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL:
        'https://slim-apla-api.nike.com:500/'
});

export default {
    getData: () =>
        instance({
            method: 'GET',
            url: '/api/v1/inventory-selectionfilters-details',
        }),
    postData: (dataContent) =>
        instance({
            method: 'POST',
            url: '/api/v1/inventory-selectionfilters-details',
            data: dataContent.query,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer Token`
            }
        }),
};
