/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import {
	Box,
	Center,
	Text,
	Stack,
	Image,
	Divider,

	WrapItem,
} from '@chakra-ui/react';
import Heart from './Heart';


// eslint-disable-next-line react/prop-types
export default function Pcard({ product }) {
	let priceDisplay;

	if (product.prodSpecs && product.prodSpecs.length > 1) {
		const prices = product.prodSpecs
			.map((spec) => spec.price)
			.filter((price) => price != null);
		const minPrice = Math.min(...prices);
		const maxPrice = Math.max(...prices);

		const formatter = new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 0, // 最小小数位数，根据需要调整
			maximumFractionDigits: 0, // 最大小数位数，根据需要调整
		});

		if (minPrice === maxPrice) {
			priceDisplay = formatter.format(minPrice);
		} else {
			priceDisplay = `${formatter.format(minPrice)} - ${formatter.format(maxPrice)}`;
		}
	} else {
		// 如果 prodSpecs 为空或不存在，则显示 product 的 price
		const formatter = new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 0, // 最小小数位数，根据需要调整
			maximumFractionDigits: 0, // 最大小数位数，根据需要调整
		});

		priceDisplay = formatter.format(product.product.price);
	}

	return (
		<WrapItem textAlign="left" justifyContent="center">
			{/* 最外框 */}
			<Box
				m={2}
				p={2}
				maxW={'	302px'}
				maxH={'487px'}
				w={'full'}
				h={'full'}
				boxShadow={'md'}
				rounded={'lg'}
				pos={'relative'}
				_hover={{
					transform: 'scale(1.1)',
					transition: 'transform 0.1s ease-in-out',
					boxShadow: 'lg',
				}}
				transition="transform .2s"
			>
				<Link
					style={{ textDecoration: 'none' }}
					to={`/product`}
					state={{
						productId: product.product.productId,
					}}
				>
					<Image
						rounded={'lg'}
						height={200}
						width={'full'}
						objectFit={'contain'}
						// eslint-disable-next-line react/prop-types
						src={product.imgUrls && product.imgUrls[0]}
					></Image>
					<Divider my={2} borderColor="gray.300" />

					{/* 品名、價格 */}
					<Stack align={'center'}>
						<Text
							fontSize={'14px'}
							fontFamily={'body'}
							fontWeight={500}
							noOfLines={2} // 這行控制顯示的行數
							textOverflow={'ellipsis'} // 這行控制溢出的顯示方式
							overflow={'hidden'} // 這行控制溢出的顯示方式
							whiteSpace={'pre-wrap'} // 這行控制文字的換行方式
							w={'100%'}
						>
							{product.product.productName}
							{product.product.description1}
							{product.product.description2}
						</Text>
						<Stack direction={'row'} align={'center'}>
							<Text fontWeight={800} fontSize={'xl'} color={'red.500'}>
								NT${priceDisplay}
							</Text>
						</Stack>
					</Stack>
				</Link>

				{/* 愛心 */}
				{/* <Box position="absolute" bottom="1" left="1">
					<Heart />
				</Box> */}
			</Box>
		</WrapItem>
	);
}
