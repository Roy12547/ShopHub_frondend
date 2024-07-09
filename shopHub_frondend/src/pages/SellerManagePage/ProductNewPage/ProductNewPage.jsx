import React, { useEffect } from 'react';
import SellerNavbar from '../components/SellerNavbar';
import ScrollSpy from 'react-ui-scrollspy';
import { Box, Container, Flex, VStack } from '@chakra-ui/layout';
import { Button, useDisclosure } from '@chakra-ui/react';
import Navigation from './components/Navigation';
import { Switch } from '@chakra-ui/react';
import {
	BasicSection,
	SellInfoSection,
	ShipSection,
	OtherSection,
} from './section';
import { StyleProductNewPage } from './StyleProductNewPage';
import ConfirmCancelModal from './components/ConfirmCancelModal';
import { useForm, FormProvider } from 'react-hook-form';
import { useUploadImg } from '../hook/useUploadImg';

const ProductNewPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const methods = useForm();
	const { files, formData } = useUploadImg();

	const onSubmit = (data) => {
		// const formData = new FormData();
		// files.forEach((file, index) => {
		// 	formData.append(`files[${index}]`, data.productImg[index]);
		// });

		// // Example: Logging formData entries for verification
		// for (let pair of formData.entries()) {
		// 	console.log(pair[0] + ': ' + pair[1]);
		// }
		const formData = new FormData();
	};
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<StyleProductNewPage>
					<Flex
						backgroundColor={'#f6f6f6'}
						width={'100%'}
						flexDirection={'column'}
						scrollPaddingTop={'800px'}
					>
						<Flex
							width={'100%'}
							position={'sticky'}
							flexDirection={'column'}
							top={0}
							zIndex={99}
							gap={0}
						>
							<SellerNavbar />
							<Navigation />
						</Flex>
						<ScrollSpy
							scrollThrottle={100}
							onUpdateCallback={(id) => console.log(id)}
							useBoxMethod={true}
							offsetTop={600}
						>
							<Flex direction={'column'} width={'80%'} margin={'0 auto'}>
								<BasicSection />
								<SellInfoSection />
								<ShipSection />
								<OtherSection />
							</Flex>
						</ScrollSpy>
						<Flex justify={'end'} width={'95%'} gap={2} margin={'5px auto'}>
							<Button onClick={onOpen}>取消</Button>
							<Button type="submit">儲存並上架</Button>
						</Flex>
					</Flex>
					<ConfirmCancelModal onClose={onClose} isOpen={isOpen} />
				</StyleProductNewPage>
			</form>
		</FormProvider>
	);
};

export default ProductNewPage;
