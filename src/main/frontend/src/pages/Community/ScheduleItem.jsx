import React from 'react';
import styles from './ScheduleItem.module.scss';
import {LuImage} from "react-icons/lu";

const ScheduleItem = ({ index, item, transportation, moveTimes }) => {
    const categoryMap = {
        TOURIST_SPOT: '관광지',
        RESTAURANT: '음식점',
        CULTURAL_FACILITY: '문화시설',
        LEISURE_SPORTS: '여가',
        SHOPPING: '쇼핑',
        ACCOMMODATION: '숙박'
    };

    const transportationMap = {
        CAR: '자가용',
        PUBLIC_TRANSPORT: '대중교통'
    }

    const moveTime = moveTimes.find(mt => mt.fromPlace.placeId === item.place.placeId);


    return (
        <div className={styles.scheduleItem}>
            <div className={styles.scheduleIndex}>
                {index}
            </div>
            <div className={styles.scheduleContent}>
                <div className={styles.scheduleImage}>
                    {item.place.image ? (
                        <img src={`${item.place.image}`} alt={item.place.name} className={styles.image} />
                    ) : (
                        <LuImage size="50px"/>
                    )}
                </div>
                <div className={styles.scheduleInfo}>
                    <h3>{item.place.name}</h3>
                    <p>{categoryMap[item.place.category]} | {item.place.address}</p>
                </div>
                <div className={styles.scheduleTime}>
                    {item.place.category === 'ACCOMMODATION' ? (
                        <p>숙소</p>
                    ) : (
                        <>
                            <p>{`${item.startTime[0]}:${String(item.startTime[1]).padStart(2, '0')} ~ 
                                ${item.endTime[0]}:${String(item.endTime[1]).padStart(2, '0')}`}</p>
                            <p>{transportationMap[transportation]} {moveTime && ` : ${moveTime.moveTime} 분`}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScheduleItem;
