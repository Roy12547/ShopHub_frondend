import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Heading,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Image,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAllmess, deleteMessAPI } from '../../../api/backAPI';
import {
	SUCCESS_NUMBER,
	showErrorNoText,
	showSuccess,
} from '../../../utils/apiUtil';

const NewsManagement = () => {
	const [news, setNews] = useState([]);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		fetchNews();
	}, []);

	const fetchNews = async () => {
		const res = await getAllmess();
		setNews(res.data);
	};

	const handleEdit = (id) => {
		navigate('/back/editNews', { state: { id } });
	};

	const handleDelete = async (id) => {
		const res = await deleteMessAPI(id);
		if (res.returnCode === SUCCESS_NUMBER) {
			const newArr = news.filter((item) => item.id !== id);
			setNews(newArr);
			showSuccess('刪除成功', toast);
		} else {
			showErrorNoText('刪除失敗', toast);
		}
	};

	return (
		<Box flex="1" p={8} bg="gray.100">
			<Heading mb={8} color="blue.900">
				最新消息管理
			</Heading>
			<Button
				_hover={{ bg: 'orange.500' }}
				onClick={() => navigate('/back/createNews')}
				mb={4}
				bg="blue.900"
				color="white"
			>
				創建消息
			</Button>
			<Table
				variant="simple"
				colorScheme="teal"
				border="2px"
				borderColor="blue.900"
				borderRadius="lg"
			>
				<Thead bg="blue.900">
					<Tr>
						<Th color="white" border="1px solid" borderColor="blue.900">
							標題
						</Th>
						<Th color="white" border="1px solid" borderColor="blue.900">
							內容
						</Th>
						<Th color="white" border="1px solid" borderColor="blue.900">
							最後修改時間時間
						</Th>
						<Th color="white" border="1px solid" borderColor="blue.900">
							圖片
						</Th>
						<Th color="white" border="1px solid" borderColor="blue.900">
							操作
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{news.map((item) => (
						<Tr key={item.id} border="1px solid" borderColor="blue.900">
							<Td border="1px solid" borderColor="blue.900">
								{item.title}
							</Td>
							<Td border="1px solid" borderColor="blue.900">
								{item.content}
							</Td>
							<Td border="1px solid" borderColor="blue.900">
								{item.createdAt}
							</Td>
							<Td border="1px solid" borderColor="blue.900">
								<Image src={item.imageURL} boxSize="100px" objectFit="cover" />
							</Td>
							<Td border="1px solid" borderColor="blue.900">
								<Button onClick={() => handleEdit(item.id)} colorScheme="blue">
									編輯
								</Button>
								<Button
									onClick={() => handleDelete(item.id)}
									ml={2}
									colorScheme="red"
								>
									刪除
								</Button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default NewsManagement;
