import React from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	Heading,
	Tooltip,
} from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';

import { ChevronRightIcon } from '@chakra-ui/icons';
const NavBreadcrumb = () => {
	const location = useLocation();

	const crumbs = location.pathname.split('/').filter((crumb) => crumb);

	return (
		// <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
		// 	{crumbs.map((item, i) => {
		// 		if (item === 'seller') {
		// 			return (
		// 				<BreadcrumbItem key={i}>
		// 					<BreadcrumbLink href="#">賣家中心</BreadcrumbLink>
		// 				</BreadcrumbItem>
		// 			);
		// 		}
		// 	})}
		// </Breadcrumb>
		<Tooltip label="">
			<NavLink to={'/seller'}>
				<Heading fontSize={'md'} mt={'0.5rem'}>
					賣家中心
				</Heading>
			</NavLink>
		</Tooltip>
	);
};

export default NavBreadcrumb;
