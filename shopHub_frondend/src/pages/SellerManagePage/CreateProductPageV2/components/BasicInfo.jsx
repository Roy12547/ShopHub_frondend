/* eslint-disable react/prop-types */
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RiImageAddFill } from 'react-icons/ri';
import { MdDeleteOutline } from 'react-icons/md';
import { testFields } from '../../ProductNewPage/validation/testFields';

const BasicInfo = ({
	fileList,
	handleFileChange,
	handleDeleteItem,
	category,
	editedProduct,
}) => {
	const {
		register,
		formState: { errors },
		watch,
		control,
	} = useFormContext();

	return (
		<div className="section_wrap">
			<div className="section_title">基本資訊</div>
			<div className="input_group">
				<label htmlFor="basicInfo.productName" className="label required">
					商品名稱
				</label>
				<div className="input_wrap">
					<div>
						<input
							type="text"
							name="basicInfo.productName"
							maxLength={20}
							placeholder="輸入商品名稱"
							className="input"
							{...register(
								'basicInfo.productName',
								testFields.find((field) => field.name === 'productName').rules
							)}
						/>
						<span className="text-sm pl-1">{`${watch('basicInfo.productName') ? `${watch('basicInfo.productName').length}` : '0'}/20`}</span>
					</div>
					{errors.basicInfo?.productName && (
						<div className="text-red-500 text-sm">
							{errors.basicInfo.productName.message}
						</div>
					)}
				</div>
			</div>
			<div className="input_group">
				<label htmlFor="basicInfo.productImg" className="label required">
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
						<div className="relative inline-block shadow-md">
							<input
								name="basicInfo.productImg"
								type="file"
								accept="images/*"
								multiple
								className="input absolute w-full h-full top-0 bottom-0 opacity-0"
								{...register('basicInfo.productImg', {
									onChange: handleFileChange,
								})}
							/>
							<div className="w-[80px] h-[80px] flex flex-col items-center justify-center gap-1 border border-dashed shadow-md rounded-sm aspect-square">
								<RiImageAddFill size={28} />
								<div className="text-xs">新增圖片</div>
								<div className="text-xs">{`${fileList.length} /5`}</div>
							</div>
						</div>
					)}
					{errors.basicInfo?.productImg && (
						<div className="text-red-500 text-sm">
							{errors.basicInfo.productImg.message}
						</div>
					)}
				</div>
			</div>
			{/* 類別 */}
			<div className="input_group">
				<label htmlFor="basicInfo.category" className="label required">
					類別
				</label>
				<select
					name="basicInfo.category"
					className="select"
					defaultValue={editedProduct?.product?.categoryId || ''}
					{...register(
						'basicInfo.category',
						testFields.find((field) => field.name === 'category').rules
					)}
				>
					<option value="" disabled>
						請選擇分類
					</option>
					{category.map((item) => (
						<option
							value={
								item.category.categoryId
							}
							key={item.category.categoryId}
							selected={
								item.category.categoryId === editedProduct?.product?.categoryId
							}
						>
							{item.category.categoryName}
						</option>
					))}
				</select>
				{errors.basicInfo?.category && (
					<div className="text-red-500 text-sm">
						{errors.basicInfo.category.message}
					</div>
				)}
			</div>
			{/* 商品描述 */}
			<div className="input_group">
				<label htmlFor="basicInfo.description" className="label required">
					商品描述
				</label>
				<div className="flex flex-col gap-2">
					<Controller
						name="basicInfo.description"
						control={control}
						rules={
							testFields.find((field) => field.name === 'description').rules
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
						{errors.basicInfo?.description && (
							<div className="text-red-500 text-sm">
								{errors.basicInfo.description.message}
							</div>
						)}
						<span className="text-right text-xs">{`${watch('basicInfo.description') ? `${watch('basicInfo.description').length}` : '0'}/600`}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BasicInfo;
