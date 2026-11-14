import axios from "axios"

const authApiInstants = axios.create({
    baseURL:"http://localhost:3000/api/operation/auth",
    withCredentials:true
})

export async function register(data) {
    const response = await authApiInstants.post("/register",data)

    return response.data
}

export async function login(data) {
    const response = await authApiInstants.post("/login",data)

    return response.data
}