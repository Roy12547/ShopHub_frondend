import React from 'react';
import { Flex, VStack } from '@chakra-ui/layout';
import { Heading, HStack, Text, Input } from '@chakra-ui/react';
import { LiaTimesSolid } from 'react-icons/lia';
import {
	Switch,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
} from '@chakra-ui/react';

const ShipSection = () => {
	return (
		<Flex
			id="shipAmount"
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
				運費
			</Text>
			<Flex width={'80%'} flexDirection={'column'} margin={'2rem auto'} gap={8}>
				<HStack alignItems={'center'} gap={4}>
					<Text width={'100px'}>重量</Text>
					<InputGroup>
						<Input width={'80px'} border={'1px solid gray'} />
						<InputRightAddon>kg</InputRightAddon>
					</InputGroup>
				</HStack>
				<HStack gap={4}>
					<Text width={'100px'}>包裹尺寸大小</Text>

					<Input width={'120px'} placeholder="cm" border={'1px solid gray'} />
					<LiaTimesSolid />
					<Input width={'120px'} placeholder="cm" border={'1px solid gray'} />
					<LiaTimesSolid />
					<Input width={'120px'} placeholder="cm" border={'1px solid gray'} />
				</HStack>
				<HStack alignItems={'center'} gap={4}>
					<Text width={'120px'}>買家支付運費</Text>
					<VStack
						width={'100%'}
						border={'1px solid gray'}
						padding={5}
						borderRadius={'5px'}
					>
						<Flex flexDirection={'row'} justify={'space-between'} w={'100%'}>
							<Text>7-ELEVEN</Text>
							<Flex gap={4}>
								<Text>NT$60</Text>
								<Switch size={'lg'} colorScheme={'green'} />
							</Flex>
						</Flex>
					</VStack>
				</HStack>
			</Flex>
		</Flex>
	);
};

export default ShipSection;
