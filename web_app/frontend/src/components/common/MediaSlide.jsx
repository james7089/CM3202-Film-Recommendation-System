import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useLazyGetListsQuery } from '../../redux/features/movieApiSlice';
import AutoSwiper from './AutoSwiper';
import { toast } from 'react-toastify';
import MediaItem from './MediaItem';

const MediaSlide = ({ mediaType, movieCategory }) => {
	const [medias, setMedias] = useState([]);

	const [fetchLists] = useLazyGetListsQuery();

	useEffect(() => {
		const getMedias = async () => {
			const response = await fetchLists({ movieCategory, page: 1 }).unwrap();

			if (response) setMedias(response.results);
		};

		getMedias();
	}, [mediaType, movieCategory]);

	console.log(medias)

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