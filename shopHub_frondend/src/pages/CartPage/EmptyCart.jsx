import React from 'react';
import { Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom'
export const EmptyCart = () => {
    const navigator=useNavigate();
    return(
        <Box
        textAlign="center"
        py={10}
        px={6}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="70vh"
      >
        <Image
          src="http://54.199.192.205/shopHub/assets/cartNoPrd.png" 
          alt="Empty Cart"
          boxSize={{ base: '150px', md: '200px' }}
          mb={6}
           borderRadius="full"
        />
        <Heading size="xl" mb={4}>
          您的購物車是空的
        </Heading>
        <Text fontSize="lg" color="gray.500" mb={6}>
          看來您還沒有將任何商品加入購物車。
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => navigator('/')}
        >
          去逛逛
        </Button>
      </Box>
    )
}