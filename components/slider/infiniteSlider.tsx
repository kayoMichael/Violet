import React, { Component } from 'react';

import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import googleImage from '@/components/assets/logo/google.svg';
import microsoftImage from '@/components/assets/logo/microsoft.svg';
import netflixImage from '@/components/assets/logo/netflix.svg';
import paypalImage from '@/components/assets/logo/paypal.svg';
import spotifyImage from '@/components/assets/logo/spotify.svg';

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
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3,
          },
        },
      ],
    };
    return (
      <Slider
        {...settings}
        className='mt-12 grid-cols-2 justify-center gap-8 md:grid'
      >
        <Image alt='Google' className='h-8 md:inline' src={googleImage} />
        <Image
          alt='Microsoft'
          className='mx-auto h-6 md:inline'
          src={microsoftImage}
        />
        <Image
          alt='Netflix'
          className='mx-auto h-6 md:inline'
          src={netflixImage}
        />
        <Image
          alt='Spotify'
          className='mx-auto h-8 md:inline'
          src={spotifyImage}
        />
        <Image
          alt='Paypal'
          className='mx-auto h-8 md:inline'
          src={paypalImage}
        />
      </Slider>
    );
  }
}

export default InfiniteSlider;
