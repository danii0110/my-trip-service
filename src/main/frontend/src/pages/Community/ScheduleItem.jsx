import React from 'react';
import styles from './ScheduleItem.module.scss';
import {LuImage} from "react-icons/lu";

const ScheduleItem = ({ index, item }) => {
    return (
        <div className={styles.scheduleItem}>
            <div className={styles.scheduleIndex}>
                {index}
            </div>
            <div className={styles.scheduleContent}>
                <div className={styles.scheduleImage}>
                    <LuImage size="50px"/>
                </div>
                <div className={styles.scheduleInfo}>
                    <h3>{item.title}</h3>
                    <p>{item.tag} | {item.address}</p>
                </div>
                <div className={styles.scheduleTime}>
                    <p>{item.time}</p>
                    <p>{item.travelTime}</p>
                </div>
            </div>
        </div>
    );
};

export default ScheduleItem;
