import React from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Input,
} from '@chakra-ui/react';

const SpecTable = () => {
	return (
		<TableContainer width={'100%'}>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>規格一</Th>
						<Th>價格</Th>
						<Th>商品數量</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td></Td>
						<Td>
							<Input />
						</Td>
						<Td isNumeric>
							<Input />
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default SpecTable;
