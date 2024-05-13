import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakakoMap = () => {
  return (
    <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ minWidth: '100%', minHeight: '100%' }}>
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
    </Map>
  );
};

export default KakakoMap;
