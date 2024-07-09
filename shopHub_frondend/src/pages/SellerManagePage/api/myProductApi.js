import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../../utils/apiUtil';

const sellerId = Cookies.get('userId');

const myProductApi = axios.create({
	baseURL: `${BASE_URL}/product/getAddedProduct`,
});
export const getAllList = async () => {
	const response = await myProductApi.get(`/${sellerId}`);
	return response.data;
};
export default myProductApi;
