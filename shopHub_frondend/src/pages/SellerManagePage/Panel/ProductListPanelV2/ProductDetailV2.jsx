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
	Image,
} from '@chakra-ui/react';
import orderDetailApi from '../../api/orderDetailApi';
import { useNavigate } from 'react-router-dom';
import { deleteProdSpec, deleteProduct } from '../../../../api/productCRUDAPI';
import { useQueryClient } from '@tanstack/react-query';

const ProductDetailV2 = ({
	productList,
	handleDeleteProduct,
	handleDeleteSpec,
}) => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();
	const sold = (orderDetails) => {
		let sum = 0;
		orderDetails?.forEach((order) => {
			if (order) {
				sum += order.quantity;
			}
		});
		console.log(sum)
		return sum;
	};

	return productList.map((product, i) => (
		<Flex
			bg="white"
			p={4}
			borderRadius="md"
			border="1px solid #E2E8F0"
			mt={4}
			direction="column"
			boxShadow={'lg'}
			key={i}
		>
			{product.prodSpecs[0] ? (
				product.prodSpecs.map((spec, j) => (
					<Flex
						mb={2}
						py={4}
						width={'100%'}
						flexDirection={'row'}
						align={'center'}
						justify={'space-between'}
						key={j}
					>
						<Flex flexBasis={'200px'} flexDirection={'row'}>
							<Image
								boxSize="50px"
								src={spec?.specBase64 || product.imgUrlList[0]}
								alt="Product"
								mr={2}
							/>
							<Flex
								direction="column"
								flex="1"
								justify="center"
								flexBasis={'200px'}
							>
								<Text fontSize="sm">{product.product.productName}</Text>
								<Text fontSize="sm">
									{spec ? `規格: ${spec?.spec1Name} ${spec?.spec2Name}` : ''}
								</Text>
							</Flex>
						</Flex>

						<Text fontSize="1rem" flexBasis={'200px'}>
							NT$ {spec?.price}
						</Text>
						<Text fontSize="1rem" flexBasis={'200px'}>
							{spec?.stock}
						</Text>
						<Flex
							fontSize="sm"
							flexDirection={'row'}
							gap={2}
							align="center"
							justifyContent={'start'}
							position="relative"
							flexBasis={'200px'}
						>
							<Button
								colorScheme="red"
								size="md"
								onClick={() => handleDeleteSpec(spec?.prodSpecId)}
							>
								刪除
							</Button>
						</Flex>
					</Flex>
				))
			) : (
				<Flex
					mb={2}
					py={4}
					width={'100%'}
					flexDirection={'row'}
					align={'center'}
					justify={'space-between'}
				>
					<Flex flexBasis={'200px'} flexDirection={'row'}>
						<Image
							boxSize="50px"
							src={product.imgUrlList && product.imgUrlList[0]}
							alt="Product"
							mr={2}
						/>
						<Flex
							direction="column"
							flex="1"
							justify="center"
							flexBasis={'200px'}
						>
							<Text fontSize="sm">{product.product?.productName}</Text>
						</Flex>
					</Flex>

					<Text fontSize="1rem" flexBasis={'200px'}>
						NT$ {product.product?.price}
					</Text>
					<Text fontSize="1rem" flexBasis={'200px'}>
						{product?.product?.stock}
					</Text>
					<Text flexBasis={'200px'}></Text>
				</Flex>
			)}
			<Flex
				fontSize="sm"
				flexDirection={'row'}
				gap={2}
				align="center"
				justifyContent={'start'}
				position="relative"
				flexBasis={'200px'}
			>
				<Button
					colorScheme="blue"
					size="md"
					onClick={() =>
						navigate('/seller/product/new', {
							state: { editedProduct: product },
						})
					}
				>
					編輯
				</Button>
				<Button
					colorScheme="red"
					size="md"
					onClick={() => {
						handleDeleteProduct(product.product?.productId);
					}}
				>
					刪除
				</Button>
				<Text flexBasis={'200px'} align={'right'} fontSize={'18px'}>
					{' '}
					{sold(product.orderDetails)} 已售出
				</Text>
			</Flex>
		</Flex>
	));
};

export default ProductDetailV2;
