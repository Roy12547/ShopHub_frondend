import { useEffect, useState } from 'react';
import { Flex, Box, HStack, VStack, Wrap } from '@chakra-ui/layout';
import { RiImageAddFill } from 'react-icons/ri';
import {
	InputGroup,
	InputRightElement,
	Select,
	Button,
	Heading,
	Text,
	Input,
	Textarea,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from '@chakra-ui/react';
import { testFields } from '../validation/testFields';
import UploadBox from '../components/UploadBox';
import { useUploadImg } from '../../hook/useUploadImg';
import ImageBox from '../components/ImageBox/ImageBox';
import {
	useForm,
	useFormContext,
	useFieldArray,
	useWatch,
	Controller,
} from 'react-hook-form';

const BasicSection = () => {
	const { handleImageChange, handleDeleteImage, images, files, value } =
		useUploadImg();
	const [text, setText] = useState('');

	const {
		control,
		register,
		formState: { errors },
		watch,
		trigger,
		setValue,
	} = useFormContext();

	return (
		<Flex
			id="basic"
			p={4}
			flexDirection={'column'}
			backgroundColor={'#fff'}
			m={5}
			borderRadius={'10px'}
			boxShadow="xl"
		>
			<Button type="submit">測試</Button>
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
				基本資訊
			</Text>

			<Flex
				width={'80%'}
				flexDirection={'column'}
				margin={'2rem auto'}
				gap={10}
			>
				<FormControl>
					<Flex alignItems={'start'} gap={4}>
						<FormLabel htmlFor="productImg" width={'110px'}>
							商品圖片
						</FormLabel>
						<Wrap>
							{images &&
								images.map((item, i) => (
									<ImageBox
										key={i}
										item={item}
										size={'80px'}
										i={i}
										onDelete={handleDeleteImage}
									/>
								))}
							{images.length < 5 && (
								<Box
									position="relative"
									display="inline-block"
									boxShadow={'md'}
								>
									<Input
										name={'productImg'}
										id={'productImg'}
										type="file"
										onChange={(e) => {
											handleImageChange(e);
											setValue(Array.from(e.target.files));
										}}
										multiple
										style={{ opacity: 0 }}
										{...register('productImg')}
										position={'absolute'}
										width={'100%'}
										height={'100%'}
										top={0}
										bottom={0}
									/>
									<label htmlFor={'productImg'} style={{ cursor: 'pointer' }}>
										<Flex
											width={'80px'}
											height={'80px'}
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

											<Text fontSize={'0.8rem'}>新增圖片</Text>
											<Text fontSize={'0.7rem'}>{`(${files.length} / 5)`}</Text>
										</Flex>
									</label>
								</Box>
							)}
						</Wrap>
					</Flex>
				</FormControl>

				<FormControl isInvalid={!!errors.productName}>
					<HStack gap={4} align={'start'}>
						<FormLabel htmlFor="productName" width={'100px'} flexShrink={0}>
							商品名稱
						</FormLabel>
						<VStack width={'100%'} align={'start'}>
							<InputGroup width={'50%'}>
								<InputRightElement width={'fit-content'} p={1}>
									{`${watch('productName') ? `${watch('productName').length}` : '0'}/30`}
								</InputRightElement>
								<Input
									id="productName"
									border={'1px solid gray'}
									type="text"
									width={'100%'}
									placeholder="品牌名稱 + 商品類型"
									maxLength={30}
									{...register(
										'productName',
										testFields.find((field) => field.name === 'productName')
											.rules
									)}
									onBlur={() => trigger('productName')}
								/>
							</InputGroup>
							<FormErrorMessage>{errors.productName?.message}</FormErrorMessage>
						</VStack>
					</HStack>
				</FormControl>

				<FormControl isInvalid={!!errors.category}>
					<HStack gap={4} alignItems={'center'}>
						<FormLabel htmlFor="category" width={'100px'}>
							類別
						</FormLabel>
						<Select
							id="category"
							width={'50%'}
							defaultValue=""
							name="category"
							{...register(
								'category',
								testFields.find((field) => field.name === 'category').rules
							)}
							border={'1px solid gray'}
						>
							<option value="" disabled>
								請選擇分類
							</option>
							<option value={1}>服裝/時尚</option>
							<option value={2}>3C/數位</option>
							<option value={3}>美妝/個人護理</option>
							<option value={4}>居家/家電</option>
							<option value={5}>運動/戶外</option>
						</Select>
					</HStack>
				</FormControl>
				<FormControl isInvalid={!!errors.description}>
					<VStack gap={4} alignItems={'start'}>
						<FormLabel htmlFor="description">商品描述</FormLabel>
						<Textarea
							id="description"
							rows="7"
							cols="100"
							resize={'none'}
							maxLength={600}
							border={'1px solid gray'}
							{...register(
								'description',
								testFields.find((field) => field.name === 'description').rules
							)}
							onBlur={() => trigger('description')}
						/>
						<Flex
							justify={'space-between'}
							alignItems={'center'}
							width={'100%'}
						>
							{errors.description ? (
								<FormErrorMessage>
									{errors.description?.message}
								</FormErrorMessage>
							) : (
								<Box></Box>
							)}
							<Box>{`${watch('description') ? `${watch('description').length}` : '0'}/600`}</Box>
						</Flex>
					</VStack>
				</FormControl>
			</Flex>
		</Flex>
	);
};

export default BasicSection;
