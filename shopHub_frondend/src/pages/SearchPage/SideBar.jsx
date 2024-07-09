import {
	Box,
	Text,
	VStack,
	RadioGroup,
	Stack,
	Radio,
	HStack,
	Input,
	Button,
} from '@chakra-ui/react';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Sidebar({ onFilterChange }) {
	const [priceOrder, setPriceOrder] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	const handlePriceOrderChange = (value) => {
		setPriceOrder(value);
		onFilterChange({
			priceOrder: value,
			minPrice,
			maxPrice,
		});
	};

	const handleMinPriceChange = (e) => {
		const value = e.target.value;
		if (value === '' || /^[0-9\b]+$/.test(value)) {
			setMinPrice(value);
		}
	};

	const handleMaxPriceChange = (e) => {
		const value = e.target.value;
		if (value === '' || /^[0-9\b]+$/.test(value)) {
			setMaxPrice(value);
		}
	};

	const handleApplyPriceRange = () => {
		
		onFilterChange({
			priceOrder,
			minPrice,
			maxPrice,
		});
	};

	return (
		<Box borderWidth="1px" borderRadius="lg" p="4" width="250px" marginTop="5">
			<VStack spacing={4} align="stretch">
				<Box>
					<Text fontWeight="bold" mb="2">
						價格排序
					</Text>
					<RadioGroup value={priceOrder} onChange={handlePriceOrderChange}>
						<Stack>
							<Radio value="asc">價格－從低到高</Radio>
							<Radio value="desc">價格－從高到低</Radio>
						</Stack>
					</RadioGroup>
				</Box>

				<Box>
					<Text fontWeight="bold" mb="2">
						價格區間
					</Text>
					<HStack spacing={2}>
						<Input
							type="text"
							placeholder="最低價"
							value={minPrice}
							onChange={handleMinPriceChange}
						/>
						<Text>-</Text>
						<Input
							type="text"
							placeholder="最高價"
							value={maxPrice}
							onChange={handleMaxPriceChange}
						/>
					</HStack>
					<Button mt={2} size="sm" onClick={handleApplyPriceRange}>
						應用
					</Button>
				</Box>
			</VStack>
		</Box>
	);
}

export default Sidebar;
