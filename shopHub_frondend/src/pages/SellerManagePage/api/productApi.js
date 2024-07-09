import axios from "axios"
import { BASE_URL } from "../../../utils/apiUtil"

const productApi=axios.create({
    baseURL:`${BASE_URL}/product/seller`
})

export const getAllProducts=async(sellerId)=>{
    const response=await productApi.get(`/getProducts/${sellerId}`)
    return response.data;
}


export default productApi;