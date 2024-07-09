import React, { createContext, useEffect, useState, useContext } from 'react';
import { Divider, Flex, VStack } from '@chakra-ui/layout';
import { CiEdit } from 'react-icons/ci';
import {
	Heading,
	HStack,
	Text,
	Input,
	Button,
	textAlign,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from '@chakra-ui/react';
import { RiImageAddFill } from 'react-icons/ri';
import SpecTable from '../components/SpecTable';
import { useForm, useFormContext } from 'react-hook-form';
import { testFields } from '../validation/testFields';
import UploadBox from '../components/UploadBox';
import { useUploadImg } from '../../hook/useUploadImg';
import ImageBox from '../components/ImageBox/ImageBox';

const SpecsContext = createContext(null);

const SellInfoSection = () => {
	const { handleImageChange, handleDeleteImage, images, files, value } =
		useUploadImg();
	const [isEditing, setIsEditing] = useState(true);
	const [spec1, setSpec1] = useState('');
	const [spec2, setSpec2] = useState();
	const {
		register,
		formState: { errors },
		watch,
		trigger,
	} = useFormContext();

	const handleBlur = async () => {
		const isValid = await trigger('specOne');

		if (isValid) {
			setIsEditing(false);
		}
	};

	const handleClick = () => {
		setIsEditing(true);
	};

	const handleChange = (e) => {
		setSpec1(e.target.value);
	};

	return (
		<Flex
			id="sellInfo"
			p={4}
			flexDirection={'column'}
			backgroundColor={'#fff'}
			m={5}
			borderRadius={'10px'}
			boxShadow="xl"
		>
			<Text
				fontSize={'1.2rem'}
				fontWeight={500}
				backgroundColor={'#4cb4f559'}
				width={'fit-content'}
				py={2}
				px={4}
				color={'#000'}
				borderRadius={'50px'}
				letterSpacing={1}
			>
				銷售資訊
			</Text>
			<Flex
				width={'80%'}
				flexDirection={'column'}
				margin={'2rem auto'}
				gap={10}
			>
				<HStack alignItems={'start'} gap={4}>
					<Text width={'100px'}>規格</Text>
					<Flex flexDirection={'column'} w={'100%'} gap={2}>
						<VStack
							backgroundColor={'#EEF7FF'}
							width={'100%'}
							p={'2rem'}
							borderRadius={'4px '}
							align={'start'}
						>
							<Text>規格 1</Text>
							{isEditing ? (
								<FormControl isInvalid={!!errors.specOne}>
									<Input
										placeholder={'請輸入'}
										backgroundColor={'#fff'}
										w={'30%'}
										onChange={handleChange}
										onBlur={handleBlur}
										value={spec1}
										// {...register(
										// 	'specOne',
										// 	fields.find((field) => field.name === 'specOne').rules
										// )}
										border={'1px solid gray'}
									/>
									<FormErrorMessage>{errors.specOne?.message}</FormErrorMessage>
								</FormControl>
							) : (
								<Flex flexDirection={'row'} align={'center'}>
									<Text>{spec1}（自定義）</Text>
									<CiEdit
										onClick={handleClick}
										size={'1.5rem'}
										cursor={'pointer'}
									/>
								</Flex>
							)}

							<Divider />
							<HStack>
								<RiImageAddFill />
								<Input backgroundColor={'#fff'} border={'1px solid gray'} />
							</HStack>
						</VStack>

						<VStack
							backgroundColor={'#EEF7FF'}
							width={'100%'}
							p={'2rem'}
							borderRadius={'4px '}
							align={'start'}
						>
							<Text>規格 2</Text>
							<Input
								placeholder={'請輸入'}
								backgroundColor={'#fff'}
								w={'30%'}
							/>
							<Divider />
							<HStack>
								{images.length >= 1 ? (
									<ImageBox
										item={images[0]}
										onDelete={handleDeleteImage}
										i={0}
									/>
								) : (
									<Input type="file" onChange={handleImageChange} />
								)}

								<Input backgroundColor={'#fff'} />
							</HStack>
						</VStack>
					</Flex>
				</HStack>

				<HStack alignItems={'start'} gap={4} width={'100%'}>
					<Text width={'100px'}>規格表</Text>
					<VStack width={'100%'}>
						<Flex justifyContent={'space-between'} gap={4} width={'100%'}>
							<Flex gap={2}>
								<Input placeholder="價格" />
								<Input placeholder="商品數量" />
							</Flex>
							<Button>全部套用</Button>
						</Flex>
						<SpecTable />
					</VStack>
				</HStack>

				<FormControl isRequired isInvalid={!!errors.lowestBuy}>
					<HStack alignItems={'start'} gap={4}>
						<FormLabel htmlFor="lowestBuy" width={'100px'} flexShrink={0}>
							最低購買數
						</FormLabel>
						<VStack gap={2} align={'start'}>
							<Input
								defaultValue={1}
								width={'50%'}
								id="lowestBuy"
								type="number"
								maxLength={30}
								{...register(
									'lowestBuy',
									testFields.find((field) => field.name === 'lowestBuy').rules
								)}
								onBlur={() => trigger('lowestBuy')}
								border={'1px solid gray'}
							/>
							<FormErrorMessage>{errors.lowestBuy?.message}</FormErrorMessage>
						</VStack>
					</HStack>
				</FormControl>
			</Flex>
		</Flex>
	);
};

export default SellInfoSection;
