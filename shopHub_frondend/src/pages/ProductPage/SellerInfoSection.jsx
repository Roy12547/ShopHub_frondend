/* eslint-disable react/prop-types */

import React from 'react';
import { Box, Avatar, Text, VStack, HStack, Badge, Button } from "@chakra-ui/react";

const SellerInfoSection = ({ product }) => {
	 const calculateJoinTime = (rdate) => {
			const joinDate = new Date(rdate);
			const currentDate = new Date();
		 
			let yearsAgo = currentDate.getFullYear() - joinDate.getFullYear();
			const monthsAgo = currentDate.getMonth() - joinDate.getMonth();
			if (
				monthsAgo < 0 ||
				(monthsAgo === 0 && currentDate.getDate() < joinDate.getDate())
			) {
				yearsAgo--;
			}

			return yearsAgo;
		};



  return (
		<Box borderWidth="1px" borderRadius="lg" p={4}>
			<HStack spacing={4}>
				<Avatar
					size="lg"
					name={product.sellerDTO.sellerName}
					src={product.sellerDTO.sellerImage}
				/>
				<VStack align="start">
					<Text fontSize="xl" fontWeight="bold">
						{product.sellerDTO.sellerName}
					</Text>
					<HStack spacing={2}>
						<Button size="sm" colorScheme="teal">
							查看賣場
						</Button>
					</HStack>
				</VStack>
			</HStack>
			<HStack mt={4} spacing={8}>
				<VStack>
					<Text>商品評價</Text>
					<Text fontSize="lg" fontWeight="bold">
						{product.ratings?.length}
					</Text>
				</VStack>

				<VStack>
					<Text>加入時間</Text>
					<Text fontSize="lg" fontWeight="bold">
						{/* 欄位沒有此資料 */}
						{calculateJoinTime(product.sellerDTO.rdate)}年前
					</Text>
				</VStack>
				<VStack>
					<Text>粉絲</Text>
					<Text fontSize="lg" fontWeight="bold">
						2,540
					</Text>
				</VStack>
			</HStack>
		</Box>
	);
}

export default SellerInfoSection;
