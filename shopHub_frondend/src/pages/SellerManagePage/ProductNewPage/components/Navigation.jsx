import React from 'react';
import { Flex, Box } from '@chakra-ui/layout';
const navItem = [
	{
		nav: '基本資訊',
		href: 'basic',
	},
	// {
	// 	nav: '屬性',
	// 	href: 'properties',
	// },
	{
		nav: '銷售資訊',
		href: 'sellInfo',
	},
	{
		nav: '運費',
		href: 'shipAmount',
	},
	{
		nav: '其他',
		href: 'other',
	},
];
const Navigation = () => {
	const onPress = (e) => {
		e.preventDefault();
		const target = window.document.getElementById(
			e.currentTarget.href.split('#')[1]
		);
		if (target) {
			var headerOffset = 180;
			var elementPosition = target.getBoundingClientRect().top;
			var offsetPosition = elementPosition - headerOffset;

			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	};
	return (
		<Flex
			p={5}
			gap={8}
			backgroundColor={'#FFEECC'}
			width={'100%'}
			boxShadow="md"
		>
			{navItem.map((item) => (
				<a
					key={item.nav}
					onClick={(e) => onPress(e)}
					href={'#' + item.href}
					data-to-scrollspy-id={item.href}
					style={{ fontSize: '1.2rem' }}
				>
					{item.nav}
				</a>
			))}
		</Flex>
	);
};

export default Navigation;
