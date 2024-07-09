import React, { useState } from 'react';
import {
	Button,
	FormControl,
	Flex,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, showSuccess, showErrorNoText } from '../../../utils/apiUtil';

export const Change = () => {
	const userId = Cookies.get('userId');
	const [newPassword1, setNewPassword1] = useState('');
	const [newPassword2, setNewPassword2] = useState('');
	const toast = useToast();
	const navigate = useNavigate();

	const handlePasswordChange = () => {
		if (!newPassword1 || !newPassword2) {
			showErrorNoText('請填寫所有密碼欄位');
			return;
		}

		const requestData = {
			userId: parseInt(userId),
			newPassword1: newPassword1,
			newPassword2: newPassword2,
		};

		axios
			.post(`${BASE_URL}/user/changePassword`, requestData)
			.then((response) => {
				const { returnCode, data } = response.data;
				if (returnCode === 200) {
					showSuccess('密碼變更成功');
					setTimeout(() => {
						navigate('/buyer');
					}, 1000);
				} else {
					showErrorNoText('兩次輸入密碼不一致');
				}
			})
			.catch((error) => {
				console.error('更改密碼失敗:', error);
				if (error.response) {
					console.error('資料:', error.response.data);
					console.error('狀態碼:', error.response.status);
					console.error('頭部:', error.response.headers);
					showErrorNoText('錯誤');
				} else if (error.request) {
					console.error('請求:', error.request);
					showErrorNoText('錯誤');
				} else {
					console.error('錯誤信息:', error.message);
					showErrorNoText('錯誤');
				}
			});
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack
				spacing={4}
				w={'full'}
				maxW={'md'}
				bg={useColorModeValue('white', 'gray.700')}
				rounded={'xl'}
				boxShadow={'lg'}
				p={6}
				my={12}
			>
				<Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
					輸入新密碼
				</Heading>
				<FormControl id="newPassword1">
					<Input
						placeholder="請輸入新的密碼"
						_placeholder={{ color: 'gray.500' }}
						type="password"
						value={newPassword1}
						onChange={(e) => setNewPassword1(e.target.value)}
					/>
				</FormControl>
				<FormControl id="newPassword2">
					<Input
						placeholder="確認新的密碼"
						_placeholder={{ color: 'gray.500' }}
						type="password"
						value={newPassword2}
						onChange={(e) => setNewPassword2(e.target.value)}
					/>
				</FormControl>
				<Stack spacing={6}>
					<Button
						onClick={handlePasswordChange}
						bg={'blue.400'}
						color={'white'}
						_hover={{
							bg: 'blue.500',
						}}
					>
						送出
					</Button>
				</Stack>
			</Stack>
		</Flex>
	);
};

export default Change;
