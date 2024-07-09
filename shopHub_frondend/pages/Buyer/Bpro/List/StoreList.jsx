// StoreList.js
import React, { useState } from 'react';
import {
	Flex,
	Text,
	Badge,
	Button,
	useDisclosure,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogCloseButton,
	AlertDialogBody,
	AlertDialogFooter,
	Box,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const StoreList = ({ cards, onDeleteCard }) => {
	const [deleteIndex, setDeleteIndex] = useState(null);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();

	const confirmDelete = () => {
		if (deleteIndex !== null) {
			const cardToDelete = cards[deleteIndex];
			// 傳遞 index 和 shipId 給父層
			onDeleteCard(deleteIndex, cardToDelete.shipId);
			setDeleteIndex(null);
			onClose();
		}
	};

	return (
		<>
			{cards.map((card, index) => (
				<Flex
					key={index}
					h={'auto'}
					alignItems="center"
					p={'6px'}
					borderTop={index !== 0 ? '1px' : 'none'}
				>
					<Flex flex="1" alignItems="center">
						<Box>
							<Text fontSize={'15px'}>
								{card.name} | {card.phone}
							</Text>
							<Text fontSize={'13px'}>{card.store}</Text>
							<Text
								fontSize={'13px'}
								whiteSpace="normal"
								overflowWrap="break-word"
							>
								{card.address}
							</Text>
						</Box>
					</Flex>
					<Flex flex="1" justifyContent="center">
						<Badge
							colorScheme="purple"
							display="inline-flex"
							alignItems="center"
							ml={'100px'}
						>
							{card.delivery}
						</Badge>
					</Flex>
					<Flex flex="1" justifyContent="flex-end">
						<Button
							colorScheme="teal"
							size="sm"
							variant="outline"
							mr={2}
							onClick={() => {
								setDeleteIndex(index);
								onOpen();
							}}
						>
							刪除
						</Button>
						<AlertDialog
							motionPreset="slideInBottom"
							leastDestructiveRef={cancelRef}
							onClose={onClose}
							isOpen={isOpen}
							isCentered
						>
							<AlertDialogOverlay sx={{ bg: 'rgba(0, 0, 0, 0.3)' }} />

							<AlertDialogContent>
								<AlertDialogHeader>刪除資料</AlertDialogHeader>
								<AlertDialogCloseButton />
								<AlertDialogBody>您確定要刪除此資料嗎？</AlertDialogBody>
								<AlertDialogFooter>
									<Button ref={cancelRef} onClick={onClose}>
										取消
									</Button>
									<Button colorScheme="red" ml={3} onClick={confirmDelete}>
										確定
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</Flex>
				</Flex>
			))}
		</>
	);
};

// PropTypes 驗證
StoreList.propTypes = {
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			shipId: PropTypes.number.isRequired, // 確保 shipId 是必須的
			name: PropTypes.string.isRequired,
			phone: PropTypes.string.isRequired,
			store: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired,
			delivery: PropTypes.string.isRequired,
		})
	).isRequired,
	onDeleteCard: PropTypes.func.isRequired,
};

export default StoreList;
