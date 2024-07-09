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
import { BASE_URL, showErrorNoText } from '../../../utils/apiUtil';

export const Change = () => {
	const userId = Cookies.get('userId');
	const [currentPassword, setCurrentPassword] = useState('');
	const toast = useToast();
	const navigate = useNavigate();

	const handlePasswordChange = () => {
		const requestData = {
			userId: parseInt(userId),
			currentPassword: currentPassword,
		};

		// API
		axios
			.post(`${BASE_URL}/user/verifyPassword`, requestData)
			.then((response) => {
				const { redirect, message } = response.data;
				if (redirect) {
					navigate('/changepass');
				} else if (message) {
					showErrorNoText();
				}
			})
			.catch((error) => {
				showErrorNoText('密碼錯誤');
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
					變更密碼
				</Heading>
				<FormControl id="password">
					<Input
						placeholder="輸入您目前的密碼以驗證"
						_placeholder={{ color: 'gray.500' }}
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
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
