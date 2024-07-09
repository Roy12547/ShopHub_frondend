import React, { useEffect } from 'react';
import { Flex, Heading, Box, Text, Grid } from '@chakra-ui/layout';
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import styled from 'styled-components';
import {
	findBankByCode,
	maskAccountNumber,
	maskBankName,
	formatDate,
	findBankBranchByCode,
} from '../../utils/utils';
import bank3 from '../../../../constants/bank/bank3.json';
import bank7 from '../../../../constants/bank/bank7.json';

export const StyledBankInfoModal = styled.div`
	.title {
		color: gray;
		font-size: 0.8rem;
	}
	.info {
		color: #000;
		font-size: 1rem;
		margin-bottom: 1rem;
	}
`;
const BankInfoModal = (prop) => {
	const { isOpen, onClose } = prop;
	console.log(prop);

	useEffect(() => {}, [prop]);
	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered size={'xl'}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader p={4}>銀行帳號</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<StyledBankInfoModal>
						<Flex flexDirection={'column'} gap={4} p={5}>
							<Heading fontSize={'lg'}>銀行帳戶</Heading>

							<Grid gridTemplateColumns="1fr 1fr" gap={4}>
								<Flex flexDirection={'column'} gap={4}>
									<Heading fontSize={'md'} mb={4} color="gray">
										使用者資訊
									</Heading>
									<Text className="title">真實姓名</Text>
									<div className="info">{prop.prop?.accountName}</div>
									{/* - */}
									<Text className="title">身分證字號</Text>
									<div className="info">{prop.prop?.idNum}</div>
									{/* - */}
									<Text className="title">生日</Text>
									<div className="info">{formatDate(prop.prop?.birthday)}</div>
									{/* - */}
									<Text className="title">戶籍地址</Text>
									<div className="info">
										{prop.prop?.householdCounty +
											prop.prop?.householdArea +
											prop.prop?.householdAddress}
									</div>
								</Flex>
								<Flex flexDirection={'column'} gap={4}>
									<Heading fontSize={'md'} mb={4} color="gray">
										銀行帳戶資訊
									</Heading>
									<Text className="title">銀行名稱</Text>
									<div className="info">
										{findBankByCode(prop.prop?.bankCode, bank3)}
									</div>
									{/* - */}
									<Text className="title">分行名稱</Text>
									<div className="info">
										{findBankBranchByCode(prop.prop?.bankBranch, bank7)}
									</div>
									{/* - */}
									<Text className="title">銀行戶名</Text>
									<div className="info">
										{maskBankName(prop.prop?.accountName)}
									</div>
									{/* - */}
									<Text className="title">銀行帳號</Text>
									<div className="info">
										{maskBankName(prop.prop?.accountNumber)}
									</div>
								</Flex>
							</Grid>
						</Flex>
					</StyledBankInfoModal>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default BankInfoModal;
