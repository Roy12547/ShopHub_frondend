/* eslint-disable react/prop-types */
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { RiDeleteBin6Line, RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import SpecsPreview from './SpecsPreview';



const Specs = ({
	preview,
	handleOnSingleFilePreview,
	handleDeletePreview,
	openSpec,
	testFields,
	control,
	editedProduct,
}) => {
	const {
		register,
		formState: { errors },

	} = useFormContext();

	const specs = useWatch({ control, name: 'specs' });
	const { fields, append, remove, update } = useFieldArray({
		control,
		name: 'specs',
	});

	useEffect(() => {
		if (editedProduct && editedProduct.prodSpecs) {
			// Set specBase64 as File object and update preview
			editedProduct.prodSpecs.forEach((spec, index) => {
				if (spec.specBase64) {
					const [mimeType, base64Data] = spec.specBase64.split(',');
					const byteCharacters = atob(base64Data);

					const byteNumbers = new Array(byteCharacters.length);
					for (let i = 0; i < byteCharacters.length; i++) {
						byteNumbers[i] = byteCharacters.charCodeAt(i);
					}
					const byteArray = new Uint8Array(byteNumbers);

					// 從 MIME 類型中提取文件擴展名
					const fileExtension = mimeType.split('/')[1].split(';')[0];
					const fileName = `spec-${index}.${fileExtension}`;

					const blob = new Blob([byteArray], { type: mimeType });
					const file = new File([blob], fileName, { type: mimeType });


					handleOnSingleFilePreview(spec.spec1Name, [file]);
				}
			});
		}
	}, [editedProduct]);

	const handleUpdateSpec = useCallback(
		(index, value) => {
			update(index, {
				...fields[index],
				spec: value,
			});
		},
		[fields, update]
	);

	const handleAddProperty = useCallback(
		(index) => {
			const updatedProperties = [
				...fields[index].properties,
				{
					id: uuidv4(),
					specImg: null,
					specProp: '',
				},
			];
			update(index, {
				...fields[index],
				properties: updatedProperties,
			});
		},
		[fields, update]
	);

	return (
		<div className="spec bg-slate-300 p-4 flex flex-col gap-2 rounded-lg">
			{fields.map((field, index) => (
				<Box key={field.id}>
					<div className="input_group">
						<label htmlFor={`specs[${index}].spec`} className="label required">
							規格 {index + 1}
						</label>
						<div className="flex flex-col gap-2">
							<input
								type="text"
								name={`specs[${index}].spec`}
								className="input"
								placeholder="Ex:顏色"
								{...register(
									`specs[${index}].spec`,
									testFields.find((f) => f.name === 'spec').rules
								)}
								onBlur={(e) => handleUpdateSpec(index, e.target.value)}
							/>
							{errors.specs?.[index]?.spec && (
								<div className="text-red-500 text-sm">
									{errors.specs[index].spec.message}
								</div>
							)}
						</div>
					</div>
					<hr />
					<Flex wrap="wrap" gap={4}>
						{field.properties?.map((prop, propIndex) => (
							<Box key={prop.id} flex="0 0 auto" width="300px">
								<Flex alignItems="start" gap={3}>
									<div className="relative inline-block shadow-md border-dashed cursor-pointer">
										{index === 0 && (
											<>
												<input
													accept="images/*"
													type="file"
													placeholder={'請輸入'}
													className="input absolute w-full h-full top-0 bottom-0 opacity-0"
													{...register(
														`specs[${index}].properties[${propIndex}].specImg`
													)}
													onChange={(e) =>
														handleOnSingleFilePreview(
															prop.specProp,
															e.target.files
														)
													}
												/>
												{preview[prop.specProp] ? (
													<img
														src={preview[prop.specProp]}
														className="w-[30px] h-[30px] aspect-square object-cover"
														alt={`Preview of ${prop.specProp}`}
													/>
												) : (
													<RiImageAddFill size={'30px'} />
												)}
											</>
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
											{...register(
												`specs[${index}].properties[${propIndex}].specProp`,
												testFields.find((f) => f.name === 'spec').rules
											)}
										/>
										{errors.specs?.[index]?.properties?.[propIndex]
											?.specProp && (
											<div className="text-red-500 text-sm">
												{
													errors.specs[index].properties[propIndex].specProp
														.message
												}
											</div>
										)}
									</div>
									<Button
										size="xs"
										colorScheme="red"
										onClick={() => {
											const updatedProperties = fields[index].properties.filter(
												(_, i) => i !== propIndex
											);
											update(index, {
												...fields[index],
												properties: updatedProperties,
											});
											handleDeletePreview(prop.id);
										}}
									>
										<RiDeleteBin6Line size={'20px'} />
									</Button>
								</Flex>
							</Box>
						))}
					</Flex>
					<Button
						colorScheme="blue"
						size="sm"
						onClick={() => handleAddProperty(index)}
					>
						新增屬性
					</Button>
				</Box>
			))}
			<Button
				colorScheme="green"
				size="sm"
				onClick={() => {
					if (fields.length < 2) {
						append({
							spec: '',
							properties: [
								{
									id: uuidv4(),
									specImg: null,
									specProp: '',
								},
							],
						});
					}
				}}
			>
				新增規格
			</Button>
			<SpecsPreview
				specs={specs}
				control={control}
				editedProduct={editedProduct}
			/>
		</div>
	);
};

export default Specs;