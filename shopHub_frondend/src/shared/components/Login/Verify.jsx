import { Center, Heading } from '@chakra-ui/react';
import {
	Button,
	FormControl,
	Flex,
	Input,
	Stack,
	useColorModeValue,
	HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyAPI, resetPassAPI } from '../../../api/userAPI';
import {
	SUCCESS_NUMBER,
	showSuccess,
	showErrorNoText,
	VERIFY_CODE_WRONG,
} from '../../../utils/apiUtil';
export const Verify = () => {
	const [verifyCode, setVerifyCode] = useState();
	const [secret, setSecret] = useState();
	const [secretRe, setSecretRe] = useState();
	const [idVerify, setIsVerifyCode] = useState(false);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const mail = searchParams.get('mail');
	const navigate = useNavigate();
	const handleInput = (e) => {
		setVerifyCode(e);
	};
	const handleSecret = (e) => {
		setSecret(e.target.value);
	};
	const handleSecretRe = (e) => {
		setSecretRe(e.target.value);
	};
	const handleSendVerify = async () => {
		const res = await verifyAPI({
			secret: verifyCode,
			mail: mail,
		});
		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('驗證成功');
			setIsVerifyCode(true);
		} else if (res.returnCode === VERIFY_CODE_WRONG) {
			showErrorNoText('錯誤的驗證碼');
		}
	};
	const handleChangePass = async () => {
		if (secret === secretRe) {
			const res = await resetPassAPI({
				secret: secret,
				mail: mail,
			});
			showSuccess('成功變更密碼');
			navigate('/user/login');
		} else {
			showErrorNoText('密碼不一致');
		}
	};

	return (
		<>
			{idVerify ? (
				<>
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
								Enter new password
							</Heading>
							<FormControl id="password" isRequired>
								<FormLabel>new Password</FormLabel>
								<Input type="password" onChange={handleSecret} />
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>rePassword</FormLabel>
								<Input type="password" onChange={handleSecretRe} />
							</FormControl>
							<Stack spacing={6}>
								<Button
									onClick={handleChangePass}
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
								>
									送出修改
								</Button>
							</Stack>
						</Stack>
					</Flex>
				</>
			) : (
				<>
					<Flex
						minH={'100vh'}
						align={'center'}
						justify={'center'}
						bg={useColorModeValue('gray.50', 'gray.800')}
					>
						<Stack
							spacing={4}
							w={'full'}
							maxW={'sm'}
							bg={useColorModeValue('white', 'gray.700')}
							rounded={'xl'}
							boxShadow={'lg'}
							p={6}
							my={10}
						>
							<Center>
								<Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
									Verify your Email
								</Heading>
							</Center>
							<Center
								fontSize={{ base: 'sm', sm: 'md' }}
								color={useColorModeValue('gray.800', 'gray.400')}
							>
								請輸入收到的驗證碼
							</Center>
							<Center
								fontSize={{ base: 'sm', sm: 'md' }}
								fontWeight="bold"
								color={useColorModeValue('gray.800', 'gray.400')}
							>
								username@mail.com
							</Center>
							<FormControl>
								<Center>
									<HStack>
										<PinInput type="alphanumeric" onChange={handleInput}>
											<PinInputField />
											<PinInputField />
											<PinInputField />
											<PinInputField />
											<PinInputField />
											<PinInputField />
											<PinInputField />
										</PinInput>
									</HStack>
								</Center>
							</FormControl>
							<Stack spacing={6}>
								<Button
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									onClick={handleSendVerify}
								>
									驗證
								</Button>
							</Stack>
						</Stack>
					</Flex>
				</>
			)}
		</>
	);
};
