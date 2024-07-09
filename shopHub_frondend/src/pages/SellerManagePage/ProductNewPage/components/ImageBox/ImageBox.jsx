import { Box } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { StyledImageBox } from './StyledImageBox';
import { Tooltip } from '@chakra-ui/react';
const ImageBox = (prop) => {
	const { item, size, i, onDelete } = prop;

	return (
		<StyledImageBox>
			<Box width={size} height={size} boxShadow={'xl'} className="box">
				<Image
					src={prop.item}
					width={'100%'}
					height={'100%'}
					aspectRatio={1 / 1}
				/>
				<Tooltip label="刪除">
					<div className="del_layer" onClick={() => onDelete(i)}>
						<MdDeleteOutline className="del_icon" size={'1rem'} />
					</div>
				</Tooltip>
			</Box>
		</StyledImageBox>
	);
};

export default ImageBox;
