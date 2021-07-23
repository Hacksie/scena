import config from 'config';
import { authHeader } from '../_helpers';

export const productionsService = {
    getAll,
    getById,
    add,
    update,
    delete:_delete    
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/productions`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/productions/${id}`, requestOptions)
    .then(handleResponse)
    .then(data => {
        localStorage.setItem('production', JSON.stringify(data));
        return data;
    });
}

function add(production) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(production)
    };

    return fetch(`${config.apiUrl}/productions/add`, requestOptions)
    .then(handleResponse)
    .then(data => {
        localStorage.setItem('production', JSON.stringify(data));
        return data;
    });
}

function update(production) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(production)
    };

    return fetch(`${config.apiUrl}/productions/${production.id}`, requestOptions)
    .then(handleResponse)
    .then(data => {
        localStorage.setItem('production', JSON.stringify(data));
        return data;
    });
}

function _delete(productionId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
        // headers: { 'Content-Type': 'application/json' },
        
    };

    return fetch(`${config.apiUrl}/productions/${productionId}`, requestOptions)
    .then(handleResponse)
    .then(data => {
        const localProduction = JSON.parse(localStorage.getItem('production'));
        console.log(productionId + ":" + localProduction.id);
        if (localProduction.id === productionId) {localStorage.removeItem('production')}
        return data;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}