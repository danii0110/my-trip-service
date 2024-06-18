import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './PlaceKakaoMap.module.scss';

const PlaceKakaoMap = ({ selectedPlaces }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });

  useEffect(() => {
    console.log('Selected Places updated:', selectedPlaces); // 추가된 로그
    if (selectedPlaces.length > 0) {
      const coords = selectedPlaces.map((place) => ({
        lat: parseFloat(place.mapy),
        lng: parseFloat(place.mapx),
      }));
      setCoordinates(coords);
      setCenter(coords[0]); // 첫 번째 좌표를 지도 중심으로 설정
      console.log('Coordinates set:', coords); // 추가된 로그
    } else {
      setCoordinates([]);
    }
  }, [selectedPlaces]);

  return (
    <Map center={center} className={styles.container}>
      {coordinates.map((coord, index) => (
        <MapMarker key={index} position={coord} />
      ))}
    </Map>
  );
};

export default PlaceKakaoMap;
