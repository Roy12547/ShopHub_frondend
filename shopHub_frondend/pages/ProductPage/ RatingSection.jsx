import React, { useEffect, useState } from 'react';
import {
	Box,
	Flex,
	Text,
	Button,
	Image,
	VStack,
	HStack,
	Progress,
	RadioGroup,
	Radio,
	useRadioGroup,
	useCheckbox,
	chakra,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { getRatingAPI } from '../../api/productCRUDAPI';

const CustomRadio = (props) => {
	const { state, getInputProps, getCheckboxProps } = useCheckbox(props);
	return (
		<chakra.label>
			<input {...getInputProps()} hidden />
			<Box
				{...getCheckboxProps()}
				cursor="pointer"
				borderWidth="1px"
				borderRadius="md"
				boxShadow="md"
				_checked={{
					bg: 'blue.500',
					color: 'white',
					borderColor: 'blue.500',
				}}
				px={3}
				py={1}
			>
				{props.children}
			</Box>
		</chakra.label>
	);
};

const RatingSection = ({ productId }) => {
	const [ratings, setRatings] = useState([]);
	const [filteredRatings, setFilteredRatings] = useState([]);
	const [starFilter, setStarFilter] = useState('all');
	const [hasCommentFilter, setHasCommentFilter] = useState(false);

	useEffect(() => {
    getRatingAPI(productId).then((response) => {
      console.log(response.data);
			setRatings(response.data);
			setFilteredRatings(response.data);
		});
	}, [productId]);

	useEffect(() => {
		let filtered = ratings;
		if (starFilter !== 'all') {
			filtered = filtered.filter(
				(r) => r.productRating === parseInt(starFilter)
			);
		}
		if (hasCommentFilter) {
			filtered = filtered.filter((r) => r.comment && r.comment.trim() !== '');
		}
		setFilteredRatings(filtered);
	}, [ratings, starFilter, hasCommentFilter]);

	const averageRating =
		ratings.reduce((acc, curr) => acc + curr.productRating, 0) / ratings.length;
	const ratingCounts = [0, 0, 0, 0, 0];
	ratings.forEach((rating) => ratingCounts[rating.productRating - 1]++);

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'starFilter',
		defaultValue: 'all',
		onChange: setStarFilter,
	});

	const group = getRootProps();

	return (
		<Box borderWidth="1px" borderRadius="lg" flex="1" p={4}>
			<Flex direction="column" gap={4}>
				<Text fontSize="xl" fontWeight="bold" bg="#fafafa" p={2} >
					商品評價
				</Text>
				<Box
					borderWidth="1px"
					borderRadius="md"
					p={1}
					bg="gray.50"
					maxWidth="full"
				>
					<Flex justifyContent="space-between" alignItems="flex-start">
						<VStack align="start" spacing={0} minWidth="100px">
							<Text fontSize="2xl" fontWeight="bold">
								{averageRating.toFixed(1)}
							</Text>
							<HStack spacing={1}>
								{[1, 2, 3, 4, 5].map((i) => (
									<StarIcon
										key={i}
										color={
											i <= Math.floor(averageRating)
												? 'yellow.400'
												: i - averageRating < 1 && i - averageRating > 0
													? 'yellow.200'
													: 'gray.300'
										}
										w={3}
										h={3}
									/>
								))}
							</HStack>
							<Text fontSize="xs" mt={1}>
								{ratings.length} 則評價
							</Text>
						</VStack>
						<VStack align="stretch" spacing={1} flex={1} ml={4}>
							{[5, 4, 3, 2, 1].map((i) => (
								<Flex key={i} align="center">
									<Text width="15px" fontSize="xs" mr={2}>
										{i}
									</Text>
									<Progress
										value={(ratingCounts[i - 1] / ratings.length) * 100}
										flex={1}
										size="xs"
										mr={2}
									/>
									<Text width="20px" fontSize="xs" textAlign="right">
										{ratingCounts[i - 1]}
									</Text>
								</Flex>
							))}
						</VStack>
					</Flex>
				</Box>

				<Flex wrap="wrap" gap={2}>
					<RadioGroup {...group}>
						<HStack>
							{['all', '5', '4', '3', '2', '1'].map((value) => {
								const radio = getRadioProps({ value });
								return (
									<CustomRadio key={value} {...radio}>
										{value === 'all' ? '全部' : `${value} 星`}
									</CustomRadio>
								);
							})}
						</HStack>
					</RadioGroup>
					<CustomRadio
						isChecked={hasCommentFilter}
						onChange={(e) => setHasCommentFilter(e.target.checked)}
					>
						只看有評論的評價
					</CustomRadio>
				</Flex>

				<Button colorScheme="blue">查看全部評價</Button>

				{filteredRatings.map((rating, index) => (
					<Box key={index} mt={4} p={4} borderWidth="1px" borderRadius="lg">
						<Flex align="center" mb={2}>
							<HStack mr={4}>
								{[1, 2, 3, 4, 5].map((i) => (
									<StarIcon
										key={i}
										color={
											i <= rating.productRating ? 'yellow.400' : 'gray.300'
										}
									/>
								))}
							</HStack>
							<Text>{new Date(rating.ratingDate).toLocaleDateString()}</Text>
						</Flex>
						<Flex align="center" mb={2}>
              {rating.buyerAvatar && (
                <Image
                  src={rating.buyerAvatar}
									alt={rating.buyerName}
									boxSize="40px"
									borderRadius="full"
									mr={2}
								/>
							)}
							<Text fontWeight="bold">{rating.buyerName}</Text>
						</Flex>
						<Text mb={2}>{rating.comment || '這位買家沒有留下評論'}</Text>
						<Text fontSize="sm" color="gray.500">
							規格：{rating.spec1Name} / {rating.spec2Name}
						</Text>
					</Box>
				))}
			</Flex>
		</Box>
	);
};

export default RatingSection;
