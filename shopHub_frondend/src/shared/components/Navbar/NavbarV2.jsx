import React, { useEffect, useState } from 'react';
import { Heading, Box, Flex } from '@chakra-ui/layout';
import {
	Input,
	InputGroup,
	InputRightElement,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Text,
	Stack,
	Image,
	PopoverFooter,
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
import { CartIcon } from '../../../pages/CartPage/CartIcon';
import { useNavigate } from 'react-router-dom';
import { getCartSimpleAPI } from '../../../api/cartAPI';
import Cookie from 'js-cookie';

export const Navbar = () => {
	const navigate = useNavigate();
	const [cart, setCart] = useState([]);

	const fetchSimpleCart = async () => {
		try {
			const cartCookie = Cookie.get('cart');
			if (cartCookie) {
				const parsedCart = JSON.parse(cartCookie);
				console.log('Cart from Cookie:', parsedCart);
				setCart(parsedCart);
			} else {
				const userId = Cookie.get('userId');
				if (userId) {
					const res = await getCartSimpleAPI(userId);
					console.log('Response from API:', res.data);
					Cookie.set('cart', JSON.stringify(res.data));
					setCart(res.data);
				}
			}
		} catch (error) {
			console.error('Error fetching cart data:', error);
		}
	};

	useEffect(() => {
		fetchSimpleCart();
	}, []);

	const handleCartClick = () => {
		navigate('/cart');
	};

	return (
		<Box
			bgGradient="linear(to-l, #7928CA, #FF0080)"
			pt={{ base: 1 }}
			py={{ base: 2 }}
			px={{ base: 4 }}
			display="flex"
			justifyContent={'space-between'}
		>
			<Heading color={'#fff'}>ShopHub</Heading>
			<Flex justifyItems="center" gap={5}>
				<InputGroup size="md">
					<Input pr="4.5rem" placeholder="今天訂，明天到" bg="#fff" />
					<InputRightElement width="5rem">
						<Button h="2rem" size="lg" bg="#7928CA" _hover={{ bg: '#FF0080' }}>
							<IoSearch color="#fff" />
						</Button>
					</InputRightElement>
				</InputGroup>

				<Popover trigger="hover">
					<PopoverTrigger>
						<Flex align={'center'}>
							<CartIcon itemCount={cart.length}></CartIcon>
						</Flex>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader>最近加入的商品</PopoverHeader>
						<PopoverBody>
							{cart.map((thiscart, index) => {
								console.log(thiscart);
							})}
							{cart.length === 0 ? (
								<Text>購物車為空</Text>
							) : (
								cart.map((thiscart, index) => (
									<Stack key={index} direction="row" spacing={4}>
										{thiscart ? (
											<>
												<Image
													boxSize="50px"
													src={thiscart.pimgURL}
													alt={thiscart.product.productName}
												/>
												<Flex direction="column">
													<Text fontWeight="bold">
														{thiscart.product.productName}
													</Text>
													<Text>數量: {thiscart.amount}</Text>
												</Flex>
											</>
										) : (
											<Text>Data is undefined</Text>
										)}
									</Stack>
								))
							)}
						</PopoverBody>
						<PopoverFooter>
							<Button mt={4} colorScheme="blue" onClick={handleCartClick}>
								查看購物車
							</Button>
						</PopoverFooter>
					</PopoverContent>
				</Popover>
			</Flex>
		</Box>
	);
};
