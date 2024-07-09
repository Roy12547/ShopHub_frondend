import { useEffect, useState } from 'react';
import {
	Heading,
	Input,
	Select,
	option,
	FormControl,
	FormErrorMessage,
} from '@chakra-ui/react';
import { Flex, Grid, GridItem } from '@chakra-ui/layout';
import bank_list_3 from '../../../../../constants/bank/bank3.json';
import useBankList from '../../../../../hooks/useBankList';
import { useFormContext } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from './NewBankCardModal';

const AddCardForm = () => {
	const userInfo = useContext(UserContext);
	const {
		register,
		setValue,
		getValues,
		formState: { errors },
	} = useFormContext();
	const [mainBank, setMainBank] = useState(getValues('bankCode'));
	const [branchBankState, setBranchBankState] = useState(
		getValues('bankBranch')
	);
	const branchBank = useBankList(mainBank);
	const handleMainBankChange = (event) => {
		const value = event.target.value;
		setMainBank(value);
		setValue('bankCode', value);
	};

	const handleBankBranchChange = (event) => {
		const value = event.target.value;
		setBranchBankState(value);
		setValue('bankBranch', value);
	};
	useEffect(() => {
		setBranchBankState(getValues('bankBranch'));
	}, [mainBank, getValues]);

	return (
		<Flex>
			<Grid
				templateColumns="repeat(7, 1fr)"
				justifyItems="end"
				alignItems={'center'}
				gap={5}
			>
				<GridItem htmlFor="first-name" textAlign="right" colSpan={2}>
					銀行名稱
				</GridItem>
				<GridItem colSpan={5} maxW={'300px'}>
					<FormControl isInvalid={errors.bankCode} isRequired>
						<Select
							id="bankCode"
							{...register('bankCode', { required: '此欄位不能留空' })}
							onChange={handleMainBankChange}
						>
							<option value="" selected disabled hidden>
								請選擇銀行
							</option>
							{bank_list_3.map((item) => (
								<option key={item['Value']} value={item['Value']}>
									{item['Value']} &nbsp;
									{item['Key']}
								</option>
							))}
						</Select>
						<FormErrorMessage>
							{errors.bankCode && errors.bankCode.message}
						</FormErrorMessage>
					</FormControl>
				</GridItem>
				<GridItem htmlFor="first-name" textAlign="right" colSpan={2}>
					分行名稱
				</GridItem>
				<GridItem colSpan={5} width={'100%'}>
					<FormControl isInvalid={errors.bankBranch} isRequired>
						<Select
							id="bankBranch"
							{...register('bankBranch', { required: '此欄位不能留空' })}
							onChange={handleBankBranchChange}
							defaultValue={''}
						>
							<option value="" selected disabled hidden>
								請選擇分行
							</option>
							{branchBank.map((item) => (
								<option key={item['Value']} value={item['Value']}>
									{item['Value']} &nbsp;
									{item['Key']}
								</option>
							))}
						</Select>
						<FormErrorMessage>
							{errors.bankBranch && errors.bankBranch.message}
						</FormErrorMessage>
					</FormControl>
				</GridItem>
				<GridItem htmlFor="account-name" textAlign="right" colSpan={2}>
					銀行戶名
				</GridItem>
				<GridItem colSpan={5} width={'100%'}>
					<Input
						type="text"
						name="name"
						id="account-name"
						value={userInfo.data.userName}
						isDisabled
						backgroundColor={'#B7B7B7'}
					/>
				</GridItem>
				<GridItem htmlFor="account-number" textAlign="right" colSpan={2}>
					銀行帳戶
				</GridItem>
				<GridItem colSpan={5} width={'100%'}>
					<FormControl isInvalid={errors.accountNumber} isRequired>
						<Input
							type="number"
							name="name"
							id="accountNumber"
							{...register('accountNumber', { required: '此欄位不能留空' })}
							onChange={(e) => e.target.value}
							placeholder="請輸入"
						/>
					</FormControl>
					<FormErrorMessage>
						{errors.accountNumber && errors.accountNumber.message}
					</FormErrorMessage>
				</GridItem>
			</Grid>
		</Flex>
	);
};

export default AddCardForm;
