// ProductPage.jsx
import { Grid, GridItem } from '@chakra-ui/react';


import AddToCartSection from './MainContainerComponet/AddToCartSection';
import ProductInfo from './MainContainerComponet/ProductImageSection';

function ProductPage() {
	return (
		<Grid templateColumns="60% 40%" gap={8}>
			<GridItem>
				<ProductInfo />
			</GridItem>
			<GridItem>
				<AddToCartSection />
			</GridItem>
		</Grid>
	);
}

export default ProductPage;
