import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
} from '@chakra-ui/react';

const ConfirmCancelModal = (prop) => {
	const { onClose, isOpen } = prop;
	return (
		<>
			<Modal
				isCentered
				onClose={onClose}
				isOpen={isOpen}
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>確認</ModalHeader>
					<ModalCloseButton />
					<ModalBody>捨棄變更</ModalBody>
					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onClose}>
							取消
						</Button>
						<Button colorScheme="blue">確認</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ConfirmCancelModal;
