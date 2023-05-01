import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const Container = ({ header, children }) => {
	
	return (
		<Box
			sx={{
				marginTop: '5rem',
				marginX: 'auto',
				color: 'inherit',
			}}
		>
			<Stack spacing={4}>
				{header && (
					<Box
						sx={{
							position: 'relative',
							paddingX: { xs: '20px', md: 0 },
							maxWidth: '1366px',
							marginX: 'auto',
							width: '100%',
						}}
					>
						<Typography
							variant='h5'
							fontWeight='700'
							textTransform='uppercase'
							sx={{
								fontFamily: 'inherit',
								fontWeight: 700,
								color: 'inherit',
								width: 'max-content',
								'&::after': {
									content: '""',
									display: 'block',
									position: 'relative',
									left: { xs: '0', md: '0' },
									top: '5px',
									height: '5px',
									width: '100%',
									backgroundColor: '#7393B3',
								  },
							}}
						>
							{header}
						</Typography>
					</Box>
				)}
				{children}
			</Stack>
		</Box>
	);
};

export default Container;
