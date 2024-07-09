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
import mock from './mock.json';
import { OrderStatus } from './OrderStatus';
import {
	MdPendingActions,
	MdLocalShipping,
	MdCheckCircle,
} from 'react-icons/md';
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { updateOrderStatus } from '../../api/orderDetailApi';
import { RxAvatar } from 'react-icons/rx';
import { PiImageBrokenDuotone } from 'react-icons/pi';
import { showSuccess } from '../../../../utils/apiUtil';

export const OrderDetail = (item) => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateOrderAsync } = useMutation({
		mutationFn: ({ ecpayId, buyerId }) => updateOrderStatus(ecpayId, buyerId),
		onSuccess: () => {
			showSuccess('寄件成功');
			queryClient.invalidateQueries('orderList');
		},
	});
	const handleChangeOrderStatus = async (ecpayId, buyerId) => {
		try {
			updateOrderAsync({ ecpayId, buyerId });
		} catch (error) {
			console.error('Failed to update orders', error);
		}
	};

	const orderStatusReturnName = (orderStatus) => {
		switch (orderStatus) {
			case 0:
				return (
					<OrderStatus
						text="待出貨"
						icon={<MdPendingActions size={'1.2rem'} className="text-[red]" />}
					/>
				);
			case 1:
				return (
					<OrderStatus
						text="運送中"
						icon={<MdLocalShipping size={'1.2rem'} className="text-[orange]" />}
					/>
				);
			case 2:
				return (
					<OrderStatus
						text="已完成"
						icon={<MdCheckCircle size={'1.2rem'} className="text-[green]" />}
					/>
				);
			default:
				return <Text>未知狀態</Text>;
		}
	};
	const orderShipMethodReturnName = (shipMethod) => {
		switch (shipMethod) {
			case 0:
				return '宅配';
			case 1:
				return '7-Eleven';
			case 2:
				return 'Family Mart';
			default:
				return '未知狀態';
		}
	};
	return (
		<>
			<Flex
				bg="white"
				p={4}
				borderRadius="md"
				border="1px solid #E2E8F0"
				mt={4}
				direction="column"
				boxShadow={'lg'}
			>
				<Flex justify="space-between" align="center" mb={2}>
					<Flex align="center" flexBasis={'150px'} gap={2}>
						{item?.userImage == '' ? (
							<RxAvatar size={'50px'} />
						) : (
							<Image
								borderRadius={'50%'}
								boxSize="50px"
								src={item?.userImage}
								alt="Shrimp"
							/>
						)}

						<Flex direction="column">
							<Text fontSize="sm" fontWeight="bold">
								{item?.userName}
							</Text>
						</Flex>
					</Flex>
					<Text flexBasis={'100px'}>&nbsp;</Text>
					<Text fontSize="sm" flexBasis={'100px'}>
						{orderStatusReturnName(item?.orderStatus)}
					</Text>
					<Text fontSize="sm" flexBasis={'100px'}>
						{orderShipMethodReturnName(item?.shipMethod)}
					</Text>
					<Flex
						flexDirection={'column'}
						flexBasis={'200px'}
						gap={2}
						align={'end'}
					>
						<Flex
							gap={1}
							align={'start'}
							flexDirection={{ lg: 'row', md: 'column', sm: 'column' }}
						>
							<Text fontSize="xs" textAlign="right">
								訂單編號
							</Text>
							<Text fontSize="sm" textAlign="right">
								{item?.ecpayId}
							</Text>
						</Flex>
						{item?.orderStatus == 0 && (
							<Button
								colorScheme="blue"
								size="sm"
								onClick={() =>
									handleChangeOrderStatus(item?.ecpayId, item?.buyerId)
								}
							>
								寄件
							</Button>
						)}
					</Flex>
				</Flex>
				<Divider mb={2} />

				{item?.products.map((product) => (
					<Flex
						mb={2}
						py={4}
						width={'100%'}
						flexDirection={'row'}
						align={'center'}
						justify={'start'}
						key={product.productName}
						gap={4}
					>
						<Flex flexBasis={'250px'} flexDirection={'row'}>
							{product?.imageUrl == '' ? (
								<PiImageBrokenDuotone size={'50px'} />
							) : (
								<Image
									boxSize="50px"
									src={product?.imageUrl}
									alt="Product"
									mr={2}
								/>
							)}

							<Flex
								direction="column"
								flex="1"
								justify="center"
								flexBasis={'100px'}
							>
								<Text fontSize="sm">{product.productName}</Text>
								<Text fontSize="sm">
									{product.specName} : {product.spec}
								</Text>
							</Flex>
						</Flex>
						<Text fontSize="sm" flexBasis={'100px'}>
							{`NT$ ${product.price}`} x {`${product.quantity}`}
						</Text>
					</Flex>
				))}
			</Flex>
		</>
	);
};
