import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./banner.css";
function Banner() {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      await axios
        .get("https://exam.freshcode.me/front/banners")
        .then((res) => setData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CarouselProvider
      naturalSlideWidth={1024}
      naturalSlideHeight={240}
      totalSlides={5}
      infinite={true}
      interval={5000}
      isPlaying={true}
      currentSlide={1}
    >
      <div className="buttons">
        <ButtonBack className="back">
          <img
            src={require("../assets/iconmonstr-arrow-64-32.png")}
            alt="back"
          />
        </ButtonBack>
        <ButtonNext className="next">
          <img
            src={require("../assets/iconmonstr-arrow-63-32.png")}
            alt="next"
          />
        </ButtonNext>
      </div>

      <Slider>
        {data &&
          data.banners.map((image, index) => (
            <Slide key={index} index={index}>
              {<Image src={image.imgUrl} />}
            </Slide>
          ))}
      </Slider>
    </CarouselProvider>
  );
}

export default Banner;
