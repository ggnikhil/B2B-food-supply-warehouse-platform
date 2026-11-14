import { register,login } from "../service/auth.api";
import {setUser,setLoading,setError} from "../state/auth.slice"
import { useDispatch } from "react-redux";

export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister(data) {

        try{
            dispatch(setLoading(true))

            const response = await register(data)

            dispatch(setUser(response.user))

            return response.data

        }catch(err){
            dispatch(setError(err.message))
            console.error("Register Error:", err);
        }finally{
            dispatch(setLoading(false))
        }

    }

    async function handleLogin(data) {
        try{
            dispatch(setLoading(true))

            const response = await login(data)

            dispatch(setUser(response.user))

            return response.data
        }catch(err){
            dispatch(setError(err.message))
            console.log(err)
        }finally{
            dispatch(setLoading(false))
        }
    }

    return {handleRegister,handleLogin}
}