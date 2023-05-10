import React from 'react';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Chip, Divider, Stack, Typography, Rating } from '@mui/material';
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
import {
	useLazyGetMovieWatchValueQuery,
	useSetMovieWatchValueMutation,
	useDeleteMovieWatchValueMutation,
} from '../redux/features/watchListApiSlice';

import CastSlide from '../components/common/CastSlide';
import RecommendSlide from '../components/common/RecommendSlide';
import MediaSlide from '../components/common/MediaSlide';
import FormBox from '../components/common/FormBox';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#3297FD',
	},
	'& .MuiRating-iconHover': {
		color: '#7393B3',
	},
});

const MoviePage = () => {
	const { movieId } = useParams();

	const [movie, setMovie] = useState();
	const [genres, setGenres] = useState([]);

	const [ratingValue, setRatingValue] = useState(0);
	const [newRating, setNewRating] = useState();

	const [watchValue, setWatchValue] = useState(0);
	const [newWatchValue, setNewWatchValue] = useState();

	const [fetchDetails, { isLoading }] = useLazyGetDetailsQuery();

	const [fetchUserRating] = useLazyGetUserRatingQuery();
	const [fetchWatcValue] = useLazyGetMovieWatchValueQuery();

	const [postRate] = useSetUserRatingMutation();
	const [postWatchValue] = useSetMovieWatchValueMutation();
	const [deleteWatchValue] = useDeleteMovieWatchValueMutation();

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
				const rating = response.data;
				setRatingValue(rating);
			}
		};

		getUserRating();
	}, [movieId, fetchUserRating]);

	useEffect(() => {
		const getWatchValue = async () => {
			const response = await fetchWatcValue({ movieId });
			if (response) {
				const watchValue = response.data;
				setWatchValue(watchValue);
			}
		};

		getWatchValue();
	}, [movieId, fetchWatcValue]);

	useEffect(() => {
		const setUserRate = async () => {
			if (newRating) {
				await postRate({ movieId, newRating });
			}
		};

		setUserRate();
	}, [movieId, newRating, postRate]);

	useEffect(() => {
		const setMovieWatchValue = async () => {
			if (newWatchValue) {
				await postWatchValue({ movieId, newWatchValue });
			} else if (!newWatchValue) {
				await deleteWatchValue({ movieId });
			}
		};

		setMovieWatchValue();
	}, [movieId, newWatchValue, postWatchValue, deleteWatchValue]);

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

								{/* average rating, user rating, watch list, and genres */}
								<Stack direction='row' spacing={1.5} alignItems='center'>
									{/* average rating */}
									<CircularRate value={movie.vote_average} />
									{/* average rating */}
									<Divider orientation='vertical' />
									{/* user rating */}
									<Rating
										name='simple-controlled'
										size='large'
										value={ratingValue}
										precision={0.5}
										emptyIcon={
											<StarIcon style={{ color: '#fff' }} fontSize='inherit' />
										}
										onChange={(event, newValue) => {
											setRatingValue(newValue);
											setNewRating(newValue);
										}}
									/>

									{/* user rating */}
									<Divider orientation='vertical' />
									{/* watch list */}
									<StyledRating
										name='customized-color'
										size='large'
										value={watchValue}
										max={1}
										icon={<RemoveRedEyeIcon fontSize='inherit' />}
										emptyIcon={
											<RemoveRedEyeIcon
												style={{ color: '#fff' }}
												fontSize='inherit'
											/>
										}
										onChange={(event, newValue) => {
											setWatchValue(newValue);
											setNewWatchValue(newValue);
										}}
									/>
									{/* watch list */}
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
					{movie.recommend.results.length > 0 && (
						<RecommendSlide movies={movie.recommend.results} />
					)}
					{movie.recommend.results.length === 0 && (
						<MediaSlide
							mediaType={tmdbConfigs.mediaType.movie}
							movieCategory={tmdbConfigs.movieCategory.top_rated}
						/>
					)}
				</Container>
				{/* movie recommendation */}
			</Box>
		</>
	) : null;
};

export default MoviePage;
