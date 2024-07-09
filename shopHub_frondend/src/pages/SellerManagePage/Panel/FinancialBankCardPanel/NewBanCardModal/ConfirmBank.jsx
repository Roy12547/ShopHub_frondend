import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { findBankByCode, maskBankName } from '../../../utils/utils';
import bank3 from '../../../../../constants/bank/bank3.json';
import bank7 from '../../../../../constants/bank/bank7.json';
import {
	Grid,
	GridItem,
	Flex,
	HStack,
	VStack,
	Text,
	Heading,
} from '@chakra-ui/layout';
import { formatDate } from '../../../utils/utils';
import { UserContext } from './NewBankCardModal';

// const userInfo = {
// 	name: '王小明',
// 	idCode: 'L223456789',
// 	birthday: '19990101',
// 	address: { addr_1: '宜蘭縣', addr_2: '五結鄉', addr_3: '東西路15號' },
// };

// const bankInfo = {
// 	bank: '臺灣銀行',
// 	bankBranch: '台中分行',
// 	bankName: '王小明',
// 	bankNum: '234232322323',
// };

const ConfirmBank = () => {
	const { getValues } = useFormContext();
	const values = getValues();
	const userInfo = useContext(UserContext);
	return (
		<Grid
			templateColumns="repeat(2, 1fr)"
			justifyItems="start"
			alignItems={'center'}
			gap={5}
		>
			<GridItem>
				<Flex flexDirection={'column'} gap={4}>
					<VStack alignItems={'start'}>
						<Heading as={'h6'} size={'sm'}>
							真實姓名
						</Heading>
						<Text>{userInfo.data.userName}</Text>
					</VStack>
					<VStack alignItems={'start'}>
						<Heading as={'h6'} size={'sm'}>
							身分證字號
						</Heading>
						<Text>{userInfo.data.idNum}</Text>
					</VStack>
					<VStack alignItems={'start'}>
						<Heading as={'h6'} size={'sm'}>
							生日
						</Heading>
						<Text>{formatDate(userInfo.data.birthday)}</Text>
					</VStack>
					<VStack alignItems={'start'}>
						<Heading as={'h6'} size={'sm'}>
							戶籍地址
						</Heading>
						<Text>{values.city + values.district + values.address}</Text>
					</VStack>
				</Flex>
			</GridItem>
			<GridItem>
				<Flex flexDirection={'column'} gap={4}>
					<VStack alignItems={'start'}>
						<Heading as={'h6'} size={'sm'}>
							銀行名稱
						</Heading>
						<Text>{findBankByCode(values.bankCode?.toString(), bank3)}</Text>
					</VStack>
					<VStack alignItems={'start'}>
						<Heading as={'h6'} size={'sm'}>
							分行名稱
						</Heading>
						<Text>{findBankByCode(values.bankBranch?.toString(), bank7)}</Text>
					</VStack>
					<VStack alignItems={'start'}>
						<Heading as={'h6'} size={'sm'}>
							銀行戶名
						</Heading>
						<Text>{maskBankName(values.bankBranch)}</Text>
					</VStack>
					<VStack alignItems={'start'}>
						<Heading as={'h6'} size={'sm'}>
							銀行帳號
						</Heading>
						<Text>{values.accountNumber}</Text>
					</VStack>
				</Flex>
			</GridItem>
		</Grid>
	);
};

export default ConfirmBank;
