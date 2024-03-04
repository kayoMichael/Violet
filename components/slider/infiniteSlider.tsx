import React, { Component } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import googleImage from "@/components/assets/logo/google.svg";
import microsoftImage from "@/components/assets/logo/microsoft.svg";
import netflixImage from "@/components/assets/logo/netflix.svg";
import spotifyImage from "@/components/assets/logo/spotify.svg";
import paypalImage from "@/components/assets/logo/paypal.svg";

class InfiniteSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
    };
    return (
      <Slider
        {...settings}
        className="mt-12 grid-cols-2 justify-center gap-8 hidden md:grid"
      >
        <Image src={googleImage} alt="Google" className="h-8 md:inline" />
        <Image
          src={microsoftImage}
          alt="Microsoft"
          className="mx-auto h-6 md:inline"
        />
        <Image
          src={netflixImage}
          alt="Netflix"
          className="mx-auto hidden h-6 md:inline"
        />
        <Image
          src={spotifyImage}
          alt="Spotify"
          className="mx-auto hidden h-8 md:inline"
        />
        <Image
          src={paypalImage}
          alt="Paypal"
          className="mx-auto hidden h-8 sm:inline"
        />
      </Slider>
    );
  }
}

export default InfiniteSlider;
