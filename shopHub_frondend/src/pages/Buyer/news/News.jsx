import React from 'react';
import { Flex } from '@chakra-ui/react';
import BuyerMenu from '../BuyerMenu';
import StyledBox from '../StyledBox';
import NewsBox from './Newsbox';
import Cookies from 'js-cookie';

function news() {
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
				<NewsBox />
			</StyledBox>
		</Flex>
	);
}
export default news;
