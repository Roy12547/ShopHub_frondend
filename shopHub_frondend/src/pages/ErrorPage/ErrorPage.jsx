import React from 'react';
import { useRouteError } from 'react-router-dom';
import errorImage from '../../assets/errorImage.jpg';
import { Box, Flex, Text, Heading } from '@chakra-ui/layout';
const ErrorPage = () => {
	const error = useRouteError();
	return (
		<Flex
			flexDirection={'row'}
			p={5}
			shadow="md"
			borderWidth="1px"
			borderRadius="md"
			align={'center'}
			justify={'center'}
			width={'100%'}
			height={'100%'}
		>
			<img src={errorImage} className="w-[30%] aspect-square" />

			<Flex flexDirection={'column'} gap={2}>
				<Heading fontSize={'1.3rem'} fontWeight={600}>
					Ohh!!
				</Heading>
				<Text fontWeight={500}>
					{error.status == 404
						? 'We are not able to find the page for the given Url'
						: `something went wrong ${error.message}`}
				</Text>
			</Flex>
		</Flex>
	);
};

export default ErrorPage;
