import React, { useMemo } from 'react';
import { Flex, Image, Box, Divider, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import OrderButtons from './OrderButtons';

const BuyerOrder = ({
	seller,
	sellerImage,
	orderID,
	orderDetail,
	onCancelOrder,
	onOrderRating,
}) => {
	// 千位分號
	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US').format(price);
	};
	// 計算合計金額
	const calculateTotalPrice = () => {
		return orderDetail.reduce((total, detail) => {
			return total + detail.price * detail.quantity;
		}, 0);
	};

	const renderedOrderDetails = useMemo(
		() =>
			orderDetail.map((detail, index) => (
				<Flex
					key={index}
					mb={4}
					py={4}
					width={'100%'}
					flexDirection={'row'}
					align={'center'}
					justify={'space-between'}
				>
					<Flex flexBasis={'200px'} flexDirection={'row'}>
						<Image
							boxSize="50px"
							src={detail.productImage}
							alt="Product"
							mr={2}
						/>
						<Flex
							direction="column"
							flex="1"
							justify="center"
							flexBasis={'100px'}
						>
							<Text fontSize="sm">{detail.productName}</Text>
							<Text fontSize="sm">
								{detail.spec.specName} : {detail.spec.specChoose}
							</Text>
						</Flex>
					</Flex>
					<Flex flexDirection="column" alignItems="center" flexBasis={'100px'}>
						<Text fontSize="sm">{`NT$ ${formatPrice(detail.price)}`}</Text>
						<Text fontSize="sm">{`x ${detail.quantity}`}</Text>
					</Flex>
					<Text fontSize="sm" flexBasis={'100px'}>
						{`${detail.status}`}
					</Text>
					<Text fontSize="sm" flexBasis={'100px'}>
						{`${detail.ship}`}
					</Text>
				</Flex>
			)),
		[orderDetail]
	);
	// 計算合計金額並格式化
	const totalPrice = formatPrice(calculateTotalPrice());

	return (
		<Box border="1px" borderColor="gray.200" borderRadius="md" p={4} mb={4}>
			<Flex justify="space-between" align="center" mb={2}>
				<Flex align="center">
					<Image
						borderRadius={'50%'}
						boxSize="50px"
						src={sellerImage}
						alt="Seller"
						mr={2}
					/>
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="bold">
							{seller}
						</Text>
					</Flex>
				</Flex>
				<Text fontSize="sm" textAlign="right">
					{`訂單編號 ${orderID}`}
				</Text>
			</Flex>
			<Divider mb={4} />
			{renderedOrderDetails}
			<Flex justifyContent="flex-end">
				<Text fontSize={'18px'}>{`合計: NT$ ${totalPrice}`}</Text>
			</Flex>
			<Flex justifyContent="flex-end" w="100%" h="42px">
				<OrderButtons
					orderID={orderID}
					orderDetail={orderDetail}
					onCancelOrder={onCancelOrder}
					onOrderRating={onOrderRating}
				/>
			</Flex>
		</Box>
	);
};

BuyerOrder.propTypes = {
	seller: PropTypes.string.isRequired,
	sellerImage: PropTypes.string.isRequired,
	orderID: PropTypes.string.isRequired,
	orderDetail: PropTypes.arrayOf(
		PropTypes.shape({
			productName: PropTypes.string.isRequired,
			spec: PropTypes.shape({
				specName: PropTypes.string.isRequired,
				specChoose: PropTypes.string.isRequired,
			}).isRequired,
			productImage: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired,
			status: PropTypes.string.isRequired,
			ship: PropTypes.string.isRequired,
		})
	).isRequired,
	onCancelOrder: PropTypes.func.isRequired,
};

export default BuyerOrder;
