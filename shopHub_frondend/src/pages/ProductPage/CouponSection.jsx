// src/CouponSection.js
import React from 'react';
import { Box, Text, Badge, Button, VStack } from '@chakra-ui/react';

const CouponSection = () => {
	return (
		<Box borderWidth="1px" borderRadius="lg" width="250px" p={4}>
			<VStack align="start">
				<Badge colorScheme="red">折$10</Badge>
				<Text>低消 $299</Text>
				<Text>新客折價券</Text>
				<Text>有效期限: 2024.07.20</Text>
				<Button bg="#d3438c" color="white" mt={4}>
					領取
				</Button>
			</VStack>
		</Box>
	);
};

export default CouponSection;
