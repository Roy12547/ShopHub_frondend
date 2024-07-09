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
	Image,
} from '@chakra-ui/react';

const ProductDetail = (data) => {
	return data.data.data.map((item, i) => (
		<Flex
			bg="white"
			p={4}
			borderRadius="md"
			border="1px solid #E2E8F0"
			mt={4}
			direction="column"
			boxShadow={'lg'}
			key={i}
		>
			<Flex
				mb={2}
				py={4}
				width={'100%'}
				flexDirection={'row'}
				align={'center'}
				justify={'space-between'}
			>
				<Flex flexBasis={'200px'} flexDirection={'row'}>
					<Image
						boxSize="50px"
						src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Product"
						mr={2}
					/>
					<Flex
						direction="column"
						flex="1"
						justify="center"
						flexBasis={'200px'}
					>
						<Text fontSize="sm">蝦小編愛用款 | 上衣</Text>
						<Text fontSize="sm">規格: red</Text>
					</Flex>
				</Flex>
				<Text fontSize="1rem" flexBasis={'200px'}>
					180
				</Text>
				<Text fontSize="1rem" flexBasis={'200px'}>
					NT$ {`${item.price}`}
				</Text>
				<Text fontSize="1rem" flexBasis={'200px'}>
					{`${item.stock}`}
				</Text>

				<Flex
					fontSize="sm"
					flexDirection={'row'}
					gap={2}
					align="center"
					justifyContent={'start'}
					position="relative"
					flexBasis={'200px'}
				>
					<Button colorScheme="blue" size="md">
						編輯
					</Button>
					<Button colorScheme="red" size="md">
						刪除
					</Button>
				</Flex>
			</Flex>
		</Flex>
	));
};

export default ProductDetail;
