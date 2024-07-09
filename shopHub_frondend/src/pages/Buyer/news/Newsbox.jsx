// 商品內容框框
import React from 'react';
import {
	Box,
	Button,
	Flex,
	Image,
	Text,
	Link,
	require,
} from '@chakra-ui/react';
import demo from './demo.png';
import { useNavigate } from 'react-router-dom';

function NewsBox() {
	const navigate = useNavigate();
	return (
		<Link
			onClick={() => navigate('/productInformation')}
			style={{ textDecoration: 'none' }}
		>
			<Box
				w={{ base: '100%' }}
				h={{ base: '476px', md: '105px' }}
				border="1px"
				borderColor="lightgray"
				bg="gray.50"
				boxShadow="lg"
				rounded="10px"
			>
				<Flex
					w="100%"
					h="100%"
					alignItems="center"
					justifyContent={{ base: 'center', md: 'flex-start' }}
					p={{ md: '5px' }}
				>
					<Image
						boxSize="90px"
						objectFit="cover"
						src={demo}
						alt="洗衣袋"
						mr="20px"
					/>
					<Box w="100%" h="90px" mr="20px">
						<Box w="100%" mb="2px">
							提醒:您的訂單即將撥款賣家
						</Box>
						<Box w="100%">
							<Text fontSize="14px">
								訂單即將於10-05-2024 自動完成並撥款賣家，若您尚未收到訂單
								240505GUHF6P6N
								商品，若有錯誤/瑕疵/損壞等情況，請務必盡速申請退貨退款。
							</Text>
						</Box>
						<Box w="100%">
							<Text fontSize="10px">2024-05-10 10:06</Text>
						</Box>
					</Box>
					<Flex boxSize="90px" alignItems="center" justifyContent="center">
						<Button colorScheme="teal" size="sm" border="1px">
							查看詳情
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Link>
	);
}

export default NewsBox;
