import React from 'react';
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	TabIndicator,
} from '@chakra-ui/react';

const index = (prop) => {
	const { items } = prop;
	return (
		<Tabs position="relative" variant="unstyled">
			<TabList>
				{items.map((item) => (
					<Tab key={item.name}>{item.name}</Tab>
				))}
			</TabList>
			<TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
			<TabPanels>
				<TabPanel>
					<p>one!</p>
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
				<TabPanel>
					<p>three!</p>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default index;
