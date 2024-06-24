// src/modules/utils/importImages.js
import Busan from '../../localImage/Busan.webp';
import Chungbuk from '../../localImage/Chungbuk.webp';
import Chungnam from '../../localImage/Chungnam.webp';
import Daegu from '../../localImage/Daegu.webp';
import Daejeon from '../../localImage/Daejeon.webp';
import Gangwon from '../../localImage/Gangwon.webp';
import Gwangju from '../../localImage/Gwangju.webp';
import Gyeongbuk from '../../localImage/Gyeongbuk.webp';
import Gyeonggi from '../../localImage/Gyeonggi.webp';
import Gyeongnam from '../../localImage/Gyeongnam.webp';
import Incheon from '../../localImage/Incheon.webp';
import Jeju from '../../localImage/Jeju.webp';
import Jeonbuk from '../../localImage/Jeonbuk.webp';
import Jeonnam from '../../localImage/Jeonnam.webp';
import Sejong from '../../localImage/Sejong.webp';
import Seoul from '../../localImage/Seoul.webp';
import Ulsan from '../../localImage/Ulsan.webp';

const images = {
    Busan, Chungbuk, Chungnam, Daegu, Daejeon, Gangwon,
    Gwangju, Gyeongbuk, Gyeonggi, Gyeongnam, Incheon,
    Jeju, Jeonbuk, Jeonnam, Sejong, Seoul, Ulsan
};

const imageNameMap = {
    'Busan': '부산',
    'Chungbuk': '충북',
    'Chungnam': '충남',
    'Daegu': '대구',
    'Daejeon': '대전',
    'Gangwon': '강원',
    'Gwangju': '광주',
    'Gyeongbuk': '경북',
    'Gyeonggi': '경기',
    'Gyeongnam': '경남',
    'Incheon': '인천',
    'Jeju': '제주',
    'Jeonbuk': '전북',
    'Jeonnam': '전남',
    'Sejong': '세종',
    'Seoul': '서울',
    'Ulsan': '울산'
};

export const getImageName = (locationName) => {
    const imageName = Object.keys(imageNameMap).find(key => imageNameMap[key] === locationName);
    return images[imageName];
};
