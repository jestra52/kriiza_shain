import axios from 'axios';

export default axios.create({
    baseURL: process.env.API_HOST || '127.0.0.1:3000'
});
