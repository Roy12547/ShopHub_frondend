import axios from "axios"

import { BASE_URL } from '../../../utils/apiUtil';
import Cookies from 'js-cookie';



const userId = Cookies.get('userId');


const orderDetailApi=axios.create({
    baseURL:`${BASE_URL}/order/seller`
})

export const getAllOrders=async(sellerId)=>{
    const response=await orderDetailApi.get(`/getOrderDetail/${sellerId}`)
    return response.data;
}

export const updateOrderStatus=async(ecpayId,buyerId)=>{

    const response=await orderDetailApi.put(`/${ecpayId}/status?buyerId=${buyerId}&orderStatus=1`)
    return response.data;
}


export const getIncomeByDateRange=async(startDate,endDate)=>{
    if(!startDate||!endDate) return;

    const param=new URLSearchParams();
    if(startDate)param.append("startDate",startDate)
    if(endDate)param.append("endDate",endDate)
    const response=await orderDetailApi.get(`/getIncomeOrders?sellerId=${userId}&${param.toString()}`)
    
    return response.data;
}

export const getAllIncomeData=async()=>{
    const response=await orderDetailApi.get(`/incomeData?sellerId=${userId}`)
    return response.data;
}

export const getIncomeOrders=async()=>{
    const response=await orderDetailApi.get(`/incomeData?sellerId=${userId}`)
    return response.data;
}


export default orderDetailApi;