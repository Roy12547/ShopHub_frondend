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

const AddressList = () => {
	const [deleteIndex, setDeleteIndex] = useState(null);

	const deleteCard = () => {
		if (deleteIndex !== null) {
			let newCards = cards.filter((_, idx) => idx !== deleteIndex);
			if (newCards.length > 0 && cards[deleteIndex].isDefault) {
				newCards[0].isDefault = true;
			}
			setCards(newCards);
			onClose();
		}
	};

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();

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
							<Text
								fontSize={'13px'}
								whiteSpace="normal"
								overflowWrap="break-word"
							>
								{card.address}
							</Text>
						</Box>
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
							<AlertDialogOverlay />

							<AlertDialogContent>
								<AlertDialogHeader>刪除資料</AlertDialogHeader>
								<AlertDialogCloseButton />
								<AlertDialogBody>您確定要刪除此資料嗎？</AlertDialogBody>
								<AlertDialogFooter>
									<Button ref={cancelRef} onClick={onClose}>
										取消
									</Button>
									<Button colorScheme="red" ml={3} onClick={deleteCard}>
										確定
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>

						<Button colorScheme="teal" size="sm">
							編輯
						</Button>
					</Flex>
				</Flex>
			))}
		</>
	);
};

export default AddressList;
