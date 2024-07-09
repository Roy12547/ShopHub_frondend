import React, { useEffect } from 'react';
import {
	Image,
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Radio,
	RadioGroup,
	Stack,
	Input,
	FormControl,
	FormErrorMessage,
	useToast,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, showSuccess, showErrorNoText } from '../../../utils/apiUtil';

function Profile() {
	const userId = Cookies.get('userId');
	const [profileImage, setProfileImage] = React.useState(
		'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
	);
	const toast = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		axios
			.get(`${BASE_URL}/user/details/${userId}`)
			.then((response) => {
				const userData = response.data.data;
				reset({
					name: userData.userName,
					email: userData.mail,
					gender: userData.sex.toString(),
					birthday: userData.birthday.split('T')[0],
				});
				if (userData.userImage) {
					setProfileImage(userData.userImage);
				}
			})
			.catch((error) => {
				console.error('獲取用戶資料失敗:', error);
				showErrorNoText('無法取得用戶資料');
			});
	}, [reset, toast, userId]);

	const handleFileChange = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			if (file instanceof Blob || file instanceof File) {
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64Image = reader.result;
					setProfileImage(base64Image);
					axios
						.post(`${BASE_URL}/user/uploadImage`, {
							userId: userId,
							userImage: base64Image,
						})
						.then(() => {
							showSuccess('圖片上傳成功');
						})
						.catch(() => {
							showErrorNoText('無法上傳圖像');
						});
				};
				reader.readAsDataURL(file);
			} else {
				showErrorNoText('選擇的文件不是有效的圖像文件');
			}
		} else {
		}
	};

	const onSubmit = (data) => {
		const userDetailDTO = {
			userId: userId,
			userName: data.name,
			sex: parseInt(data.gender),
			birthday: data.birthday,
			mail: data.email,
		};
		axios
			.post(`${BASE_URL}/user/details/updateUser`, userDetailDTO)
			.then(() => {
				showSuccess('用戶資料已更新');
				// 更新成功後重新整理
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			})
			.catch(() => {
				showErrorNoText('無法更新用戶資料');
			});
	};

	// 處理“變更密碼”按鈕的點擊事件
	const handlePasswordChange = () => {
		axios
			.get(`${BASE_URL}/user/checkPassword`, {
				params: { userId: userId },
			})
			.then((response) => {
				const redirectPath = response.data;
				if (redirectPath === '/changepass' || redirectPath === '/verifypass') {
					navigate(redirectPath);
				} else if (redirectPath === '/userNotFound') {
					showErrorNoText('無法找到用戶，無法變更密碼');
				} else {
					showErrorNoText('目前無法變更密碼，請稍後再嘗試');
				}
			})
			.catch((error) => {
				console.error('檢查密碼狀態失敗:', error);
				showErrorNoText('無法檢查密碼狀態');
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid templateColumns="1fr 3fr" gap={6} alignItems="center">
					<GridItem>
						<Flex justifyContent="center">
							<Box as="label" cursor="pointer">
								<Image
									borderRadius="full"
									boxSize="100px"
									src={profileImage}
									alt="Profile"
								/>
								<Input
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									display="none"
								/>
							</Box>
						</Flex>
					</GridItem>
					<GridItem>
						<Flex alignItems="center">
							<Button as="label" cursor="pointer" mr={4}>
								變更頭貼
								<Input
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									display="none"
								/>
							</Button>
						</Flex>
					</GridItem>

					<GridItem textAlign="left">姓名 :</GridItem>
					<GridItem textAlign="right">
						<FormControl isInvalid={errors.name}>
							<Input
								variant="outline"
								{...register('name', { required: '姓名是必填的' })}
							/>
							<FormErrorMessage>
								{errors.name && errors.name.message}
							</FormErrorMessage>
						</FormControl>
					</GridItem>

					<GridItem textAlign="left">Email :</GridItem>
					<GridItem textAlign="right">
						<FormControl isInvalid={errors.email}>
							<Input
								variant="outline"
								isDisabled
								{...register('email', {
									required: 'Email是必填的',
									pattern: {
										value: /^\S+@\S+$/i,
										message: 'Email格式不正確',
									},
								})}
							/>
							<FormErrorMessage>
								{errors.email && errors.email.message}
							</FormErrorMessage>
						</FormControl>
					</GridItem>

					<GridItem textAlign="left">性別 :</GridItem>
					<GridItem textAlign="right">
						<FormControl>
							<Controller
								name="gender"
								control={control}
								defaultValue="1"
								render={({ field }) => (
									<RadioGroup {...field}>
										<Stack direction="row">
											<Radio value="1">男</Radio>
											<Radio value="2">女</Radio>
											<Radio value="3">不透露</Radio>
										</Stack>
									</RadioGroup>
								)}
							/>
						</FormControl>
					</GridItem>

					<GridItem textAlign="left">生日 :</GridItem>
					<GridItem textAlign="right">
						<FormControl isInvalid={errors.birthday}>
							<Input
								id="date"
								type="date"
								borderColor="teal.500"
								focusBorderColor="teal.600"
								bg="gray.100"
								_hover={{ bg: 'white' }}
								shadow="md"
								p={2}
								{...register('birthday', { required: '生日是必填的' })}
							/>
							<FormErrorMessage>
								{errors.birthday && errors.birthday.message}
							</FormErrorMessage>
						</FormControl>
					</GridItem>
				</Grid>

				<Flex mt={4} justify="space-between">
					<Button
						onClick={handlePasswordChange}
						colorScheme="black"
						variant="outline"
					>
						變更密碼
					</Button>
					<Button type="submit" colorScheme="black" variant="outline">
						儲存
					</Button>
				</Flex>
			</form>
		</div>
	);
}

export default Profile;
