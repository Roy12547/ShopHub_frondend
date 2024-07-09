import React, { useEffect, useState } from 'react';
import { Box, Stack, Flex, Divider } from '@chakra-ui/layout';
import {
	Text,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	Badge,
} from '@chakra-ui/react';
import { LinkTabs_Left } from './LinkTabs';
import { NavLink } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IsLogin } from './IsLogin';
import { NotLogin } from './NotLogin';
import OpenMess from './OpenMess';
import Cookies from 'js-cookie';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { BASE_URL } from '../../../utils/apiUtil';
import { getMessAPI, updateMessStatusAPI } from '../../../api/backAPI';

const HomTabs = () => {
	const [myphoto, setMyphoto] = useState();
	const [isLogin, setIsLogin] = useState(false);
	const id_token = Cookies.get('id_token');
	const userId = Cookies.get('userId');
	const [messages, setMessages] = useState([]);
	const [unreadCount, setUnreadCount] = useState(0);

	useEffect(() => {
		if (id_token !== undefined) {
			setIsLogin(true);
			setMyphoto(Cookies.get('photo'));
			const storedMessages = localStorage.getItem('messages');
			if (storedMessages) {
				setMessages(JSON.parse(storedMessages));
				updateUnreadCount(JSON.parse(storedMessages));
			} else {
				fetchData();
			}
		} else {
		}
	}, [userId]);

	useEffect(() => {
		// const socket = new SockJS(`${BASE_URL}/ws`);
		// const stompClient = Stomp.over(socket);
		// stompClient.connect({}, (frame) => {
		// 	stompClient.subscribe('/topic/messages', (message) => {
		// 		const newMessage = JSON.parse(message.body);
		// 		setMessages((prevMessages) => {
		// 			const updatedMessages = [...prevMessages, newMessage];
		// 			localStorage.setItem('messages', JSON.stringify(updatedMessages));
		// 			updateUnreadCount(updatedMessages);
		// 			return updatedMessages;
		// 		});
		// 		setUnreadCount((prevCount) => prevCount + 1);
		// 	});
		// });
		// return () => {
		// 	if (stompClient) {
		// 		stompClient.disconnect();
		// 	}
		// };
	}, []);
	const updateUnreadCount = (messages) => {
		const count = messages.reduce((acc, message) => {
			return acc + (message.isRead === 0 ? 1 : 0);
		}, 0);
		setUnreadCount(count);
	};
	const fetchData = async () => {
		// const res = await getMessAPI(userId);
		// setMessages(res.data);
		// localStorage.setItem('messages', JSON.stringify(res.data));
		// updateUnreadCount(res.data);
	};

	const handlePopoverOpen = async () => {
		if (unreadCount > 0) {
			setUnreadCount(0);
			if (userId !== undefined) {
				updateMessStatusAPI(userId);
			}

			const updatedMessages = messages.map((message) => ({
				...message,
				isRead: 1,
			}));
			setMessages(updatedMessages);
			localStorage.setItem('messages', JSON.stringify(updatedMessages));
		}
	};

	return (
		<Box>
			<Flex
				minH={'34px'}
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				align={'center'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				justify={'space-between'}
			>
				<Stack direction={'row'} spacing={4}>
					{LinkTabs_Left.map((item) => (
						<NavLink to={item.href} key={item.link_name}>
							<Text color={'#fff'}>{item.link_name}</Text>
						</NavLink>
					))}
					<NavLink></NavLink>
				</Stack>
				<Flex align={'center'} color={'#fff'} gap={5}>
					<Stack spacing={1} direction={'row'} align={'center'}>
						<Popover trigger="hover" onOpen={handlePopoverOpen}>
							<PopoverTrigger>
								<Stack spacing={1} direction={'row'} align={'center'}>
									<GrNotification />
									<Text>最新消息</Text>
									{unreadCount > 0 && (
										<Badge colorScheme="red" ml={2}>
											{unreadCount}
										</Badge>
									)}
								</Stack>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverHeader color="#C0C0C0">最近收到的訊息</PopoverHeader>
								<PopoverBody>
									<OpenMess messages={messages} />
								</PopoverBody>
							</PopoverContent>
						</Popover>
					</Stack>
					<Stack spacing={1} direction={'row'} align={'center'}>
						<AiOutlineQuestionCircle />
						<Text>幫助中心</Text>
					</Stack>
					<Stack spacing={2} direction={'row'} align={'center'}>
						{isLogin ? <IsLogin previewImage={myphoto} /> : <NotLogin />}
					</Stack>
				</Flex>
			</Flex>
		</Box>
	);
};

export default HomTabs;
