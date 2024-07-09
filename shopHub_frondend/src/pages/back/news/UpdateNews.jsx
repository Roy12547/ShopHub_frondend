import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Image,
	useToast,
} from '@chakra-ui/react';
import {
	getOneMessAPI,
	updateMessAPI,
	updateMessNoImgAPI,
} from '../../../api/backAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	SUCCESS_NUMBER,
	showError,
	showErrorNoText,
	showSuccess,
} from '../../../utils/apiUtil';

const UpdateNews = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = location.state || {};
	const [newTitle, setNewTitle] = useState('');
	const [newContent, setNewContent] = useState('');
	const [newImage, setNewImage] = useState(null);
	const [newImageUrl, setNewImageUrl] = useState('');

	useEffect(() => {
		const fetchNews = async () => {
			const res = await getOneMessAPI(id);
			const data = res.data;
			setNewTitle(data.title);
			setNewContent(data.content);
			setNewImageUrl(data.imageURL);
		};
		fetchNews();
	}, [id]);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewImageUrl(reader.result);
				setNewImage(file);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleClickImage = (e) => {
		const fileInput = document.getElementById('file');
		fileInput.click();
	};

	const handleUpdateNews = async () => {
		let res;
		if (newImage === null) {
			res = await updateMessNoImgAPI({
				id,
				title: newTitle,
				content: newContent,
			});
		} else {
			res = await updateMessAPI({
				id,
				title: newTitle,
				content: newContent,
				images: newImage,
			});
		}

		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('編輯成功');
			navigate('/back/manageNews');
		} else {
			showErrorNoText('編輯失敗');
		}
	};

	return (
		<Box flex="1" p={8} bg="gray.100">
			<Heading mb={8}>最新消息管理</Heading>
			<Box
				mb={8}
				p={4}
				borderWidth="1px"
				borderRadius="md"
				boxShadow="md"
				bg="white"
			>
				<Heading size="md" mb={4}>
					更新最新消息
				</Heading>
				<FormControl>
					<FormLabel>標題</FormLabel>
					<Input
						placeholder="輸入最新消息標題"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>內容</FormLabel>
					<Input
						placeholder="輸入最新消息內容"
						value={newContent}
						onChange={(e) => setNewContent(e.target.value)}
					/>
				</FormControl>
				<FormControl mt={4}>
					<FormLabel>圖片上傳</FormLabel>
					<Button w="full" onClick={handleClickImage}>
						上傳圖片
					</Button>
					<input
						id="file"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						style={{ display: 'none' }}
					/>
					{newImageUrl && (
						<Image
							src={newImageUrl}
							alt="預覽"
							mt={4}
							maxHeight="200px"
							mx="auto"
						/>
					)}
				</FormControl>
				<Button mt={4} colorScheme="blue" onClick={handleUpdateNews}>
					更新
				</Button>
			</Box>
		</Box>
	);
};

export default UpdateNews;
