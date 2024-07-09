import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../../../utils/apiUtil";


const userId = Cookies.get('userId');

const bankApi=axios.create({
    baseURL:`${BASE_URL}`
})

export const getAllBankAccounts=async()=>{
    const response=await bankApi.get(`/bank/${userId}`)
    return response.data;
}

export const saveBankAccount=async(data)=>{
    const response=await bankApi.post(`bank`, data)
    return response.data
}


export default bankApi;