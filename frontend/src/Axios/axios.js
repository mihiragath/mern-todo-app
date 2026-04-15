import axios from "axios"
const instance = axios.create({
    baseURL:"https://mern-todo-app-gh2q.onrender.com/api"
})
export default instance