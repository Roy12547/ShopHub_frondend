import React from 'react';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import styled from 'styled-components';
const CartContainer = styled.div`
	position: relative;
	display: inline-block;
`;
const ItemCount = styled.div`
	position: absolute;
	top: -10px;
	right: -10px;
	background-color: red;
	color: white;
	border-radius: 50%;
	padding: 2px 6px;
	font-size: 12px;
	font-weight: bold;
`;
export const CartIcon = ({ itemCount }) => {
	return (
		<CartContainer>
			<PiShoppingCartSimpleFill size={'30px'} />
			{itemCount > 0 && <ItemCount>{itemCount}</ItemCount>}
		</CartContainer>
	);
};
