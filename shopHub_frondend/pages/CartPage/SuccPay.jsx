import React, { useEffect, useState } from 'react';
import {
	Box,
	Heading,
	Text,
	Button,
	VStack,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTotalDetailAPI } from '../../api/cartAPI';
import Cookie from 'js-cookie';
export const SuccPay = ({ orderDetails }) => {
	const navigator = useNavigate();
	const location = useLocation();
	const [totalOD, setTotalOD] = useState();

	const fetchTotalOD = async (ecpay) => {
		try {
			const res = await getTotalDetailAPI(ecpay);

			let cartCookie = Cookie.get('cart');
			let parsedCart = JSON.parse(cartCookie);
			res.orderDetailList.map((od) => {
				parsedCart = parsedCart.filter(
					(item) => item.product.productId !== od.productId
				);
			});

			Cookie.set('cart', JSON.stringify(parsedCart));

			setTotalOD(res);
		} catch (error) {
			console.error('Error fetching order details:', error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const queryParams = new URLSearchParams(location.search);
			const ecpay = queryParams.get('ecpay');
			if (ecpay) {
				await fetchTotalOD(ecpay);
			}
		};

		fetchData();
	}, [location]);

	const handleClose = () => {
		navigator('/cart');
	};

	return (
		<>
			<Box textAlign="center" py={10} px={6}>
				<CheckCircleIcon boxSize={'50px'} color={'green.500'} />
				<Heading as="h2" size="xl" mt={6} mb={2}>
					付款成功
				</Heading>
				<Text color={'gray.500'}>感謝您的購買！您的訂單已成功處理。</Text>

				{totalOD ? (
					<VStack spacing={4} mt={6} align="stretch">
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>商品名稱</Th>
									<Th>數量</Th>
									<Th>單價</Th>
								</Tr>
							</Thead>
							<Tbody>
								{totalOD.orderDetailList.map((item, index) => (
									<Tr key={index}>
										<Td>{item.productName}</Td>
										<Td>{item.quantity}</Td>
										<Td>{item.price}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
						<Text textAlign="right" mt={4} mr={'10rem'}>
							總價格: {totalOD.totalPrice}
						</Text>
					</VStack>
				) : (
					<></>
				)}
				<Button colorScheme="teal" variant="solid" mt={6} onClick={handleClose}>
					回到購物車
				</Button>
			</Box>
		</>
	);
};
