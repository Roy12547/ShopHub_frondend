import React, { useEffect, useState } from 'react';
import {
	Box,
	Text,
	Button,
	Input,
	Flex,
	Heading,
	Stack,
	Select,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Divider,
} from '@chakra-ui/react';
import { OrderDetail } from './OrderDetail';
// import mock from './mock.json';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getAllOrders } from '../../api/orderDetailApi';
import Loader from '../../components/Loader/Loader';
import FetchError from '../../components/Error/FetchError';
import Cookies from 'js-cookie';

const OrderManagePanel = () => {
	const [orderNumber, setOrderNumber] = useState('');
	const [shippingMethod, setShippingMethod] = useState('所有運送方式');
	const [activeTab, setActiveTab] = useState(0);

	const userId = Cookies.get('userId');

	const {
		isPending,
		error,
		data: orders,
		isFetched,
	} = useQuery({
		queryKey: ['orderList'],
		queryFn: () => getAllOrders(userId),
	});

	useEffect(() => {
		const handleDataRender = () => {};
	}, [orders]);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		// console.log(tab);
	};

	const handleRenderTab = (orders, activeTab) => {
		//console.log(orders, activeTab);

		if (activeTab == 1) {
			return orders.filter((order) => order.orderStatus == 0);
		}
		if (activeTab === 2) {
			return orders.filter((order) => order.orderStatus == 1);
		}
		if (activeTab === 3) {
			return orders.filter((order) => order.orderStatus == 2);
		}
		return orders;
	};

	const countOrdersByStatus = (orders) => {
		const initialStatusCount = {
			0: 0, // 待出貨
			1: 0, // 運送中
			2: 0, // 已完成
		};

		if (!orders) return initialStatusCount;

		return orders.reduce((acc, order) => {
			const status = order.orderStatus;
			acc[status] = acc[status] ? acc[status] + 1 : 1;
			return acc;
		}, initialStatusCount);
	};
	const ordersCountByStatus = countOrdersByStatus(orders?.data);

	const handleSearch = () => {};

	useEffect(() => {}, [activeTab, orders]);

	if (isPending) return <Loader />;
	if (error) return <FetchError />;

	const renderTabPanelContent = (index, item) => {
		return (
			<>
				<Flex justify="space-between" align="center" mb={4}>
					{/* <Flex align="center">
					<Select placeholder="訂單編號" maxW="150px" mr={2}>
						<option value="option1">訂單編號1</option>
						<option value="option2">訂單編號2</option>
					</Select>
					<Input
						placeholder="請輸入訂單編號"
						value={orderNumber}
						onChange={(e) => setOrderNumber(e.target.value)}
						maxW="200px"
						mr={2}
					/>
					<Select
						placeholder="物流方式"
						value={shippingMethod}
						onChange={(e) => setShippingMethod(e.target.value)}
						maxW="200px"
						mr={2}
					>
						<option value="option1">物流方式1</option>
						<option value="option2">物流方式2</option>
					</Select>
				</Flex> */}
					{/* <Flex align="center">
					<Button colorScheme="red" mr={2} onClick={handleSearch}>
						搜尋
					</Button>
					<Button variant="outline">重置</Button>
				</Flex> */}
				</Flex>
				<Text fontSize="2xl" mb={4}>
					{index === 0
						? orders?.data.length || 0
						: ordersCountByStatus[index - 1] || 0}{' '}
					筆訂單
				</Text>
				<Flex
					bg="gray.100"
					p={4}
					borderRadius="md"
					justify="space-between"
					align="center"
					fontWeight="bold"
					fontSize="md"
				>
					<Text flexBasis={'100px'}>商品</Text>
					<Text flexBasis={'100px'}>買家實付金額</Text>
					<Text flexBasis={'100px'}>狀態</Text>
					{/* <Text flexBasis={'100px'}>到期時間</Text> */}
					<Text flexBasis={'100px'}>物流方式</Text>
					<Text flexBasis={'200px'}>操作</Text>
				</Flex>
			</>
		);
	};

	return (
		<Box
			p={5}
			shadow="md"
			borderWidth="1px"
			borderRadius="md"
			position={'relative'}
		>
			<Tabs variant="unstyled" onChange={handleTabClick} index={activeTab}>
				<Flex
					flexDirection={'column'}
					position={'sticky'}
					top={0}
					backgroundColor={'#fff'}
					zIndex={99}
				>
					<Flex justify="space-between" align="center" mb={4}>
						<Heading fontSize="xl">我的銷售</Heading>
					</Flex>
					<TabList position={'sticky'} top={0}>
						{['全部', '待出貨', '運送中', '已完成'].map((tab, index) => (
							<Tab
								key={tab}
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
								{tab}(
								{index === 0
									? orders?.data.length || 0
									: ordersCountByStatus[index - 1] || 0}
								)
							</Tab>
						))}
					</TabList>
				</Flex>
				<Divider />
				<TabPanels>
					{['全部', '待出貨', '運送中', '已完成'].map((item, index) => (
						<TabPanel key={item}>
							{renderTabPanelContent(index, item)}

							{handleRenderTab(orders?.data, activeTab).map((order, i) => (
								<OrderDetail key={i} {...order} />
							))}
						</TabPanel>
					))}
					{/* <Flex justify="space-between" align="center" mb={4}>
							<Flex align="center">
								<Text fontWeight="bold" mr={4}>
									訂單狀態
								</Text>
								<Stack direction="row" spacing={2}>
									<Button
										variant="outline"
										colorScheme="red"
										size="sm"
										borderRadius="md"
									>
										全部
									</Button>
									<Button
										variant="outline"
										colorScheme="red"
										size="sm"
										borderRadius="md"
									>
										待處理 (0)
									</Button>
									<Button
										variant="outline"
										colorScheme="red"
										size="sm"
										borderRadius="md"
									>
										已處理 (0)
									</Button>
								</Stack>
							</Flex>
						</Flex> */}
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default OrderManagePanel;
