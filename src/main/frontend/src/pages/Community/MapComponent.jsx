import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from "./MapComponent.module.scss"

const MapComponent = ({ scheduleForSelectedDate }) => {
    const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 });

    useEffect(() => {
        if (scheduleForSelectedDate.length > 0) {
            setCenter({
                lat: Number(scheduleForSelectedDate[0].place.xCoordinate),
                lng: Number(scheduleForSelectedDate[0].place.yCoordinate)
            });
        }
    }, [scheduleForSelectedDate]);
    console.log(scheduleForSelectedDate);

    return (
        <Map center={center} level={3} className={styles.map}>
            {scheduleForSelectedDate.map((item, index) => (
                <MapMarker
                    key={index}
                    position={{ lat: Number(item.place.xCoordinate), lng: Number(item.place.yCoordinate) }}
                ></MapMarker>
            ))}
        </Map>
    );
};

export default MapComponent;
