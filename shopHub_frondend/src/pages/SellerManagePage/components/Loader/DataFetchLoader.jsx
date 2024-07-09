import { keyframes, styled } from 'styled-components';
import React from 'react';

const moving = keyframes`
	50% {
			width: 100%;
		}

		100% {
			width: 0;
			right: 0;
			left: unset;
		}
`;
export const StyledDataFetchLoader = styled.div`
	width: 100%;
	height: 100%;

	.loader {
		display: block;
		--height-of-loader: 4px;
		--loader-color: #0071e2;
		width: 30%;
		height: var(--height-of-loader);
		border-radius: 30px;
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.loader::before {
		content: '';
		position: absolute;
		background: var(--loader-color);
		top: 0;
		left: 0;
		width: 0%;
		height: 100%;
		border-radius: 30px;
		animation: ${moving} 1s ease-in-out infinite;
	}
`;

const DataFetchLoader = () => {
	return (
		<StyledDataFetchLoader>
			<div className="loader"></div>
		</StyledDataFetchLoader>
	);
};

export default DataFetchLoader;
