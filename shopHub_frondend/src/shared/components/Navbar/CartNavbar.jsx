import { Heading, Box, Flex } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { SelectInput } from './SelectInput';
import { useNavigate } from 'react-router-dom';
export const CartNavbar = () => {
	const navigate = useNavigate();
	const handleTitleClick = () => {
		navigate('/');
	};
	return (
		<Box
			bg="white"
			pt={{ base: 1 }}
			py={{ base: 2 }}
			px={{ base: 4 }}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			height={{ base: '80px', md: '100px' }}
		>
			<Flex align="center" gap={5} width="100%" justifyContent="space-between">
				<Image
					ml={'5rem'}
					src="http://54.199.192.205/shopHub/assets/logo.jpg"
					boxSize={{ base: '150px', md: '200px' }}
					objectFit="contain"
					cursor={'pointer'}
					onClick={handleTitleClick}
				/>
				<Box width={{ base: '200px', md: '250px', lg: '500px' }} mr={'5rem'}>
					<SelectInput />
				</Box>
			</Flex>
		</Box>
	);
};
