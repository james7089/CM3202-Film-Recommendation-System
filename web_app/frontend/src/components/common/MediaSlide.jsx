import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useLazyGetListQuery } from '../../redux/features/movieApiSlice';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';

const MediaSlide = ({ mediaType, movieCategory }) => {
	const [medias, setMedias] = useState([]);

	const [fetchList] = useLazyGetListQuery();

	useEffect(() => {
		const getMedias = async () => {
			const response = await fetchList({ movieCategory, page: 1 }).unwrap();

			if (response) setMedias(response.results);
		};

		getMedias();
	}, [mediaType, movieCategory, fetchList]);

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