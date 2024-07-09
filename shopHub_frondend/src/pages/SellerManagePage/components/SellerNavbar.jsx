import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoLogOutOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import {
	Flex,
	Box,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
	Avatar,
	Tooltip,
} from '@chakra-ui/react';
import NavBreadcrumb from './NavBreadcrumb';
import { NavLink, useNavigate } from 'react-router-dom';
import { IsLogin } from '../../../shared/components/HomeTabs/IsLogin';
import { NotLogin } from '../../../shared/components/HomeTabs/NotLogin';

const SellerNavbar = () => {
	const [myphoto, setMyphoto] = useState();
	const [isLogin, setIsLogin] = useState(false);
	const id_token = Cookies.get('id_token');
	const navigate = useNavigate();
	const handleLogout = () => {
		Cookies.remove('id_token');
		Cookies.remove('photo');
		navigate('/user/login');
	};

	useEffect(() => {
		if (!(id_token === undefined)) {
			setIsLogin(true);
			setMyphoto(Cookies.get('photo'));
		}
	}, []);

	return (
		<Box
			display="flex"
			pt={{ base: 2 }}
			py={{ base: 4 }}
			px={{ base: 4 }}
			justifyContent="space-between"
			alignItems="center"
			boxShadow={'base'}
			position="sticky"
			width={'100%'}
			backgroundColor={'#4cb5f5'}
			shadow={'md'}
		>
			<Flex gap={5} alignItems={'center'}>
				<Tooltip label={'回商店首頁'}>
					<NavLink to={'/'}>
						<Text fontSize={{ lg: '1.8rem' }} fontWeight={700} color={'#fff'}>
							ShopHub
						</Text>
					</NavLink>
				</Tooltip>
				<NavBreadcrumb />
			</Flex>
			<Flex>
				<Menu>
					<MenuButton
						as="Button"
						rounded={'full'}
						variant={'link'}
						cursor={'pointer'}
						// minw={0}
						righticon={<ChevronDownIcon />}
					>
						<Flex alignItems="center" gap="3">
							<IsLogin previewImage={myphoto}></IsLogin>

							{/* <Text display="inline-block">account name</Text> */}
						</Flex>
					</MenuButton>
					<MenuList>
						<MenuItem onClick={handleLogout}>
							<IoLogOutOutline />
							登出
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Box>
	);
};

export default SellerNavbar;
