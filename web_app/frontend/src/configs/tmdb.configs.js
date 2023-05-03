
const mediaType = {
	movie: 'movie',
	person: 'person'
  };

const movieCategory = {
	popular: 'popular',
	top_rated: 'top_rated',
};

const backdropPath = (imgEndpoint) =>
	`https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) =>
	`https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId) =>
	`https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
	mediaType,
	movieCategory,
	backdropPath,
	posterPath,
	youtubePath,
};

export default tmdbConfigs;
