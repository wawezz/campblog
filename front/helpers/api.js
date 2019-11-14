import axios from 'axios';

Date.prototype.yyyymmdd = function () {
    const mm = this.getMonth() + 1; // getMonth() is zero-based
    const dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].reverse().join('/');
};

const API_ENDPOINT = '/api';

export const api = axios.create({
    baseURL: API_ENDPOINT,
});

export const imageUrl = (mediaObject) => {
    return API_ENDPOINT + mediaObject.url;
};