/* eslint-disable react/prop-types */
// src/ProductDetailsSection.js
import React from 'react';
import {
	Box,
	Text,
	VStack,
	HStack,
	List,
	ListItem,
	ListIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import ProductBreadcrumb from './ProductBreadcrumb';

export default function ProductDetailsSection({ product }) {
	const totalStock = () => {
		if (product.prodSpecs) {
			// 使用 reduce 函数来累加库存
			const amount = product.prodSpecs.reduce((acc, ps) => acc + ps.stock, 0);
			return amount;
		}
		return product.stock;
	};
	return (
		<Box borderWidth="1px" borderRadius="lg" flex="1" p={4}>
			<Text fontSize="xl" fontWeight="bold" bg="#fafafa" p={2}>
				商品規格
			</Text>
			<List spacing={3}>
				<ListItem>
					<ProductBreadcrumb product={product}></ProductBreadcrumb>
				</ListItem>
				<ListItem>{product.product.description1}</ListItem>
				<ListItem>{product.product.description2}</ListItem>

				<ListItem>商品數量: {totalStock()}</ListItem>
				<ListItem>等資料</ListItem>
			</List>

			<Text fontSize="xl" fontWeight="bold" bg="#fafafa" p={2}>
				商品描述
			</Text>

			<Box
				dangerouslySetInnerHTML={{ __html: product.product.productDetail }}
			></Box>
		</Box>
	);
}
