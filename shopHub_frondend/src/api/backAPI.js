import axios from 'axios';
import {
	BASE_URL,
	SERVERERROR,
	SUCCESS_NUMBER,
	TIMEOUT_NUMBER,
	handleError,
} from '../utils/apiUtil';

export const createMessAPI = async (mess) => {
	try {
		const formData = new FormData();

		formData.append('images', mess.file);
		formData.append('title', mess.title);
		formData.append('content', mess.content);

		const res = (
			await axios.post(`${BASE_URL}/createMess`, formData, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const getMessAPI = async (userId) => {
	try {
		const res = (
			await axios.get(`${BASE_URL}/getUserMess/${userId}`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const updateMessStatusAPI = async (userId) => {
	try {
		const res = (
			await axios.get(`${BASE_URL}/updateMessStatus/${userId}`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const getAllmess = async () => {
	try {
		const res = (
			await axios.get(`${BASE_URL}/getAllmess`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const updateMessAPI = async (mess) => {
	try {
		const formData = new FormData();
		formData.append('id', mess.id);
		formData.append('images', mess.images);
		formData.append('title', mess.title);
		formData.append('content', mess.content);
		const res = (
			await axios.put(`${BASE_URL}/updateMess`, formData, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const updateMessNoImgAPI = async (mess) => {
	try {
		const formData = new FormData();
		formData.append('id', mess.id);
		formData.append('title', mess.title);
		formData.append('content', mess.content);
		const res = (
			await axios.put(`${BASE_URL}/updateMessNoImg`, formData, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const getOneMessAPI = async (id) => {
	try {
		const res = (
			await axios.get(`${BASE_URL}/getOneMess/${id}`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const deleteMessAPI = async (id) => {
	try {
		const res = (
			await axios.delete(`${BASE_URL}/deleteMess/${id}`, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else {
			//若非200，則自定義失敗請求
			throw new Error(`Request failed with status code ${res.returnCode}`);
		}
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};
