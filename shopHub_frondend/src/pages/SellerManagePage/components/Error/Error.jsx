import React from 'react';
import { Box } from '@chakra-ui/layout';
import styled, { keyframes } from 'styled-components';

const glitch_it = keyframes`
    0% {
			transform: translate(0);
		}
		20% {
			transform: translate(-2px, 2px);
		}
		40% {
			transform: translate(-2px, -2px);
		}
		60% {
			transform: translate(2px, 2px);
		}
		80% {
			transform: translate(2px, -2px);
		}
		to {
			transform: translate(0);
		}
`;
export const StyledError = styled.div`
	display: grid;
	place-content: 'center';
	.glitch {
		position: relative;
		font-size: 60px;
		font-weight: bold;
		color: #ffffff;
		letter-spacing: 3px;
		z-index: 1;
	}

	.glitch:before,
	.glitch:after {
		display: block;
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.8;
	}

	.glitch:before {
		animation: ${glitch_it} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
			infinite;
		color: blue;
		z-index: -1;
	}

	.glitch:after {
		animation: ${glitch_it} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse
			both infinite;
		color: black;
		z-index: -2;
	}
`;

export const Error = () => {
	return (
		<StyledError>
			<Box
				p={5}
				shadow="md"
				borderWidth="1px"
				borderRadius="md"
				position={'relative'}
				width={'100%'}
				height={'100%'}
			>
				<div
					className="glitch absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					data-text="404..."
				>
					404
				</div>
			</Box>
		</StyledError>
	);
};
