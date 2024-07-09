import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';


export const LoginNavbar = () => {
	return (
		<Box
		bgGradient="linear(to-l, #7928CA, #FF0080)"
		pt={{ base: 1 }}
		py={{ base: 2 }}
		px={{ base: 4 }}
		display="flex"
		justifyContent={'space-between'}
		alignItems="center"
	  >
	
	<Heading color={'#fff'}>ShopHub</Heading>
	  </Box>


	// 	<Box
	// 	bgGradient="linear(to-l, #7928CA, #FF0080)"
	// 	pt={{ base: 1 }}
	// 	py={{ base: 2 }}
	// 	px={{ base: 4 }}
	// 	display="flex"
	// 	justifyContent={'space-between'}
	// >
    //         <Image ml={'5rem'}
    //             src="http://54.199.192.205/shopHub/assets/logo.jpg"
    //             boxSize={{ base: '150px', md: '200px' }}
    //             objectFit="contain"
    //         />
	// 		    <Heading 
    //                 as="h1"
    //                 fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} // 調整字體大小
    //                 color="black" // 設置字體顏色
    //                 // 設置字體粗細
                   
    //             >
    //                 登入
    //             </Heading>
     
    // </Box>
	);
};
