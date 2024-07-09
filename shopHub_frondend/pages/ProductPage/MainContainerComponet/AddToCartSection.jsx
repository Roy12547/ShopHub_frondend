import React, { useEffect, useState } from 'react';
import {
	Box,
	Text,
	HStack,
	VStack,
	Badge,
	Button,
	useColorModeValue,
	useRadioGroup,
	Wrap,
	useNumberInput,
	Input,
	Image,
} from '@chakra-ui/react';
import RadioCard from './RadioCard';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { creatCartItemAPI } from '../../../api/productCRUDAPI';
import { showSuccess } from '../../../utils/apiUtil';
import { delCartItemAPI, getCartSimpleAPI } from '../../../api/cartAPI';

export default function AddToCartSection({ product }) {
	const [selectedSpec, setSelectedSpec] = useState(() => {
		if (product.prodSpecs && product.prodSpecs.length > 0) {
			const firstSpec = product.prodSpecs[0];
			return {
				[firstSpec.spec1]: firstSpec.spec1Name,
				...(firstSpec.spec2 ? { [firstSpec.spec2]: firstSpec.spec2Name } : {}),
			};
		}
		return null;
	});
	const [cartSpecId, setCartSpecId] = useState(
		product.prodSpecs != null ? product.prodSpecs[0].prodSpecId : null
	);
	const [displayPrice, setDisplayPrice] = useState(
		product.prodSpecs && product.prodSpecs.length > 0
			? product.prodSpecs[0].price
			: product.product.price
	);
	const [simpleCartItem, setSimpleCartItem] = useState(null);
	const [amount, setAmount] = useState(1);
	const [maxStock, setMaxStock] = useState(product.product.stock);
	const navigate = useNavigate();

	useEffect(() => {
		console.log('Current amount:', amount);
		console.log('Max stock:', maxStock);
	}, [amount, maxStock]);

	const handleIncrement = () => {
		setAmount((prevAmount) => {
			const newAmount = Math.min(prevAmount + 1, maxStock);
			console.log('Incrementing to:', newAmount);
			return newAmount;
		});
	};

	const handleDecrement = () => {
		setAmount((prevAmount) => {
			const newAmount = Math.max(prevAmount - 1, 1);
			console.log('Decrementing to:', newAmount);
			return newAmount;
		});
	};

	const handleInputChange = (event) => {
		const value = parseInt(event.target.value, 10);
		if (!isNaN(value)) {
			const newAmount = Math.max(1, Math.min(value, maxStock));
			console.log('Input changed to:', newAmount);
			setAmount(newAmount);
		}
	};

	useEffect(() => {
		if (selectedSpec) {
			const currentSpec = product.prodSpecs.find(
				(p) =>
					p.spec1Name === selectedSpec[product.prodSpecs[0].spec1] &&
					(!product.prodSpecs[0].spec2 ||
						p.spec2Name === selectedSpec[product.prodSpecs[0].spec2])
			);
			if (currentSpec) {
				setMaxStock(currentSpec.stock);
				setAmount((prevAmount) => Math.min(prevAmount, currentSpec.stock));
			}
		} else {
			setMaxStock(product.product.stock);
		}
	}, [selectedSpec, product]);

	const handleAddToCart = async (redirect = false) => {
		const cartCookie = Cookies.get('cart');
		let isProdExist = false;
		if (cartCookie) {
			try {
				const parsedCart = JSON.parse(cartCookie);
				console.log('Cart from Cookie:', parsedCart);
				parsedCart.map((cart) => {
					if (cart.product.productId == product.product.productId) {
						delCartItemAPI(cart.cartItemId);
					}
				});
				console.log(isProdExist);
			} catch (error) {
				console.error('Parsing error:', error);
				// 处理解析错误，例如设置cartCookie为null或其他恢复策略
			}
		}
		if (Cookies.get('id_token')) {
			const cartItem = {
				productId: product.product.productId,
				userId: Cookies.get('userId'),
				prdSpecId: cartSpecId,
				amount: amount,
			};

			creatCartItemAPI(cartItem).then((response) => {
				setSimpleCartItem(JSON.stringify(response.data));
				const status = response.returnCode;
				console.log(response);
				if (status === 200 && redirect) {
					console.log(cartSpecId);
					// 跳轉到購物車頁面
					getCartSimpleAPI(Cookies.get('userId')).then((response) => {
						console.log(response);
						Cookies.set('cart', JSON.stringify(response.data));
					});
					navigate('/cart');
				} else if (status === 200) {
					// 處理成功響應
					// todo
					getCartSimpleAPI(Cookies.get('userId')).then((response) => {
						console.log(response);
						Cookies.set('cart', JSON.stringify(response.data));
					});
					showSuccess('加入購物車');
				} else {
					// 處理錯誤響應
					console.error('加入購物車失敗');
				}
			});
		} else {
			// 尚未登入，跳轉到登入頁面
			navigate('/user/login');
		}
	};
	const ratingsStars = () => {
		if (product.ratings) {
			const avg = product.ratings?.reduce(
				(acc, rating) => acc + rating.productRating / product.ratings?.length,
				0
			);

			return parseFloat(avg.toFixed(1));
		}
	};
	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NTD', // 根据需要调整货币类型
			minimumFractionDigits: 0, // 最小小数位数，根据需要调整
		}).format(price);
	};
	return (
		<Box flex="3" p={5}>
			<Text fontSize="2xl" fontWeight="bold">
				{product.product.productName}
			</Text>
			<HStack spacing={4} mt={2}>
				<Badge colorScheme="green">{ratingsStars()}</Badge>
				<Text>{product.ratings?.length ?? 0} 個評價</Text>
				<Text>{product.orderDetails?.length ?? 0} 已售出</Text>
			</HStack>

			<Text mt={4}>
				{product.product.description1}
				<br />
				{product.product.description2}
			</Text>
			{product.prodSpecs && product.prodSpecs.length > 0 ? (
				<VStack align="stretch" spacing={4}>
					{['spec1', 'spec2'].map((spec) => {
						const specName = product.prodSpecs[0][spec];
						// 只有當 specName 存在時才創建選項
						if (specName) {
							const specValues = [
								...new Set(product.prodSpecs.map((p) => p[`${spec}Name`])),
							];

							if (specValues.length > 0) {
								const { getRootProps, getRadioProps } = useRadioGroup({
									name: spec,
									defaultValue: selectedSpec
										? selectedSpec[specName]
										: specValues[0],
									onChange: (value) => {
										const newSelectedSpec = {
											...selectedSpec,
											[specName]: value,
										};
										console.log('New selected spec:', newSelectedSpec);

										const matchedSpec = product.prodSpecs.find((p) => {
											const spec1Match =
												p.spec1Name ===
												newSelectedSpec[product.prodSpecs[0].spec1];
											const spec2Match = product.prodSpecs[0].spec2
												? p.spec2Name ===
													newSelectedSpec[product.prodSpecs[0].spec2]
												: true;
											return spec1Match && spec2Match;
										});

										console.log('Matched spec:', matchedSpec);

										if (matchedSpec) {
											setSelectedSpec(newSelectedSpec);
											setCartSpecId(matchedSpec.prodSpecId);
											setDisplayPrice(matchedSpec.price);
										}
									},
								});

								// 渲染選項...
								const group = getRootProps();

								return (
									<Box key={spec}>
										<Text fontWeight="bold">{specName}</Text>
										<Wrap {...group} spacing={2}>
											{specValues.map((value) => {
												const radio = getRadioProps({ value });
												const base64Image =
													spec === 'spec1'
														? product.prodSpecs.find(
																(p) => p.spec1Name === value
															)?.specBase64
														: null;

												return (
													<RadioCard key={value} {...radio}>
														{base64Image && (
															<Image
																src={base64Image}
																alt={value}
																boxSize="50px"
																objectFit="cover"
																mb={2}
															/>
														)}
														<Text>{value}</Text>
													</RadioCard>
												);
											})}
										</Wrap>
									</Box>
								);
							}
						}
						return null;
					})}

					<Box>
						<Text
							fontSize="3xl"
							color={useColorModeValue('red.500', 'red.300')}
						>
							{displayPrice ||
								(product.prodSpecs && product.prodSpecs[0].price) ||
								product.product.price}
						</Text>
						<Text>
							庫存:{' '}
							{selectedSpec
								? product.prodSpecs.find((p) => {
										const spec1Match =
											p.spec1Name === selectedSpec[product.prodSpecs[0].spec1];
										const spec2Match = product.prodSpecs[0].spec2
											? p.spec2Name === selectedSpec[product.prodSpecs[0].spec2]
											: true;
										return spec1Match && spec2Match;
									})?.stock || product.product.stock
								: product.product.stock}
						</Text>
					</Box>
				</VStack>
			) : (
				<Box>
					<Text fontSize="3xl" color={useColorModeValue('red.500', 'red.300')}>
						{formatPrice(displayPrice) ||
							formatPrice(product.prodSpecs && product.prodSpecs[0].price) ||
							formatPrice(product.product.price)}
					</Text>
					<Text>庫存: {product.product.stock}</Text>
				</Box>
			)}

			<HStack maxW="320px" mt={4} spacing={0}>
				<Button onClick={handleDecrement} isDisabled={amount <= 1}>
					-
				</Button>
				<Input
					value={amount}
					onChange={handleInputChange}
					textAlign="center"
					w="30%"
				/>
				<Button onClick={handleIncrement} isDisabled={amount >= maxStock}>
					+
				</Button>
			</HStack>

			<HStack spacing={4}>
				<Button
					size="lg"
					bg="#c2209f"
					color="white"
					mt={4}
					onClick={() => handleAddToCart(true)}
				>
					直接購買
				</Button>
				<Button size="lg" mt={4} onClick={() => handleAddToCart()}>
					加入購物車
				</Button>
			</HStack>
		</Box>
	);
}
