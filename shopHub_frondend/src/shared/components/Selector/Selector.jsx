import React from 'react';
import { Select } from '@chakra-ui/react';

const Selector = ({ children, ...props }) => {
	// const { placeholder } = prop;
	return <Select {...props}>{children}</Select>;
};

export default Selector;
