import { useEffect, useState } from 'react';
import {
	Box,
	Flex,
	Stack,
	Heading,
	Text,
	Image,
	Button,
	Badge,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Input,
	Icon,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { BASE_URL } from '../../utils/apiUtil';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { createaddressAPI, handleEcpayOrder } from '../../api/cartAPI';

const deliverMapDef = new Map([
	[0, '宅配'],
	[1, '7-11'],
	[2, '全家'],
]);

export const CheckOut = () => {
	const navigator = useNavigate();
	const location = useLocation();
	const [shipAddress, setShipAddress] = useState(
		location.state?.shipAddress || []
	);
	const [selectPrdSpec, setSelectPrdSpec] = useState(
		location.state?.selectPrdSpec || []
	);

	const previewCart = location.state?.cartGroup || [];
	previewCart.map((thiscart) => {
		const address = shipAddress.find(
			(item) => item.shipType === thiscart.smIdList[0]
		);

		if (address) {
			// 如果 address 存在，則更新 thiscart 的屬性
			thiscart.shipAddress = address;
		}
	});
	console.log(previewCart);
	const [cartGroup, setCartGroup] = useState(previewCart || []);
	const [deliverMap, setDeliverMap] = useState(new Map());
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentSellerId, setCurrentSellerId] = useState(null);

	const [modalContent, setModalContent] = useState('d');
	const [selectedStoreAddr, setSelectedStoreAddr] = useState();
	const [selectedStore, setSelectedStore] = useState();

	const addressClose = () => {
		setSelectedStoreAddr();
		handleChangeModal('d');
	};

	const createAddr = async (shipType) => {
		const name = document.getElementById('name').value;
		const phone = document.getElementById('phone').value;
		const userId = Cookies.get('userId');
		const addressattr = document.getElementById('address');
		console.log(addressattr)
		//  TODO 驗證邏輯
		let res;
		if (addressattr === undefined || addressattr === null) {
			res = await createaddressAPI({
				recipientName: name,
				recipientPhone: phone,
				address: selectedStoreAddr,
				shopName: selectedStore,
				userId: userId,
				shipType: shipType,
			});
		} else {
			res = await createaddressAPI({
				recipientName: name,
				recipientPhone: phone,
				address: addressattr.value,
				shopName: selectedStore,
				userId: userId,
				shipType: shipType,
			});
		}

		setShipAddress([...shipAddress, res.data]);

		setSelectedStoreAddr();
		handleChangeModal('d');
	};
	const renderSelectShip = (shipType) => {
		const getSevenAddr = () => {
			const popup = window.open(
				`${BASE_URL}/mart/seven`,
				'7-11 addr',
				'width=1000,height=600'
			);
			const timer = setInterval(() => {
				if (popup.closed) {
					clearInterval(timer);
					//TODO 處理邏輯
				}
			}, 1000);

			window.addEventListener('message', (event) => {
				if (event.origin === BASE_URL) {
					// 確保訊息來源為後端
					const data = event.data;
					setSelectedStoreAddr(data.storeaddress);
					setSelectedStore(data.storename);
				}
			});
		};

		const getFMAddr = () => {
			const popup = window.open(
				`${BASE_URL}/mart/family`,
				'family mart addr',
				'width=1000,height=600'
			);
			const timer = setInterval(() => {
				if (popup.closed) {
					clearInterval(timer);
					//TODO 處理邏輯
				}
			}, 1000);

			window.addEventListener('message', (event) => {
				if (event.origin === `${BASE_URL}`) {
					// 確保訊息來源為後端
					const data = event.data;
					setSelectedStoreAddr(data.storeaddress);
					setSelectedStore(data.storename);
				}
			});
		};
		if (shipType === 1) {
			return (
				<Box
					borderRadius="lg"
					borderWidth="1px"
					p={4}
					cursor="pointer"
					onClick={getSevenAddr}
					_hover={{ bg: 'gray.50' }}
				>
					<Flex alignItems="center">
						<Image
							objectFit="contain"
							src="http://54.199.192.205/shopHub/assets/7-11.png"
							boxSize="24px"
							mr={2}
						/>
						<Text fontWeight="bold">7-11 {selectedStore}</Text>
						<Text fontWeight="bold"> {selectedStoreAddr}</Text>
					</Flex>
				</Box>
			);
		} else if (shipType === 2) {
			return (
				<Box
					borderRadius="lg"
					borderWidth="1px"
					p={4}
					cursor="pointer"
					onClick={getFMAddr}
					_hover={{ bg: 'gray.50' }}
				>
					<Flex alignItems="center">
						<Image
							objectFit="contain"
							src="http://54.199.192.205/shopHub/assets/familymart.png"
							boxSize="24px"
							mr={2}
						/>
						<Text fontWeight="bold">Faily Mart {selectedStoreAddr}</Text>
						<Text fontWeight="bold"> {selectedStoreAddr}</Text>
					</Flex>
				</Box>
			);
		} else if (shipType === 0) {
			return (
				<>
					<Input placeholder="地址" id="address" mb={4} />
				</>
			);
		}
	};
	const renderSpec = (productId) => {
		const { spec1, spec1Name, spec2, spec2Name } =
			selectPrdSpec.get(productId) || {};
		if (spec1 === undefined) {
			return '一般';
		} else {
			let result = `${spec1}:${spec1Name}`;
			if (spec2) {
				result += `, ${spec2}:${spec2Name}`;
			}
			return result;
		}
	};
	const renderModalContent = () => {
		if (modalContent === 'd') {
			return <DeliveryModal />;
		} else if (modalContent === 'a') {
			return <AddressModal />;
		}
	};

	// 切換modal
	const handleChangeModal = (thismodal) => {
		setModalContent(thismodal);
	};
	useEffect(() => {
		const initMap = new Map();
		cartGroup.forEach((cart) => {
			const address = shipAddress.find(
				(item) => item.shipType === cart.smIdList[0]
			);

			initMap.set(cart.sellerId, {
				id: cart.smIdList[0],
				method: deliverMapDef.get(cart.smIdList[0]),
				...(address && { address }), // 如果address存在，才添加address属性
			});
		});

		setDeliverMap(initMap);
	}, []);

	const handleDeliveryChange = (sellerId, id, method, selectedAddress) => {
		const newDeliverMap = new Map(deliverMap);
		newDeliverMap.set(sellerId, { id, method, address: selectedAddress });
		setDeliverMap(newDeliverMap);

		//setSelectedMethod(method);
	};

	const renderSeletedShipRess = (address) => {
		console.log(address);
		const handleSelectAddress = (selectedAddress) => {
			const newDeliverMap = new Map(deliverMap);
			newDeliverMap.set(currentSellerId, {
				...deliverMap.get(currentSellerId),
				address: selectedAddress,
			});
			setDeliverMap(newDeliverMap);
			const thiscart = cartGroup.find(
				(thiscart) => thiscart.sellerId === currentSellerId
			);
			thiscart.shipAddress = selectedAddress;
		};
		if (address) {
			return (
				<Flex direction={'column'}>
					<Flex>
						<input
							type="radio"
							name="selectedAddress"
							id={address.id}
							checked={
								address.shipId ===
								deliverMap.get(currentSellerId).address?.shipId
							}
							onChange={() => handleSelectAddress(address)}
						/>
						<Text>{address.address}</Text>
						<Text>{address.recipientName}</Text>
						<Text>{address.recipientPhone}</Text>
						<Text>{address.shopName}</Text>
					</Flex>
				</Flex>
			);
		} else {
			return (
				<>
					<Button onClick={() => handleChangeModal('a')}>新增地址</Button>
				</>
			);
		}
	};

	const totalPrice = cartGroup.reduce((acc, item) => {
		return (
			acc +
			item.cartDTOList.reduce((acc, cartitem) => {
				return acc + cartitem.amount * cartitem.product.price;
			}, 0)
		);
	}, 0);

	const renderDeliveryOptions = (smIdList = []) => {
		const options = [];
		if (smIdList.includes(0)) {
			options.push({ id: 0, label: '宅配' });
		}
		if (smIdList.includes(1)) {
			options.push({ id: 1, label: '7-11' });
		}
		if (smIdList.includes(2)) {
			options.push({ id: 2, label: '全家' });
		}
		return options;
	};

	const renderDeliverIcon = (deliverMethod) => {
		if (deliverMethod === '7-11') {
			return (
				<Image
					objectFit="contain"
					src="http://54.199.192.205/shopHub/assets/7-11.png"
					boxSize="24px"
					mr={2}
				/>
			);
		} else if (deliverMethod === '全家') {
			return (
				<Image
					objectFit="contain"
					src="http://54.199.192.205/shopHub/assets/familymart.png"
					boxSize="24px"
					mr={2}
				/>
			);
		} else {
			return <></>;
		}
	};

	const DeliveryModal = () => (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay bg="transparent" />
			<ModalContent>
				<ModalHeader>選擇運送方式</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{currentSellerId &&
						renderDeliveryOptions(
							cartGroup.find((item) => item.sellerId === currentSellerId)
								.smIdList
						).map((option) => (
							<>
								<Flex
									key={option.id}
									p={4}
									border="1px solid"
									borderColor="gray.200"
									borderRadius="md"
									alignItems="center"
									onClick={() =>
										handleDeliveryChange(
											currentSellerId,
											option.id,
											option.label
										)
									}
									cursor="pointer"
									mb={2}
								>
									{deliverMap.get(currentSellerId).id === option.id && (
										<Icon as={FaCheckCircle} color="green.500" mr={2} />
									)}
									{renderDeliverIcon(option.label)}
									<Text>{option.label}</Text>
								</Flex>
								<Flex
									direction="column"
									p={4}
									bg={'white'}
									borderRadius="md"
									boxShadow="md"
									maxW="600px"
									mx="auto"
								>
									<Flex justify="space-between" align="center" mb={4}>
										<Text fontSize="xl" fontWeight="bold">
											運送地址
										</Text>
									</Flex>
									<div>
										{shipAddress
											.filter(
												(thisship) =>
													option.id === thisship.shipType &&
													deliverMap.get(currentSellerId).id ===
														thisship.shipType
											)
											.map((thisAddr) => (
												<Box
													key={thisAddr.id}
													p={4}
													bg={'gray.100'}
													borderRadius="md"
													boxShadow="sm"
													mb={4}
												>
													<label>{renderSeletedShipRess(thisAddr)}</label>
												</Box>
											))}
									</div>
									{deliverMap.get(currentSellerId).id === option.id ? (
										<Box
											p={4}
											bg={'gray.100'}
											borderRadius="md"
											boxShadow="sm"
											mb={4}
										>
											<Button
												colorScheme="teal"
												onClick={() => handleChangeModal('a')}
											>
												新增地址
											</Button>
										</Box>
									) : null}
								</Flex>
							</>
						))}
				</ModalBody>

				<ModalFooter>
					<Button onClick={onClose}>確認</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
	const DeliveryInfo = ({
		item,
		deliverMap,
		renderDeliverIcon,
		setCurrentSellerId,
		onOpen,
		handleChangeModal,
	}) => {
		const delivery = deliverMap.get(item.sellerId);

		return (
			<Flex justifyContent="space-between" alignItems="center">
				<Box>
					<Text fontSize="md" fontWeight="bold" mb={2}>
						運送方式:
					</Text>
					<Flex alignItems="center" mb={2}>
						{renderDeliverIcon(delivery?.method)}
						<Text ml={2}>{delivery?.method}</Text>
					</Flex>
					{delivery?.address && (
						<Box mt={2}>
							<Text>
								<strong>地址:</strong> {delivery.address?.address}
								<Box as="span" ml={4}>
									<strong>店名:</strong> {delivery.address?.shopName}
								</Box>
							</Text>

							<Text>
								<strong>聯絡人:</strong> {delivery.address?.recipientName}
								<Box as="span" ml={4}>
									<strong>手機:</strong> {delivery.address?.recipientPhone}
								</Box>
							</Text>
						</Box>
					)}
				</Box>
				<Button
					colorScheme="blue"
					onClick={() => {
						setCurrentSellerId(item.sellerId);
						onOpen();
						handleChangeModal('d');
					}}
				>
					變更
				</Button>
			</Flex>
		);
	};

	const AddressModal = () => (
		<Modal isOpen={isOpen} onClose={addressClose}>
			<ModalOverlay bg="transparent" />
			<ModalContent>
				<ModalHeader>
					新增{deliverMap.get(currentSellerId).method}位置
				</ModalHeader>

				<ModalBody>
					<Input placeholder="手機" id="phone" mb={4} />
					<Input placeholder="聯絡姓名" id="name" mb={4} />
					{renderSelectShip(deliverMap.get(currentSellerId).id)}
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="blue"
						onClick={() => {
							createAddr(deliverMap.get(currentSellerId).id);
						}}
					>
						儲存
					</Button>
					<Button onClick={addressClose}>取消</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);

	return (
		<Stack py={10} px={10} spacing={4}>
			{cartGroup.map((item) => (
				<Box
					key={item.sellerId}
					border="1px solid"
					borderColor="gray.200"
					borderRadius="md"
					background={'white'}
				>
					<Heading size="md" p={4}>
						賣場: {item.sellerName}
					</Heading>
					{item.cartDTOList.map((cartitem) => (
						<Box
							key={cartitem.product.productId}
							border="1px solid"
							borderColor="gray.200"
							borderRadius="md"
							p={4}
							mt={2}
						>
							<Flex
								direction={{ base: 'column', md: 'row' }}
								justifyContent="space-between"
								alignItems={{ base: 'flex-start', md: 'center' }}
							>
								<Flex alignItems="center" mb={{ base: 4, md: 0 }}>
									<Image
										boxSize={{ base: '80px', md: '100px' }}
										objectFit="cover"
										src={cartitem.pimgURL}
										alt={cartitem.product.productName}
									/>
									<Box ml={4}>
										<Heading size="lg">{cartitem.product.productName}</Heading>
										<Text fontSize="md" color="gray.600">
											{cartitem.product.description1}
										</Text>
									</Box>
								</Flex>
								<Flex
									direction={{ base: 'column', md: 'row' }}
									alignItems={{ base: 'flex-start', md: 'center' }}
								>
									<Badge
										colorScheme="blue"
										fontSize={{ base: '12px', md: '16px', lg: '20px' }}
									>
										規格: {renderSpec(cartitem.product.productId)}
									</Badge>
									<Text
										ml={{ base: 0, md: 4 }}
										mt={{ base: 2, md: 0 }}
										fontSize={{ base: '12px', md: '16px', lg: '20px' }}
									>
										單價: ${cartitem.product.price.toLocaleString()}
									</Text>
									<Text
										ml={{ base: 0, md: 4 }}
										mt={{ base: 2, md: 0 }}
										fontSize={{ base: '12px', md: '16px', lg: '20px' }}
									>
										數量: {cartitem.amount}
									</Text>
									<Text
										ml={{ base: 0, md: 4 }}
										mt={{ base: 2, md: 0 }}
										fontSize={{ base: '12px', md: '16px', lg: '20px' }}
									>
										總計: $
										{(
											cartitem.amount * cartitem.product.price
										).toLocaleString()}
									</Text>
								</Flex>
							</Flex>
						</Box>
					))}
					<Box p={4}>
						<DeliveryInfo
							item={item}
							deliverMap={deliverMap}
							renderDeliverIcon={renderDeliverIcon}
							setCurrentSellerId={setCurrentSellerId}
							onOpen={onOpen}
							handleChangeModal={handleChangeModal}
						/>
					</Box>
				</Box>
			))}

			<Box
				border="1px solid"
				borderColor="gray.200"
				borderRadius="md"
				p={4}
				background={'white'}
			>
				<Heading size="lg" mb={4} textAlign="center">
					總價格: ${totalPrice.toLocaleString()}
				</Heading>
				<Flex justifyContent="center">
					<Button
						colorScheme="blue"
						size="lg"
						onClick={() => {
							handleEcpayOrder(cartGroup);
						}}
					>
						結帳
					</Button>
				</Flex>
			</Box>

			<Stack py={10} px={10} spacing={4}>
				{renderModalContent()}
			</Stack>
		</Stack>
	);
};
