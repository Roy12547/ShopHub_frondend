/* eslint-disable react/prop-types */
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RiDeleteBin6Line, RiImageAddFill } from 'react-icons/ri';

const Specs = ({
	trigger,
	preview,
	handleOnSingleFilePreview,
	handleDeletePreview,
	openSpec,
	testFields,
}) => {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext();
	const { fields, append, remove } = useFieldArray({ control, name: 'specs' });

	const handleAddSpec = () => {
		append({
			spec: '',
			specImg: null,
			specProp: '',
			specPrice: 0,
			specQuantity: 0,
		});
	};

	if (!openSpec) {
		return null;
	}

	return (
		<div className="spec bg-slate-300 p-4 flex flex-col gap-2 rounded-lg">
			{fields.map((field, index) => (
				<div key={field.id}>
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
							/>
							{errors.specs?.[index]?.spec && (
								<div className="text-red-500 text-sm">
									{errors.specs[index].spec.message}
								</div>
							)}
						</div>
					</div>
					<hr />
					<div className="spec_prop flex flex-wrap gap-4">
						{fields.map((item, index) => (
							<div
								className="prop flex flex-row items-start gap-3"
								key={item.id}
							>
								<div className="relative inline-block shadow-md border-dashed cursor-pointer">
									<input
										accept="images/*"
										type="file"
										placeholder={'請輸入'}
										className="input absolute w-full h-full top-0 bottom-0 opacity-0"
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
										{...register(
											`spec.${index}.specProp`,
											testFields.find((f) => f.name === 'spec').rules
										)}
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
						))}
					</div>
				</div>
			))}
			<button
				className="w-fit cursor-pointer transition-all bg-blue-500 text-white px-2 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
				type="button"
				onClick={handleAddSpec}
			>
				新增規格
			</button>
		</div>
	);
};

export default Specs;
