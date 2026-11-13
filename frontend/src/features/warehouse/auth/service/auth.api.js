import axios from "axios"

const authApiInstants = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export async function register() {
    const response = await authApiInstants.post("/register",{

    })

    return response.data
}