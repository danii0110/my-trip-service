import styles from './KakaoMap.module.scss';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakakoMap = ({ selectedRegion, selectedArea, regionMap, level}) => {
  const coordinates = {
    서울: { lat: 37.5665, lng: 126.978 },
    부산: { lat: 35.1796, lng: 129.0756 },
    대구: { lat: 35.8722, lng: 128.6014 },
    인천: { lat: 37.4563, lng: 126.7052 },
    광주: { lat: 35.1595, lng: 126.8526 },
    대전: { lat: 36.3504, lng: 127.3845 },
    울산: { lat: 35.5384, lng: 129.3114 },
    세종: { lat: 36.4875, lng: 127.2817 },
    경기: { lat: 37.2636, lng: 127.0286 },
    강원: { lat: 37.8854, lng: 127.7298 },
    충북: { lat: 36.6356, lng: 127.4917 },
    충남: { lat: 36.6588, lng: 126.6728 },
    전북: { lat: 35.8218, lng: 127.148 },
    전남: { lat: 34.8679, lng: 126.991 },
    경북: { lat: 36.576, lng: 128.5056 },
    경남: { lat: 35.4606, lng: 128.2132 },
    제주: { lat: 33.4996, lng: 126.5312 },
  };

  const center = coordinates[regionMap?.[selectedRegion] ?? selectedRegion] || { lat: 33.5563, lng: 126.79581 };

  return (
    <Map center={center} className={styles.container} level={level}>
      <MapMarker position={center}></MapMarker>
    </Map>
  );
};

export default KakakoMap;
