// 退貨頁面
import React from 'react';
import {Button, Flex, Grid, GridItem, Input, Stack, Text, Textarea,Select } from '@chakra-ui/react';
import BuyerMenu from '../BuyerMenu';
import StyledBox from '../StyledBox'

function Return() {
    let [value, setValue] = React.useState('');

    let handleInputChange = (e) => {
        let inputValue = e.target.value;
        setValue(inputValue);
    };

    return (
        <Flex
            p={{ base: '2', md: '5' }}
            mr={{ base: '2', md: '70' }}
            ml={{ base: '2', md: '70' }}
            justifyContent="center"
        >
           <BuyerMenu />
           <StyledBox>
                <Text fontSize={'30px'}>退換貨申請</Text>
                <hr/>
                

                 <Grid templateColumns="1fr 3fr" gap={6} alignItems="center" mt={'10px'}>
                    
                 <GridItem textAlign="left">退/換貨 :</GridItem>
                    <GridItem textAlign="right">
                        <Stack spacing={3}>
                            <Select defaultValue="" >
                                <option value="" disabled>請選取指定項目</option>
                                <option value='option1'>退貨</option>
                                <option value='option2'>換貨</option>
                            </Select>            
                        </Stack>
                    </GridItem>
                    
                    <GridItem textAlign="left">您 (買家) 的用戶帳號 :</GridItem>
                    <GridItem textAlign="right">
                        <Stack spacing={3}>
                            <Input variant="outline" />
                        </Stack>
                    </GridItem>

                    <GridItem textAlign="left">訂單編號 :</GridItem>
                    <GridItem textAlign="right">
                        <Stack spacing={3}>
                            <Input variant="outline" />
                        </Stack>
                    </GridItem>

                    <GridItem textAlign="left">完整商品名稱 :</GridItem>
                    <GridItem textAlign="right">
                        <Stack spacing={3}>
                            <Input variant="outline" />
                        </Stack>
                    </GridItem>

                    <GridItem colSpan={2}>
                        <Text mb='8px'>描述退換貨原因: </Text>
                        <Textarea
                            value={value}
                            onChange={handleInputChange}
                            placeholder='描述原因'
                            size='md'
                            resize='none' // 固定大小，避免用戶調整
                            height='150px'
                        />
                    </GridItem>

                    <GridItem colSpan={2}>
                        <Flex justify="flex-end" mt={4}>
                            <Button colorScheme="black" variant="outline">
                                送出
                            </Button>
                        </Flex>
                    </GridItem>
                </Grid>
            </StyledBox>
        </Flex>
    );
}

export default Return;