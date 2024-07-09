import React, { useEffect } from 'react';
import { RiImageAddFill } from 'react-icons/ri';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';

const UploadBox = (prop) => {
	const { handleImageChange, files, size, hint, formName, rules, field } = prop;
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		trigger,
		setValue,
	} = useFormContext();

	return (
		<Box position="relative" display="inline-block" boxShadow={'md'}>
			<Input
				accept='image/jpeg,image/jpg,image/png,images/*"'
				name={formName}
				id={formName}
				type="file"
				onChange={(e) => {
					field.onChange(Array.from(e.target.files));
					handleImageChange(e);
				}}
				multiple
				{...register(formName)}
				style={{ opacity: 0 }}
				position={'absolute'}
				width={'100%'}
				height={'100%'}
				top={0}
				bottom={0}
			/>
			<label htmlFor={formName} style={{ cursor: 'pointer' }}>
				<Flex
					width={size}
					height={size}
					flexDirection={'column'}
					border="2px dashed gray"
					aspectRatio={1 / 1}
					alignItems={'center'}
					justifyContent={'center'}
					borderRadius={'5%'}
					gap={1}
					_hover={{ background: '#7928ca3a' }}
				>
					<RiImageAddFill size={28} />
					{hint && (
						<>
							<Text fontSize={'0.8rem'}>新增圖片</Text>
							<Text fontSize={'0.7rem'}>{`(${files.length} / 5)`}</Text>
						</>
					)}
				</Flex>
			</label>
		</Box>
	);
};

export default UploadBox;
