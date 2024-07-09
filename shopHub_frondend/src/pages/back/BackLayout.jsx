import React from 'react';
import { Box } from '@chakra-ui/react';
import BackNavbar from './BackNavbar';
import BackFooter from './BackFooter';
import { Outlet } from 'react-router-dom';
const BackLayout = () => {
	return (
		<Box minH="100vh" bg="gray.100">
			<BackNavbar />
			<Box p={8}>
				<Outlet />
			</Box>
			<BackFooter />
		</Box>
	);
};

export default BackLayout;
