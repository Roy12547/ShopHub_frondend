import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
	Box,
	Container,
	Stack,
	Text,
	Flex,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Button,
	VStack,
	Input,
	Switch,
	Divider,
	Collapse,
	IconButton,
	Link,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	FormControl,
	FormLabel,
	Select,
	Textarea,
} from '@chakra-ui/react';
import { BASE_URL } from '../../../../utils/apiUtil';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

function LogisticOption({ title, children }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<Box
			w="100%"
			p={4}
			border="1px"
			borderColor="gray.200"
			rounded="md"
			onClick={handleToggle}
		>
			<Flex justify="space-between" align="center">
				<Text>{title}</Text>
				<Flex align="center">
					<Switch size="lg" />
					<IconButton
						onClick={handleToggle}
						icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
						variant="ghost"
						aria-label="Toggle details"
					/>
				</Flex>
			</Flex>
			<Collapse in={isOpen} animateOpacity>
				<Box mt={4}>{children}</Box>
			</Collapse>
		</Box>
	);
}

export default function AccountSettingPanel() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditingAddress, setIsEditingAddress] = useState(false);
	const [currentAddressId, setCurrentAddressId] = useState(null);
	const [addresses, setAddresses] = useState([]);
	const userId = Cookies.get('userId');
	const [addressFormData, setAddressFormData] = useState({
		recipientName: '',
		recipientPhone: '',
		zipcode: '',
		city: '',
		address: '',
	});
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const id = Cookies.get('userId');
				const response = await axios.get(
					`${BASE_URL}/address/getAddress/${id}`
				);
				if (response.status === 200) {
					setAddresses(response.data.data);
					Cookies.set('addressData', JSON.stringify(response.data));
				} else {
					console.error('Failed to fetch addresses:', response);
				}
			} catch (error) {
				console.error('Error fetching addresses:', error);
			}
		};
		fetchData();
	}, []);

	const onOpen = () => {
		const userId = Cookies.get('userId');
		setIsEditingAddress(false);
		setIsModalOpen(true);
		setAddressFormData({
			recipientName: '',
			recipientPhone: '',
			zipcode: '',
			city: '',
			address: '',
			userId: userId,
		});
	};

	const onClose = () => setIsModalOpen(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setAddressFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSaveAddress = async () => {
		let updatedAddresses;
		if (isEditingAddress) {
			try {
				const response = await axios.put(
					`${BASE_URL}/address/updateAddress/${addressFormData.shipId}`,
					addressFormData
				);
				if (response.status === 200) {
					updatedAddresses = addresses.map((address) =>
						address.id === currentAddressId
							? { ...address, ...addressFormData }
							: address
					);
					setAddresses(updatedAddresses);
					Cookies.set('addressData', JSON.stringify(updatedAddresses));
					onClose();
				} else {
					console.error('Failed to update address:', response);
				}
			} catch (error) {
				console.error('Error updating address:', error);
			}
		} else {
			const newAddress = {
				id: addresses.length + 1,
				...addressFormData,
			};
			updatedAddresses = [...addresses, newAddress];

			try {
				const response = await axios.post(
					`${BASE_URL}/address/createAddress`,
					addressFormData
				);
				if (response.status === 200) {
					setAddresses(updatedAddresses);
					Cookies.set('addressData', JSON.stringify(updatedAddresses));
					onClose();
				} else {
					console.error('Failed to save address:', response);
				}
			} catch (error) {
				console.error('Error saving address:', error);
			}
		}
	};

	const handleEditAddress = (address) => {
		setAddressFormData({
			shipId: address.shipId,
			recipientName: address.recipientName,
			recipientPhone: address.recipientPhone,
			zipcode: address.zipcode,
			city: address.city,
			address: address.address,
			userId: address.userId,
		});
		setCurrentAddressId(address.id);
		setIsEditingAddress(true);
		setIsModalOpen(true);
	};

	const handleDeleteAddress = async (id) => {
		try {
			const response = await axios.delete(
				`${BASE_URL}/address/deleteAddress/${id}`
			);
			if (response.status === 200) {
				const updatedAddresses = addresses.filter(
					(address) => address.shipId !== id
				);
				setAddresses(updatedAddresses);
				Cookies.set('addressData', JSON.stringify(updatedAddresses));
				setIsDeleteModalOpen(false);
			} else {
				console.error('Failed to delete address:', response);
			}
		} catch (error) {
			console.error('Error deleting address:', error);
		}
	};

	const confirmDeleteAddress = (id) => {
		setCurrentAddressId(id);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => setIsDeleteModalOpen(false);

	return (
		<Box bg="gray.50" minH="100vh">
			<Container maxW="container.xl" py={10}>
				<Box bg="white" p={6} rounded="md" shadow="md">
					<Tabs variant="unstyled">
						<TabList>
							<Tab
								_selected={{ color: 'red.500' }}
								_hover={{ bg: 'transparent' }}
							>
								帳號與隱私設定
							</Tab>
							<Tab
								_selected={{ color: 'red.500' }}
								_hover={{ bg: 'transparent' }}
							>
								物流設定
							</Tab>
							<Tab
								_selected={{ color: 'red.500' }}
								_hover={{ bg: 'transparent' }}
							>
								付款設定
							</Tab>
							<Tab
								_selected={{ color: 'red.500' }}
								_hover={{ bg: 'transparent' }}
							>
								通知設定
							</Tab>
							<Tab
								_selected={{ color: 'red.500' }}
								_hover={{ bg: 'transparent' }}
							>
								休假模式
							</Tab>
						</TabList>
						<Divider />
						<TabPanels>
							<TabPanel>
								<Box height="500px" overflowY="auto" pr={4}>
									<VStack align="flex-start" spacing={4} w="100%">
										<Box w="100%">
											<Text fontWeight="bold">帳戶資訊</Text>
											<Flex justify="space-between" mt={2}>
												<Text>我的帳號</Text>
											</Flex>
											<Divider my={4} />
										</Box>
										<Box w="100%">
											<Flex justify="space-between" mt={2}>
												<Text>電話</Text>
												<Button
													size="sm"
													onClick={() => handleVerifyOpen('電話')}
												>
													編輯
												</Button>
											</Flex>
											<Text>*****12</Text>
											<Divider my={4} />
										</Box>
										<Box w="100%">
											<Flex justify="space-between" mt={2}>
												<Text>Email</Text>
												<Button
													size="sm"
													onClick={() => handleVerifyOpen('Email')}
												>
													編輯
												</Button>
											</Flex>
											<Text>example@example.com</Text>
											<Divider my={4} />
										</Box>
										<Box w="100%">
											<Flex justify="space-between" mt={2}>
												<Text>登入密碼</Text>
												<Button
													size="sm"
													onClick={() => handleVerifyOpen('登入密碼')}
												>
													更新
												</Button>
											</Flex>
											<Text>我們建議您定期更新您的密碼來加強安全性</Text>
											<Divider my={4} />
										</Box>
										<Box w="100%">
											<Flex justify="space-between" mt={2}>
												<Text>我的電子發票</Text>
												<Button size="sm">查看</Button>
											</Flex>
											<Divider my={4} />
										</Box>
										<Box w="100%">
											<Flex justify="space-between" mt={2}>
												<Text>企業帳號權限管理</Text>
												<Button size="sm">查看</Button>
											</Flex>
											<Text>未設定</Text>
											<Divider my={4} />
										</Box>
									</VStack>
								</Box>
							</TabPanel>
							<TabPanel>
								<Box height="500px" overflowY="auto" pr={4}>
									<Tabs variant="soft-rounded" colorScheme="orange">
										<TabList>
											<Tab>地址管理</Tab>
											<Tab>物流方式</Tab>
										</TabList>
										<TabPanels>
											<TabPanel>
												<VStack align="flex-start" spacing={4} w="100%">
													<Flex justify="space-between" align="center" w="100%">
														<Box>
															<Text fontWeight="bold" fontSize="xl">
																我的地址
															</Text>
															<Text color="gray.500" fontSize="md">
																管理你的配送及快遞取件地址
															</Text>
														</Box>
														<Button
															colorScheme="orange"
															size="md"
															onClick={onOpen}
														>
															新增地址
														</Button>
													</Flex>
													{addresses.map((address) => (
														<Box
															key={address.id}
															w="100%"
															p={4}
															border="1px"
															borderColor="gray.200"
															rounded="md"
														>
															<Flex justify="space-between">
																<Box>
																	<Text>真實姓名: {address.recipientName}</Text>
																	<Text mt={2} lineHeight="2">
																		電話號碼: {address.recipientPhone}
																	</Text>
																	<Text mt={2} lineHeight="2">
																		收件地址: {address.zipcode} {address.city}{' '}
																		{address.address}
																	</Text>
																</Box>
																<Flex
																	direction="column"
																	justify="space-between"
																>
																	<Link
																		color="blue.500"
																		onClick={() => handleEditAddress(address)}
																	>
																		編輯
																	</Link>
																	<Link
																		color="blue.500"
																		onClick={() =>
																			confirmDeleteAddress(address.shipId)
																		}
																	>
																		刪除
																	</Link>
																</Flex>
															</Flex>
														</Box>
													))}
													<Modal isOpen={isModalOpen} onClose={onClose}>
														<ModalOverlay />
														<ModalContent>
															<ModalHeader>
																{isEditingAddress ? '編輯地址' : '增加個人地址'}
															</ModalHeader>
															<ModalBody>
																<FormControl id="recipientName">
																	<FormLabel>真實姓名</FormLabel>
																	<Input
																		name="recipientName"
																		placeholder="請輸入"
																		value={addressFormData.recipientName}
																		onChange={handleInputChange}
																	/>
																	{addressFormData.recipientName &&
																		!/^[\u4e00-\u9fa5]{1,20}$/.test(
																			addressFormData.recipientName
																		) && (
																			<Text color="red.500">
																				請輸入真實姓名
																			</Text>
																		)}
																</FormControl>
																<FormControl id="recipientPhone" mt={4}>
																	<FormLabel>電話號碼</FormLabel>
																	<Input
																		name="recipientPhone"
																		placeholder="請輸入"
																		value={addressFormData.recipientPhone}
																		onChange={handleInputChange}
																	/>
																	{addressFormData.recipientPhone &&
																		!/^09\d{8,18}$/.test(
																			addressFormData.recipientPhone
																		) && (
																			<Text color="red.500">
																				請輸入有效號碼
																			</Text>
																		)}
																</FormControl>
																<FormControl id="city" mt={4}>
																	<FormLabel>城市</FormLabel>
																	<Select
																		name="city"
																		placeholder="請選擇"
																		value={addressFormData.city}
																		onChange={handleInputChange}
																	>
																		<option value="台北市">台北市</option>
																		<option value="新北市">新北市</option>
																		<option value="台中市">台中市</option>
																		<option value="台南市">台南市</option>
																		<option value="高雄市">高雄市</option>
																		<option value="基隆市">基隆市</option>
																		<option value="新竹市">新竹市</option>
																		<option value="嘉義市">嘉義市</option>
																		<option value="苗栗縣">苗栗縣</option>
																		<option value="彰化縣">彰化縣</option>
																		<option value="南投縣">南投縣</option>
																		<option value="雲林縣">雲林縣</option>
																		<option value="嘉義縣">嘉義縣</option>
																		<option value="屏東縣">屏東縣</option>
																		<option value="宜蘭縣">宜蘭縣</option>
																		<option value="花蓮縣">花蓮縣</option>
																		<option value="台東縣">台東縣</option>
																		<option value="澎湖縣">澎湖縣</option>
																		<option value="金門縣">金門縣</option>
																		<option value="連江縣">連江縣</option>
																		<option value="新竹縣">新竹縣</option>
																	</Select>
																	<FormLabel mt={4}>詳細地址</FormLabel>
																	<Textarea
																		name="address"
																		placeholder="例如：蝸皮街88號等更詳細地址"
																		value={addressFormData.address}
																		onChange={handleInputChange}
																	/>
																	<FormLabel mt={4}>郵遞區號</FormLabel>
																	<Input
																		name="zipcode"
																		placeholder="郵遞區號"
																		value={addressFormData.zipcode}
																		onChange={handleInputChange}
																	/>
																</FormControl>
															</ModalBody>
															<ModalFooter>
																<Button variant="ghost" onClick={onClose}>
																	取消
																</Button>
																<Button
																	colorScheme="red"
																	ml={3}
																	onClick={handleSaveAddress}
																	isDisabled={
																		!/^[\u4e00-\u9fa5]{1,20}$/.test(
																			addressFormData.recipientName
																		) ||
																		!/^09\d{8,18}$/.test(
																			addressFormData.recipientPhone
																		) ||
																		!/^\d{1,10}$/.test(addressFormData.zipcode)
																	}
																>
																	儲存
																</Button>
															</ModalFooter>
														</ModalContent>
													</Modal>
													<Modal
														isOpen={isDeleteModalOpen}
														onClose={closeDeleteModal}
													>
														<ModalOverlay />
														<ModalContent>
															<ModalHeader>刪除地址</ModalHeader>
															<ModalCloseButton />
															<ModalBody>
																<Text>確定要刪除這個地址嗎？</Text>
															</ModalBody>
															<ModalFooter>
																<Button
																	variant="ghost"
																	onClick={closeDeleteModal}
																>
																	取消
																</Button>
																<Button
																	colorScheme="red"
																	ml={3}
																	onClick={() =>
																		handleDeleteAddress(currentAddressId)
																	}
																>
																	確定
																</Button>
															</ModalFooter>
														</ModalContent>
													</Modal>
												</VStack>
											</TabPanel>
											<TabPanel>
												<VStack align="flex-start" spacing={6} w="100%">
													<LogisticOption title="店到店">
														<Text>
															如果你欲使用店到店服務寄送包裏，請開啟此物流選項。
														</Text>
														<Text>【服務說明】</Text>
														<Text>
															•
															門市寄取/物流交寄之運費價格：45元（收費標準依公告為準）。
														</Text>
														<Text>
															•
															材積限制：貨品材積長寬高三邊總和105cm，最長邊45cm，總重量不得超過5公斤。
														</Text>
														<Text>
															•
															包裝限制：門市無提供包裝服務，包裹須為完整的立方體且寄件面單（10*14cm）可完整黏貼。
														</Text>
														<Text>
															•
															禁運商品：請詳服務條款。生鮮、冷凍、液體、精密儀器、金錢、珠寶等。
														</Text>
														<Text>【提醒】</Text>
														<Text>
															1.
															完成寄取/收件交易後，恕無法取消寄件、退款或退回商品。
														</Text>
														<Text>
															2.
															寄件者需告知取件者相符的真實姓名，保證包裹寄送權益。
														</Text>
														<Text>3. 其他規範請詳閱公告。</Text>
													</LogisticOption>
													<LogisticOption title="店到家宅配">
														<Text>
															如果你欲使用【店到家宅配】寄送包裹，請開啟此物流選項。
														</Text>
														<Text>
															運費計算方式依包裏尺寸計算（包裏的長寬高三邊長度合計，單位為公分），推廣期間提供運費優惠，不限材積均一價65元：
														</Text>
														<Text>・60公分以下：65元；</Text>
														<Text>・61-90公分：65元；</Text>
														<Text>・91-105公分：65元；</Text>
														<Text>
															請注意包材積限制：長寬高三邊總和&lt;105公分，最長邊&lt;45公分，單件總重量不超過10kg。不符此規範之包裹恕不配送。
														</Text>
														<Text>提醒：</Text>
														<Text>1. 暫無提供外島地區配送</Text>
														<Text>2. 暫無提供貨到付款及負到付款</Text>
														<Text>
															3.
															推廣期間寄運費依據取件家平台之優惠運費價格核取，Shophub購物保有修改之權利，實際運費價格依家樂福店舖公告為準。Shophub有調整運費金額及補助金額（若有），並保留隨時終止活動期間之權利，運費最新相關資訊將參考Shophub平台公告，不另行通知。
														</Text>
													</LogisticOption>
													<LogisticOption title="7-ELEVEN">
														<Text>
															如果你欲使用7-11超商交貨便服務寄送包裹，請開啟此物流選項。
														</Text>
														<Text>【服務說明】</Text>
														<Text>
															．本店寄貨，他店取貨
															運費價格：60元（收費標準依Shophub平台或賣家中心公告為準。）
														</Text>
														<Text>
															．材積限制：材積長寬高三邊總和 ≦ 105，最長邊 ≦
															45（單位：公分）；總重量不得超過5公斤。
														</Text>
														<Text>
															．包裝限制：門市無提供包裝服務，請自行按貨品之性質、重量、容積等做妥適包裝。
														</Text>
														<Text>．禁運商品（請詳閱超商服務條款）：</Text>
														<Text>
															{' '}
															✽空包裝（例:空袋，空箱）、僅有服務單之包裹類型等
														</Text>
														<Text> ✽捆包（一單限一件包裹）</Text>
														<Text> ✽現金、有價證券、展演會票券、禮券</Text>
														<Text> ✽易碎品</Text>
														<Text>
															{' '}
															✽生鮮蔬果魚肉食品、低溫或需恆溫控制商品
														</Text>
														<Text> ✽限量不可複製品、重要文件、證件類</Text>
														<Text> ✽活體動植物</Text>
														<Text> ✽個人藥品</Text>
														<Text> ✽精密儀器、3C、金飾、鑽石等貴重物品</Text>
														<Text> ✽化學藥品、液體</Text>
														<Text> ✽非法禁運商品</Text>
														<Text>【提醒】</Text>
														<Text>
															1.
															完成寄件/取件交易後，恕無法取消寄件、退款、或退回貨品；寄件者寄件後無法要求提前退回貨品。
														</Text>
														<Text>
															2.
															寄件：請填寫寄件者及取件者「與證件相符之真實姓名」，以確保雙方權益。
														</Text>
														<Text>
															3.
															取件：取件者需告知店員真實姓名，並「出示與貨品上取件者姓名相符之身份證明文件正本」，於單據上「簽名」後方可領取商品。（若取件者未出示上述證件或拒絕簽名，門市無法提供取件服務）
														</Text>
														<Text>
															4.
															如欲開通物流交寄服務，請依照Shophub平台／賣家中心公告之流程申請。
														</Text>
													</LogisticOption>
													<LogisticOption title="全家">
														<Text>
															如果你欲使用全家超商店到店服務寄送包裹，請開啟此物流選項。
														</Text>
														<Text>【服務說明】</Text>
														<Text>
															．本店寄貨，他店取貨
															運費價格：60元（收費標準依Shophub平台或賣家中心公告為準。）
														</Text>
														<Text>
															．材積限制：長＋寬＋高 ≦ 105公分，單邊長度 ≦
															45公分（建議適當規格45cm*30cm*30cm），總重量不得超過5公斤。
														</Text>
														<Text>
															．包裝限制：門市無提供包裝服務，請自行包裝。
														</Text>
														<Text>．禁運商品（請詳閱超商服務條款）：</Text>
														<Text> ✽生鮮（生鮮食品、易壞水果）</Text>
														<Text>
															{' '}
															✽低溫（冰淇淋、蛋糕等任何需低溫保存之物品）
														</Text>
														<Text> ✽液體</Text>
														<Text>
															{' '}
															✽易碎物品（玻璃器皿、玻璃瓶裝酒、瓶裝罐頭等）
														</Text>
														<Text>
															{' '}
															✽精密3C（電腦主機、螢幕、手機、數位相機等）
														</Text>
														<Text> ✽超材超重</Text>
														<Text>
															{' '}
															✽貴重（身分證件、現金、支票、金飾或鑽石）
														</Text>
														<Text> ✽未妥善包裝</Text>
														<Text>【提醒】</Text>
														<Text>
															1.
															完成寄件/取件交易後，恕無法取消寄件、退款、或退回貨品；寄件者寄件後無法要求提前退回貨品。
														</Text>
														<Text>
															2.
															寄件：請填寫寄件者及取件者「與證件相符之真實姓名」，以確保雙方權益。
														</Text>
														<Text>
															3.
															取件：取件者需告知店員真實姓名，並「出示與貨品上取件者姓名相符之身份證明文件正本」，於單據上「簽名」後方可領取商品。（若取件者未出示上述證件或拒絕簽名，門市無法提供取件服務）
														</Text>
														<Text>
															4.
															如欲開通物流交寄服務，請依照Shophub平台／賣家中心公告之流程申請。
														</Text>
													</LogisticOption>
													<LogisticOption title="萊爾富">
														<Text>
															如果你欲使用萊爾富超商店到店服務寄送包裹，請開啟此物流選項。
														</Text>
														<Text>【服務說明】</Text>
														<Text>
															．本店寄貨，他店取貨
															運費價格：60元（收費標準依Shophub平台或賣家中心公告為準。）
														</Text>
														<Text>
															．材積限制：長＋寬＋高 ≦ 105公分，單邊長度 ≦
															45公分（建議適當規格45cm*30cm*30cm），總重量不得超過5公斤。
														</Text>
														<Text>
															．包裝限制：門市無提供包裝服務，請自行包裝。
														</Text>
														<Text>．禁運商品（請詳閱超商服務條款）：</Text>
														<Text> ✽生鮮（生鮮食品、易壞水果）</Text>
														<Text>
															{' '}
															✽低溫（冰淇淋、蛋糕等任何需低溫保存之物品）
														</Text>
														<Text> ✽液體</Text>
														<Text>
															{' '}
															✽易碎物品（玻璃器皿、玻璃瓶裝酒、瓶裝罐頭等）
														</Text>
														<Text>
															{' '}
															✽精密3C（電腦主機、螢幕、手機、數位相機等）
														</Text>
														<Text> ✽超材超重</Text>
														<Text>
															{' '}
															✽貴重（身分證件、現金、支票、金飾或鑽石）
														</Text>
														<Text> ✽未妥善包裝</Text>
														<Text>【提醒】</Text>
														<Text>
															1.
															完成寄件/取件交易後，恕無法取消寄件、退款、或退回貨品；寄件者寄件後無法要求提前退回貨品。
														</Text>
														<Text>
															2.
															寄件：請填寫寄件者及取件者「與證件相符之真實姓名」，以確保雙方權益。
														</Text>
														<Text>
															3.
															取件：取件者需告知店員真實姓名，並「出示與貨品上取件者姓名相符之身份證明文件正本」，於單據上「簽名」後方可領取商品。（若取件者未出示上述證件或拒絕簽名，門市無法提供取件服務）
														</Text>
														<Text>
															4.
															如欲開通物流交寄服務，請依照Shophub平台／賣家中心公告之流程申請。
														</Text>
													</LogisticOption>
													<LogisticOption title="OK Mart">
														<Text>
															如果你欲使用OK超商店到店服務寄送包裹，請開啟此物流選項。
														</Text>
														<Text>【服務說明】</Text>
														<Text>
															．本店寄貨，他店取貨
															運費價格：60元（收費標準依Shophub平台或賣家中心公告為準。）
														</Text>
														<Text>
															．材積限制：長＋寬＋高 ≦ 105公分，單邊長度 ≦
															45公分（建議適當規格45cm*30cm*30cm），總重量不得超過5公斤。
														</Text>
														<Text>
															．包裝限制：門市無提供包裝服務，請自行包裝。
														</Text>
														<Text>．禁運商品（請詳閱超商服務條款）：</Text>
														<Text> ✽生鮮（生鮮食品、易壞水果）</Text>
														<Text>
															{' '}
															✽低溫（冰淇淋、蛋糕等任何需低溫保存之物品）
														</Text>
														<Text> ✽液體</Text>
														<Text>
															{' '}
															✽易碎物品（玻璃器皿、玻璃瓶裝酒、瓶裝罐頭等）
														</Text>
														<Text>
															{' '}
															✽精密3C（電腦主機、螢幕、手機、數位相機等）
														</Text>
														<Text> ✽超材超重</Text>
														<Text>
															{' '}
															✽貴重（身分證件、現金、支票、金飾或鑽石）
														</Text>
														<Text> ✽未妥善包裝</Text>
														<Text>【提醒】</Text>
														<Text>
															1.
															完成寄件/取件交易後，恕無法取消寄件、退款、或退回貨品；寄件者寄件後無法要求提前退回貨品。
														</Text>
														<Text>
															2.
															寄件：請填寫寄件者及取件者「與證件相符之真實姓名」，以確保雙方權益。
														</Text>
														<Text>
															3.
															取件：取件者需告知店員真實姓名，並「出示與貨品上取件者姓名相符之身份證明文件正本」，於單據上「簽名」後方可領取商品。（若取件者未出示上述證件或拒絕簽名，門市無法提供取件服務）
														</Text>
														<Text>
															4.
															如欲開通物流交寄服務，請依照Shophub平台／賣家中心公告之流程申請。
														</Text>
													</LogisticOption>
												</VStack>
											</TabPanel>
										</TabPanels>
									</Tabs>
								</Box>
							</TabPanel>
							<TabPanel>
								<Box height="500px" overflowY="auto" pr={4}>
									<VStack align="flex-start" spacing={6} w="100%">
										<Box
											w="100%"
											p={4}
											border="1px"
											borderColor="gray.200"
											rounded="md"
										>
											<Flex justify="space-between" align="center">
												<Text>信用卡付款</Text>
												<Switch size="lg" />
											</Flex>
											<Text mt={2}>
												開啟此選項讓買家能以信用卡付款費購買您的商品
											</Text>
											<Text mt={2} color="gray.500">
												「重要」所有賣家皆需驗證基本資料，銀行帳號
											</Text>
											<Link color="blue.500" mt={2} href="#">
												立即驗證
											</Link>
										</Box>
										<Box
											w="100%"
											p={4}
											border="1px"
											borderColor="gray.200"
											rounded="md"
										>
											<Flex justify="space-between" align="center">
												<Text>信用卡分期付款</Text>
												<Switch size="lg" />
											</Flex>
											<Text mt={2}>
												開啟此選項讓買家能以信用卡分期付款購買您的商品
											</Text>
											<Text mt={2} color="gray.500">
												（了解更多{' '}
												<Link color="blue.500" href="#">
													信用卡分期金流與系統服務費
												</Link>
												）
											</Text>
										</Box>
										<Box
											w="100%"
											p={4}
											border="1px"
											borderColor="gray.200"
											rounded="md"
										>
											<Flex justify="space-between" align="center">
												<Text>錢包密碼</Text>
												<Button size="sm">更新</Button>
											</Flex>
											<Text mt={2}>更新您的錢包密碼</Text>
										</Box>
									</VStack>
								</Box>
							</TabPanel>
							<TabPanel>
								<Box height="500px" overflowY="auto" pr={4}>
									<VStack align="flex-start" spacing={6} w="100%">
										<Flex justify="space-between" align="center" w="100%">
											<Text fontSize="xl" fontWeight="bold">
												email通知
											</Text>
											<Button size="sm" variant="outline">
												關閉email
											</Button>
										</Flex>
										<Box w="100%">
											<Flex justify="space-between" align="center">
												<Text>訂單更新通知</Text>
												<Switch size="lg" />
											</Flex>
											<Text mt={2}>
												當我的訂單包含付款相關的資訊更新時，請通知我。
											</Text>
											<Divider my={4} />
										</Box>
										<Box w="100%">
											<Flex justify="space-between" align="center">
												<Text>訂閱EDM</Text>
												<Switch size="lg" />
											</Flex>
											<Text mt={2}>發送獨家優惠或是促銷資訊給我。</Text>
											<Divider my={4} />
										</Box>
										<Box w="100%">
											<Flex justify="space-between" align="center">
												<Text>商品更新通知</Text>
												<Switch size="lg" />
											</Flex>
											<Text mt={2}>
												當我販售的商品售完、被刪除或是被禁售的時候，請通知我。
											</Text>
											<Divider my={4} />
										</Box>
										<Box w="100%">
											<Flex justify="space-between" align="center">
												<Text>個人動態內容</Text>
												<Switch size="lg" />
											</Flex>
											<Text mt={2}>發送個人化的通知給我。</Text>
											<Divider my={4} />
										</Box>
									</VStack>
								</Box>
							</TabPanel>
							<TabPanel>
								<Stack direction="row" align="center" justify="space-between">
									<Box borderWidth="1px" borderRadius="md" p={4} w="100%">
										<Flex justify="space-between" align="center">
											<Text fontSize="xl" fontWeight="bold">
												休假模式
											</Text>
											<Switch size="lg" />
										</Flex>
										<Text mt={2}>
											開啟此選項，可避免您賣家成立新的訂單，也請你記得處理現有的訂單。啟動休假模式約需1小時系統作業時間
										</Text>
										<Box mt={2}>
											<Text color="gray.500">
												你還沒設定聊天的自動回覆哦！
												<Link color="blue.500" href="#">
													現在設定
												</Link>
											</Text>
										</Box>
									</Box>
								</Stack>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Container>
		</Box>
	);
}
