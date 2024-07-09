// 刪除帳號按鈕
import React from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
	useDisclosure,
	Button,
	ListItem,
	UnorderedList,
} from '@chakra-ui/react';

function Account() {
	const {
		isOpen: isFirstOpen,
		onOpen: onFirstOpen,
		onClose: onFirstClose,
	} = useDisclosure();
	const {
		isOpen: isSecondOpen,
		onOpen: onSecondOpen,
		onClose: onSecondClose,
	} = useDisclosure();
	const cancelRef = React.useRef();

	const handleFirstConfirm = () => {
		onFirstClose();
		onSecondOpen();
	};

	return (
		<>
			<Button onClick={onFirstOpen} colorScheme="red">
				申請刪除帳號
			</Button>

			{/* 第一個對話框 */}
			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef}
				onClose={onFirstClose}
				isOpen={isFirstOpen}
				isCentered
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>重要告知！</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						<UnorderedList>
							<ListItem>
								成功刪除帳號後，將無法登入已被刪除的帳戶及查看先前帳戶歷史紀錄。
							</ListItem>
							<ListItem>
								成功刪除帳號後，shopHub將繼續保留交易數據用於財務稽核目的。
							</ListItem>
							<ListItem>
								完成申請將視為你已自行確認帳戶中無待處理的買賣交易。
							</ListItem>
							<ListItem>
								確定要刪除帳號嗎？一旦成功刪除之後，無法再復原喔！
							</ListItem>
						</UnorderedList>
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onFirstClose}>
							取消
						</Button>
						<Button colorScheme="red" ml={3} onClick={handleFirstConfirm}>
							確認
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* 第二個對話框 */}
			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef}
				onClose={onSecondClose}
				isOpen={isSecondOpen}
				isCentered
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>確定刪除</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						一旦刪除帳號，您的帳號將被登出，並無法再登入此帳號
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onSecondClose}>
							取消
						</Button>
						<Button colorScheme="red" ml={3}>
							確認
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

export default Account;
