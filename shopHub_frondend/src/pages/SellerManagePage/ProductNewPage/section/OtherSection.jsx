import React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Heading, HStack, Select, Text } from '@chakra-ui/react';
import { Radio, RadioGroup, Stack, VStack, Input, Box } from '@chakra-ui/react';

const OtherSection = () => {
	const [value, setValue] = React.useState('1');
	return (
		<Flex
			id="other"
			p={4}
			flexDirection={'column'}
			backgroundColor={'#fff'}
			m={5}
			borderRadius={'10px'}
			boxShadow="xl"
		>
			<Text
				fontSize={'1.2rem'}
				fontWeight={500}
				backgroundColor={'#4cb4f559'}
				width={'fit-content'}
				py={2}
				px={4}
				color={'#000'}
				borderRadius={'50px'}
				letterSpacing={1}
			>
				其他
			</Text>
			<Flex
				width={'80%'}
				flexDirection={'column'}
				margin={'2rem auto'}
				gap={10}
			>
				<HStack alignItems={'start'} gap={4}>
					<Text width={'100px'}>較長備貨</Text>
					<RadioGroup onChange={setValue} value={value}>
						<Stack direction="row" spacing={4}>
							<Radio value="1">否</Radio>
							<Radio value="2">是</Radio>
						</Stack>
						{value === '2' && (
							<Flex mt={'10px'} alignItems={'center'}>
								我需要&nbsp;
								<Input width={'10%'} border={'1px solid gray'} />
								&nbsp; 個出貨天數(您可以設定 3 至 20天)
							</Flex>
						)}
					</RadioGroup>
				</HStack>
				<HStack alignItems={'center'} gap={4}>
					<Text width={'120px'}> 商品保存狀況</Text>
					<Select width={'100px'} border={'1px solid gray'}>
						<option>全新</option>
						<option>二手</option>
					</Select>
				</HStack>
			</Flex>
		</Flex>
	);
};

export default OtherSection;
