import React from 'react';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import Pcard from '../Pcard';
import BuyerMenu from '../BuyerMenu';
import StyledBox from '../StyledBox';
import Cookies from 'js-cookie';

function Likes() {
	const userId = Cookies.get('userId');
	console.log('userID:', userId);

	const [profileImage, setProfileImage] = React.useState(
		'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
	);

	return (
		<Flex
			p={{ base: '2', md: '5' }}
			mr={{ base: '2', md: '70' }}
			ml={{ base: '2', md: '70' }}
			justifyContent="center"
		>
			<BuyerMenu profileImage={profileImage} />
			<StyledBox>
				<Text textAlign="Center" fontSize="3xl" fontWeight="semibold">
					喜好商品
				</Text>
				<SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
					<Pcard />
				</SimpleGrid>
			</StyledBox>
		</Flex>
	);
}

export default Likes;
