import React from 'react';
import Heart from './HomePage/Heart';
import Pcard from './HomePage/Pcard';
import { Flex, Text } from '@chakra-ui/layout';
import Carousel from './HomePage/Carousel';
import CategoryList from './HomePage/CategoryList';
import ItemList from './HomePage/ItemList';

const Home = () => {
	return (
		<>
			<Carousel />
			<CategoryList />
			
			<ItemList title="熱銷商品" />
			<ItemList title="為你推薦" />
		</>
	);
};

export default Home;
