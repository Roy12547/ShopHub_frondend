/* eslint-disable react/prop-types */
import React from 'react'
import ProductImageSection from './ProductImageSection';
import AddToCartSection from './AddToCartSection';
import { Box, Flex } from '@chakra-ui/layout';

export default function MainContainerSection({ product }) {
	
  return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
			p={4}
			borderWidth="1px"
			borderRadius="lg"
		>
			<ProductImageSection product={product} />
			<AddToCartSection product={product} />
		</Flex>
	);
}
