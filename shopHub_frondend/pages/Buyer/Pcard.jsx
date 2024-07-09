import React from 'react';
import {
	Box,
	Center,
	Text,
	Stack,
	Image,
	Divider,
	Link,
} from '@chakra-ui/react';
import Heart from './Heart';

const IMAGE =
	'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function ProductSimple() {
	return (
		<Center>
			{/* 最外框 */}
			<Box
				m={3}
				p={2}
				maxW={'210px'}
				maxH={'338px'}
				w={'full'}
				boxShadow={'md'}
				rounded={'lg'}
				pos={'relative'}
				_hover={{
					transform: 'scale(1.001)',
					transition: 'transform 0.1s ease-in-out',
					boxShadow: 'lg',
				}}
				border={'1px'}
				borderColor={'lightgray'}
			>
				<Link
					href="https://www.google.com.tw/?hl=zh_TW"
					style={{ textDecoration: 'none' }}
				>
					<Image
						rounded={'lg'}
						height={200}
						width={'full'}
						objectFit={'cover'}
						src={IMAGE}
					></Image>
					<Divider my={2} borderColor="gray.300" />

					{/* 品名、價格 */}
					<Stack align={'center'}>
						<Text
							fontSize={'14px'}
							fontFamily={'body'}
							fontWeight={500}
							noOfLines={2} // 控制顯示的行數
							textOverflow={'ellipsis'} // 控制溢出的顯示方式
							overflow={'hidden'} // 控制溢出的顯示方式
							whiteSpace={'pre-wrap'} // 換行方式
							w={'100%'}
						>
							⭐辦公椅首選⭐辦公椅 電腦椅 椅子 旋轉椅 升降椅 頭枕電腦椅 電腦椅子
							辦公椅子 人體工學椅 書桌椅 職員椅 主管
						</Text>
						<Stack direction={'row'} align={'center'}>
							<Text fontWeight={800} fontSize={'xl'} color={'red.500'}>
								$750
							</Text>
							<Text textDecoration={'line-through'} color={'gray.600'}>
								$1859
							</Text>
						</Stack>
					</Stack>
				</Link>

				{/* 愛心 */}
				<Box position="absolute" bottom="1" left="1">
					<Heart />
				</Box>
			</Box>
		</Center>
	);
}
