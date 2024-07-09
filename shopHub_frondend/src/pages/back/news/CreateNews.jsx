// src/pages/NewsManagement.js
import React, { useState } from 'react';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Image,
	useToast,
} from '@chakra-ui/react';
import { createMessAPI } from '../../../api/backAPI';
import { useNavigate } from 'react-router-dom';
import {
	SUCCESS_NUMBER,
	showErrorNoText,
	showSuccess,
} from '../../../utils/apiUtil';

const CreateNews = () => {
	const navigate = useNavigate();
	const [newTitle, setNewTitle] = useState('');
	const [newContent, setNewContent] = useState('');
	const [newImage, setNewImage] = useState(null);
	const [newImageUrl, setNewImageUrl] = useState('');

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
	const handleAddNews = async () => {
		if (!newTitle || !newContent || !newImage) {
			showErrorNoText('請填寫所有欄位並上傳圖片');
			return;
		}
		const res = await createMessAPI({
			file: newImage,
			title: newTitle,
			content: newContent,
		});
		if (res.returnCode === SUCCESS_NUMBER) {
			showSuccess('新增成功');
			navigate('/back/manageNews');
		} else {
			showErrorNoText('新增失敗');
		}
	};

	return (
		<Box flex="1" p={8} bg="blue.900">
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
					新增最新消息
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
				<Button mt={4} colorScheme="blue" onClick={handleAddNews}>
					新增
				</Button>
			</Box>
			{/* <Stack spacing={4}>
          {newsList.map((news) => (
            <Box
              key={news.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              bg="white"
            >
              <Heading size="md">{news.title}</Heading>
              <Text mt={2}>{news.content}</Text>
              {news.imageUrl && (
                <Image src={news.imageUrl} alt={news.title} mt={2} maxHeight="200px" />
              )}
              <Button
                mt={4}
                colorScheme="red"
                size="sm"
                onClick={() => handleDeleteNews(news.id)}
              >
                刪除
              </Button>
            </Box>
          ))}
        </Stack> */}
		</Box>
	);
};

export default CreateNews;
