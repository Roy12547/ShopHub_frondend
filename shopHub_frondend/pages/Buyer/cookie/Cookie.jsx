import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import BuyerMenu from '../BuyerMenu';
import StyledBox from '../StyledBox';
import Cookies from 'js-cookie';

function Cookie() {
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
					瀏覽紀錄
				</Text>
			</StyledBox>
		</Flex>
	);
}
export default Cookie;
