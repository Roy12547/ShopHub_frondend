import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Checkbox, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL, showErrorNoText } from '../../../utils/apiUtil';

function Notify() {
	const [notifications, setNotifications] = useState({
		mailNoti: false,
		orderNoti: false,
		discountNoti: false,
	});

	const toast = useToast();
	const userId = Cookies.get('userId');

	useEffect(() => {
		axios
			.get(`${BASE_URL}/user/getNotification/${userId}`)
			.then((response) => {
				if (response.status === 200) {
					setNotifications({
						mailNoti: response.data.mailNoti,
						orderNoti: response.data.orderNoti,
						discountNoti: response.data.discountNoti,
					});
				}
			})
			.catch((error) => {
				console.error('失敗', error);
			});
	}, [userId, toast]);

	const handleNotificationChange = (field) => async (e) => {
		const enabled = e.target.checked;
		try {
			const response = await axios.put(
				`${BASE_URL}/user/toggleNotification`,
				null,
				{
					params: {
						userId: userId,
						field: field,
					},
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.status === 200) {
				setNotifications((prevState) => ({
					...prevState,
					[field]: enabled,
				}));
			} else {
				throw new Error('失敗');
			}
		} catch (error) {
			showErrorNoText('設定失敗');
		}
	};

	return (
		<Flex direction="column" alignItems="center">
			<Box
				w={{ base: '100%', md: '700px' }}
				h={{ base: '476px', md: '70px' }}
				border="1px"
				borderColor="lightgray"
				p="10"
				bg="gray.50"
				boxShadow="lg"
				rounded="10px"
				mb="5"
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Text fontSize="20px">Mail通知</Text>
				<Checkbox
					size="lg"
					colorScheme="orange"
					isChecked={notifications.mailNoti}
					onChange={handleNotificationChange('mailNoti')}
				></Checkbox>
			</Box>
			<Box
				w={{ base: '100%', md: '700px' }}
				h={{ base: '476px', md: '70px' }}
				border="1px"
				borderColor="lightgray"
				p="10"
				bg="gray.50"
				boxShadow="lg"
				rounded="10px"
				mb="5"
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Text fontSize="20px">訂單更新通知</Text>
				<Checkbox
					size="lg"
					colorScheme="orange"
					isChecked={notifications.orderNoti}
					onChange={handleNotificationChange('orderNoti')}
				></Checkbox>
			</Box>
			<Box
				w={{ base: '100%', md: '700px' }}
				h={{ base: '476px', md: '70px' }}
				border="1px"
				borderColor="lightgray"
				p="10"
				bg="gray.50"
				boxShadow="lg"
				rounded="10px"
				mb="5"
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Text fontSize="20px">最新消息和優惠</Text>
				<Checkbox
					size="lg"
					colorScheme="orange"
					isChecked={notifications.discountNoti}
					onChange={handleNotificationChange('discountNoti')}
				></Checkbox>
			</Box>
		</Flex>
	);
}

export default Notify;
