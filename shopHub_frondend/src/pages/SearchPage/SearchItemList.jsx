/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Pcard from '../HomePage/Pcard';
import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import { useLocation } from 'react-router-dom';
import { searchProdByCateAPI, searchProdByNameAPI } from '../../api/productCRUDAPI';

// eslint-disable-next-line react/prop-types
export default function SearchItemList({ searchQuery,filters ,type}) {

	
	const location = useLocation()

	


	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const finalPrice = (product) => {
		
		return	Math.ceil(product.product.price * (1 - product.product.discount));
		
	}
	
	// Remaining code...
	useEffect(() => {
		if (type === 'category') {
			searchProdByCateAPI(searchQuery).then((data) => {
				console.log(data.data)
			 setProducts(data.data);
		 }) 
			
		} else {
			searchProdByNameAPI(searchQuery).then((data) => {
				console.log(data.data)
				setProducts(data.data);
			});
		}

		
	}, [searchQuery]);
useEffect(() => {
	const sortAndFilterProducts = () => {
		// 增加函数来计算每个产品的orderedPrice
		const calculateOrderedPrice = (product) => {
			if (product.prodSpecs) {
				const prices = product.prodSpecs
					.map((spec) => spec.price)
					.filter((price) => price != null);
				if (prices.length > 0) {
					const minPrice = Math.min(...prices);
					return minPrice;
				}
			}
			// 如果 prodSpecs 为空或不存在，则显示 product 的 price
			return product.product.price;
		};

		// 给每个产品添加orderedPrice属性
		const productsWithOrderedPrice = products.map((product) => ({
			...product,
			orderedPrice: calculateOrderedPrice(product),
		}));

		// 排序
		let sortedProducts = productsWithOrderedPrice.slice(); // 创建副本以避免直接修改原数组
		if (filters.priceOrder === 'asc') {
			sortedProducts.sort((a, b) => a.orderedPrice - b.orderedPrice);
		} else if (filters.priceOrder === 'desc') {
			sortedProducts.sort((a, b) => b.orderedPrice - a.orderedPrice);
		}

		// 筛选
		const minPrice = filters.minPrice !== '' ? Number(filters.minPrice) : 0;
		const maxPrice =
			filters.maxPrice !== '' ? Number(filters.maxPrice) : Infinity;
		const filtered = sortedProducts.filter((product) => {
			const price = product.orderedPrice;
			return price >= minPrice && price <= maxPrice;
		});

		setFilteredProducts(filtered);
	};

	sortAndFilterProducts();
}, [filters, products]);
	
	
	return (
		<Box m={12}>
			<Text fontSize="2xl" fontWeight="bold" mb={6}>
				{searchQuery}
			</Text>
			<Grid
				templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
				gap={2}
				justifyItems="center"
			>
				{filteredProducts.map((product, index) => (
					<Pcard key={index} product={product} />
				))}
			</Grid>
		</Box>
	);
}
