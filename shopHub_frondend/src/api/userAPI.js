import axios from 'axios';

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
	MAIL_EXIST
} from '../utils/apiUtil';

export const createUserAPI = async (user) => {


	try {
		const res = (
			await axios.post(`${BASE_URL}/user/createUser`, user, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER  || res.returnCode === MAIL_EXIST) {
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




export const loginAPI = async (loginUser) => {
	try {
		showloading();
		const res = (
			await axios.post(`${BASE_URL}/user/login`, loginUser, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
		//若200，則成功發送
		if (res.returnCode === SUCCESS_NUMBER) {
			return res;
		} else if (res.returnCode === USER_NOT_EXIST_NUMBER) {
			showErrorNoText(USER_NOT_EXIST);
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

export const getUserAPI = async (userId) => {
	const user = axios
		.get(`${BASE_URL}/user/getUser/${userId}`)
		.then(function (response) {
			return response.data.data;
		})
		.catch(function (error) {
			return error;
		});
	return user;
};

export const updateUserNoFileAPI = async (user) => {
	axios
		.post(`${BASE_URL}/user/updateUser`, user)
		.then(function (response) {
			return response.data.data;
		})
		.catch(function (error) {
			return error;
		});
	return user;
};

export const updateUserFileAPI = async (user) => {
	const formData = new FormData();

	formData.append('file', user.file);
	formData.append('sex', user.sex);
	formData.append('userId', user.userId);
	formData.append('userName', user.userName);
	formData.append('birthday', user.birthday);
	formData.append('mail', user.mail);

	axios
		.post(`${BASE_URL}/user/updateUserWithImage`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(function (response) {
			return response.data.data;
		})
		.catch(function (error) {
			return error;
		});
	return user;
};


export const forgotPassAPI = async (mail) => {
	try {
		showloading();
		const formData = new FormData();
		formData.append('mail', mail);
		const res = (await axios.post(`${BASE_URL}/user/forgotPass`, formData))
			.data;

		return res;
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const verifyAPI = async (verifyProp) => {
	try {
		showloading();
		const formData = new FormData();
		formData.append('secret', verifyProp.secret);
		formData.append('mail', verifyProp.mail);
		const res = (await axios.post(`${BASE_URL}/user/verifyCode`, formData))
			.data;

		return res;
	} catch (error) {
		handleError(error, SERVERERROR);
		return Promise.reject(error);
	}
};

export const resetPassAPI = async (resetPass) => {
	try {
		showloading();
		const formData = new FormData();

		formData.append('secret', resetPass.secret);
		formData.append('mail', resetPass.mail);
		const res = (
			await axios.post(`${BASE_URL}/user/ChangePass`, formData, {
				timeout: TIMEOUT_NUMBER,
			})
		).data;
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




export const testAPI = async (user) => {
	
    console.log(user)
	
	
	//formData.append('files',user.file2)
	
	axios
		.post(`${BASE_URL}/user/testStr`, user)
		.then(function (response) {
			return response.data.data;
		})
		.catch(function (error) {
			return error;
		});
	return user;
};
