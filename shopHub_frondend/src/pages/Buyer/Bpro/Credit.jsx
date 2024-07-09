import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Stack,
    Box,
    FormLabel,
    Input,
    HStack,
    FormErrorMessage,
    FormControl,
    Text,
    VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

function Credit() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log('Form data:', data);
        // 後端API
        onClose();
        reset();
    }

    const handleExpiryInputChange = (e, fieldName) => {
        let value = e.target.value.replace(/\D/g, ''); // 移除非數字字符
        if (value.length > 2) {
            value = value.slice(0, 2);
        }
        e.target.value = value;
    };

    return (
        <>
            <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                variant="solid"
                ml="auto"
                onClick={onOpen}
            >
                新增信用卡
            </Button>

            <Drawer
                onClose={() => {
                    onClose();
                    reset();
                }}
                isOpen={isOpen}
                size="sm"
                placement="right"
                initialFocusRef={firstField}
                closeOnOverlayClick={false}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerHeader borderBottomWidth="1px">新增信用卡</DrawerHeader>
                    <DrawerBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing="24px">

                                <FormControl isRequired isInvalid={errors.cardNumber}>
                                    <FormLabel htmlFor="cardNumber">信用卡卡號</FormLabel>
                                    <Input
                                        ref={firstField}
                                        id="cardNumber"
                                        placeholder="信用卡卡號"
										maxLength={19}
                                        {...register('cardNumber', {
                                            required: '必填項目',
                                            pattern: {
                                                value: /^[0-9]{13,19}$/,
                                                message: '請輸入有效的信用卡卡號（13到19位數字）'
                                            }
                                        })}
                                    />
                                    <FormErrorMessage>{errors.cardNumber && errors.cardNumber.message}</FormErrorMessage>
                                </FormControl>

                                <VStack spacing="24px">
                                    <HStack spacing="24px">
                                        <FormControl isRequired isInvalid={errors.expiryMonth} flex="1">
                                            <FormLabel htmlFor="expiryMonth">到期月 (MM)</FormLabel>
                                            <Input
                                                id="expiryMonth"
                                                placeholder="MM"
                                                maxLength={2}
                                                onInput={(e) => handleExpiryInputChange(e, 'expiryMonth')}
                                                {...register('expiryMonth', {
                                                    required: '必填項目',
                                                    pattern: {
                                                        value: /^(0[1-9]|1[0-2])$/,
                                                        message: '請輸入有效的到期月（格式：MM）'
                                                    }
                                                })}
                                            />
                                            <FormErrorMessage>{errors.expiryMonth && errors.expiryMonth.message}</FormErrorMessage>
                                        </FormControl>

                                        <Text fontSize="2xl" alignSelf="flex-end">/</Text>

                                        <FormControl isRequired isInvalid={errors.expiryYear} flex="1">
                                            <FormLabel htmlFor="expiryYear">到期年 (YY)</FormLabel>
                                            <Input
                                                id="expiryYear"
                                                placeholder="YY"
                                                maxLength={2}
                                                onInput={(e) => handleExpiryInputChange(e, 'expiryYear')}
                                                {...register('expiryYear', {
                                                    required: '必填項目',
                                                    pattern: {
                                                        value: /^\d{2}$/,
                                                        message: '請輸入有效的到期年（格式：YY）'
                                                    }
                                                })}
                                            />
                                            <FormErrorMessage>{errors.expiryYear && errors.expiryYear.message}</FormErrorMessage>
                                        </FormControl>
                                    </HStack>

                                    <FormControl isRequired isInvalid={errors.securityCode} flex="1">
                                        <FormLabel htmlFor="securityCode">安全驗證碼</FormLabel>
                                        <Input
                                            id="securityCode"
                                            placeholder="安全驗證碼"
                                            maxLength={4}
                                            {...register('securityCode', {
                                                required: '必填項目',
                                                pattern: {
                                                    value: /^[0-9]{3,4}$/,
                                                    message: '請輸入有效的安全驗證碼（3到4位數字）'
                                                }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.securityCode && errors.securityCode.message}</FormErrorMessage>
                                    </FormControl>
                                </VStack>

                                <FormControl isRequired isInvalid={errors.CardfullName}>
                                    <FormLabel htmlFor="CardfullName">信用卡姓名</FormLabel>
                                    <Input
                                        id="CardfullName"
                                        placeholder="信用卡姓名"
                                        maxLength={50}
                                        {...register('CardfullName', {
                                            required: '必填項目',
                                            pattern: {
                                                value: /^[a-zA-Z\s]+$/,
                                                message: '請輸入有效的姓名，且不能包含特殊字符'
                                            }
                                        })}
                                    />
                                    <FormErrorMessage>{errors.CardfullName && errors.CardfullName.message}</FormErrorMessage>
                                </FormControl>

                                <DrawerHeader borderBottomWidth="1px">帳單地址</DrawerHeader>

                                <FormControl isRequired isInvalid={errors.address}>
                                    <FormLabel htmlFor="address">信用卡帳單地址</FormLabel>
                                    <Input
                                        id="address"
                                        placeholder="帳單住址"
                                        maxLength={50}
                                        {...register('address', {
                                            required: '必填項目',
                                            pattern: {
                                                value: /^[\u4e00-\u9fa50-9]+$/,
                                                message: '地址只能包含中文字符、數字'
											}
                                            })}
                                    />
                                    <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={errors.postal}>
                                    <FormLabel htmlFor="postal">郵遞區號</FormLabel>
                                    <Input
                                        id="postal"
                                        placeholder="郵遞區號"
                                        maxLength={6}
                                        {...register('postal', {
                                            required: '必填項目',
                                            pattern: {
                                                value: /^[0-9]{3,6}$/,
                                                message: '請輸入有效的郵遞區號'
											}
                                            })}
                                    />
                                    <FormErrorMessage>{errors.postal && errors.postal.message}</FormErrorMessage>
                                </FormControl>

                            </Stack>

                            <DrawerFooter borderTopWidth="1px">
                                <Button variant="outline" mr={3} onClick={() => {
                                    onClose();
                                    reset();
                                }}>
                                    取消
                                </Button>
                                <Button colorScheme="blue" type="submit">確認送出</Button>
                            </DrawerFooter>
                        </form>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Credit;
