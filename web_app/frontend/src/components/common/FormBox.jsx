import { Box, Stack } from '@mui/material';
import React from 'react';

const FormBox = ({ children }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '80vh', // Set the minimum height to 100% of viewport height
				minWidth: '100vw', // Set the minimum width to 100% of viewport width
			}}
		>
			<Box
				sx={{
					maxWidth: '600px', // Set a maximum width for the form box
					width: '80%', // Set the width to 80% of the viewport width
					marginTop: '5rem',
					marginX: 'auto',
					color: 'text.primary',
					paddingTop: '3rem',
					paddingBottom: '3rem',
					paddingLeft: '3rem',
					paddingRight: '3rem',
					backgroundColor: '#7393B3',
					borderRadius: '1rem',
					boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
					zIndex: 20,
					'@media (max-width: 600px)': {
						width: '85%', // Set the width to 95% of the viewport width for smaller screens
					},
				}}
			>
				<Stack spacing={4}>{children}</Stack>
			</Box>
		</Box>
	);
};

export default FormBox;
