// src/RadioCard.js
import React from 'react';
import { Box, useRadio } from '@chakra-ui/react';

const RadioCard = (props) => {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as="label">
			<input {...input} />
			<Box
				{...checkbox}
				cursor="pointer"
				borderWidth="2px"
				borderRadius="md"
				boxShadow="md"
				_checked={{
					borderColor: '#b224a8',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				px={5}
				py={3}
				m={1} // 加上 margin 來調整間距
			>
				{props.children}
			</Box>
		</Box>
	);
};

export default RadioCard;
