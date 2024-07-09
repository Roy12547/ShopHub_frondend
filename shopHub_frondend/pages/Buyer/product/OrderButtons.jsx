import React, { useState } from 'react';
import {
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Textarea,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL, showSuccess, showErrorNoText } from '../../../utils/apiUtil';
import Cookies from 'js-cookie';

const StarRating = ({ rating, setRating }) => {
	const stars = Array(5).fill(0);

	const handleClick = (value) => {
		setRating(value);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			{stars.map((_, index) => {
				const ratingValue = index + 1;
				return (
					<FaStar
						key={index}
						size={24}
						style={{ marginRight: 10, cursor: 'pointer' }}
						color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
						onClick={() => handleClick(ratingValue)}
					/>
				);
			})}
		</div>
	);
};

StarRating.propTypes = {
	rating: PropTypes.number.isRequired,
	setRating: PropTypes.func.isRequired,
};
//調用從buyerorder傳來的props
const OrderButtons = ({
	orderID,
	orderDetail,
	onCancelOrder,
	onOrderRating,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();

	const {
		isOpen: isCompleteOpen,
		onOpen: onCompleteOpen,
		onClose: onCompleteClose,
	} = useDisclosure();
	const {
		isOpen: isReviewOpen,
		onOpen: onReviewOpen,
		onClose: onReviewClose,
	} = useDisclosure();

	const navigate = useNavigate();
	const [isCompleteOrder, setIsCompleteOrder] = useState(false);
	const [isReviewed, setIsReviewed] = useState(false);
	const [productRating, setProductRating] = useState(0);
	const [sellerRating, setSellerRating] = useState(0);
	const [shippingRating, setShippingRating] = useState(0);
	const [value, setValue] = useState('');
	const userId = Cookies.get('userId');

	const handleCompleteOrder = () => {
		setIsCompleteOrder(true);
		onOrderRating(orderID);
		onCompleteClose();
	};

	const handleReview = async () => {
		if (productRating === 0 || sellerRating === 0 || shippingRating === 0) {
			alert('所有的星級評分都是必填的！');
			return;
		}

		const ratingData = {
			ecpayId: orderID,
			buyerId: parseInt(userId, 10),
			productRating: productRating,
			sellerRating: sellerRating,
			shippingRating: shippingRating,
			comment: value,
		};

		try {
			const reaponse = await axios.post(
				`${BASE_URL}/rating/create`,
				ratingData
			);
			showSuccess('評價提交成功');
			setIsReviewed(true);
			onReviewClose();
		} catch (error) {
			showErrorNoText('評價提交失敗');
		}
	};

	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		const sanitizedValue = inputValue.replace(/<script.*?>.*?<\/script>/gi, '');
		setValue(sanitizedValue);
	};

	const handleCancelOrder = () => {
		onCancelOrder(orderID);
		onClose();
	};


	
	return (
		<>
			{orderDetail.some((detail) => detail.status === '待出貨') && (
				<>
					<Button onClick={onOpen} m="2px" size="sm">
						取消訂單
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
							<AlertDialogHeader>是否取消訂單？</AlertDialogHeader>
							<AlertDialogCloseButton />
							<AlertDialogBody>
								確定要取消訂單嗎？還是需要再考慮一下呢？
							</AlertDialogBody>
							<AlertDialogFooter>
								<Button ref={cancelRef} onClick={onClose}>
									我再想想
								</Button>
								<Button colorScheme="red" ml={3} onClick={handleCancelOrder}>
									確定
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</>
			)}
			{orderDetail.some((detail) => detail.status === '已完成') && (
				<>
					<Button
						onClick={onCompleteOpen}
						m="2px"
						size="sm"
						isDisabled={isCompleteOrder || isReviewed}
					>
						完成訂單
					</Button>
					<AlertDialog
						motionPreset="slideInBottom"
						leastDestructiveRef={cancelRef}
						onClose={onCompleteClose}
						isOpen={isCompleteOpen}
						isCentered
					>
						<AlertDialogOverlay />
						<AlertDialogContent>
							<AlertDialogHeader>是否完成訂單？</AlertDialogHeader>
							<AlertDialogCloseButton />
							<AlertDialogBody>
								點選完成訂單之前，請務必檢查所收到的商品是否正確無誤(無退貨/退款需求)。
							</AlertDialogBody>
							<AlertDialogFooter>
								<Button ref={cancelRef} onClick={onCompleteClose}>
									取消
								</Button>
								<Button colorScheme="red" ml={3} onClick={handleCompleteOrder}>
									確定
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<Button
						onClick={onReviewOpen}
						m="2px"
						size="sm"
						isDisabled={!isCompleteOrder || isReviewed}
					>
						給予評價
					</Button>
					<Modal
						isCentered
						onClose={onReviewClose}
						isOpen={isReviewOpen}
						motionPreset="slideInBottom"
					>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>評價此商品</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<div>
									<h2>商品品質(5星為最滿意)</h2>
									<StarRating
										rating={productRating}
										setRating={setProductRating}
									/>
								</div>
								<div>
									<h2>賣家服務</h2>
									<StarRating
										rating={sellerRating}
										setRating={setSellerRating}
									/>
								</div>
								<div>
									<h2>物流服務</h2>
									<StarRating
										rating={shippingRating}
										setRating={setShippingRating}
									/>
								</div>
								<div>
									<Textarea
										value={value}
										onChange={handleInputChange}
										placeholder="分享更多關於此商品之評價以幫助其他買家"
										size="md"
										resize="none"
										height="150px"
										mt={'10px'}
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button colorScheme="red" mr={3} onClick={onReviewClose}>
									取消
								</Button>
								<Button colorScheme="blue" onClick={handleReview}>
									完成
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>

					<Button
						m="2px"
						size="sm"
						onClick={() => navigate('/return')}
						isDisabled={isCompleteOrder || isReviewed}
					>
						退換貨
					</Button>
				</>
			)}
		</>
	);
};

OrderButtons.propTypes = {
	orderID: PropTypes.string.isRequired,
	orderDetail: PropTypes.arrayOf(
		PropTypes.shape({
			productName: PropTypes.string.isRequired,
			spec: PropTypes.shape({
				specName: PropTypes.string.isRequired,
				specChoose: PropTypes.string.isRequired,
			}).isRequired,
			productImage: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired,
			status: PropTypes.string.isRequired,
			ship: PropTypes.string.isRequired,
		})
	).isRequired,
	onCancelOrder: PropTypes.func.isRequired,
};

export default OrderButtons;
