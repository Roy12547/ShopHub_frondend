import React, { useEffect, useState, useRef } from 'react';
import { StyledProductNewPage2 } from './StyledProductNewV3';
import CustomButton from '../components/CustomButton';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { testFields } from '../validation/testFields';
import { RiImageAddFill, RiDeleteBin6Line } from 'react-icons/ri';
import { Switch, Collapse } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteOutline } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';
import axios from 'axios';

const ProductNewPageV3 = () => {
	// *常數區
	const [selectedFile, setSelectedFile] = useState([]);
	const [fileList, setFileList] = useState([]);
	const [images, setImages] = useState([]);
	const [preview, setPreview] = useState({});
	const [openSpec, setOpenSpec] = useState(false);
	// const [category, setCategory] = useState([]);
	let category = [{}];
	const cateApi = 'http://localhost:8081/product/getAllCategories';

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		trigger,
		control,
		getValues,
		setValue,
	} = useForm({
		defaultValues: {
			spec: [{ specImg: null, specProp: '', specPrice: 0, specQuantity: 0 }],
		},
		mode: 'onChange',
	});
	const { fields, append, remove } = useFieldArray({ control, name: 'spec' });

	// const onFileChange = (e) => {
	// 	let images = [];
	// 	for (let i = 0; i < e.target.files.length; i++) {
	// 		images.push(e.target.files[i]);
	// 		let reader = new FileReader();
	// 		let file = e.target.files[i];
	// 		reader.onloadend = () => {
	// 			setSelectedFile((prevValue) => {
	// 				return [
	// 					...prevValue,
	// 					{
	// 						id: i,
	// 						filename: e.target.files[i].name,
	// 						filetype: e.target.files[i].type,
	// 						fileimage: reader.result,
	// 					},
	// 				];
	// 			});
	// 		};
	// 		if (e.target.files[i]) {
	// 			reader.readAsDataURL(file);
	// 		}
	// 	}
	// };
	const onFileChange = (e) => {
		let fileList = Array.from(e.target.files);

		const readAllFiles = fileList.map((file) => {
			const reader = new FileReader();
			return new Promise((resolve, reject) => {
				reader.onloadend = () => {
					resolve({ name: file.name, result: reader.result });
				};
				reader.onerror = reject;
				reader.readAsDataURL(file);
			});
		});

		Promise.all(readAllFiles)
			.then((fileData) => {
				setFileList((prevFile) => [
					...prevFile,
					...fileData.map((result) => ({ id: uuidv4(), ...result })),
				]);
			})
			.catch((error) => {
				console.error('Error reading files', error);
			});
	};

	const handleDeleteItem = (filedID) => {
		setFileList((prev) => prev.filter((item) => item.id !== filedID));
	};

	const handleDeletePreview = (index) => {
		console.log('preview', index);
		setPreview((prev) => {
			const updatedPreviews = { ...prev };
			delete updatedPreviews[index];
			return updatedPreviews;
		});
	};

	const handleOnSingleFilePreview = (index, files) => {
		const file = files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setPreview((prev) => ({ ...prev, [index]: reader.result }));
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	//  *這邊是call api的地方
	// todo 把圖片跟所有資訊組起一起送
	const onSubmit = async (e) => {
		// const formData = {
		// 	productName: e.target.elements.productName.value,
		// };

		// e.preventDefault();

		// e.target.reset();
		// if (selectedFile.length > 0) {
		// 	for (let i = 0; i < selectedFile.length; i++) {
		// 		setFiles((prevValue) => {
		// 			return [...prevValue, selectedFile[i]];
		// 		});
		// 	}

		// 	setSelectedFile([]);
		// }
		// // 組裝已選擇的檔案資料
		// const filesData = files.map((file) => ({
		// 	filename: file.filename,
		// 	filetype: file.filetype,
		// 	fileimage: file.fileimage,
		// }));

		// // 將表單欄位和檔案資料組合成一個物件
		// const submitData = {
		// 	...formData,
		// 	files: filesData,
		// };
		console.log(e);
	};

	const handleOpenSpec = () => {
		setOpenSpec((prev) => !prev);
	};

	// const specValues = useWatch({
	// 	control,
	// 	name: 'spec',
	// });

	// useEffect(() => {
	// 	const lastSpec = specValues[specValues.length - 1];
	// 	if (lastSpec && lastSpec.specProp !== '') {
	// 		const currentLength = fields.length;
	// 		append({ specImg: null, specProp: '' });
	// 		setTimeout(() => {
	// 			if (inputRefs.current[currentLength - 1]) {
	// 				inputRefs.current[currentLength - 1].focus();
	// 			}
	// 		}, 0);
	// 	}
	// }, [specValues, append, fields.length]);

	//* useEffect 區
	// * category Api

	useEffect(() => {
		axios.get(cateApi).then((response) => {
			console.log(response.data.data)
			category = response.data.data;
			console.log(category);
		});
	}, []);

	// *這邊是照片往後端送的地方
	// todo 改成跟規格等一起送
	useEffect(() => {
		console.log(fileList);
	}, [fileList]);

	useEffect(() => {
		console.log(preview);
	}, [preview]);
	arr(() => {
		console.log(category);
	});
	arr();
	return (
		<>
			<StyledProductNewPage2>
				<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
					<form onSubmit={handleSubmit(onSubmit)} className="form">
						{/* 1. 基本資訊 */}
						<div className="section_wrap">
							<div className="section_title">基本資訊</div>
							{/* 商品名稱 */}
							<div className="input_group">
								<label htmlFor="productName" className="label required">
									商品名稱
								</label>
								<div className="input_wrap">
									<div>
										<input
											type="text"
											name="productName"
											maxLength={20}
											placeholder="輸入商品名稱"
											className="input"
											{...register(
												'productName',
												testFields.find((field) => field.name === 'productName')
													.rules
											)}
										/>
										<span className="text-sm pl-1">{`${watch('productName') ? `${watch('productName').length}` : '0'}/20`}</span>
									</div>

									{errors.productName && (
										<div className="text-red-500 text-sm">
											{errors.productName.message}
										</div>
									)}
								</div>
							</div>
							{/* 商品圖片 */}
							<div className="input_group">
								<label htmlFor="productImg" className="label required">
									商品圖片
								</label>
								<div className="upload_and_preview flex flex-wrap gap-2">
									{fileList.map((item) => (
										<div className="img_box w-[80px] h-[80px]" key={item.id}>
											<img
												src={item.result}
												className="w-full h-full object-cover"
												alt={`image-${item.id}`}
											/>
											<div
												className="del_layer"
												onClick={() => handleDeleteItem(item.id)}
											>
												<MdDeleteOutline className="del_icon" size="1rem" />
											</div>
										</div>
									))}

									{fileList.length < 5 && (
										<div className="relative inline-block shadow-md ">
											<input
												name="productImg"
												type="file"
												accept="images/*"
												multiple
												className="input absolute w-full h-full top-0 bottom-0  opacity-0"
												{...register(
													'productImg',
													{
														onChange: onFileChange,
													},
													testFields.find(
														(field) => field.name === 'productImg'
													)?.rules
												)}
											/>
											<div className="w-[80px] h-[80px] flex flex-col items-center justify-center gap-1 border border-dashed shadow-md rounded-sm aspect-square ">
												<RiImageAddFill size={28} />
												<div className="text-xs">新增圖片</div>
												<div className="text-xs">{`${fileList.length} /5`}</div>
											</div>
										</div>
									)}
									{errors.productImg && (
										<div className="text-red-500 text-sm">
											{errors.productImg.message}
										</div>
									)}
								</div>
							</div>
							{/* 類別 */}
							<div className="input_group">
								<label htmlFor="category" className="label required">
									類別
								</label>
								<select name="category" className="select">
									<option value="" disabled>
										請選擇分類
									</option>
									
									<option value={1}>服裝/時尚</option>
									<option value={2}>3C/數位</option>
									<option value={3}>美妝/個人護理</option>
									<option value={4}>居家/家電</option>
									<option value={5}>運動/戶外</option>
								</select>
							</div>
							{/* 商品描述 */}
							<div className="flex flex-col gap-2">
								<label htmlFor="description" className="label required">
									商品描述
								</label>
								<div className="flex flex-col gap-2">
									<Controller
										name="description"
										control={control}
										rules={
											testFields.find((field) => field.name === 'description')
												.rules
										}
										render={({ field }) => (
											<ReactQuill
												theme="snow"
												value={field.value || ''}
												onChange={field.onChange}
												className="h-[150px]"
											/>
										)}
									/>
									<div className="flex flex-row justify-between">
										{errors.description ? (
											<div className="text-red-500 text-sm">
												{errors.description.message}
											</div>
										) : (
											<div></div>
										)}
										<span className="text-right text-xs">{`${watch('description') ? `${watch('description').length}` : '0'}/600`}</span>
									</div>
									{/* <label htmlFor="description" className="label required">
								商品描述
							</label>
							<textarea
								rows="7"
								cols="100"
								maxLength={600}
								name="description"
								value={'我是描述我是描述我是描述'}
								className="input resize-none relative"
								{...register(
									'description',
									testFields.find((field) => field.name === 'description').rules
								)}
								onBlur={() => trigger('description')}
							></textarea>
							<div className="flex flex-row justify-between">
								{errors.description ? (
									<div className="text-red-500 text-sm">
										{errors.description.message}
									</div>
								) : (
									<div></div>
								)}
								<span className="text-right text-xs">{`${watch('description') ? `${watch('description').length}` : '0'}/600`}</span>
							</div> */}
								</div>
							</div>
						</div>
						{/* 2. 銷售資訊 */}
						<div className="section_wrap">
							<div className="section_title">屬性</div>
							<button
								className="w-fit cursor-pointer transition-all bg-blue-500 text-white px-2 py-2 rounded-lg border-blue-600
								border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
								active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
								type="button"
								onClick={handleOpenSpec}
							>
								{openSpec ? '關閉規格表' : '新增規格'}
							</button>
							{/* 規格 */}
							{openSpec ? (
								<div className="spec1 bg-slate-300 p-4 flex flex-col gap-2 rounded-lg">
									<div className="input_group">
										<label htmlFor="spec1" className="label required">
											規格
										</label>
										<div className="flex flex-col gap-2">
											<input
												type="text"
												name="spec1"
												className="input"
												placeholder="Ex:顏色"
												{...register(
													'spec1',
													testFields.find((field) => field.name === 'spec1')
														.rules
												)}
											/>
											{errors.spec1 && (
												<div className="text-red-500 text-sm">
													{errors.spec1.message}
												</div>
											)}
										</div>
									</div>
									<hr />
									<div className="spec_prop flex flex-wrap gap-4">
										{fields.map((item, index) => {
											return (
												<div
													className="prop flex flex-row items-start gap-3"
													key={item.id}
												>
													<div className="relative inline-block shadow-md border-dashed cursor-pointer">
														<input
															accept="images/*"
															type="file"
															placeholder={'請輸入'}
															className="input absolute w-full h-full top-0 bottom-0  opacity-0"
															{...register(`spec.${index}.specImg`)}
															onChange={(e) =>
																handleOnSingleFilePreview(index, e.target.files)
															}
														/>
														{preview[index] ? (
															<img
																src={preview[index]}
																className="w-[30px] h-[30px] aspect-square"
															/>
														) : (
															<RiImageAddFill size={'30px'} />
														)}
													</div>
													<label htmlFor="prop" className="label required">
														屬性
													</label>
													<div className="flex flex-col gap-2">
														<input
															type="text"
															name="prop"
															placeholder="Ex: 紅色"
															className="input"
															width={'30px'}
															{...register(`spec.${index}.specProp`, {
																required: '此欄位不能留空',
															})}
														/>
														{errors.spec?.[index]?.specProp && (
															<div className="text-red-500 text-sm">
																{errors.spec[index].specProp.message}
															</div>
														)}
													</div>
													<label htmlFor="price" className="label required">
														價格
													</label>
													<div className="flex flex-col gap-2">
														<input
															type="text"
															name="price"
															placeholder="＄NT 價格 "
															className="input"
															width={'30px'}
															{...register(`spec.${index}.specPrice`, {
																required: '此欄位不能留空',
																min: { value: 1, message: '價格不可小於1' },
															})}
														/>
														{errors.spec?.[index]?.specPrice && (
															<div className="text-red-500 text-sm">
																{errors.spec[index].specPrice.message}
															</div>
														)}
													</div>
													<label htmlFor="quantity" className="label required">
														數量
													</label>
													<div className="flex flex-col gap-2 items-start">
														<input
															type="text"
															name="quantity"
															placeholder="數量"
															className="input"
															{...register(`spec.${index}.specQuantity`, {
																required: '此欄位不能留空',
																min: { value: 1, message: '數量不可小於1' },
															})}
														/>
														{errors.spec?.[index]?.specQuantity && (
															<div className="text-red-500 text-sm">
																{errors.spec[index].specQuantity.message}
															</div>
														)}
													</div>
													<RiDeleteBin6Line
														size={'20px'}
														type="button"
														onClick={() => {
															remove(index);
															handleDeletePreview(index);
														}}
													/>
												</div>
											);
										})}
									</div>
									<button
										className="w-fit cursor-pointer transition-all bg-blue-500 text-white px-2 py-2 rounded-lg border-blue-600
								border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
								active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
										type="button"
										onClick={async () => {
											(await trigger('spec1'))
												? append({
														specImg: null,
														specProp: '',
														specPrice: 0,
														specQuantity: 0,
													})
												: '';
										}}
									>
										新增屬性
									</button>
								</div>
							) : (
								<div className="input_wrap">
									<div className="input_group">
										<label htmlFor="price" className="label required">
											價格
										</label>
										<div className="flex flex-col gap-2">
											<input
												type="number"
												name="price"
												maxLength={20}
												className="input"
												{...register(
													'price',
													testFields.find((field) => field.name === 'price')
														.rules
												)}
											/>
											{errors.price && (
												<div className="text-red-500 text-sm">
													{errors.price.message}
												</div>
											)}
										</div>
									</div>
									<div className="input_group">
										<label htmlFor="quantity" className="label required">
											數量
										</label>
										<div className="flex flex-col gap-2">
											<input
												type="number"
												name="quantity"
												maxLength={20}
												className="input"
												{...register(
													'quantity',
													testFields.find((field) => field.name === 'quantity')
														.rules
												)}
											/>
											{errors.quantity && (
												<div className="text-red-500 text-sm">
													{errors.quantity.message}
												</div>
											)}
										</div>
									</div>
								</div>
							)}

							{/* 最低購買數 */}
							<div className="input_group">
								<label htmlFor="lowestBuy" className="label required">
									最低購買數
								</label>
								<div className="flex flex-col gap-2">
									<input
										type="text"
										name="lowestBuy"
										className="input"
										defaultValue={1}
										{...register(
											'lowestBuy',
											testFields.find((field) => field.name === 'lowestBuy')
												.rules
										)}
									/>
									{errors.lowestBuy && (
										<div className="text-red-500 text-sm">
											{errors.lowestBuy.message}
										</div>
									)}
								</div>
							</div>
						</div>

						{/* 3. 運費 */}
						{/* <div className="section_wrap">
						<div className="section_title">運費</div>
						<div className="input_group">
							<label htmlFor="">買家支付運費</label>
							<div className="flex flex-row justify-between items-center w-[80%] mx-auto">
								<div className="">7-ELEVEN</div>
								<div className="flex flex-row gap-2">
									<div>NT$60</div>
									<Controller
										defaultValue={false}
										control={control}
										name="shipPicker"
										render={({ field: { onChange, onBlur, value, ref } }) => (
											<Switch
												size={'lg'}
												colorScheme={'green'}
												onChange={onChange}
												isChecked={value}
												ref={ref}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div> */}

						<div className="flex flex-row justify-end gap-2">
							<CustomButton
								text={'取消'}
								className="bg-slate-600"
							></CustomButton>
							<CustomButton
								type="submit"
								text={'儲存並上架'}
								className="flex-end "
							></CustomButton>
						</div>
					</form>
				</Box>
			</StyledProductNewPage2>
		</>
	);

	function arr() {
		console.log(category);
	}
};

export default ProductNewPageV3;
