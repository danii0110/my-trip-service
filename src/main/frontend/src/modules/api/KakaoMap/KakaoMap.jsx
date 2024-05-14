import styles from './KakaoMap.module.scss';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakakoMap = () => {
  return (
    <Map center={{ lat: 33.5563, lng: 126.79581 }} className={styles.container}>
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
    </Map>
  );
};

export default KakakoMap;
