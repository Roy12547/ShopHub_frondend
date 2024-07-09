import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Flex,
	Text,
} from '@chakra-ui/react';

const SidebarAccordion = (prop) => {
	const { icon, name, subItems } = prop;
	return (
		<Accordion defaultIndex={[0]} allowMultiple pb={2}>
			<AccordionItem borderColor={'white'}>
				<h2>
					<AccordionButton display="flex" justifyContent="space-between">
						<Flex justifyContent="center" alignItems="center" gap={3}>
							<Box>{icon}</Box>
							<Box
								as="span"
								flex="1"
								textAlign="left"
								fontSize={'.87rem'}
								color={'#99999'}
							>
								{name}
							</Box>
						</Flex>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Flex flexDirection="column" gap={2}>
							{subItems.map((sub) => (
								<NavLink key={sub.name} to={sub.href}>
									<Text
										fontSize={'.81rem'}
										ml={'2rem'}
										color={'#33333'}
										_hover={{ color: '#FF5580' }}
									>
										{sub.name}
									</Text>
								</NavLink>
							))}
						</Flex>
					</AccordionPanel>
				</h2>
			</AccordionItem>
		</Accordion>
	);
};

export default SidebarAccordion;

//router
//accordion {name}
//accordion subtitle 帶href
