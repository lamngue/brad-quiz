import * as axios from 'axios';

const instance = axios.default.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


export function fetchURL(url, extraHeaders = {}){
    return instance.get(url, {
        headers: { ...extraHeaders }
    }
    )
}

export function postURL(url, data, extraHeaders = {}){
    return instance.post(url, data, {
        method: 'POST',
        headers: { ...extraHeaders },
    });   
}

export function deleteUrl(url, extraHeaders = {}) {
    return instance.post(url, {
        method: 'DELETE',
        headers: { ...extraHeaders },
    });
}