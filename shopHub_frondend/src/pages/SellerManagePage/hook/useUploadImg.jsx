import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export function useUploadImg(prop) {
	const [files, setFiles] = useState([]);
	const [images, setImages] = useState([]);

	console.log(files);
	const { register, handleSubmit, setValue, append } = useForm();

	// const handleImageChange = (e, setValue) => {
	// 	let fileList = Array.from(e.target.files);
	// 	console.log(fileList);

	// 	fileList.forEach((files, i) => {
	// 		let reader = new FileReader();
	// 		reader.onloadend = () => {
	// 			setFiles((prevFile) => [...prevFile, files.name]);
	// 			setImages((prevImages) => [...prevImages, reader.result]);
	// 		};
	// 		reader.readAsDataURL(files);
	// 	});
	// 	setValue('productImg', files);
	// };
	// const handleImageChange = useCallback((e) => {
	// 	const fileList = Array.from(e.target.files);
	// 	console.log(fileList);

	// 	fileList.forEach((files, i) => {
	// 		let reader = new FileReader();
	// 		reader.onloadend = () => {
	// 			console.log(files);

	// 			setFiles((prevFile) => [...prevFile, files.name]);
	// 			setImages((prevImages) => [...prevImages, reader.result]);
	// 		};
	// 		reader.readAsDataURL(files);
	// 	});
	// }, []);
	const handleImageChange = useCallback((e) => {
		const fileList = Array.from(e.target.files);

		console.log(fileList);
		const newFiles = fileList.map((file) => {
			const reader = new FileReader();
			return new Promise((resolve) => {
				reader.onloadend = () => {
					resolve({ name: file.name, result: reader.result });
				};
				reader.readAsDataURL(file);
			});
		});

		Promise.all(newFiles).then((fileData) => {
			const newFileNames = fileData.map((file) => file.name);
			const newImages = fileData.map((file) => file.result);

			setFiles((prevFiles) => [...prevFiles, ...newFileNames]);
			setImages((prevImages) => [...prevImages, ...newImages]);
			setValue('productImg', fileList);
		});
		console.log(files);
		console.log(images);
	});
	const handleDeleteImage = useCallback((index) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
		setImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
	}, []);

	const formData = new FormData();
	files.forEach((file, index) => {
		formData.append(`file_${index}`, file);
	});

	return { formData, images, files, handleImageChange, handleDeleteImage };
}
