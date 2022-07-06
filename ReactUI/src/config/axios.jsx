import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://localhost:5000' //http://localhost:5000/clientes
});

export default clienteAxios;