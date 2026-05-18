import axios from "axios";

const api = axios.create({
    baseURL: "https://sistema-pedidos-du5f.onrender.com/api/"
});

export default api;