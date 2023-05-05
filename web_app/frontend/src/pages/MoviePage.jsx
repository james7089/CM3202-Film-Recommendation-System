import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import {
	Box,
	Chip,
	Divider,
	Stack,
	Typography,
	Rating,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CircularRate from '../components/common/CircularRate';
import Container from '../components/common/Container';

import uiConfigs from '../configs/ui.configs';
import tmdbConfigs from '../configs/tmdb.configs';
import { useLazyGetDetailsQuery } from '../redux/features/movieApiSlice';
import {
	useLazyGetUserRatingQuery,
	useSetUserRatingMutation,
} from '../redux/features/ratingApiSlice';

import CastSlide from '../components/common/CastSlide';
/* import RecommendSlide from '../components/common/RecommendSlide';
import MediaSlide from '../components/common/MediaSlide'; */
import FormBox from '../components/common/FormBox';

const MoviePage = () => {
	const { movieId } = useParams();

	const [movie, setMovie] = useState();
	const [genres, setGenres] = useState([]);
	const [value, setValue] = useState(0);
	const [newRating, setNewRating] = useState();

	const [fetchDetails, { isLoading }] = useLazyGetDetailsQuery();
	
	const [fetchUserRating] = useLazyGetUserRatingQuery();
	const [postRate] = useSetUserRatingMutation();

	useEffect(() => {
		window.scrollTo(0, 0);
		const getMovieDetails = async () => {
			const response = await fetchDetails({ movieId }).unwrap();

			if (response) {
				const genres = [...response.genres];
				setMovie(response);
				setGenres(genres.splice(0, 2));
			}
		};

		getMovieDetails();
	}, [movieId, fetchDetails]);
	
	useEffect(() => {
		const getUserRating = async () => {
			const response = await fetchUserRating({ movieId });
			if (response) {
				const rating = response.data
				setValue(rating);
			}
		};

		getUserRating();
	}, [movieId, fetchUserRating]);
	
	useEffect(() => {
		const setUserRate = async () => {
			if (newRating)  {
				await postRate({ movieId, newRating });
			}
		};

		setUserRate();
	}, [movieId, newRating, postRate]);


	return isLoading ? (
		<FormBox>
			<h1 color='#fff'>Loading...</h1>
		</FormBox>
	) : movie ? (
		<>
			<Box
				sx={{
					zIndex: '-1',
					position: 'relative',
					paddingTop: { xs: '30%', sm: '30%', md: '20%' },
					backgroundPosition: 'top',
					backgroundSize: 'cover',
					backgroundAttachment: 'fixed',
				}}
			/>
			<Box
				sx={{
					...uiConfigs.style.mainContent,
				}}
			>
				{/* movie content */}
				<Box
					sx={{
						marginTop: { xs: '-15rem', md: '-15rem', lg: '-20rem' },
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: { md: 'row', xs: 'column' },
						}}
					>
						{/* poster */}
						<Box
							sx={{
								width: { xs: '70%', sm: '50%', md: '40%' },
								margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
							}}
						>
							<Box
								sx={{
									paddingTop: '150%',
									...uiConfigs.style.backgroundImage(
										tmdbConfigs.posterPath(
											movie.poster_path || movie.backdrop_path
										)
									),
								}}
							/>
						</Box>
						{/* poster */}

						{/* movie info */}
						<Box
							sx={{
								width: { xs: '100%', md: '60%' },
								color: 'inheirit',
							}}
						>
							<Stack spacing={5}>
								{/* title */}
								<Typography
									variant='h4'
									fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
									fontFamily='inherit'
									fontWeight='700'
									sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
								>
									{`${movie.title || movie.name} (${
										movie.release_date.split('-')[0]
									})`}
								</Typography>
								{/* title */}

								{/* average rating, user rating and genres */}
								<Stack direction='row' spacing={1} alignItems='center'>
									{/* average rating */}
									<CircularRate value={movie.vote_average} />
									{/* average rating */}
									<Divider orientation='vertical' />
									{/* user rating */}
									<Rating
										name='simple-controlled'
										size='large'
										value={value}
										emptyIcon={<StarIcon style={{ color: '#fff' }} fontSize="inherit" />}
										onChange={(event, newValue) => {
											setValue(newValue)
											setNewRating(newValue);
										}}
									/>

									{/* user rating */}
									<Divider orientation='vertical' />
									{/* genres */}
									{genres.map((genre, index) => (
										<Chip
											label={genre.name}
											variant='filled'
											color='primary'
											key={index}
										/>
									))}
									{/* genres */}
								</Stack>
								{/* average rating, user rating and genres*/}

								{/* overview */}
								<Typography
									variant='body1'
									sx={{
										...uiConfigs.style.typoLines(5),
										fontFamily: 'inherit',
									}}
								>
									{movie.overview}
								</Typography>
								{/* overview */}

								{/* cast */}
								<Container header='Cast'>
									<CastSlide casts={movie.credits.cast} />
								</Container>
								{/* cast */}
							</Stack>
						</Box>
						{/* movie info */}
					</Box>
				</Box>
				{/* movie content */}

				{/* movie recommendation */}
				<Container header='you may also like'>
					{/* {movie.recommend.length > 0 && (
						<RecommendSlide movies={movie.recommend} />
					)}
					{movie.recommend.length === 0 && (
						<MediaSlide
							mediaType={tmdbConfigs.mediaType.movie}
							movieCategory={tmdbConfigs.movieCategory.top_rated}
						/>
					)} */}
				</Container>
				{/* movie recommendation */}
			</Box>
		</>
	) : null;
};

export default MoviePage;
