import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Heart() {
	const [isFavorited, setIsFavorited] = useState(false);

	const handleFavoriteClick = () => {
		setIsFavorited(!isFavorited);
	};

	return (
		<IconButton
			icon={isFavorited ? <FaHeart /> : <FaRegHeart />}
			color={isFavorited ? 'red.500' : 'gray.500'}
			onClick={handleFavoriteClick}
			aria-label="Favorite"
			size="sm"
			variant="ghost"
			_hover={{ bg: 'transparent' }}
			_active={{ bg: 'transparent' }}
		/>
	);
}

export default Heart;
