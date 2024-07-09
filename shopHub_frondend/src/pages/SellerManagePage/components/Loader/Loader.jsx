import { tailChase } from 'ldrs';
import { Box } from '@chakra-ui/layout';

tailChase.register();

// Default values shown

import React from 'react';

const Loader = () => {
	return (
		<Box
			p={5}
			shadow="md"
			borderWidth="1px"
			borderRadius="md"
			position={'relative'}
			width={'100%'}
			height={'100%'}
		>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<l-tail-chase size="60" speed="1.75" color="#4cb5f5"></l-tail-chase>
			</div>
		</Box>
	);
};

export default Loader;

// Default values shown
