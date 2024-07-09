import React, { useEffect, useState } from 'react';
import {
	Flex,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BuyerMenu from '../BuyerMenu';
import StyledBox from '../StyledBox';
import BuyerOrder from './BuyerOrder';
import Cookies from 'js-cookie';
import { BASE_URL, showSuccess, showErrorNoText } from '../../../utils/apiUtil';
import NoProduct from './NoProduct';

const Product = () => {
	//取得userID
	const userId = Cookies.get('userId');
	console.log('userID:', userId);
	//預設圖片
	const [profileImage, setProfileImage] = useState(
		'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
	);
	const [orders, setOrders] = useState([]);
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();
	
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const type = params.get('type') || '0';
		setCurrentTabIndex(parseInt(type, 10));
	}, [location]);
	//取得買方所有訂單
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/order/buyer/getOrderDetail/${userId}`
				);
				console.log('API response:', response.data);

				const responseData = response.data;

				// 檢查 responseData 是否包含 data 並且 data 是數組
				if (
					responseData &&
					responseData.data &&
					Array.isArray(responseData.data)
				) {
					const mappedOrders = responseData.data.map((order) => ({
						orderID: order.ecpayId,
						seller: order.userName,
						sellerImage: order.userImage,
						orderDetail: order.products.map((detail) => ({
							productName: detail.productName,
							spec: {
								specName: detail.spec,
								specChoose: detail.specName,
							},
							productImage: detail.imageUrl,
							price: detail.price,
							quantity: detail.quantity,
							status: mapOrderStatus(detail.orderStatus),
							ship: mapShipMethod(detail.shipMethod),
						})),
					}));

					setOrders(mappedOrders);
				} else {
					console.error(
						'Expected an array but received:',
						responseData ? responseData.data : responseData
					);
					setOrders([]); // 設置為空數組以避免 UI 渲染問題
				}
			} catch (error) {
				console.error('Failed to fetch orders:', error);
				setOrders([]); // 如果請求失敗，也要確保 orders 是一個空數組
			}
		};
		fetchOrders();
	}, <div userId=""></div>);
	//orderstatus顯示狀態
	const mapOrderStatus = (status) => {
		switch (status) {
			case 0:
				return '待出貨';
			case 1:
				return '運送中';
			case 2:
			case 3:
			case 4:
				return '已完成';
			case 5:
				return '已取消';
			default:
				return '未知';
		}
	};

	const mapShipMethod = (method) => {
		switch (method) {
			case 0:
				return '宅配';
			case 1:
				return '7-Eleven';
			case 2:
				return 'Family Mart';
			default:
				return '未知';
		}
	};
	//tab type值
	const handleTabChange = (index) => {
		setCurrentTabIndex(index);
		navigate(`?type=${index}`);
	};
	//當在不同activeTab時尋找detail.status是否有符合該字串的條件
	const handleRenderTab = (orders, activeTab) => {
		let filteredOrders;

		if (activeTab === 0) {
			filteredOrders = orders;
		} else if (activeTab === 1) {
			filteredOrders = orders.filter((order) =>
				order.orderDetail.some((detail) => detail.status === '待出貨')
			);
		} else if (activeTab === 2) {
			filteredOrders = orders.filter((order) =>
				order.orderDetail.some((detail) => detail.status === '運送中')
			);
		} else if (activeTab === 3) {
			filteredOrders = orders.filter((order) =>
				order.orderDetail.some((detail) => detail.status === '已完成')
			);
		}

		if (filteredOrders.length === 0) {
			return <NoProduct />;
		}

		return filteredOrders.map((order, i) => (
			<BuyerOrder
				key={i}
				seller={order.seller}
				sellerImage={order.sellerImage}
				orderID={order.orderID}
				orderDetail={order.orderDetail}
				onCancelOrder={handleCancelOrder}
				onOrderRating={handleOrderRating}
			/>
		));
	};
	//取消訂單按鈕API
	const handleCancelOrder = async (orderID) => {
		try {
			// 發送取消訂單請求，使用 params 傳遞請求參數
			await axios.put(`${BASE_URL}/order/buyer/${userId}/cancelOrder`, null, {
				params: {
					ecpayId: orderID,
					buyerId: userId,
				},
			});

			// 更新 orders 狀態
			const updatedOrders = orders.map((order) => {
				if (order.orderID === orderID) {
					return {
						...order,
						orderDetail: order.orderDetail.map((detail) => ({
							...detail,
							status: detail.status === '待出貨' ? '已取消' : detail.status, // 只更新待出貨的狀態為已取消
						})),
					};
				}
				return order;
			});
			showSuccess('取消訂單成功');
			setOrders(updatedOrders);
		} catch (error) {
			showErrorNoText('取消訂單失敗，請聯絡客服');
		}
	};
	//完成訂單
	const handleOrderRating = async (orderID) => {
		try {
			await axios.put(`${BASE_URL}/order/buyer/${userId}/RatingOrder`, null, {
				params: {
					ecpayId: orderID,
					buyerId: userId,
				},
			});
			showSuccess('完成訂單成功，請給予評價');
		} catch (error) {
			showErrorNoText('完成訂單失敗，請聯絡客服');
		}
	};

	return (
		<Flex
			p={{ base: '2', md: '5' }}
			mr={{ base: '2', md: '70' }}
			ml={{ base: '2', md: '70' }}
			justifyContent="center"
		>
			<BuyerMenu profileImage={profileImage} />
			<StyledBox>
				<Tabs
					isFitted
					position="relative"
					variant="enclosed"
					index={currentTabIndex}
					onChange={handleTabChange}
				>
					<TabList top={0}>
						{['全部', '待出貨', '運送中', '已完成'].map((tab, index) => (
							<Tab
								key={index}
								_selected={{ color: 'red.500' }}
								_hover={{ bg: 'transparent' }}
								sx={{
									position: 'relative',
									transition: 'color 0.2s',
									'&:after': {
										content: '""',
										position: 'absolute',
										width: '100%',
										height: '2px',
										backgroundColor: '#e53e3e',
										bottom: '-1px',
										left: 0,
										transform: 'scaleX(0)',
										transformOrigin: 'left',
										transition: 'transform 0.2s',
									},
									'&[aria-selected="true"]:after': {
										transform: 'scaleX(1)',
									},
								}}
							>
								{tab}
							</Tab>
						))}
					</TabList>
					<TabPanels>
						{['全部', '待出貨', '運送中', '已完成'].map((item, index) => (
							<TabPanel key={index}>
								{handleRenderTab(orders, currentTabIndex)}
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>
			</StyledBox>
		</Flex>
	);
};

export default Product;
