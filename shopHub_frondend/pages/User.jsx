import { useState, React, useEffect } from 'react';
import axios from 'axios';
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	HStack,
	Avatar,
	AvatarBadge,
	IconButton,
	Center,
	Radio,
	RadioGroup,
	useControllableState,
	Text,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import {
	getUserAPI,
	updateUserFileAPI,
	updateUserNoFileAPI,
} from '../api/userAPI';

const User = () => {
	const [userName, setUserName] = useState('');
	const [mail, setMail] = useState('');
	const [sex, setSex] = useState('1');
	const [birthday, setBirthday] = useState('');
	const [userProfile, setUserProfile] = useState();
	const [file, setFile] = useState();
	const [previewImage, setPreviewImage] = useState();
	const [userId, setUserId] = useState();

	useEffect(() => {
		async function fetchData() {
			const user = await getUserAPI(1);
			setUserId(user.userId);
			const date = new Date(user.birthday);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');

			const formattedDate = `${year}-${month}-${day}`;
			setBirthday(formattedDate);
			setMail(user.mail);
			setUserName(user.userName);
			setSex(user.sex);
			setPreviewImage(user.filePath);
		}
		fetchData();
	}, []);

	const handleUserNameChange = (e) => {
		setUserName(e.target.value);
	};
	const handlemailChange = (e) => {
		setMail(e.target.value);
	};
	const handlesexChange = (e) => {
		setSex(e.target.value);
	};
	const handlebirthdayChange = (e) => {
		setBirthday(e.target.value);
	};
	const handleClickImage = (e) => {
		const fileInput = document.getElementById('file');
		fileInput.click();
	};
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
				setFile(file);
			};
			reader.readAsDataURL(file);
		}
	};

	const clickSumbit = (e) => {
		if (file === undefined) {
			updateUserNoFileAPI({
				userId: userId,
				userName: userName,
				birthday: birthday,
				sex: sex,
			});
		} else {
			updateUserFileAPI({
				userId: userId,
				userName: userName,
				birthday: birthday,
				sex: sex,
				file: file,
			});
		}
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
				<Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
					個人資料編輯
				</Heading>
				<FormControl id="userName">
					<Stack direction={['column', 'row']} spacing={6}>
						<Center>
							<Avatar size="xl" src={previewImage}></Avatar>
						</Center>
						<Center w="full">
							<input
								type="file"
								onChange={handleFileChange}
								accept="image/*"
								id="file"
								style={{ display: 'none' }}
							/>

							<Button w="full" onClick={handleClickImage}>
								上傳頭像
							</Button>
						</Center>
					</Stack>
				</FormControl>
				<FormControl id="userName">
					<FormLabel>名稱</FormLabel>
					<Input
						placeholder="UserName"
						_placeholder={{ color: 'gray.500' }}
						type="text"
						value={userName}
						onChange={handleUserNameChange}
					/>
				</FormControl>
				<FormControl id="email">
					<FormLabel>信箱</FormLabel>

					<Input
						placeholder="your-email@example.com"
						_placeholder={{ color: 'gray.500' }}
						type="email"
						value={mail}
						onChange={handlemailChange}
						disabled
					/>
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
				<FormControl id="sex">
					<Stack direction={['column', 'row']} spacing={6}>
						<Flex align={'center'} gap={2}>
							<input
								type="radio"
								name="sex"
								value={1}
								checked={sex == 1}
								onClick={handlesexChange}
							/>

							<Text>男</Text>

							<input
								type="radio"
								name="sex"
								value={2}
								checked={sex == 2}
								onClick={handlesexChange}
							/>
							<Text>女</Text>

							<input
								type="radio"
								name="sex"
								value={3}
								checked={sex == 3}
								onClick={handlesexChange}
							/>
							<Text>不透漏</Text>
						</Flex>
					</Stack>
				</FormControl>

				<Stack spacing={6} direction={['column', 'row']}>
					<Button
						bg={'red.400'}
						color={'white'}
						w="full"
						_hover={{
							bg: 'red.500',
						}}
					>
						Cancel
					</Button>
					<Button
						bg={'blue.400'}
						color={'white'}
						w="full"
						_hover={{
							bg: 'blue.500',
						}}
						onClick={clickSumbit}
					>
						Submit
					</Button>
				</Stack>
			</Stack>
		</Flex>
	);
};

export default User;
