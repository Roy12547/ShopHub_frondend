import React from 'react';
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
import ProductDetail from './ProductDetail';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import { getAllProducts } from '../../api/productApi';
import FetchError from '../../components/Error/FetchError';
const ProductListPanel = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		isPending,
		error,
		data: products,
		isFetched,
	} = useQuery({ queryKey: ['productList'], queryFn: () => getAllProducts(1) });

	if (isPending) return <Loader />;
	if (error) return <FetchError />;

	return (
		<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
			<Box position={'sticky'} top={0}>
				<Flex justify="space-between" align="center" mb={4}>
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
					bg="gray.100"
					p={4}
					borderRadius="md"
					justify="space-between"
					align="center"
					fontWeight="bold"
					fontSize="md"
				>
					<Text flexBasis={'200px'}>商品</Text>
					<Text flexBasis={'200px'}>已售出</Text>
					<Text flexBasis={'200px'}>價格</Text>
					<Text flexBasis={'200px'}>商品數量</Text>
					<Text flexBasis={'200px'}>操作</Text>
				</Flex>
			</Box>
			<Skeleton isLoaded={!isPending}>
				<ProductDetail data={products} />
			</Skeleton>
		</Box>
	);
};

export default ProductListPanel;
