import {
	Input,
	InputGroup,
	InputRightElement,
	Button,
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
export const SelectInput = () =>{
    return(
        <InputGroup size="md">
        <Input pr="4.5rem" placeholder="今天訂，明天到" bg="#fff" />
        <InputRightElement width="5rem">
            <Button h="2rem" size="lg" bg="#7928CA" _hover={{ bg: '#FF0080' }}>
                <IoSearch color="#fff" />
            </Button>
        </InputRightElement>
    </InputGroup>
    )
}