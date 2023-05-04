import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLazyGetMoviesQuery } from '../../redux/features/personApiSlice';
import MediaItem from './MediaItem';
import FormBox from './FormBox';

const PersonMoviesGrid = ({ personId }) => {
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [page, setPage] = useState(1);
	const skip = 8;

	const [fetchMovies, { isLoading }] = useLazyGetMoviesQuery();

	useEffect(() => {
		const getMovies = async () => {
			const response = await fetchMovies({ personId }).unwrap();
			const movies = (response.cast).filter(obj => obj.media_type === 'movie');
			console.log(movies)
			if (response) {
				const moviesSorted = movies.sort(
					(a, b) => getReleaseDate(b) - getReleaseDate(a)
				);
				setMovies([...moviesSorted]);
				setFilteredMovies([...moviesSorted].splice(0, skip));
			}
		};

		getMovies();
	}, [personId, fetchMovies]);

	const getReleaseDate = (media) => {
		const date = new Date(media.release_date)
		return date.getTime();
	};

	const onLoadMore = () => {
		setFilteredMovies([
			...filteredMovies,
			...[...movies].splice(page * skip, skip),
		]);
		setPage(page + 1);
	};

	return isLoading ? (
		<FormBox>
			<h1 color='#fff'>Loading...</h1>
		</FormBox>
	) : (
		<>
			<Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
				{filteredMovies.map((media, index) => (
					<Grid item xs={6} sm={4} md={3} key={index}>
						<MediaItem media={media} mediaType={media.media_type} />
					</Grid>
				))}
			</Grid>
			{filteredMovies.length < movies.length && (
				<Button onClick={onLoadMore}>load more</Button>
			)}
		</>
	);
};

export default PersonMoviesGrid;
