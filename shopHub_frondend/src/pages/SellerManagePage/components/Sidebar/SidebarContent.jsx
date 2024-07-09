import React from 'react';
import { Box } from '@chakra-ui/layout';
import { NavItem } from './constant';
import SidebarAccordion from './SidebarAccordion';

const SidebarContent = () => {
	return (
		<Box w={{ base: 'full', md: 60 }}>
			{NavItem.map((item) => (
				<SidebarAccordion key={item.name} {...item} />
			))}
		</Box>
	);
};

export default SidebarContent;
