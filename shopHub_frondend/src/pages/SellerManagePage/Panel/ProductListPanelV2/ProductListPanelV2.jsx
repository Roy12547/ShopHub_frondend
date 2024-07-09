import React, { useEffect } from 'react';
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
	Skeleton,
	SkeletonCircle,
	SkeletonText,
} from '@chakra-ui/react';
import ProductDetailV2 from './ProductDetailV2';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

import myProductApi, { getAllList } from '../../api/myProductApi';
import { useState } from 'react';
import { deleteProdSpec, deleteProduct } from '../../../../api/productCRUDAPI';
const ProductListPanelV2 = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		isPending,
		error,
		data: products,
		isFetched,
		refetch,
	} = useQuery({ queryKey: ['productList'], queryFn: () => getAllList() });
	const [productList, setProductListStatus] = useState([]);
	console.log(products);
		const handleDeleteSpec = (prodSpecId) => {
			deleteProdSpec(prodSpecId).then(() => {
				setProductListStatus((prevList) =>
					prevList.map((product) => ({
						...product,
						prodSpecs: product.prodSpecs.filter(
							(spec) => spec && spec.prodSpecId !== prodSpecId
						),
					}))
				);
			});
		};
	const handleDeleteProduct = (productId) => {
		deleteProduct(productId).then(() => {
			setProductListStatus((prevList) =>
				prevList.filter((product) => product.product.productId !== productId)
			);
		});
	};
	useEffect(() => {
		if (isFetched) {
			setProductListStatus(products?.data);
		}
	}, [isFetched, products]);
	if (isPending) return <Loader />;

	return (
		<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
			<Box position={'sticky'} top={0} bg={"white"} zIndex={999}>
				<Flex justify="space-between" align="center" mb={4} >
					<Heading fontSize="xl">我的產品</Heading>
					<Button
						colorScheme="blue"
						onClick={() => navigate('/seller/product/new')}
					>
						{' '}
						＋ 新增產品
					</Button>
				</Flex>
				<Text fontSize="2xl" mb={4}>
					{`${products.data.length}`} 商品
				</Text>
				<Flex

					p={4}
					borderRadius="md"
					justify="space-between"
					align="center"
					fontWeight="bold"
					fontSize="md"
					zIndex={"999"}
				>
					<Text flexBasis={'200px'}>商品</Text>
					<Text flexBasis={'200px'}>價格</Text>
					<Text flexBasis={'200px'}>商品數量</Text>
					<Text flexBasis={'200px'}>操作</Text>
				</Flex>
			</Box>
			<Skeleton isLoaded={!isPending}>
				<ProductDetailV2
					productList={productList}
					handleDeleteSpec={handleDeleteSpec}
					handleDeleteProduct={handleDeleteProduct}
				/>
			</Skeleton>
		</Box>
	);
};

export default ProductListPanelV2;
