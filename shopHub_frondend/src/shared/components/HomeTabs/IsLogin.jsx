import { Stack, Flex } from '@chakra-ui/layout';
import {
	Avatar,
	Text,
	Center,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	PopoverFooter,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuGroup,
	MenuItem,
	MenuDivider,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
export const IsLogin = ({ previewImage }) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		Cookies.remove('id_token');
		Cookies.remove('photo');
		Cookies.remove('cart');
		Cookies.remove('userId');
		navigate('/user/login');
	};
	const handleToProfile = () => {
		navigate('/buyer');
	};
	return (
		<>
			<Menu>
				<MenuButton>
					<Avatar size="sm" src={previewImage}></Avatar>
				</MenuButton>
				<MenuList>
					<MenuGroup title="Profile" color={'black'}>
						<MenuItem color={'black'} onClick={handleToProfile}>
							我的帳號
						</MenuItem>
						<MenuItem color={'black'}>購買清單</MenuItem>
						<MenuItem color={'black'} onClick={handleLogout}>
							登出
						</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>
		</>
	);
};
