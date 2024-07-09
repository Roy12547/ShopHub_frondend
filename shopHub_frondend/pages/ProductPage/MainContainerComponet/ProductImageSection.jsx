/* eslint-disable react/prop-types */
// src/ProductImageSection.js
import React, { useState } from 'react';
import { Box, Image, HStack, IconButton } from '@chakra-ui/react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';

export default function ProductImageSection({ product }) {
	const [selectedImage, setSelectedImage] = useState(product.imgUrls[0]);

	const handleImageHover = (imgUrl) => {
		setSelectedImage(imgUrl);
	};

	return (
		<Box flex="2">
			<Box position="relative" width="70%" paddingTop="70%">
				<Image
					position="absolute"
					top="0"
					left="0"
					src={selectedImage}
					alt="Product Image"
					objectFit="contain"
					width="100%"
					height="100%"
				/>
			</Box>
			<HStack mt="4" spacing="4">
				{/* 紫色匡:其他小圖 */}
				{product.imgUrls.map((imgUrl) => (
					<Box
						key={imgUrl}
						borderWidth="1px"
						borderColor="gray.200"
						onMouseEnter={() => handleImageHover(imgUrl)}
						cursor="pointer"
					>
						<Image
							src={imgUrl}
							alt="Product Thumbnail"
							boxSize="60px"
							objectFit="cover"
						/>
					</Box>
				))}
			</HStack>
				<IconButton icon={<FaShareAlt />} aria-label="Share" />
				<IconButton icon={<FaHeart />} aria-label="Like" />
			
		</Box>
	);
}
