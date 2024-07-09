import React, { useState } from 'react';
import {
	Box,
	Text,
	Image,
	Button,
	Flex,
	Heading,
	Input,
	Textarea,
	Stack,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../utils/apiUtil';
import Cookies from 'js-cookie';

const IntroSettingPanel = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [shopName, setShopName] = useState('');
	const [shopDescription, setShopDescription] = useState('');
	const [savedShopDescription, setSavedShopDescription] = useState('');
	const [shopLogo, setShopLogo] = useState('https://via.placeholder.com/150');
	const toast = useToast();

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = async () => {
		try {
			const requestBody = {
				userId: Cookies.get('userId'),
				sellerName: shopName,
				sellerDisc: shopDescription,
				sellerImage: shopLogo, // 去除 Base64 前缀
			};

			const response = await axios.post(
				`${BASE_URL}/user/updateSellerInfo`,
				requestBody,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.data) {
				setSavedShopDescription(shopDescription);
				Swal.fire({
					title: '已保存',
					icon: 'success',
					timer: 2000,
					showConfirmButton: false,
				});
			}
		} catch (error) {
			console.error('Error:', error);
			Swal.fire({
				title: '保存失败',
				icon: 'error',
				timer: 2000,
				showConfirmButton: false,
			});
		}
		setIsEditing(false);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result;
				setShopLogo(base64String);
				console.log(base64String);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
			{isEditing ? (
				<Box>
					<Heading fontSize="xl" mb={4}>
						基本資料
					</Heading>
					<Box p={5} borderWidth="1px" borderRadius="md">
						<Text fontSize="lg" mb={2}>
							基本資料
						</Text>
						<Flex mb={4} align="center">
							<Text fontSize="lg" mr={4}>
								賣場名稱
							</Text>
							<Input
								value={shopName}
								onChange={(e) => setShopName(e.target.value)}
								maxW="400px"
								mr={2}
							/>
							<Text>{shopName.length}/40</Text>
						</Flex>
						<Flex align="center" mb={4}>
							<Image
								borderRadius="full"
								boxSize="150px"
								src={shopLogo}
								alt="Shop Logo"
								mr={4}
							/>
							<Button as="label" cursor="pointer">
								上傳
								<Input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									hidden
								/>
							</Button>
							<Box ml={4}>
								<Text>建議圖片尺寸：寬150px，高150px</Text>
								<Text>檔案大小最大為2.0MB</Text>
								<Text>圖片需為JPG, JPEG, PNG檔案</Text>
							</Box>
						</Flex>
						<Text mb={2}>
							賣場介紹
							<Text as="span" color="gray.500">
								（若您已使用賣場佈置功能，請至賣場佈置更新）
							</Text>
						</Text>
						<Textarea
							value={shopDescription}
							onChange={(e) => setShopDescription(e.target.value)}
							placeholder="在此處輸入您的賣場資訊及敘述"
							mb={4}
							height="150px"
						/>
						<Flex justify="flex-end">
							<Button colorScheme="teal" onClick={handleSaveClick} mr={2}>
								儲存
							</Button>
							<Button onClick={handleCancelClick}>取消</Button>
						</Flex>
					</Box>
				</Box>
			) : (
				<Box>
					<Flex justify="space-between" align="center" mb={4}>
						<Heading fontSize="xl">基本資料</Heading>
						<Stack direction="row" spacing={4}>
							<Button colorScheme="teal">查看我的賣場</Button>
							<Button colorScheme="teal" onClick={handleEditClick}>
								編輯
							</Button>
						</Stack>
					</Flex>
					<Box p={5} borderWidth="1px" borderRadius="md">
						<Text fontSize="lg" mb={4}>
							基本資料
						</Text>
						<Flex mb={4} align="center">
							<Text fontSize="lg" mr={4}>
								賣場名稱
							</Text>
							<Text fontSize="lg" ml="10px">
								{shopName}
							</Text>
						</Flex>
						<Flex align="center" mb={4}>
							<Image
								borderRadius="full"
								boxSize="150px"
								src={shopLogo}
								alt="Shop Logo"
								mr={4}
							/>
							<Box>
								<Text>建議圖片尺寸：寬150px，高150px</Text>
								<Text>檔案大小最大為2.0MB</Text>
								<Text>圖片需為JPG, JPEG, PNG檔案</Text>
							</Box>
						</Flex>
						<Text mb={2}>
							賣場介紹
							<Text as="span" color="gray.500">
								（若您已使用賣場佈置功能，請至賣場佈置更新）
							</Text>
						</Text>
						<Text fontSize="md" mt={2}>
							{savedShopDescription}
						</Text>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default IntroSettingPanel;
