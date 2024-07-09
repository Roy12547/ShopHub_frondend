import { Flex, Grid, GridItem } from '@chakra-ui/layout';
import {
	Input,
	textAlign,
	Text,
	InputLeftElement,
	InputGroup,
	Select,
	FormControl,
	FormLabel,
	FormErrorMessage,
	x,
} from '@chakra-ui/react';
import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { AddressSelect } from './AddressSelect';
import useBankList from '../../../../../hooks/useBankList';
import { useFormContext } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from './NewBankCardModal';
import { formatDate } from '../../../utils/utils';
const UserInfoForm = () => {
	const userInfo = useContext(UserContext);
	console.log(userInfo.data);

	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<Flex flexDirection={'column'}>
			<Grid
				templateColumns="repeat(7, 1fr)"
				justifyItems="end"
				alignItems={'center'}
				gap={5}
			>
				<GridItem htmlFor="first-name" textAlign="right" colSpan={3}>
					真實姓名
				</GridItem>
				<GridItem colSpan={4} maxW={'300px'}>
					<Input
						type="text"
						name="name"
						id="first-name"
						value={userInfo.data.userName}
						isDisabled
						backgroundColor={'#B7B7B7'}
					/>
				</GridItem>
				<GridItem htmlFor="first-name" textAlign="right" colSpan={3}>
					身分證字號
				</GridItem>
				<GridItem colSpan={4} maxW={'300px'}>
					<Input
						type="text"
						name="name"
						id="first-name"
						value={userInfo.data.idNum}
						isDisabled
						backgroundColor={'#B7B7B7'}
					/>
				</GridItem>
				<GridItem htmlFor="first-name" textAlign="right" colSpan={3}>
					生日
				</GridItem>
				<GridItem colSpan={4}>
					<InputGroup>
						{/* <InputLeftElement pointerEvents="none">
							<CiCalendarDate />
						</InputLeftElement> */}
						<Input
							type="text"
							name="name"
							id="first-name"
							value={formatDate(userInfo.data.birthday)}
							isDisabled
							backgroundColor={'#B7B7B7'}
						/>
					</InputGroup>
				</GridItem>
				<GridItem htmlFor="first-name" textAlign="right" colSpan={3}>
					戶籍地址
				</GridItem>
				<GridItem colSpan={4} width={'100%'}>
					<AddressSelect />
				</GridItem>
				<GridItem htmlFor="address" textAlign="right" colSpan={3}></GridItem>
				<GridItem colSpan={4}>
					<FormControl isInvalid={errors.address} isRequired>
						<Input
							type="text"
							name="address"
							id="address"
							placeholder="請填入詳細地址"
							{...register('address', { required: '此欄位不能留空' })}
						/>
						<FormErrorMessage>
							{errors.address && errors.address.message}
						</FormErrorMessage>
					</FormControl>
				</GridItem>
			</Grid>
		</Flex>
	);
};

export default UserInfoForm;
