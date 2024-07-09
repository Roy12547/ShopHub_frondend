import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export const FailPay = ({ orderDetails }) => {
    const navigate = useNavigate();
    const handleRetry = () => {
        navigate('/cart');
    };

    return (
        <>
            <Box textAlign="center" py={10} px={6}>
                <WarningIcon boxSize={'50px'} color={'red.500'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    付款失敗
                </Heading>
                <Text color={'gray.500'}>很抱歉，您的付款過程中發生錯誤。請重試。</Text>
                {orderDetails && (
                    <VStack spacing={4} mt={6}>
                        <Text>訂單編號: {orderDetails.merchantTradeNo}</Text>
                        <Text>交易金額: {orderDetails.tradeAmt}</Text>
                        <Text>交易時間: {orderDetails.paymentDate}</Text>
                    </VStack>
                )}
                <Button colorScheme="red" variant="solid" mt={6} onClick={handleRetry}>
                    返回購物車
                </Button>
            </Box>
        </>
    );
};