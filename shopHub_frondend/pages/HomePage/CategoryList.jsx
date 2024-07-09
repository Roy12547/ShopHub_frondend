import React, { useEffect, useState } from 'react';
import {
	Box,
	SimpleGrid,
	Text,
	Image,
	LinkBox,
	LinkOverlay,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
	const [jsonArr, setJsonArr] = useState([]);

	useEffect(() => {
		fetch('http://localhost:8081/product/getAllCategories')
			.then((response) => response.json())
			.then((data) => {
				setJsonArr(data.data);
			});
	}, []);

	return (
		<Box m={12}>
			<SimpleGrid minChildWidth="120px" justifyItems="center">
				{jsonArr.map((category) => (
					<LinkBox
						key={category.category.categoryId}
						bg="white"
						textAlign="center"
						borderRadius="md"
						boxShadow="md"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						width="120px"
						height="160px"
					>
						<LinkOverlay
							as={Link}
							to={`/search`}
							state={{
								searchValue: category.category.categoryName , type:'category'
							}}
						/>
						<Image
							src={category.imgUrl}
							alt={category.category.categoryName}
							width="100px"
							height="100px"
							objectFit="cover"
						/>
						<Text fontSize="sm">{category.category.categoryName}</Text>
					</LinkBox>
				))}
			</SimpleGrid>
		</Box>
	);
};

export default CategoryList;
