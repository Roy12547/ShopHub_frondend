// Store.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Stack,
	Box,
	FormLabel,
	Input,
	Text,
	FormControl,
	FormErrorMessage,
	useToast,
	Flex,
} from '@chakra-ui/react';
import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { BASE_URL, showSuccess, showErrorNoText } from '../../../utils/apiUtil';

function Store({ userId, onAddCard }) {
	// 接收 userId 作為 prop
	const [selectedStoreAddr, setSelectedStoreAddr] = useState('');
	const [selectedStore, setSelectedStore] = useState('');
	const [isSevenDisabled, setIsSevenDisabled] = useState(false);
	const [isFamilyDisabled, setIsFamilyDisabled] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const firstField = React.useRef();
	const toast = useToast();

	const onSubmit = async (data) => {
		console.log('Form data:', data);

		// 創建新的卡片資料
		const newCard = {
			userId: userId, // 使用 props 的 userId
			recipientName: data.name,
			recipientPhone: data.phone,
			shopName: selectedStore,
			address: selectedStoreAddr,
			shipType: selectedStore.includes('7-11') ? 1 : 2, // 1 表示 7-11, 2 表示 全家
		};

		try {
			// 發送 POST 請求到 Spring Boot API
			const response = await axios.post(
				`${BASE_URL}/address/savemart`,
				newCard
			);
			// 從後端響應中獲取 shipId
			const { shipId } = response.data;
			// 將 shipId 添加到 newCard 並傳遞給 onAddCard
			onAddCard({
				...newCard,
				shipId, // 添加 shipId
			});

			// 顯示成功訊息
			showSuccess('資料儲存成功');

			// 重置表單
			onClose();
			reset();
			setSelectedStore(''); // 重置選擇的超商類型
			setSelectedStoreAddr(''); // 重置選擇的店鋪地址
			setIsSevenDisabled(false);
			setIsFamilyDisabled(false);
		} catch (error) {
			console.error('Error saving data:', error);
			showErrorNoText('資料儲存失敗');
		}
	};

	// 7-11 地址選擇邏輯
	const getSevenAddr = () => {
		const popup = window.open(
			`${BASE_URL}/mart/seven`,
			'7-11 addr',
			'width=1000,height=600'
		);
		const timer = setInterval(() => {
			if (popup.closed) {
				clearInterval(timer);
			}
		}, 1000);

		window.addEventListener('message', (event) => {
			if (event.origin === `${BASE_URL}`) {
				const data = event.data;
				setSelectedStoreAddr(data.storeaddress);
				setSelectedStore(`7-11 ${data.storename}`);
				setIsSevenDisabled(true); // 選擇 7-11 後禁用 7-11 按鈕
				setIsFamilyDisabled(true); // 選擇 7-11 後禁用 全家 按鈕
			}
		});
	};

	// 全家 地址選擇邏輯
	const getFMAddr = () => {
		const popup = window.open(
			`${BASE_URL}/mart/family`,
			'family mart addr',
			'width=1000,height=600'
		);
		const timer = setInterval(() => {
			if (popup.closed) {
				clearInterval(timer);
			}
		}, 1000);

		window.addEventListener('message', (event) => {
			if (event.origin === `${BASE_URL}`) {
				const data = event.data;
				setSelectedStoreAddr(data.storeaddress);
				setSelectedStore(`全家 ${data.storename}`);
				setIsFamilyDisabled(true); // 選擇 全家 後禁用 全家 按鈕
				setIsSevenDisabled(true); // 選擇 全家 後禁用 7-11 按鈕
			}
		});
	};

	return (
		<>
			<Button
				leftIcon={<AddIcon />}
				colorScheme="teal"
				variant="solid"
				ml="auto"
				onClick={onOpen}
			>
				新增超商
			</Button>

			<Drawer
				onClose={() => {
					onClose();
					reset();
					setSelectedStore(''); // 重置選擇的超商類型
					setSelectedStoreAddr(''); // 重置選擇的店鋪地址
					setIsSevenDisabled(false);
					setIsFamilyDisabled(false);
				}}
				isOpen={isOpen}
				size="sm"
				placement="right"
				initialFocusRef={firstField}
				closeOnOverlayClick={false}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />

					<DrawerHeader borderBottomWidth="1px">新增取貨超商</DrawerHeader>

					<DrawerBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Stack spacing="24px">
								<FormControl isRequired isInvalid={errors.name}>
									<FormLabel htmlFor="name">取貨姓名</FormLabel>
									<Input
										ref={firstField}
										id="name"
										placeholder="取貨姓名"
										maxLength={6}
										{...register('name', {
											required: '必填項目',
											pattern: {
												value: /^[\u4e00-\u9fa5a-zA-Z\s]{1,6}$/,
												message: '請輸入有效的姓名，只能包含中文字符或字母',
											},
										})}
									/>
									<FormErrorMessage>
										{errors.name && errors.name.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={errors.phone}>
									<FormLabel htmlFor="phone">電話號碼</FormLabel>
									<Input
										id="phone"
										placeholder="電話號碼"
										maxLength={10}
										{...register('phone', {
											required: '必填項目',
											pattern: {
												value: /^[0-9]{10}$/,
												message: '請輸入有效的電話或手機號碼',
											},
										})}
									/>
									<FormErrorMessage>
										{errors.phone && errors.phone.message}
									</FormErrorMessage>
								</FormControl>

								<hr />
								<Text>選擇超商</Text>
								<Box>
									<Button
										rightIcon={<ChevronRightIcon />}
										mr="10px"
										onClick={getSevenAddr}
										isDisabled={isSevenDisabled}
									>
										{selectedStore?.includes('7-11') ? selectedStore : '7-11'}
									</Button>
									<Button
										rightIcon={<ChevronRightIcon />}
										onClick={getFMAddr}
										isDisabled={isFamilyDisabled}
									>
										{selectedStore?.includes('全家') ? selectedStore : '全家'}
									</Button>
								</Box>
							</Stack>

							<DrawerFooter>
								<Button
									variant="outline"
									mr={3}
									onClick={() => {
										onClose();
										reset();
										setSelectedStore('');
										setSelectedStoreAddr('');
										setIsSevenDisabled(false);
										setIsFamilyDisabled(false);
									}}
								>
									取消
								</Button>
								<Button colorScheme="blue" type="submit">
									確認送出
								</Button>
							</DrawerFooter>
						</form>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

// PropTypes 驗證
Store.propTypes = {
	userId: PropTypes.string.isRequired,
	onAddCard: PropTypes.func.isRequired,
};

export default Store;
