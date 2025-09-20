import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/customers',
    headers: { 'Content-Type': 'application/json' },
});

export const getCustomers = () => api.get('/');
export const getCustomer = (id) => api.get(`/${id}`);
export const createCustomer = (data) => api.post('/', data);
export const updateCustomer = (id, data) => api.put(`/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/${id}`);
export const deposit = (id, value) => api.post(`/${id}/deposit`, { value });
export const withdraw = (id, value) => api.post(`/${id}/withdraw`, { value });
