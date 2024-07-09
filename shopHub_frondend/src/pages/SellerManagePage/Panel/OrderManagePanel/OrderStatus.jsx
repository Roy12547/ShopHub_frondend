import React from 'react';

import { Flex, Text } from '@chakra-ui/layout';
import { useEffect } from 'react';

export const OrderStatus = ({ icon, text }) => {
	useEffect(() => {}, [icon, text]);
	return (
		<Flex alignItems="center" gap={2}>
			<Text fontSize={'md'}>{text}</Text>
			<Text>{icon}</Text>
		</Flex>
	);
};
