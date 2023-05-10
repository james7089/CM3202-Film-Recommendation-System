import { Box, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLazyGetWatchListQuery } from '../redux/features/watchListApiSlice';
import RatedGrid from '../components/common/RatedGrid';
import FormBox from '../components/common/FormBox';
import uiConfigs from '../configs/ui.configs';

const WatchListPage = () => {
	const [movies, setMovies] = useState([]);

	const [fetchWatchList, { isLoading }] = useLazyGetWatchListQuery();

	useEffect(() => {
		const getRated = async () => {
			const response = await fetchWatchList();
			setMovies(response.data);
		};

		getRated();
	}, [movies, fetchWatchList]);

	return isLoading ? (
		<FormBox>
			<h1 color='#fff'>Loading...</h1>
		</FormBox>
	) : (
		<>
			<Box sx={{ ...uiConfigs.style.mainContent }}>
				<Stack spacing={2}>
					<Box display='flex' justifyContent='center' width='100%'>
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
							Your watch list
						</Typography>
					</Box>
					<RatedGrid movies={movies} />
				</Stack>
			</Box>
		</>
	);
};

export default WatchListPage;