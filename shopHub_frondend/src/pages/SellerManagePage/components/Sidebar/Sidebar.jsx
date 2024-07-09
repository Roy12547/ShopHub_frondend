import React from 'react';

import { Box } from '@chakra-ui/layout';
import SidebarContent from './SidebarContent';

const Sidebar = () => {
	return (
		<Box
			h="calc(100vh - 64px)"
			boxShadow={'base'}
			py={{ base: 5 }}
			backgroundColor={'#fffff'}
		>
			<SidebarContent />
		</Box>
	);
};

export default Sidebar;
