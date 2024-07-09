import React, { useState } from 'react';
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
	Image,
} from '@chakra-ui/react';

const OrderDetail = () => {
	return (
		<Flex
			bg="white"
			p={4}
			borderRadius="md"
			border="1px solid #E2E8F0"
			mt={4}
			direction="column"
		>
			<Flex justify="space-between" align="center" mb={2}>
				<Flex align="center">
					<Image boxSize="50px" src="/path/to/shrimp.png" alt="Shrimp" mr={2} />
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="bold">
							店家名
						</Text>
					</Flex>
				</Flex>
				<Text fontSize="sm" textAlign="right">
					訂單編號 210714U2VBMHH1
				</Text>
			</Flex>
			<Divider mb={2} />
			<Flex justify="space-between" align="center" mb={2} py={4}>
				<Image
					boxSize="50px"
					src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Product"
					mr={2}
				/>
				<Flex direction="column" flex="1" justify="center">
					<Text fontSize="sm">蝦小編愛用款 | 上衣</Text>
					<Text fontSize="sm">規格: red</Text>
				</Flex>
				<Text fontSize="sm" textAlign="center" flex="1" ml="-80px">
					x1 NT$100
				</Text>
				<Text fontSize="sm" textAlign="center" flex="1" mr="-30px">
					待出貨
				</Text>
				<Text fontSize="sm" textAlign="center" flex="1" mr="110px">
					蝦皮店到店
				</Text>
			</Flex>
			<Flex
				fontSize="sm"
				justify="flex-end"
				align="center"
				position="relative"
				top="-45px"
			>
				<Button colorScheme="blue" size="sm">
					產生寄件編號
				</Button>
			</Flex>
		</Flex>
	);
};

const SalesComponent = () => {
	const [orderNumber, setOrderNumber] = useState('');
	const [shippingMethod, setShippingMethod] = useState('所有運送方式');

	const renderTabPanelContent = () => (
		<>
			<Flex justify="space-between" align="center" mb={4}>
				<Flex align="center">
					<Select placeholder="訂單編號" maxW="150px" mr={2}>
						<option value="option1">買家帳號</option>
						<option value="option2">商品</option>
						<option value="option2">寄件編號</option>
					</Select>
					<Input
						placeholder="請輸入訂單編號"
						value={orderNumber}
						onChange={(e) => setOrderNumber(e.target.value)}
						maxW="200px"
						mr={2}
					/>
					<Select
						placeholder="所有物流方式"
						value={shippingMethod}
						onChange={(e) => setShippingMethod(e.target.value)}
						maxW="200px"
						mr={2}
					>
						<option value="option1">店到店</option>
						<option value="option2">店到家宅配</option>
						<option value="option2">7-ELEVEN</option>
						<option value="option2">全家</option>
						<option value="option2">萊爾富</option>
						<option value="option2">OK MART</option>
					</Select>
				</Flex>
				<Flex align="center">
					<Button colorScheme="red" mr={2}>
						搜尋
					</Button>
					<Button variant="outline">重置</Button>
				</Flex>
			</Flex>
			<Text fontSize="2xl" mb={4}>
				0 訂單
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
				<Text>商品</Text>
				<Text ml="120px">買家實付金額</Text>
				<Text ml="30px">狀態/到期時間</Text>
				<Text>物流方式</Text>
				<Text mr="20px">操作</Text>
			</Flex>
			<OrderDetail />
		</>
	);

	return (
		<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
			<Flex justify="space-between" align="center" mb={4}>
				<Heading fontSize="xl">我的銷售</Heading>
			</Flex>
			<Tabs variant="unstyled">
				<TabList position="relative">
					{['全部', '尚未付款', '待出貨', '運送中', '已完成'].map((tab) => (
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
							{tab}
						</Tab>
					))}
				</TabList>
				<Divider />
				<TabPanels>
					<TabPanel>{renderTabPanelContent()}</TabPanel>
					<TabPanel>{renderTabPanelContent()}</TabPanel>
					<TabPanel>
						<Flex justify="space-between" align="center" mb={4}>
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
						</Flex>

						{renderTabPanelContent()}
					</TabPanel>
					<TabPanel>{renderTabPanelContent()}</TabPanel>
					<TabPanel>{renderTabPanelContent()}</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default SalesComponent;
