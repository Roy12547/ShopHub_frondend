import {
	Box,
	Flex,
	Stack,
	Heading,
	Text,
	Image,
	Button,
	Card,
	CardBody,
	Grid,
	GridItem,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Portal,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
	getCartItemAPI,
	delCartItemAPI,
	getaddressAPI,
} from '../../api/cartAPI';
import { Link, useNavigate } from 'react-router-dom';
import { showErrorNoText } from '../../utils/apiUtil';
import Cookies from 'js-cookie';
import { EmptyCart } from './EmptyCart';
const Cart = () => {
	const navigator = useNavigate();
	const cartCardRef = useRef(null);
	const [cartGroup, setCartGroup] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [shipAddress, setShipAddress] = useState([]);
	const [selectPrdSpec, setSelectPrdSpec] = useState(new Map());
	const [totalLength, setTotalLength] = useState();

	useEffect(() => {
		const handleScroll = () => {
			const cartCardElement = cartCardRef.current;
			if (cartCardElement) {
				const cartCardRect = cartCardElement.getBoundingClientRect();
				const viewportHeight = window.innerHeight;

				if (cartCardRect.bottom > viewportHeight) {
					cartCardElement.style.position = 'sticky';
					cartCardElement.style.bottom = '0';
				} else {
					cartCardElement.style.position = 'static';
				}
			}
		};

		const fetchCartItems = async () => {
			let count = 0;
			const userId = Cookies.get('userId');
			if (userId) {
				const res = await getCartItemAPI(userId);
				setCartGroup(res.data);
				const newPrdMap = new Map(selectPrdSpec);

				res.data.map((cart) => {
					cart.cartDTOList.map((cartdto) => {
						const thisPrd = cartdto.product;
						count++;
						if (cartdto.prdSpecId === null) {
						} else {
							const findThisPrd = thisPrd.prodSpecList.find(
								(item) => item.prodSpecId === cartdto.prdSpecId
							);

							newPrdMap.set(thisPrd.productId, findThisPrd);
						}
						setSelectPrdSpec(newPrdMap);
					});
				});
			}
			setTotalLength(count);
		};
		const fetchShipAddress = async () => {
			const userId = Cookies.get('userId');
			const res = await getaddressAPI(userId);
			setShipAddress(res.data);
		};

		fetchCartItems();
		fetchShipAddress();
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const getSelectedItemLength = () => {
		let count = 0;
		selectedItems.map((item) => {
			item.cartDTOList.map(() => {
				count++;
			});
		});
		return count;
	};

	const incrementQuantity = (sellerId, productId) => {
		setCartGroup((prevCartGroup) =>
			prevCartGroup.map((group) => {
				if (group.sellerId === sellerId) {
					return {
						...group,
						cartDTOList: group.cartDTOList.map((item) => {
							if (item.product.productId === productId) {
								if (item.product.stock === item.amount) {
									return { ...item, amount: item.amount };
								} else {
									return { ...item, amount: item.amount + 1 };
								}
							}
							return item;
						}),
					};
				}
				return group;
			})
		);
		setSelectedItems((prevCartGroup) =>
			prevCartGroup.map((group) => {
				if (group.sellerId === sellerId) {
					return {
						...group,
						cartDTOList: group.cartDTOList.map((item) => {
							if (item.product.productId === productId) {
								if (item.product.stock === item.amount) {
									return { ...item, amount: item.amount };
								} else {
									return { ...item, amount: item.amount + 1 };
								}
							}
							return item;
						}),
					};
				}
				return group;
			})
		);
	};

	const decrementQuantity = (sellerId, productId) => {
		setCartGroup((prevCartGroup) =>
			prevCartGroup.map((group) => {
				if (group.sellerId === sellerId) {
					return {
						...group,
						cartDTOList: group.cartDTOList.map((item) => {
							if (item.product.productId === productId && item.amount > 1) {
								return { ...item, amount: item.amount - 1 };
							}
							return item;
						}),
					};
				}
				return group;
			})
		);
		setSelectedItems((prevCartGroup) =>
			prevCartGroup.map((group) => {
				if (group.sellerId === sellerId) {
					return {
						...group,
						cartDTOList: group.cartDTOList.map((item) => {
							if (item.product.productId === productId && item.amount > 1) {
								return { ...item, amount: item.amount - 1 };
							}
							return item;
						}),
					};
				}
				return group;
			})
		);
	};

	const handleCheckboxChange = (sellerId, productId, checked) => {
		setSelectedItems((prevSelectedItems) => {
			const newSelectedItems = [...prevSelectedItems];
			const sellerIndex = newSelectedItems.findIndex(
				(item) => item.sellerId === sellerId
			);

			// 透過 filter 把不要的過濾掉後，剩下的那個就是我要的，但還要再取得第一個陣列 [0]
			const thiscartGroup = cartGroup.filter((list) => {
				return list.sellerId === sellerId;
			})[0];

			if (checked) {
				if (getSelectedItemLength() + 1 === totalLength) {
					document.getElementById('total').checked = true;
				}
				if (sellerIndex === -1) {
					//若sellerIndex不存在，則還沒有把這個賣場加入
					const thisProduct = thiscartGroup.cartDTOList.filter((list) => {
						return list.product.productId === productId;
					})[0];

					// 確保 thisProduct 存在
					if (thisProduct) {
						newSelectedItems.push({
							sellerId: sellerId,
							cartDTOList: [thisProduct],
							smIdList: thiscartGroup.smIdList,
							shipAddress: thiscartGroup.shipAddress,
						});
					}
				} else {
					const thisProduct = thiscartGroup.cartDTOList.filter((list) => {
						return list.product.productId === productId;
					})[0];

					// 確保 thisProduct 存在
					if (thisProduct) {
						newSelectedItems[sellerIndex].cartDTOList.push(thisProduct);
					}
				}
			} else {
				if (getSelectedItemLength() === totalLength) {
					document.getElementById('total').checked = false;
				}
				if (sellerIndex !== -1) {
					const updatedCartDTOList = newSelectedItems[
						sellerIndex
					].cartDTOList.filter((item) => item.product.productId !== productId);
					if (updatedCartDTOList.length > 0) {
						newSelectedItems[sellerIndex].cartDTOList = updatedCartDTOList;
					} else {
						newSelectedItems.splice(sellerIndex, 1);
					}
				}
			}
			console.log(newSelectedItems);
			return newSelectedItems;
		});
	};
	//計算總價格
	const calculateTotalAmount = () => {
		let totalAmount = 0;

		selectedItems.map((item) => {
			item.cartDTOList.map((thisCart) => {
				totalAmount += thisCart.product.price * thisCart.amount;
			});
		});

		return totalAmount;
	};
	//點選全選按鈕事件
	const handleCheckAll = (e) => {
		const checked = e.target.checked;
		const group = document.querySelectorAll('.checkgroup');
		if (checked) {
			group.forEach((item) => {
				if (!item.checked) {
					item.click();
				}
			});
		} else {
			group.forEach((item) => {
				if (item.checked) {
					item.click();
				}
			});
		}
	};
	const handleSpecSelect = (productId, spec) => {
		setSelectPrdSpec((prevSpecs) => new Map(prevSpecs).set(productId, spec));
		setCartGroup((prevCartGroup) =>
			prevCartGroup.map((group) => ({
				...group,
				cartDTOList: group.cartDTOList.map((item) =>
					item.product.productId === productId
						? {
								...item,
								prdSpecId: spec.prodSpecId,
								amount: item.amount > spec.stock ? spec.stock : item.amount,
								product: {
									...item.product,
									price: spec.price,
									stock: spec.stock,
								},
							}
						: item
				),
			}))
		);
		setSelectedItems((prevCartGroup) =>
			prevCartGroup.map((group) => ({
				...group,
				cartDTOList: group.cartDTOList.map((item) =>
					item.product.productId === productId
						? {
								...item,
								prdSpecId: spec.prodSpecId,
								amount: item.amount > spec.stock ? spec.stock : item.amount,
								product: {
									...item.product,
									price: spec.price,
									stock: spec.stock,
								},
							}
						: item
				),
			}))
		);
		setSelectedItems((prevCartGroup) =>
			prevCartGroup.map((group) => ({
				...group,
				cartDTOList: group.cartDTOList.map((item) =>
					item.product.productId === productId
						? {
								...item,
								prdSpecId: spec.prodSpecId,
								amount: item.amount > spec.stock ? spec.stock : item.amount,
								product: {
									...item.product,
									price: spec.price,
									stock: spec.stock,
								},
							}
						: item
				),
			}))
		);
		setSelectedItems((prevCartGroup) =>
			prevCartGroup.map((group) => ({
				...group,
				cartDTOList: group.cartDTOList.map((item) =>
					item.product.productId === productId
						? {
								...item,
								prdSpecId: spec.prodSpecId,
								amount: item.amount > spec.stock ? spec.stock : item.amount,
								product: {
									...item.product,
									price: spec.price,
									stock: spec.stock,
								},
							}
						: item
				),
			}))
		);
	};

	const renderSpec = (productId) => {
		const { spec1, spec1Name, spec2, spec2Name } =
			selectPrdSpec.get(productId) || {};
		let result = `${spec1}:${spec1Name}`;
		if (spec2) {
			result += `, ${spec2}:${spec2Name}`;
		}
		return result;
	};

	const handleCheckOut = () => {
		if (selectedItems.length == 0) {
			showErrorNoText('請選擇商品');
		} else {
			navigator('/cart/checkout', {
				state: {
					cartGroup: selectedItems,
					shipAddress: shipAddress,
					selectPrdSpec: selectPrdSpec,
				},
			});
		}
	};

	return (
		<>
			{cartGroup.length > 0 ? (
				<Stack py={10} px={10} spacing={4}>
					<Card overflow="hidden" variant="outline" p={4}>
						<Flex
							alignItems="center"
							justifyContent="space-between"
							wrap="wrap"
						>
							<Box flexBasis={{ base: '100%', md: '30%' }} textAlign="start">
								<Heading size="lg" pl={'3rem'}>
									商品
								</Heading>
							</Box>
							<Box flexBasis={{ base: '100%', md: '12%' }} textAlign="center">
								<Heading size="lg">規格</Heading>
							</Box>
							<Box flexBasis={{ base: '100%', md: '12%' }} textAlign="center">
								<Heading size="lg">單價</Heading>
							</Box>
							<Box flexBasis={{ base: '100%', md: '12%' }} textAlign="center">
								<Heading size="lg">數量</Heading>
							</Box>
							<Box flexBasis={{ base: '100%', md: '12%' }} textAlign="center">
								<Heading size="lg">總計</Heading>
							</Box>
							<Box flexBasis={{ base: '100%', md: '12%' }} textAlign="center" />
						</Flex>
					</Card>

					{cartGroup.map((item) => (
						<Card
							overflow="hidden"
							variant="outline"
							p={4}
							mt={4}
							key={item.sellerId}
						>
							<Heading size="md" mb={4}>
								賣場: {item.sellerName}
							</Heading>

							{item.cartDTOList.map((cartitem) => (
								<Card
									overflow="hidden"
									variant="outline"
									p={4}
									mt={4}
									key={cartitem.product.productId}
								>
									<Flex
										alignItems="center"
										wrap="wrap"
										justifyContent="space-between"
									>
										<Box
											flexBasis={{ base: '100%', md: '30%' }}
											textAlign="center"
										>
											<Flex
												direction={{ base: 'column', md: 'row' }}
												alignItems="center"
												flexBasis={{ base: '100%', md: '30%' }}
											>
												<input
													className="checkgroup w-5 h-5"
													type="checkbox"
													onClick={(e) =>
														handleCheckboxChange(
															item.sellerId,
															cartitem.product.productId,
															e.target.checked
														)
													}
												/>
												<Image
													boxSize={{ base: '120px', md: '120px', lg: '150px' }}
													objectFit="cover"
													src={cartitem.pimgURL}
													alt="Caffe Latte"
													ml={{ md: 4 }}
													mb={{ base: 4, md: 0 }}
												/>
												<CardBody textAlign="center" ml={{ md: 4 }}>
													<Heading size="lg">
														{cartitem.product.productName}
													</Heading>
													<Text
														py="2"
														fontSize="lg"
														sx={{
															overflow: 'hidden',
															textOverflow: 'ellipsis',
														}}
													>
														{cartitem.product.description1}
													</Text>
												</CardBody>
											</Flex>
										</Box>

										<Box
											flexBasis={{ base: '100%', md: '12%' }}
											textAlign="center"
										>
											{cartitem.prdSpecId === null ? (
												<Heading size="lg"></Heading>
											) : (
												<Text size="lg">
													<Menu>
														<MenuButton
															as={Button}
															rightIcon={<ChevronDownIcon />}
															ml={4}
															colorScheme="teal"
														>
															規格
														</MenuButton>
														<Flex>
															<Portal>
																<MenuList zIndex={999}>
																	{cartitem.product.prodSpecList.map(
																		(thisPrdSpec) => (
																			<MenuItem
																				key={thisPrdSpec.prodSpecId}
																				onClick={() =>
																					handleSpecSelect(
																						cartitem.product.productId,
																						thisPrdSpec
																					)
																				}
																			>
																				{thisPrdSpec.spec1 +
																					':' +
																					thisPrdSpec.spec1Name +
																					',' +
																					thisPrdSpec.spec2 +
																					':' +
																					thisPrdSpec.spec2Name}
																			</MenuItem>
																		)
																	)}
																</MenuList>
															</Portal>
														</Flex>
													</Menu>
													{renderSpec(cartitem.product.productId)}
												</Text>
											)}
										</Box>

										<Box
											flexBasis={{ base: '100%', md: '12%' }}
											textAlign="center"
										>
											<Heading size="lg">
												{cartitem.product.price.toLocaleString()}
											</Heading>
										</Box>

										<Box
											flexBasis={{ base: '100%', md: '12%' }}
											textAlign="center"
										>
											<Flex
												direction="column"
												alignItems="center"
												justifyContent="center"
											>
												<Flex
													alignItems="center"
													justifyContent="center"
													mb={2}
												>
													<Button
														size="sm"
														onClick={() =>
															decrementQuantity(
																item.sellerId,
																cartitem.product.productId
															)
														}
													>
														-
													</Button>
													<Text mx={4} fontSize="lg">
														{cartitem.amount}
													</Text>
													<Button
														size="sm"
														colorScheme="blue"
														onClick={() =>
															incrementQuantity(
																item.sellerId,
																cartitem.product.productId
															)
														}
													>
														+
													</Button>
												</Flex>
												<Text fontSize="sm" color="gray.500">
													剩餘商品數量: {cartitem.product.stock}
												</Text>
											</Flex>
										</Box>

										<Box
											flexBasis={{ base: '100%', md: '12%' }}
											textAlign="center"
										>
											<Heading size="lg">
												{(
													cartitem.amount * cartitem.product.price
												).toLocaleString()}
											</Heading>
										</Box>

										<Box
											flexBasis={{ base: '100%', md: '12%' }}
											textAlign="center"
										>
											<Flex direction="column" align="center">
												<Button
													variant="solid"
													colorScheme="red"
													mb={2}
													size="lg"
													onClick={() => {
														delCartItemAPI(cartitem.cartItemId).then(() => {
															setCartGroup((prevCartGroup) =>
																prevCartGroup.map((group) => {
																	if (group.sellerId === item.sellerId) {
																		return {
																			...group,
																			cartDTOList: group.cartDTOList.filter(
																				(item) =>
																					item.product.productId !==
																					cartitem.product.productId
																			),
																		};
																	}
																	return group;
																})
															);
															setSelectedItems((prevSelectedItems) =>
																prevSelectedItems.map((group) => {
																	if (group.sellerId === item.sellerId) {
																		return {
																			...group,
																			cartDTOList: group.cartDTOList.filter(
																				(item) =>
																					item.productId !==
																					cartitem.product.productId
																			),
																		};
																	}
																	return group;
																})
															);
														});
													}}
												>
													刪除
												</Button>
											</Flex>
										</Box>
									</Flex>
								</Card>
							))}
						</Card>
					))}

					<Card
						ref={cartCardRef}
						overflow="hidden"
						variant="outline"
						position="sticky"
						bottom={0}
						mt="100px"
						h={{ base: '70px', xl: '100px' }}
						p={4}
					>
						<Flex
							direction="row"
							justify="space-between"
							align="center"
							w="full"
						>
							<Flex align="center">
								<input
									className="w-5 h-5"
									type="checkbox"
									name=""
									id="total"
									onChange={handleCheckAll}
								/>
								<Heading size="lg">全選 ({totalLength})</Heading>
							</Flex>

							<Flex align="center">
								<Box mr={4}>
									<Heading size="lg">
										總金額({getSelectedItemLength()}個商品) $:{' '}
										{calculateTotalAmount().toLocaleString()}
									</Heading>
								</Box>

								<Button
									variant="solid"
									colorScheme="blue"
									size="lg"
									onClick={handleCheckOut}
								>
									結帳
								</Button>
							</Flex>
						</Flex>
					</Card>
				</Stack>
			) : (
				<EmptyCart></EmptyCart>
			)}
		</>
	);
};

export default Cart;
