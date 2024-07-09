import { Divider } from '@chakra-ui/layout';
import { Text, Center } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
export const NotLogin = () => {
	return (
		<>
			<NavLink to={'/user/register'}>
				<Text>註冊</Text>
			</NavLink>
			<Center height="12px">
				<Divider orientation="vertical" />
			</Center>
			<NavLink to={'/user/login'}>
				<Text>登入</Text>
			</NavLink>
		</>
	);
};
