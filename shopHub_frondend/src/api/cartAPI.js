import axios from 'axios';
import Cookie from 'js-cookie';
import {
	BASE_URL,
	EMAIL_NOT_EXIST,
	EMAIL_NOT_EXIST_NUMBER,
	SERVERERROR,
	SUCCESS_NUMBER,
	TIMEOUT_NUMBER,
	USER_NOT_EXIST,
	USER_NOT_EXIST_NUMBER,
	handleError,
	showError,
	showErrorNoText,
	showloading,
} from '../utils/apiUtil';

export const getCartItemAPI = async (userId) => {
	try {
		const res = (
			await axios.get(`${BASE_URL}/product/getCartItem/${userId}`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const getCartSimpleAPI = async (userId) => {
	try {
		const res = (
			await axios.get(`${BASE_URL}/product/getCartSimple/${userId}`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const delCartItemAPI = async (cartItemId) => {
	const cartCookie = Cookie.get('cart');
	const parsedCart = JSON.parse(cartCookie);
	const updatedCart = parsedCart.filter(
		(item) => item.cartItemId !== cartItemId
	);
	Cookie.set('cart', JSON.stringify(updatedCart));

	try {
		const res = (
			await axios.delete(`${BASE_URL}/product/delCartItem/${cartItemId}`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const getaddressAPI = async (userId) => {
	try {
		const res = (
			await axios.get(`${BASE_URL}/product/getaddress/${userId}`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const createaddressAPI = async (shipAddress) => {
	try {
		const res = (
			await axios.post(`${BASE_URL}/address/createAddress`, shipAddress, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

const isSuccess = (cartGroup) => {
	let isGoOn = true;
	console.log(cartGroup);
	cartGroup.map((item) => {
		if (item.shipAddress === null) {
			showErrorNoText('請選擇運送地址');
			isGoOn = false;
		}
	});
	return isGoOn;
};

export const handleEcpayOrder = async (cartGroup) => {
	console.log(cartGroup);
	if (isSuccess(cartGroup)) {
		try {
			const userId = Cookie.get('userId');
			const response = await axios.post(
				`${BASE_URL}/ecpay/order`,
				{ cartGroupList: cartGroup, userId: userId },
				{
					timeout: 4000,
				}
			);

			if (response.status === 200) {
				const root=document.querySelector('#root');
				document.write(response.data);
			} else {
				console.error('Failed to redirect to ECPay');
			}
		} catch (error) {
			console.error('Error calling Ecpay order API:', error);
		}
	} else {
		showErrorNoText('請選擇運送地址');
	}
};


export const getTotalDetailAPI = async (ecpayId) => {
	try {
		const formData = new FormData();
		formData.append('ecpayId', ecpayId);
		const res = (
			await axios.post(`${BASE_URL}/ecpay/getTotalOrderDetail`, formData, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res.data;
		} else {
			showErrorNoText(SERVERERROR);
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
