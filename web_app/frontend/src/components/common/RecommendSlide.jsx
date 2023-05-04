import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import tmdbConfigs from "../../configs/tmdb.configs";

const RecommendSlide = ({ movies }) => {
  return (
    <AutoSwiper>
      {movies.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={tmdbConfigs.mediaType.movie} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;