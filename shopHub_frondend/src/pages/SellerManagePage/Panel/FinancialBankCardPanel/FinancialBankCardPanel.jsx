import React from 'react';
import {
	Flex,
	Heading,
	Button,
	useDisclosure,
	Box,
	Card,
	Wrap,
	Text,
} from '@chakra-ui/react';

import NewBankCardModal from './NewBanCardModal/NewBankCardModal';
import { MdAdd } from 'react-icons/md';
import BankCard from './BankCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBankAccounts } from '../../api/bankApi';
import BankInfoModal from './BankInfoModal';
import Loader from '../../components/Loader/Loader';
import FetchError from '../../components/Error/FetchError';
const FinancialBankCardPanel = () => {
	const newBankModal = useDisclosure();
	const bankInfoModal = useDisclosure();

	const {
		isPending,
		error,
		data: banks,
		isFetched,
	} = useQuery({
		queryKey: ['bankList'],
		queryFn: () => getAllBankAccounts(),
	});

	if (isPending) return <Loader />;
	if (error) return <FetchError />;
	return (
		<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
			<Heading size={'md'}>綁定您的銀行帳號</Heading>
			<Wrap width={'100%'} height={'100%'} m={4}>
				<Card
					flexDirection={'column'}
					width={'350px'}
					height={'350px'}
					align={'center'}
					justify={'center'}
					gap={4}
					borderStyle={'dotted'}
					boxShadow={'md'}
					onClick={newBankModal.onOpen}
				>
					<MdAdd size={'2rem'} />
					<Text fontSize={'lg'}>新增銀行帳戶</Text>
				</Card>
				{banks?.data.map((item, i) => (
					<BankCard
						key={i}
						{...item}
						isOpen={bankInfoModal.isOpen}
						onClose={bankInfoModal.onClose}
						onOpen={bankInfoModal.onOpen}
					/>
				))}
			</Wrap>
			{/* <Button onClick={onOpen}>新增銀行帳戶</Button> */}
			<NewBankCardModal
				isOpen={newBankModal.isOpen}
				onClose={newBankModal.onClose}
			/>
		</Box>
	);
};

export default FinancialBankCardPanel;
