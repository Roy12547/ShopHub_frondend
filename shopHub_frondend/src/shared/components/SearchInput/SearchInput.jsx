import React from 'react';
import {
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	InputRightAddon,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const SearchInput = (prop) => {
	const { borderRadius, size } = prop;
	return (
		<InputGroup borderRadius={borderRadius && 5} size={size}>
			<InputLeftElement
				pointerEvents="none"
				// eslint-disable-next-line react/no-children-prop
				children={<Search2Icon color="gray.600" />}
			/>
			<Input type="text" placeholder="Search..." border="1px solid #949494" />
			<InputRightAddon p={0} border="none">
				<Button
					size="md"
					borderLeftRadius={0}
					borderRightRadius={3.3}
					border="1px solid #949494"
				>
					搜尋
				</Button>
			</InputRightAddon>
		</InputGroup>
	);
};

export default SearchInput;
