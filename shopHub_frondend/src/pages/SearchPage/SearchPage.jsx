import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './SideBar';
import { Box, Flex } from '@chakra-ui/layout';
import SearchItemList from './SearchItemList';
import { Navbar } from '../../shared/components/Navbar/Navbar';

export default function SearchPage() {
	const location = useLocation();
	const searchQuery = decodeURIComponent(location.state?.searchValue || '');
	const type = decodeURIComponent(location.state?.type || '');

	const [filters, setFilters] = useState({
		priceOrder: '',
		minPrice: '',
		maxPrice: '',
	});

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
	};

	return (
		<>
			<Flex>
				<Box width="250px">
					<Sidebar onFilterChange={handleFilterChange} />
				</Box>
				<Box flex="1" ml="4">
					<SearchItemList searchQuery={searchQuery} filters={filters} type={type } />
				</Box>
			</Flex>
		</>
	);
}
