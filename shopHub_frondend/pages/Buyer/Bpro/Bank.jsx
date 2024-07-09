import React, { useState, useEffect } from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	Stack,
	Box,
	FormLabel,
	Input,
	FormControl,
	FormErrorMessage,
	Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import useBankList from '../../../hooks/useBankList';
import bank_list_3 from '../../../constants/bank/bank3.json';

function Bank() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const firstField = React.useRef();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [mainBank, setMainBank] = useState(null);
	let branchBank = useBankList(mainBank);

	const handleMainBankChange = (event) => {
		setMainBank(event.target.value);
	};

	useEffect(() => {
		branchBank = useBankList(mainBank);
	}, [mainBank]);

	const onSubmit = (data) => {
		console.log('Form data:', data);
		onClose();
		reset();
	};

	return (
		<>
			<Button
				leftIcon={<AddIcon />}
				colorScheme="teal"
				variant="solid"
				ml="auto"
				onClick={onOpen}
			>
				新增銀行帳戶
			</Button>

			<Drawer
				onClose={() => {
					onClose();
					reset();
				}}
				isOpen={isOpen}
				size="sm"
				placement="right"
				initialFocusRef={firstField}
				closeOnOverlayClick={false}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">新增銀行帳戶</DrawerHeader>

					<DrawerBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Stack spacing="24px">
								<FormControl isRequired isInvalid={errors.username}>
									<FormLabel htmlFor="username">銀行戶名</FormLabel>
									<Input
										ref={firstField}
										id="username"
										placeholder="戶名"
										maxLength={50}
										{...register('username', {
											required: '必填項目',
											pattern: {
												value: /^[\u4e00-\u9fa5a-zA-Z\s]+$/,
												message: '請輸入有效的戶名',
											},
										})}
									/>
									<FormErrorMessage>
										{errors.username && errors.username.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={errors.id}>
									<FormLabel htmlFor="id">身分證</FormLabel>
									<Input
										id="id"
										placeholder="身分證"
										maxLength={10}
										{...register('id', {
											required: '必填項目',
											pattern: {
												value: /^[A-Z][0-9]{9}$/,
												message: '請輸入有效的身分證號碼',
											},
										})}
									/>
									<FormErrorMessage>
										{errors.id && errors.id.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={errors.birthday}>
									<FormLabel htmlFor="birthday">生日</FormLabel>
									<Input
										id="birthday"
										type="date"
										placeholder="生日"
										{...register('birthday', {
											required: '必填項目',
										})}
									/>
									<FormErrorMessage>
										{errors.birthday && errors.birthday.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={errors.postal}>
									<FormLabel htmlFor="postal">郵遞區號</FormLabel>
									<Input
										id="postal"
										placeholder="郵遞區號"
										maxLength={6}
										{...register('postal', {
											required: '必填項目',
											pattern: {
												value: /^[0-9]{3,6}$/,
												message: '請輸入有效的郵遞區號',
											},
										})}
									/>
									<FormErrorMessage>
										{errors.postal && errors.postal.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={errors.address}>
									<FormLabel htmlFor="address">戶籍地址</FormLabel>
									<Input
										id="address"
										placeholder="戶籍"
										maxLength={50}
										{...register('address', {
											required: '必填項目',
											pattern: {
												value: /^[\u4e00-\u9fa50-9]+$/,
												message: '戶籍地址只能包含中文字符、數字',
											},
										})}
									/>
									<FormErrorMessage>
										{errors.address && errors.address.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={errors.bank}>
									<FormLabel htmlFor="bank">銀行名稱</FormLabel>
									<Select onChange={handleMainBankChange} defaultValue="">
										<option value="" disabled hidden>
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
										{errors.bank && errors.bank.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={errors.branch}>
									<FormLabel htmlFor="branch">分行名稱</FormLabel>
									<Select defaultValue="">
										<option value="" disabled hidden>
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
										{errors.branch && errors.branch.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl isRequired isInvalid={errors.account}>
									<FormLabel htmlFor="account">銀行帳號</FormLabel>
									<Input
										id="account"
										placeholder="銀行帳號"
										maxLength={14}
										{...register('account', {
											required: '必填項目',
											pattern: {
												value: /^[0-9]{10,14}$/,
												message: '請輸入有效的銀行帳號（10到14位數字）',
											},
										})}
									/>
									<FormErrorMessage>
										{errors.account && errors.account.message}
									</FormErrorMessage>
								</FormControl>
							</Stack>

							<DrawerFooter borderTopWidth="1px">
								<Button
									variant="outline"
									mr={3}
									onClick={() => {
										onClose();
										reset();
									}}
								>
									取消
								</Button>
								<Button colorScheme="blue" type="submit">
									確認送出
								</Button>
							</DrawerFooter>
						</form>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default Bank;
