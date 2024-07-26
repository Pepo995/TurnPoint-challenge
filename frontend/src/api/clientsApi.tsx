import axios from 'axios';
import { CreateValidationInterface } from '../views/ClientView';

const clientsApi = axios.create({
  baseURL: `http://localhost:5000/api/clients`,
});

export const getClients = async () => {
    const { data } = await clientsApi.get('/');
    return data;
};

export const createClient = (createData: CreateValidationInterface) =>
    clientsApi.post('/create', createData);

export const deleteClient = (id: number) =>
  clientsApi.delete(`/${id}`);

export const updateClient = (id: number, updateData: CreateValidationInterface) =>
  clientsApi.put(`/${id}`, updateData);