import React from 'react';
import { Flex, Text, Spacer } from '@chakra-ui/react';

const BackFooter = () => {
	return (
		<Flex
			align="center"
			justifyItems={'center'}
			py={4}
			bg="blue.900"
			color="white"
			mt="auto"
			alignItems={'center'}
		>
			<Text>&copy; shophub 電商後台管理系統</Text>
			<Spacer />
		</Flex>
	);
};

export default BackFooter;
