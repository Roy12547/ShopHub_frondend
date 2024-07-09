import React, { useEffect } from 'react';
import SellerNavbar from './components/SellerNavbar';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/layout';

const SellerManagePage = () => {
	useEffect(() => {
		// 禁止頁面滾動
		document.body.style.overflow = 'hidden';

		// 組件卸載時恢復頁面滾動
		return () => {
			document.body.style.overflow = '';
		};
	}, []);
	return (
		<div overflow="hidden">
			<SellerNavbar />
			<Flex height="100%">
				<Sidebar />
				<Box
					backgroundColor=""
					w={'100%'}
					mt={6}
					mx={4}
					boxShadow={'md'}
					overflowY="auto"
					height="calc(100vh - 6rem)"
				>
					<Outlet />
				</Box>
			</Flex>
		</div>
	);
};

export default SellerManagePage;
