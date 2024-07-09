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
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import {BASE_URL} from '../../../utils/apiUtil'

function Address() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const firstField = React.useRef();

    const onSubmit = (data) => {
        console.log('Form data:', data);
        onClose();
        reset();
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
                新增地址
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

                    <DrawerHeader borderBottomWidth="1px">新增地址</DrawerHeader>

                    <DrawerBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing="24px">
                                <FormControl isRequired isInvalid={errors.fullName}>
                                    <FormLabel htmlFor="fullName">姓名</FormLabel>
                                    <Input
                                        ref={firstField}
                                        id="fullName"
                                        placeholder="姓名"
                                        maxLength={50}
                                        {...register('fullName', {
                                            required: '必填項目',
                                            pattern: {
                                                value: /^[\u4e00-\u9fa5]+$/,
                                                message: '請輸入有效的姓名，且不能包含特殊字符'
                                            }
                                        })}
                                    />
                                    <FormErrorMessage>{errors.fullName && errors.fullName.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={errors.phone}>
                                    <FormLabel htmlFor="phone">電話號碼</FormLabel>
                                    <Input
                                        id="phone"
                                        placeholder="電話號碼"
                                        maxLength={10}
                                        {...register('phone', {
                                            required: '必填項目',
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: '請輸入有效的電話或手機號碼'
                                            }
                                        })}
                                    />
                                    <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
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

                                <FormControl isRequired isInvalid={errors.address}>
                                    <FormLabel htmlFor="address">地址</FormLabel>
                                    <Input
                                        id="address"
                                        placeholder="住址"
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

export default Address;
