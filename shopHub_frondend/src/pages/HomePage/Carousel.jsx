import React, { useState } from 'react';
import { Box, IconButton, Image,  useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

export default function Carousel() {
	const carousels = [
		['http://54.199.192.205/shopHub/carousel/Chanelperfume.webp','香水'],
		['http://54.199.192.205/shopHub/carousel/HermesBirkinBag.jpeg','包包'],
		['http://54.199.192.205/shopHub/carousel/Uniqloclothing.png','衣服'],
		['http://54.199.192.205/shopHub/carousel/macbook.webp','電腦'],
		['http://54.199.192.205/shopHub/carousel/PatekPhilippe.webp','手錶'],
		['http://54.199.192.205/shopHub/carousel/sofa.jpg','居家'],
	];

	const [slider, setSlider] = useState(null);

	const settings = {
		dots: true,
		arrows: false,
		fade: false,
		infinite: true,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 5000,
		slidesToShow: 2,
		slidesToScroll: 1,
		centerMode: false,
		centerPadding: '1px', // 修改此處以調整兩張圖片之間的間距
	};

	const top = useBreakpointValue({ base: '90%', md: '50%' });
	const side = useBreakpointValue({ base: '30%', md: '10px' });

	return (
		<Box
			position={'relative'}
			height={'400px'}
			width={'full'}
			overflow={'hidden'}
			// 確保超出部分被隱藏
			py={10}
			px={20} // 確保外層容器有適當的邊界
		>
			<link
				rel="stylesheet"
				type="text/css"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
			/>
			<link
				rel="stylesheet"
				type="text/css"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
			/>
			<IconButton
				aria-label="left-arrow"
				bg="rgba(224, 27, 144, 0.5)" // 改為半透明顏色
				color="white"
				borderRadius="full"
				position="absolute"
				left={side}
				top={top}
				transform={'translate(0%, -50%)'}
				zIndex={2}
				onClick={() => slider?.slickPrev()}
				_hover={{ bg: '#e01b90' }} // 鼠標懸停時改為濃色
				_focus={{ bg: '#e01b90' }} // 獲得焦點時改為濃色
			>
				<BiLeftArrowAlt />
			</IconButton>

			<IconButton
				aria-label="right-arrow"
				color="white"
				bg="rgba(121, 50, 199, 0.5)" // 改為半透明顏色
				borderRadius="full"
				position="absolute"
				right={side}
				top={top}
				transform={'translate(0%, -50%)'}
				zIndex={2}
				onClick={() => slider?.slickNext()}
				_hover={{ bg: '#7932c7' }} // 鼠標懸停時改為濃色
				// 獲得焦點時改為濃色
			>
				<BiRightArrowAlt />
			</IconButton>
			<Slider {...settings} ref={(slider) => setSlider(slider)}>
				{carousels.map((carousel, index) => (
					<Link
						key={index}
						to={`/search`}
						state={{
							searchValue: `${encodeURIComponent(carousel[1])}`,
							type: 'carousel',
						}}
					>
						<Box
							key={index}
							height={'300px'} // 根據需要調整
							maxW={'680px'} // 根據需要調整
							position="relative"
							m={4} // 添加 Box 間距
							borderWidth={2}
							borderColor="white"
							borderRadius={4}
							boxShadow="md"
							overflow={'hidden'}
							justifyItems={'center'}
						>
							<Image
								src={carousel[0]}
								objectFit="contain"
								position="absolute"
								top="50%"
								left="50%"
								transform="translate(-50%, -50%)"
								maxHeight="100%"
								maxWidth="100%"
							/>
						</Box>
					</Link>
				))}
			</Slider>
		</Box>
	);
}
