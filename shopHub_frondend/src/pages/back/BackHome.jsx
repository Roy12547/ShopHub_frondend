import React from 'react';
import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	Spacer,
	Stack,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BackHome = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex direction="column" align="center" justify="center" minHeight="80vh">
			<Box p={8}>
				<Heading mb={8}>歡迎來到後台管理系統</Heading>
				<Grid
					templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
					gap={6}
					w="80%"
				>
					<GridItem>
						<Box
							p={6}
							boxShadow="lg"
							borderWidth="1px"
							borderRadius="md"
							textAlign="center"
							bg="white"
						>
							<Heading size="md" mb={4} color={'black'}>
								最新消息管理
							</Heading>
							<Link to="/back/manageNews">
								<Button colorScheme="blue">管理最新消息</Button>
							</Link>
						</Box>
					</GridItem>

					{/* <GridItem>
							<Box
								p={6}
								boxShadow="lg"
								borderWidth="1px"
								borderRadius="md"
								textAlign="center"
								bg="white"
							>
								<Heading size="md" mb={4}>
									訂單管理
								</Heading>
								<Link to="/orders">
									<Button colorScheme="blue">查看訂單</Button>
								</Link>
							</Box>
						</GridItem> */}
				</Grid>
			</Box>
		</Flex>
	);
};

export default BackHome;
