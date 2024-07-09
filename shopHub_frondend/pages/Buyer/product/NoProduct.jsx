// 無訂單畫面
import React from "react";
import {
    Flex,
    Text,
    VStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons'



function NoProduct() {
    return(
        <Flex w="100%" justifyContent="center" mt={'100px'}>
        <VStack spacing={4} align="center">
            <StarIcon boxSize={'80px'} color='red.500' />
            <Text fontSize={'40px'}>尚未有訂單</Text>
        </VStack>
    </Flex>
    );
}
export default NoProduct;