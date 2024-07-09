/* eslint-disable react/prop-types */
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductBreadcrumb({product}) {
	if (!product) {
		return;
	}
	
	return (
		<Breadcrumb>
			<BreadcrumbItem>
				<Link to="/">ShopHub</Link>
			</BreadcrumbItem>
			<BreadcrumbItem>
				<Link
					to={`/search`}
					state={{
						searchValue: product.category.categoryName,
						type: 'category',
					}}
				>
					{product.category.categoryName}
				</Link>
			</BreadcrumbItem>

			<BreadcrumbItem isCurrentPage>
				<BreadcrumbLink href="#">{product.product.productName}</BreadcrumbLink>
			</BreadcrumbItem>
		</Breadcrumb>
	);
}

export default ProductBreadcrumb;
