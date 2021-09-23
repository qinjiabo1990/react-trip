import React from 'react'
import styles from './Carousel.module.css'
import { Image, Carousel as AntCarousel } from 'antd';

import img_one from '../../assets/images/carousel_1.jpeg'
import img_two from '../../assets/images/carousel_2.jpeg'
import img_three from '../../assets/images/carousel_3.jpeg'

export const Carousel: React.FC = () => {
  const loading = <p>Loading.......</p>
  
  return (
    <AntCarousel className={styles.contentStyle} autoplay>
        <Image src={img_one} alt='Ads' placeholder={loading}></Image>
        <Image src={img_two} alt='Ads' placeholder={loading}></Image>
        <Image src={img_three} alt='Ads' placeholder={loading}></Image>
    </AntCarousel>
  )
}