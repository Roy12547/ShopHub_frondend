import React, { useState } from 'react'

import {  Box, Flex, Grid, SimpleGrid, Text, } from '@chakra-ui/layout';
import Pcard from './Pcard';
import { useEffect } from 'react';
import { data } from 'autoprefixer';
import { getPcardAPI } from '../../api/productCRUDAPI';



// eslint-disable-next-line react/prop-types
export default function ItemList({ title }) {
	const displayAmount= 100
	const [indexList, setIndexList] = useState([]);
	const [orderByPrice, setOrderbyPrice] = useState([]);
	const [productIds, setProductIds] = useState([]);
	const [products, setProducts] = useState([]);
	useEffect(() => {
		let arr = Array.from({ length:displayAmount }, (_, i) => i);
		console.log(arr)	
		getPcardAPI(arr).then((data) => {
			data.data.sort(() => Math.random() - 0.5);
			console.log(data.data)
			setProducts(data.data);
		})
	},[])


		
	
    
    return (
			<Box m={12}>
				<Text fontSize="2xl" fontWeight="bold" mb={6}>
					{title}
				</Text>
				<Grid
					templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
					gap={2}
					justifyItems="center"
				>
					{products.map((product, index) => (
						<Pcard key={index} product={product} />
					))}
				</Grid>
			</Box>
		);
}
