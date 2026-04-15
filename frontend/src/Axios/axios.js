import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://mern-todo-app-gh2q.onrender.com/api",
});

export default instance;
