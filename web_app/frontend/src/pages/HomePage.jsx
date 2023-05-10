import React from 'react';
import { Box } from '@mui/material';
import Container from '../components/common/Container';
import tmdbConfigs from '../configs/tmdb.configs';
import uiConfigs from '../configs/ui.configs';
import MediaSlide from '../components/common/MediaSlide';

const HomePage = () => {
	return (
		<>
			<Box marginTop='-4rem' sx={{ ...uiConfigs.style.mainContent }}>
				<Container header='recommended films'>
				<MediaSlide
						mediaType={tmdbConfigs.mediaType.movie}
						movieCategory={0}
					/>
				</Container>

				<Container header='popular films'>
					<MediaSlide
						mediaType={tmdbConfigs.mediaType.movie}
						movieCategory={tmdbConfigs.movieCategory.popular}
					/>
				</Container>

				<Container header='top rated films'>
					<MediaSlide
						mediaType={tmdbConfigs.mediaType.movie}
						movieCategory={tmdbConfigs.movieCategory.top_rated}
					/>
				</Container>
			</Box>
		</>
	);
};
export default HomePage;
