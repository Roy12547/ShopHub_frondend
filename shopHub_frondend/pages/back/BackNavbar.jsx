import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const BackNavbar = () => {
	const navigate = useNavigate();
	const handleTitleClick = () => {
		navigate('/back');
	};
	return (
		<Flex
			align="center"
			justify="space-between"
			py={4}
			px={8}
			bg={'blue.900'}
			color="white"
			cursor={'pointer'}
		>
			<Flex align="center">
				<Heading size="md" onClick={handleTitleClick}>
					電商後台管理系統
				</Heading>
			</Flex>
			<Flex align="center">
				<Link to="/back/manageNews">
					<Button variant="ghost" _hover={{ bg: 'orange.500' }} color={'wheat'}>
						最新消息管理
					</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default BackNavbar;
