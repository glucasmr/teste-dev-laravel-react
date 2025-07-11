import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async (search = '') => {
    const params = search ? { params: { search } } : {};
    const res = await axios.get(API_URL, params);
    return res.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
}; 