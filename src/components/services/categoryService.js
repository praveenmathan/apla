import axios from 'axios';

/* eslint-disable */
const instance = axios.create({
    baseURL:
        'http://localhost/'
});

export default {
    getData: (parameter) =>
        instance({
            method: 'GET',
            url: '/test',
            params: {
                q: parameter,
            },
        }),
    postData: (dataContent) =>
        instance({
            method: 'POST',
            url: '/prod/filetracking',
            data: dataContent.query,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${dataContent.accessToken}`
            }
        }),
};
