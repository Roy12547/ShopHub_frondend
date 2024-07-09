// src/ProductPage.js
import React, { useEffect, useState } from 'react';
import { Box, Flex, Container } from '@chakra-ui/react';
import ProductImageSection from './MainContainerComponet/ProductImageSection';
import AddToCartSection from './MainContainerComponet/AddToCartSection';
import SellerInfoSection from './SellerInfoSection';
import ProductDetailsSection from './ ProductDetailsSection';
import MainContainerSection from './MainContainerComponet/MainContainerSection';
import ProductBreadcrumb from './ProductBreadcrumb';
import { useLocation } from 'react-router-dom';
import { getProductDetailAPI } from '../../api/productCRUDAPI';
import RatingSection from './ RatingSection';

export default function ProductPage() {
	const location = useLocation();
	const id = location.state?.productId;
	const [product, setProduct] = useState(null);

	useEffect(() => {
		getProductDetailAPI(id).then((data) => {
			console.log(data.data);
			setProduct(data.data);
		});
	}, []);

	if (!product) {
		return null;
	}

	return (
		<Container maxW="container.xl" mt={4}>
			<Flex direction="column" gap="1em">
				<ProductBreadcrumb product={product} />
				<MainContainerSection product={product} />
				<SellerInfoSection product={product} />
				<Flex direction={{ base: 'column', lg: 'row' }} gap="2em">
					<Box width={{ base: '100%', lg: '66%' }}>
						<ProductDetailsSection product={product} />
						{product.ratings && (
							<Box mt={6}>
								<RatingSection productId={product.product.productId} />
							</Box>
						)}
					</Box>
					<Box width={{ base: '100%', lg: '33%' }}>
						{/* 這裡可以放置其他側邊欄內容，如 CouponSection */}
					</Box>
				</Flex>
			</Flex>
		</Container>
	);
}
