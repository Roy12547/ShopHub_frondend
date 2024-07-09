import {
	Button,
	FormControl,
	Flex,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { forgotPassAPI } from '../../../api/userAPI';
import {
	SUCCESS_NUMBER,
	showSuccess,
	showErrorNoText,
	EMAIL_NOT_EXIST_NUMBER,
	ACCOUNT_NOT_EXIST,
} from '../../../utils/apiUtil';
export const Forgot = () => {
	const navigate = useNavigate();
	const [mail, setMail] = useState();

	const handleMailChange = (e) => {
		setMail(e.target.value);
	};

	const handleSendMail = async () => {
		const res = await forgotPassAPI(mail);
		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('成功送出');
			navigate(`/user/verify?mail=${mail}`);
		} else if (res.returnCode === EMAIL_NOT_EXIST_NUMBER) {
			showErrorNoText(ACCOUNT_NOT_EXIST);
		}
	};
	return (
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
						忘記密碼?
					</Heading>
					<Text
						fontSize={{ base: 'sm', sm: 'md' }}
						color={useColorModeValue('gray.800', 'gray.400')}
					>
						將發送驗證碼至此信箱
					</Text>
					<FormControl id="email">
						<Input
							placeholder="email@example.com"
							_placeholder={{ color: 'gray.500' }}
							type="email"
							value={mail}
							onChange={handleMailChange}
						/>
					</FormControl>
					<Stack spacing={6}>
						<Button
							onClick={handleSendMail}
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
		</>
	);
};
