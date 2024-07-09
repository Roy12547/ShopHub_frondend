import React from 'react';
import { Stack, Text, Box, Image, Flex, Divider } from '@chakra-ui/react';
const OpenMess = ({ messages }) => {
	return (
		<Flex direction="column">
			{console.log(messages.length)}
			{messages.length === 0 ? (
				<Box display="flex" alignItems="center" mb={4}>
					<Text color="blue.600" fontSize="xl">
						目前沒有訊息
					</Text>
				</Box>
			) : (
				<>
					{messages.map((item, index) => (
						<React.Fragment key={index}>
							<Box key={index} display="flex" alignItems="center" mb={4}>
								<Image
									boxSize="50px"
									objectFit="contain"
									mr={4}
									src={item.imageURL}
								/>
								<Stack spacing={1}>
									<Text color="black">{item.title}</Text>
									<Text color="blue.600" fontSize="xl">
										{item.content}
									</Text>
								</Stack>
							</Box>
							{index !== messages.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</>
			)}
		</Flex>
	);
};

export default OpenMess;
