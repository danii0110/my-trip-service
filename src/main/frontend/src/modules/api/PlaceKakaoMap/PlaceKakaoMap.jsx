import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import axios from 'axios';
import styles from './PlaceKakaoMap.module.scss';

const PlaceKakaoMap = ({ selectedPlaces }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (selectedPlaces.length > 0) {
        try {
          const response = await axios.post(
            'http://localhost:8080/data/coordinates',
            selectedPlaces.map((place) => place.id)
          );
          const coords = response.data.map((item) => ({
            lat: parseFloat(item.mapy),
            lng: parseFloat(item.mapx),
          }));
          setCoordinates(coords);
          setCenter(coords[0]); // 첫 번째 좌표를 지도 중심으로 설정
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      }
    };
    fetchCoordinates();
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
