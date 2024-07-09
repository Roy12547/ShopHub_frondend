import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
	Radio,
	RadioGroup,
	Divider,
	Center,
} from '@chakra-ui/react';
import { useState, React } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { createUserAPI } from '../../../api/userAPI';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { showSuccess, MAIL_EXIST, BASE_URL } from '../../../utils/apiUtil';
export default function CreateUser() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [userName, setUserName] = useState('');
	const [userNameError, setUserNameError] = useState('');
	const [secret, setSecret] = useState('');
	const [mail, setMail] = useState('');
	const [sex, setSex] = useState();
	const [birthday, setBirthday] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const handleUserNameChange = (e) => {
		setUserName(e.target.value);
	};
	const handlemailChange = (e) => {
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
	const handlesexChange = (e) => {
		setSex(e.target.value);
	};
	const handlebirthdayChange = (e) => {
		setBirthday(e.target.value);
	};
	const insertUser = async (e) => {
		if (userName === '') {
			setUserNameError('請輸入性別');
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(mail)) {
			return;
		}
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
		if (!passwordRegex.test(secret)) {
			return;
		}

		const res = await createUserAPI({
			userName: userName,
			secret: secret,
			birthday: birthday,
			mail: mail,
			sex: sex,
		});

		if (res.returnCode === 200) {
			showSuccess('成功註冊');
			navigate('/user/login');
		} else if (res.returnCode === MAIL_EXIST) {
			setEmailError('此信箱已使用');
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
		<Flex
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
						註冊帳號
					</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="firstName" isRequired>
							<FormLabel>姓名</FormLabel>
							<Input
								type="text"
								onChange={handleUserNameChange}
								value={userName}
							/>
							{userNameError && <Text color="red.500">{userNameError}</Text>}
						</FormControl>

						<FormControl id="email" isRequired>
							<FormLabel>信箱</FormLabel>
							<Input type="email" value={mail} onChange={handlemailChange} />
							{emailError && <Text color="red.500">{emailError}</Text>}
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>密碼</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? 'text' : 'password'}
									value={secret}
									onChange={handlesecretChange}
									width={'450px'}
								/>
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
							{passwordError && <Text color="red.500">{passwordError}</Text>}
						</FormControl>

						<FormControl id="sex">
							<Stack direction={['column', 'row']} spacing={6}>
								<input
									type="radio"
									name="sex"
									value={1}
									onChange={handlesexChange}
								/>
								<FormLabel>男</FormLabel>
								<input
									type="radio"
									name="sex"
									value={2}
									onChange={handlesexChange}
								/>
								<FormLabel>女</FormLabel>
								<input
									type="radio"
									name="sex"
									value={3}
									onChange={handlesexChange}
								/>
								<FormLabel>不透漏</FormLabel>
							</Stack>
						</FormControl>

						<FormControl id="birthday">
							<FormLabel>生日</FormLabel>
							<Input
								placeholder="Select Date and Time"
								size="md"
								type="date"
								value={birthday}
								onChange={handlebirthdayChange}
							/>
						</FormControl>

						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								size="lg"
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								onClick={insertUser}
							>
								註冊
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								已經有帳號了嗎? <Link color={'blue.400'}>登入</Link>
							</Text>
						</Stack>
						<Divider mt={'1rem'} />

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
				</Box>
			</Stack>
		</Flex>
	);
}
