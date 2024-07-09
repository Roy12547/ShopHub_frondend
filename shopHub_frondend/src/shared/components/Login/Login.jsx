import {
	Box,
	Heading,
	VStack,
	Text,
	HStack,
	FormControl,
	FormLabel,
	Input,
	Button,
	Checkbox,
	Divider,
	Stack,
	Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { loginAPI } from '../../../api/userAPI';
import { getCartSimpleAPI } from '../../../api/cartAPI';
import { FcGoogle } from 'react-icons/fc';
import { showSuccess, BASE_URL } from '../../../utils/apiUtil';
import { useNavigate, NavLink } from 'react-router-dom';
import {
	SUCCESS_NUMBER,
	USER_NOT_EXIST,
	USER_NOT_EXIST_NUMBER,
	showErrorNoText,
} from '../../../utils/apiUtil';
import Cookies from 'js-cookie';

export default function Login() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [secret, setSecret] = useState('');
	const [mail, setMail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	useEffect(() => {
		if (Cookies.get('id_token')) {
			navigate('/');
		}
	}, []);

	const handleEmailChange = (e) => {
		const value = e.target.value;
		setMail(value);
		// Email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			setEmailError('請輸入有效的電子郵件地址');
		} else {
			setEmailError('');
		}
	};

	const handlesecretChange = (e) => {
		const value = e.target.value;
		setSecret(value);
		// Password validation regex: at least one uppercase letter, one lowercase letter, and one number
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
		if (!passwordRegex.test(value)) {
			setPasswordError(
				'密碼必須包含至少一個大寫字母、一個小寫字母和一個數字，且長度至少為 8 個字符'
			);
		} else {
			setPasswordError('');
		}
	};

	const handleLogin = async () => {
		// Email validation regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(mail)) {
			return;
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
		// if (!passwordRegex.test(secret)) {
		// 	return;
		// }

		const res = await loginAPI({
			mail: mail,
			secret: secret,
		});

		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('成功登入');
			Cookies.set('id_token', res.data.token);
			Cookies.set('photo', res.data.filePath);
			Cookies.set('userId', res.data.userId);
			await fetchSimpleCart(res.data.userId);
			navigate('/');
		} else if (res.returnCode === USER_NOT_EXIST_NUMBER) {
			showErrorNoText(USER_NOT_EXIST);
		}
	};

	const fetchSimpleCart = async (userId) => {
		try {
			const res = await getCartSimpleAPI(userId);
			Cookies.set('cart', JSON.stringify(res.data));
		} catch (error) {
			console.error('Error fetching cart data:', error);
		}
	};

	const GoogleLoginButton = () => {
		const popup = window.open(
			`${BASE_URL}/auth/google`,
			'Login with Google',
			'width=400,height=400'
		);
		const timer = setInterval(() => {
			if (popup.closed) {
				clearInterval(timer);
				//TODO 處理邏輯
			}
		}, 1000);

		window.addEventListener('message', async (event) => {
			if (event.origin === BASE_URL) {
				// 確保訊息來源為後端
				const data = event.data;
				if (!(data.id_token === undefined)) {
					await fetchSimpleCart(data.userId);
					Cookies.set('userId', data.userId);
					Cookies.set('id_token', data.id_token);
					Cookies.set('photo', data.filePath);
					navigate('/');
				}
			}
		});
	};

	return (
		<Box
			w={['full', 'md']}
			mx="auto"
			p={[8, 10]}
			mt={[20, '5vh']}
			border={['none', '1px']}
			borderColor={['', 'gray.300']}
			borderRadius={10}
			bg="white"
			boxShadow="lg"
		>
			<VStack align="flex-start" w="full" spacing={4}>
				<VStack spacing={1} w="full" align={['flex-start', 'center']}>
					<Heading as="h3" size="lg">
						登入
					</Heading>
					<Text>請輸入使用者E-mail 及密碼</Text>
				</VStack>
			</VStack>

			<FormControl>
				<FormLabel>E-mail</FormLabel>
				<Input
					type="email"
					rounded="5px"
					variant="filled"
					mb={'1rem'}
					value={mail}
					onChange={handleEmailChange}
					isInvalid={emailError}
				/>
				{emailError && <Text color="red.500">{emailError}</Text>}
				<FormLabel>密碼</FormLabel>
				<Input
					type="password"
					rounded="5px"
					variant="filled"
					mb={'.8rem'}
					value={secret}
					onChange={handlesecretChange}
					isInvalid={passwordError}
				/>
				{passwordError && <Text color="red.500">{passwordError}</Text>}
				<HStack w="full" justify="space-between">
					<NavLink to={'/user/forgot'}>
						<Button variant="link" colorScheme="blue">
							忘記密碼
						</Button>
					</NavLink>
				</HStack>
				<Button
					rounded="none"
					colorScheme="blue"
					w={['full', 'auto']}
					mt={'.8rem'}
					onClick={handleLogin}
				>
					登入
				</Button>
				<Divider mt={'1rem'} />

				<Stack
					direction={'row'}
					spacing={4}
					mt={'1rem'}
					justifyContent={'center'}
				>
					<Button
						w={'full'}
						variant={'outline'}
						leftIcon={<FcGoogle />}
						onClick={GoogleLoginButton}
					>
						<Center>
							<Text>Sign in with Google</Text>
						</Center>
					</Button>
				</Stack>

				<Stack
					direction={'row'}
					spacing={4}
					mt={'1rem'}
					justifyContent={'center'}
				>
					<NavLink to={'/user/register'}>
						<Button variant="link" colorScheme="blue">
							註冊帳號
						</Button>
					</NavLink>
				</Stack>
			</FormControl>
		</Box>
	);
}
