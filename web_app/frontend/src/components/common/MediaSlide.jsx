import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useLazyGetListQuery } from '../../redux/features/movieApiSlice';
import { useLazyGetRecommendationsQuery } from '../../redux/features/recommendationApiSlice';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';

const MediaSlide = ({ mediaType, movieCategory }) => {
	const [medias, setMedias] = useState([]);

	const [fetchList] = useLazyGetListQuery();
	const [fetchRecommendations] = useLazyGetRecommendationsQuery();

	useEffect(() => {
		const getMedias = async () => {
			if (movieCategory) {
				const response = await fetchList({ movieCategory, page: 1 }).unwrap();

				if (response) setMedias(response.results);
			} else {
				const response = await fetchRecommendations().unwrap();
				if (response) setMedias(response);
			}
		};

		getMedias();
	}, [mediaType, movieCategory, fetchList, fetchRecommendations]);

	return (
		<AutoSwiper>
			{medias.map((media, index) => (
				<SwiperSlide key={index}>
					<MediaItem media={media} mediaType={mediaType} />
				</SwiperSlide>
			))}
		</AutoSwiper>
	);
};

export default MediaSlide;