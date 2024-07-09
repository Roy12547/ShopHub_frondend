import { Flex, Text, Grid } from '@chakra-ui/layout';
import React from 'react';
import { BiSolidError } from 'react-icons/bi';

const FetchError = () => {
	return (
		<Grid placeItems={'center'} width={'100%'} height={'100%'}>
			<Flex flexDirection={'row'} gap={4} justify={'center'} align={'center'}>
				<BiSolidError size={'1.5rem'} />
				<Text fontSize={'1.5rem'}>網路異常或資料獲取錯誤</Text>
			</Flex>
		</Grid>
	);
};

export default FetchError;
