import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL:
        'http://localhost:57657/'
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
