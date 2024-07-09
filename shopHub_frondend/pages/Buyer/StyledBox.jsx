import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

const StyledBox = ({ children, ...props }) => {
	return (
		<Box
			w={{ base: '100%', md: '80%' }}
			p="4"
			bg="gray.50"
			borderRadius="md"
			boxShadow="md"
			{...props}
		>
			{children}
		</Box>
	);
};

StyledBox.propTypes = {
	children: PropTypes.node.isRequired,
};

export default StyledBox;
