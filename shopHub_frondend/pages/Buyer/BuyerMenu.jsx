import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	VStack,
	Text,
	Link as ChakraLink,
	Image,
	Flex,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiUtil';

function BuyerMenu() {
	const userId = Cookies.get('userId');
	const [userData, setUserData] = useState({
		userName: '',
		profileImage:
			'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
	});
	useEffect(() => {
		axios
			.get(`${BASE_URL}/user/details/${userId}`)
			.then((response) => {
				const user = response.data.data;
				setUserData({
					userName: user.userName,
					profileImage:
						user.userImage ||
						'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
				});
			})
			.catch((error) => {
				console.error('獲取用戶資料失敗:', error);
			});
	}, [userId]);

	return (
		<Box
			w={{ base: '100%', md: '10%' }}
			h={'400px'}
			pt="4"
			bg="gray.100"
			borderRadius="md"
			boxShadow="md"
			mr="30px"
		>
			<Flex direction="column" align="center">
				<Image
					borderRadius="full"
					boxSize="150px"
					src={userData.profileImage}
					alt="Profile"
				/>
				<Text fontSize="30px" fontWeight="500">
					{userData.userName || 'Loading...'}
				</Text>
				<VStack align="flex-start" spacing={4} mt={3}>
					<ChakraLink
						as={NavLink}
						to="/buyer"
						_hover={{ textDecoration: 'none' }}
					>
						{({ isActive }) => (
							<Box
								borderLeft="2px solid"
								borderColor={isActive ? 'teal.500' : 'transparent'}
								pl={2}
							>
								<Text
									fontWeight={isActive ? 'bold' : 'normal'}
									color={isActive ? 'teal.500' : 'black'}
									fontSize={isActive ? 'xl' : 'lg'}
									letterSpacing="5px"
								>
									編輯檔案
								</Text>
							</Box>
						)}
					</ChakraLink>
					<ChakraLink
						as={NavLink}
						to="/news"
						_hover={{ textDecoration: 'none' }}
					>
						{({ isActive }) => (
							<Box
								borderLeft="2px solid"
								borderColor={isActive ? 'teal.500' : 'transparent'}
								pl={2}
							>
								<Text
									fontWeight={isActive ? 'bold' : 'normal'}
									color={isActive ? 'teal.500' : 'black'}
									fontSize={isActive ? 'xl' : 'lg'}
									letterSpacing="5px"
								>
									通知總覽
								</Text>
							</Box>
						)}
					</ChakraLink>
					<ChakraLink
						as={NavLink}
						to="/shipper"
						_hover={{ textDecoration: 'none' }}
					>
						{({ isActive }) => (
							<Box
								borderLeft="2px solid"
								borderColor={isActive ? 'teal.500' : 'transparent'}
								pl={2}
							>
								<Text
									fontWeight={isActive ? 'bold' : 'normal'}
									color={isActive ? 'teal.500' : 'black'}
									fontSize={isActive ? 'xl' : 'lg'}
									letterSpacing="5px"
								>
									購買清單
								</Text>
							</Box>
						)}
					</ChakraLink>
					<ChakraLink
						as={NavLink}
						to="/likes"
						_hover={{ textDecoration: 'none' }}
					>
						{({ isActive }) => (
							<Box
								borderLeft="2px solid"
								borderColor={isActive ? 'teal.500' : 'transparent'}
								pl={2}
							>
								<Text
									fontWeight={isActive ? 'bold' : 'normal'}
									color={isActive ? 'teal.500' : 'black'}
									fontSize={isActive ? 'xl' : 'lg'}
									letterSpacing="5px"
								>
									喜好商品
								</Text>
							</Box>
						)}
					</ChakraLink>
					{/* <ChakraLink
						as={NavLink}
						to="/cookie"
						_hover={{ textDecoration: 'none' }}
					>
						{({ isActive }) => (
							<Box
								borderLeft="2px solid"
								borderColor={isActive ? 'teal.500' : 'transparent'}
								pl={2}
							>
								<Text
									fontWeight={isActive ? 'bold' : 'normal'}
									color={isActive ? 'teal.500' : 'black'}
									fontSize={isActive ? 'xl' : 'lg'}
									letterSpacing="5px"
								>
									瀏覽紀錄
								</Text>
							</Box>
						)}
					</ChakraLink> */}
				</VStack>
			</Flex>
		</Box>
	);
}

BuyerMenu.propTypes = {
	profileImage: PropTypes.string,
};

export default BuyerMenu;
