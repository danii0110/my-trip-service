import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './PlaceKakaoMap.module.scss';

const PlaceKakaoMap = ({ selectedPlaces, selectedHotels }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });

  useEffect(() => {
    console.log('Selected Places updated:', selectedPlaces); // 추가된 로그
    console.log('Selected Hotels updated:', selectedHotels); // 추가된 로그
    const placesCoords = selectedPlaces.map((place) => ({
      lat: parseFloat(place.mapy),
      lng: parseFloat(place.mapx),
    }));

    const hotelsCoords = selectedHotels.map((hotel) => ({
      lat: parseFloat(hotel.mapy),
      lng: parseFloat(hotel.mapx),
    }));

    const allCoords = [...placesCoords, ...hotelsCoords];

    if (allCoords.length > 0) {
      setCoordinates(allCoords);
      setCenter(allCoords[0]); // 첫 번째 좌표를 지도 중심으로 설정
      console.log('Coordinates set:', allCoords); // 추가된 로그
    } else {
      setCoordinates([]);
    }
  }, [selectedPlaces, selectedHotels]);

  return (
    <Map center={center} className={styles.container} level={3}>
      {coordinates.map((coord, index) => (
        <MapMarker key={index} position={coord} />
      ))}
    </Map>
  );
};

export default PlaceKakaoMap;
