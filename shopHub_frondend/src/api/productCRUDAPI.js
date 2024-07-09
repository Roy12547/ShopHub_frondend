import axios from 'axios';

import {
	BASE_URL,
	SERVERERROR,
	SUCCESS_NUMBER,
	TIMEOUT_NUMBER,
	handleError,
	showErrorNoText,
	showSuccess,
} from '../utils/apiUtil';

const myProductApi = axios.create({
	baseURL: `${BASE_URL}/product`,
	headers: {
		'Content-Type': 'multipart/form-data',
	},
	timeout: TIMEOUT_NUMBER,
});
const basicAPI = axios.create({
	baseURL: `${BASE_URL}/product`,
	timeout: TIMEOUT_NUMBER,
});
export const getPcardAPI = async (Arr) => {
	try {
		const res = (await basicAPI.post(`/getPcards`, Arr)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const updateProductAPI = async (formData) => {
	try {
		const res = (await myProductApi.put(`/updateAddedProduct`, formData)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('修改成功！');
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const createProductAPI = async (formData) => {
	try {
		const res = (await myProductApi.post(`/createAddedProduct`, formData)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('新增成功！');
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const deleteProdSpec = async (specId) => {
	try {
		const res = (await myProductApi.delete(`/deleteProdSpec/${specId}`)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('規格刪除成功！');
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const deleteProduct = async (productId) => {
	try {
		const res = (await myProductApi.delete(`/deleteAddedProduct/${productId}`))
			.data;
		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('商品刪除成功！');
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const searchProdByNameAPI = async (name) => {
	try {
		const res = (await basicAPI.get(`/searchProductsByName/${name}`)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const searchProdByCateAPI = async (categoryName) => {
	try {
		const res = (
			await basicAPI.get(`searchProductsByCategoryName/${categoryName}`)
		).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const getProductDetailAPI = async (id) => {
	try {
		const res = (
			await basicAPI.get(`/getProductDetail/${id}`, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
		).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const creatCartItemAPI = async (cartItem) => {
	try {
		const res = (await basicAPI.post(`/createCartItem`, cartItem)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const getRatingAPI = async (productId) => {
	try {
		const res = (await basicAPI.get(`/getRating/${productId}`)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const getCategoryAPI = async () => {
	try {
		const res = (await basicAPI.get(`/getAllCategories`)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const getImgFileAPI = async () => {
	try {
		const res = (await basicAPI.get(`/getAllCategories`)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
export const getAllList = async (sellerId) => {
	try {
		const res = (await basicAPI.get(`/getAddedProduct/${sellerId}`)).data;
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			showErrorNoText(SERVERERROR);
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
