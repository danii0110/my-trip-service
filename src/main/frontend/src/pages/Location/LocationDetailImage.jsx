import React, {useEffect, useState} from "react";
import styles from "./LocationDetailImage.module.scss";
import defaultImage from '../../assets/defaultImage.png';
import leftFill from '../../assets/leftFill.svg';
import rightFill from '../../assets/rightFill.svg';

const LocationDetailImage = ({common, image}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = image ? image.response.body.totalCount : "0";

    useEffect(() => {
        // Reset currentIndex to 0 when common or image changes
        setCurrentIndex(0);
    }, [common, image]);


    const goToPrevSlide = () => {
        const index = (currentIndex === 0) ? totalImages : currentIndex - 1;
        setCurrentIndex(index);
    };

    const goToNextSlide = () => {
        const index = (currentIndex === totalImages) ? 0 : currentIndex + 1;
        setCurrentIndex(index);
    };

    return (
        <div>
            {totalImages === "0" && (
                <div className={styles.carouselItem}>
                    <img src={common.firstimage || defaultImage} alt={common.title}/>
                </div>
            )}
            {image && totalImages !== "0" && (
                <div className={styles.carouselContainer}>
                    <div className={styles.carouselSlide} style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                        {image &&
                            <div className={styles.carouselItem}>
                                <img src={common.firstimage} alt={common.title}/>
                            </div>
                        }
                        {image && image.response.body.items.item.map((item, index) => (
                            <div key={index} className={styles.carouselItem}>
                                <img key={index} src={item.originimgurl} alt={item.imgname}/>
                            </div>
                        ))}
                    </div>
                    {currentIndex > 0 &&
                        <button className={styles.prevBtn} onClick={goToPrevSlide}>
                            <img src={leftFill} alt="leftArrow"/>
                        </button>
                    }
                    {currentIndex <totalImages &&
                        <button className={styles.nextBtn} onClick={goToNextSlide}>
                            <img src={rightFill} alt="leftArrow"/>
                        </button>
                    }
                </div>
            )}
        </div>
    );
}
export default LocationDetailImage;