import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL:
        'http://slim-apla.nike.com:5500/'
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
