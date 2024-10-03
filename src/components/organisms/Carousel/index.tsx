import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { getImageUrl } from "@/utils/tmdbController";

interface Props {
  items: ReadonlyArray<MovieInfoProps>;
}

const Carousel = ({ items }: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {items.map((e, i) => {
          const imgUrl = getImageUrl(e.backdrop_path, 780);
          return <img src={imgUrl} />;
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
