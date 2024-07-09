// Bprofile.js
import React, { useState, useEffect } from 'react';
import {
	Box,
	Flex,
	Tabs,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BuyerMenu from '../BuyerMenu';
import Address from './Address';
import Store from './Store';
import Bank from './Bank';
import Credit from './Credit';
import Account from './Account';
import StyledBox from '../StyledBox';
import StoreList from './List/StoreList';
import Profile from './Profile';
import Notify from './Notify';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL,showSuccess, showErrorNoText } from '../../../utils/apiUtil';

function Bprofile() {
	const [cards, setCards] = useState([]);
	const toast = useToast();
	const userId = Cookies.get('userId');

	const addNewCard = (newCard) => {
		if (typeof newCard === 'object' && newCard !== null) {
			const formattedCard = {
				...newCard,
				name: newCard.recipientName || 'Unknown',
				phone: newCard.recipientPhone || 'N/A',
				store: newCard.shopName || 'N/A',
				address: newCard.address || 'N/A',
				delivery: newCard.shipType === 1 ? '7-11取貨' : '全家取貨',
			};
			setCards((prevCards) => [...prevCards, formattedCard]);
		} else {
			console.error('錯誤');
		}
	};

	const deleteCard = async (index, shipId) => {
		try {
			await axios.delete(`${BASE_URL}/address/deletemart`, {
				params: { userId, shipId },
			});
			setCards((prevCards) => prevCards.filter((_, i) => i !== index));
			showSuccess('超商資料已成功刪除');
		} catch (error) {
			console.error('刪除地址時出錯:', error);
			showErrorNoText('無法刪除超商資料，請稍後再試');
		}
	};

	useEffect(() => {
		if (userId) {
			axios
				.get(`${BASE_URL}/address/getmart`, {
					params: { userId },
				})
				.then((response) => {
					const formattedAddresses = response.data.map((address) => ({
						shipId: address.shipId,
						name: address.recipientName || 'Unknown',
						phone: address.recipientPhone || 'N/A',
						store: address.shopName || 'N/A',
						address: address.address || 'N/A',
						delivery: address.shipType === 1 ? '7-11取貨' : '全家取貨',
						userId: address.userId,
					}));
					setCards(formattedAddresses);
				})
				.catch((error) => {
					console.error('Error fetching addresses:', error);
				});
		}
	}, [userId]);

	const navigate = useNavigate();
	const [currentTabIndex, setCurrentTabIndex] = useState(0);
	const handleTabChange = (index) => {
		setCurrentTabIndex(index);
		navigate(`?type=${index}`);
	};

	return (
		<Flex
			p={{ base: '2', md: '5' }}
			mr={{ base: '2', md: '70' }}
			ml={{ base: '2', md: '70' }}
			justifyContent="center"
		>
			<BuyerMenu profileImage="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" />
			<StyledBox>
				<Tabs
					isFitted
					position="relative"
					variant="enclosed"
					index={currentTabIndex}
					onChange={handleTabChange}
				>
					<TabList>
						<Tab>個人資料</Tab>
						<Tab>
							信用卡、
							<br />
							銀行帳戶
						</Tab>
						<Tab>地址</Tab>
						<Tab>通訊設定</Tab>
						<Tab>刪除帳號</Tab>
					</TabList>
					<TabIndicator
						mt="-1.5px"
						height="2px"
						bg="blue.500"
						borderRadius="1px"
					/>
					<TabPanels>
						<TabPanel>
							<br />
							<Profile />
						</TabPanel>
						<TabPanel>
							<Flex alignItems="center" mb={'10px'}>
								<Text fontSize={'20px'}>信用卡/金融卡</Text>
								<Credit />
							</Flex>
							<hr />
							<Flex alignItems="center" mb={'10px'} mt={'20px'}>
								<Text fontSize={'20px'}>銀行帳戶</Text>
								<Bank />
							</Flex>
							<hr />
						</TabPanel>
						<TabPanel>
							<Flex alignItems="center" mb={'10px'}>
								<Text fontSize={'20px'}>地址</Text>
								<Address />
							</Flex>
							<hr />
							<Flex alignItems="center" mb={'10px'} mt={'20px'}>
								<Text fontSize={'20px'}>超商地址</Text>
								<Store onAddCard={addNewCard} userId={userId} />
							</Flex>
							<hr />
							<StoreList
								key={cards.length}
								cards={cards}
								onDeleteCard={deleteCard}
							/>
						</TabPanel>
						<TabPanel>
							<Notify />
						</TabPanel>
						<TabPanel>
							<Box
								w={{ base: '100%', md: '900' }}
								h={{ base: '476px', md: '500px' }}
								p="10"
								bg="gray.50"
								rounded="10px"
								textAlign={'Center'}
							>
								<Text fontSize="40px" color="gray.700">
									申請刪除帳號
								</Text>
								<br />
								<Account />
							</Box>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</StyledBox>
		</Flex>
	);
}

export default Bprofile;
