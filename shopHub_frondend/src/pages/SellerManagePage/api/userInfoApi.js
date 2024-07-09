import axios from "axios"
import { BASE_URL } from "../../../utils/apiUtil"

const userApi=axios.create({
    baseURL:`${BASE_URL}/user`
})

export const getUserInfo =async(sellerId)=>{
    const response=await userApi.get(`/getUser/${sellerId}`)
    return response.data;
}


export default userApi;