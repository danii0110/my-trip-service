import React, { useState } from 'react';
import styles from './Carousel.module.scss';

const Carousel = ({ children, size }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex < totalSlides - 1 ? prevIndex + 1 : prevIndex));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    return (
        <div className={styles.carousel}>
            <div className={styles.carouselInner} style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                {React.Children.map(children, (child, index) => (
                    <div className={styles.slide} key={index}>
                        {child}
                    </div>
                ))}
            </div>
            <div className={styles.navigationButtons}>
                <button className={styles.button} style={{fontSize: size}} onClick={prevSlide}>❮</button>
                <button className={styles.button} style={{fontSize: size}} onClick={nextSlide}>❯</button>
            </div>
            <div className={styles.indicator}>
                {currentIndex + 1} / {totalSlides}
            </div>
        </div>
    );
};

export default Carousel;
