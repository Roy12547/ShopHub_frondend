import React, { useEffect, useState } from 'react';
import {
	useForm,
	Controller,
	FormProvider,
	useFieldArray,
} from 'react-hook-form';
import BasicInfo from './components/BasicInfo';
import Cookies from 'js-cookie';

import SalesInfo from './components/SalesInfo';
import SubmitButtonGroup from './components/SubmitButtonGroup';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { StyledCreateProductPage } from './StyledCreateProductPage';
import LowestBuy from './components/LowestBuy';
import { Box } from '@chakra-ui/layout';
import { testFields } from '../ProductNewPage/validation/testFields';
import Specs from './components/Spec';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	createProductAPI,
	getCategoryAPI,
	updateProductAPI,
} from '../../../api/productCRUDAPI';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
const CreateProductPage = () => {
	const [fileList, setFileList] = useState([]);
	const [preview, setPreview] = useState([]);
	const [selectedFile, setSelectedFile] = useState([]);

	const [images, setImages] = useState([]);

	const [openSpec, setOpenSpec] = useState(false);
	const [openFistTime, setOpenFistTime] = useState(true);
	const [category, setCategory] = useState([]);

	const location = useLocation();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const editedProduct = location.state?.editedProduct ?? null;
	console.log(editedProduct);
	// *todo 如果有需要 將屬性補齊
	const methods = useForm({
		defaultValues: {
			basicInfo: {
				productName: editedProduct?.product.productName,
				productImg: null,
				category: editedProduct?.product.categoryId,
				description: editedProduct?.product.productDetail,
			},
			lowestBuy: 1, // Initial value for lowestBuy
			specs: editedProduct?.prodSpecs?.reduce((acc, spec) => {
				// 處理第一個規格
				if (spec && spec.spec1) {
					let existingSpecIndex = acc.findIndex((s) => s.spec === spec.spec1);
					if (existingSpecIndex !== -1) {
						// 檢查屬性是否已經存在
						const existingProperty = acc[existingSpecIndex].properties.find(
							(p) => p.specProp === spec.spec1Name
						);
						if (!existingProperty) {
							acc[existingSpecIndex].properties.push({
								id: uuidv4(),
								specImg: spec.specBase64,
								specProp: spec.spec1Name,
							});
						}
					} else {
						acc.push({
							spec: spec.spec1,
							properties: [
								{
									id: uuidv4(),
									specImg: spec.specBase64,
									specProp: spec.spec1Name,
								},
							],
						});
					}
				}

				// 處理第二個規格
				if (spec && spec.spec2) {
					let existingSpecIndex = acc.findIndex((s) => s.spec === spec.spec2);
					if (existingSpecIndex !== -1) {
						// 檢查屬性是否已經存在
						const existingProperty = acc[existingSpecIndex].properties.find(
							(p) => p.specProp === spec.spec2Name
						);
						if (!existingProperty) {
							acc[existingSpecIndex].properties.push({
								id: uuidv4(),
								specImg: null,
								specProp: spec.spec2Name,
							});
						}
					} else {
						acc.push({
							spec: spec.spec2,
							properties: [
								{
									id: uuidv4(),
									specImg: null,
									specProp: spec.spec2Name,
								},
							],
						});
					}
				}

				return acc;
			}, []) || [
				{
					spec: '',
					properties: [
						{
							id: uuidv4(),
							specImg: null,
							specProp: '',
						},
					],
				},
			],
			specCombinations: [],
			salesInfo: {
				price: editedProduct?.product.price,
				quantity: editedProduct?.product.stock,
			},
		},
		mode: 'onChange',
	});
	const { control } = methods;
	const formData = methods.watch();

	// *categoryApi
	useEffect(() => {
		getCategoryAPI().then((response) => {
			console.log(response.data);
			const category = response.data;
			setCategory(category);
		});
	}, []);
	const getFileExtensionFromUrl = (url) => {
		// 從 URL 中提取文件擴展名
		const match = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
		return match ? match[1].toLowerCase() : 'jpg'; // 默認為 jpg
	};

	const getMimeType = (extension) => {
		const mimeTypes = {
			jpg: 'image/jpeg',
			jpeg: 'image/jpeg',
			png: 'image/png',
			gif: 'image/gif',
			webp: 'image/webp',
			svg: 'image/svg+xml',
		};
		return mimeTypes[extension] || 'image/jpeg'; // 默認為 image/jpeg
	};

	useEffect(() => {
		if (editedProduct && editedProduct.imgUrlList) {
			axios
				.get('http://localhost:8081/product/getImgFile', {
					params: { urlList: editedProduct.imgUrlList },
					paramsSerializer: (params) => {
						return params.urlList
							.map((url) => `urlList=${encodeURIComponent(url)}`)
							.join('&');
					},
				})
				.then((response) => {
					console.log('Response from server:', response.data);
					const imageDataList = response.data.data;
					const files = imageDataList.map((imageData, index) => {
						if (imageData.status === 'success') {
							// 解碼 Base64 字符串
							const binaryString = atob(imageData.data);
							const len = binaryString.length;
							const bytes = new Uint8Array(len);
							for (let i = 0; i < len; i++) {
								bytes[i] = binaryString.charCodeAt(i);
							}

							// 根據 URL 獲取文件擴展名
							const extension = imageData.url.split('.').pop().toLowerCase();
							const mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;

							const blob = new Blob([bytes], { type: mimeType });
							const file = new File([blob], `image-${index}.${extension}`, {
								type: mimeType,
							});

							console.log(
								'Created file:',
								file.name,
								'Size:',
								file.size,
								'Type:',
								file.type
							);

							return {
								id: uuidv4(),
								name: file.name,
								result: URL.createObjectURL(blob),
								file: file,
							};
						} else {
							console.error('Error fetching image:', imageData.message);
							return {
								id: uuidv4(),
								name: `image-${index}.jpg`,
								result: imageData,
								file: null,
							};
						}
					});
					setFileList(files);
				})
				.catch((error) => {
					console.error('Error fetching images:', error);
				});
		}
	}, [editedProduct]);
	// const handleFileChange = (e) => {
	// 	let fileList = Array.from(e.target.files);

	// 	const readAllFiles = fileList.map((file) => {
	// 		const reader = new FileReader();
	// 		return new Promise((resolve, reject) => {
	// 			reader.onloadend = () => {
	// 				resolve({ name: file.name, result: reader.result });
	// 			};
	// 			reader.onerror = reject;
	// 			reader.readAsDataURL(file);
	// 		});
	// 	});

	// 	Promise.all(readAllFiles)
	// 		.then((fileData) => {
	// 			setFileList((prevFile) => [
	// 				...prevFile,
	// 				...fileData.map((result) => ({ id: uuidv4(), ...result })),
	// 			]);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error reading files', error);
	// 		});
	// };
	const handleFileChange = (newFiles) => {
		setFileList((prevFiles) => [...prevFiles, ...newFiles]);
	};
	// const handleDeleteItem = (filedID) => {
	// 	setFileList((prev) => prev.filter((item) => item.id !== filedID));
	// };
	const handleDeleteItem = (id) => {
		setFileList((prevFiles) => prevFiles.filter((file) => file.id !== id));
	};

	const handleOnSingleFilePreview = (index, files) => {
		const file = files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setPreview((prev) => ({ ...prev, [index]: reader.result }));
		};
		console.log(preview);
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleDeletePreview = (index) => {
		console.log('preview', index);
		setPreview((prev) => {
			const updatedPreviews = { ...prev };
			delete updatedPreviews[index];
			return updatedPreviews;
		});
	};
	function base64ToBlob(base64, mimeType) {
		const bytes = window.atob(base64.split(',')[1]); // atob() 是同步的
		let array = new Uint8Array(bytes.length);
		for (let i = 0; i < bytes.length; i++) {
			array[i] = bytes.charCodeAt(i);
		}
		return new Blob([array], { type: mimeType }); // Blob 的構造函數也是同步的
	}

	const onSubmit = (data) => {
		const formData = new FormData();
		const addedProduct = {
			product: {
				productId: editedProduct?.product.productId,
				sellerId: Cookies.get('userId'),

				stock: data.salesInfo.quantity,
				productName: data.basicInfo.productName,
				price: data.salesInfo.price,
				productStatus: 'IN_STOCK',

				categoryId: parseInt(data.basicInfo.category, 10),
				productDetail: data.basicInfo.description,
			},
			prodSpecs: [],
		};

		if (openSpec) {
			addedProduct.prodSpecs = data.specCombinations.map((combination) => {
				const { prodSpecId, spec1Name, spec1, spec2Name, spec2, price, stock } =
					combination;

				const specBase64 = preview[spec1] || '';

				// *根據 spec1Name 和 spec2Name 找到對應的 prodSpecId
				const matchedProdSpec = editedProduct?.prodSpecs?.find(
					(spec) => spec.spec1Name === spec1 && spec.spec2Name === spec2
				);
				console.log(matchedProdSpec);

				return {
					prodSpecId,
					spec1: spec1Name,
					spec1Name: spec1,
					specBase64,
					spec2: spec2Name,
					spec2Name: spec2,
					price: parseInt(price, 10),
					stock: parseInt(stock, 10),
				};
			});
		}

		formData.append('addedProduct', JSON.stringify(addedProduct));
		fileList.forEach((file) => {
			formData.append('files', file.file, file.name);
		});

		console.log(formData.get('addedProduct'));
		if (editedProduct) {
			updateProductAPI(formData).then(() => {
				queryClient.invalidateQueries(['productList']);
				queryClient.refetchQueries;
				navigate('../product/list');
			});
		} else {
			createProductAPI(formData).then(() => {
				queryClient.refetchQueries;

				navigate('../product/list');
			});
		}
		// *在 API 請求成功後進行頁面跳轉或清空表單數據

		navigate('../product/list');
		// *或者清空表單數據
		// methods.reset();
	};

	const onCancel = () => {
		navigate('../product/list');
	};
	const handleOpenSpec = () => {
		setOpenSpec((prev) => !prev);
	};
	return (
		<StyledCreateProductPage>
			<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="form">
						<BasicInfo
							fileList={fileList}
							handleFileChange={handleFileChange}
							handleDeleteItem={handleDeleteItem}
							category={category}
							testFields={testFields}
							editedProduct={editedProduct}
						/>
						<div className="section_wrap">
							<div className="section_title">屬性</div>
							<button
								className="w-fit cursor-pointer transition-all bg-blue-500 text-white px-2 py-2 rounded-lg border-blue-600
								border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
								active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
								type="button"
								onClick={handleOpenSpec}
							>
								{openSpec ? '關閉規格表' : '新增產品規格'}
							</button>
							{openSpec && (
								<Specs
									preview={preview}
									handleOnSingleFilePreview={handleOnSingleFilePreview}
									handleDeletePreview={handleDeletePreview}
									openSpec={openSpec}
									testFields={testFields}
									control={control}
									editedProduct={editedProduct}
								/>
							)}
							{!openSpec && <SalesInfo testFields={testFields} />}
							<LowestBuy testFields={testFields} />
						</div>
						<SubmitButtonGroup onCancel={onCancel} testFields={testFields} />
					</form>
				</FormProvider>
			</Box>
		</StyledCreateProductPage>
	);
};

export default CreateProductPage;
