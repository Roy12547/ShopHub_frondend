import { Box, Flex } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import React from 'react';
import bank3 from '../../../../constants/bank/bank3.json';
import { Modal, useDisclosure } from '@chakra-ui/react';
import BankInfoModal from './BankInfoModal';
import {
	findBankByCode,
	maskAccountNumber,
	maskBankName,
} from '../../utils/utils';

const BankCard = (prop) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<Box width={'350px'} height={'350px'} boxShadow={'md'} onClick={onOpen}>
			<Flex
				width={'100%'}
				height={'100%'}
				flexDirection={'column'}
				gap={'3rem'}
			>
				<Box
					backgroundImage={'http://54.199.192.205/shopHub/bank/banner.jpg'}
					width={'100%'}
					height={'30%'}
					position={'relative'}
				>
					<Text
						position={'absolute'}
						left={'10%'}
						bottom={'20%'}
						fontSize={'2xl'}
						color={'white'}
						fontWeight={500}
						letterSpacing={'0.2rem'}
					>
						{findBankByCode(prop?.bankCode, bank3)}
					</Text>
				</Box>
				<Flex flexDirection={'column'} gap={4} p={5}>
					<Text fontSize={'1.5rem'}>
						{maskAccountNumber(prop?.accountNumber)}
					</Text>
					<Text fontSize={'1.2rem'}>{maskBankName(prop?.accountName)}</Text>
				</Flex>
			</Flex>
			<BankInfoModal onClose={onClose} isOpen={isOpen} prop={prop} />
		</Box>
	);
};

export default BankCard;
