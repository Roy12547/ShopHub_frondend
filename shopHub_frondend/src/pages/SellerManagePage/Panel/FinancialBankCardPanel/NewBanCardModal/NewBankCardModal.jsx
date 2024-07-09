import React, { createContext, useEffect, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Box,
	Flex,
	Input,
} from '@chakra-ui/react';
import UserInfoForm from './UserInfoForm';
import AddCardForm from './AddCardForm';
import ConfirmBank from './ConfirmBank';
// import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { saveBankAccount } from '../../../api/bankApi';
import { showSuccess } from '../../../../../utils/apiUtil';
import Cookies from 'js-cookie';
import { getUserInfo } from '../../../api/userInfoApi';
import { useContext } from 'react';

export const UserContext = createContext(null);

const NewBankCardModal = (prop) => {
	const [modalPage, setModalPage] = useState(1);

	const { isOpen, onClose } = prop;
	const queryClient = useQueryClient();
	const userId = Cookies.get('userId');
	const methods = useForm();

	const { data: userInfo, isLoading: userLoading } = useQuery({
		queryKey: ['userInfo'],
		queryFn: () => getUserInfo(userId),
	});

	const {
		reset,
		handleSubmit,
		trigger,
		formState: { errors },
	} = methods;
	const { mutateAsync: saveAccount } = useMutation({
		mutationFn: (data) => saveBankAccount(data),
		onSuccess: () => {
			onClose();
			queryClient.invalidateQueries('bankList');
			showSuccess('儲存成功');
		},
		onError: () => {
			console.error('儲存失敗');
		},
	});

	const onSubmit = async (data) => {
		try {
			await saveAccount({ ...data, sellerId: userId });
		} catch (error) {
			console.error('Failed to save account', error);
		}
	};

	const handleModalPageNext = async () => {
		const isValid = await trigger();
		if (isValid) {
			setModalPage((page) => page + 1);
		}
	};
	const handleModalPagePrev = () => {
		if (modalPage > 1) {
			setModalPage((page) => page - 1);
		}
	};

	const renderFormPage = () => {
		if (modalPage === 1) {
			return <UserInfoForm />;
		} else if (modalPage === 2) {
			return <AddCardForm />;
		} else {
			return <ConfirmBank />;
		}
	};

	useEffect(() => {
		if (!isOpen) {
			setModalPage(1);
			reset();
		}
	}, [isOpen, reset]);

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);
	return (
		<UserContext.Provider value={userInfo}>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<FormProvider {...methods}>
						<form>
							<ModalHeader>
								{modalPage === 1
									? '使用者資訊'
									: modalPage === 2
										? '新增銀行卡帳戶'
										: '確認詳情'}
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>{renderFormPage(userInfo)}</ModalBody>
							<ModalFooter gap={2} justifyContent={'space-between'}>
								<Flex>
									{modalPage > 1 && (
										<Button
											type="button"
											onClick={handleModalPagePrev}
											// backgroundColor="#1A202C"
											colorScheme="gray"
										>
											上一步
										</Button>
									)}
								</Flex>
								<Flex gap={2}>
									<Button type="button" onClick={onClose}>
										取消
									</Button>
									{modalPage === 3 ? (
										<Button
											colorScheme="orange"
											onClick={handleSubmit(onSubmit)}
										>
											儲存
										</Button>
									) : (
										<Button
											type="button"
											onClick={handleModalPageNext}
											colorScheme="orange"
										>
											下一步
										</Button>
									)}
								</Flex>
							</ModalFooter>
						</form>
					</FormProvider>
				</ModalContent>
			</Modal>
		</UserContext.Provider>
	);
};

export default NewBankCardModal;
