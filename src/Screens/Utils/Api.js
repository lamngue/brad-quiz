import * as axios from 'axios';

const instance = axios.default.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:5000"
    }
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
    return instance.delete(url, {
        method: 'DELETE',
        headers: { ...extraHeaders },
    });
}