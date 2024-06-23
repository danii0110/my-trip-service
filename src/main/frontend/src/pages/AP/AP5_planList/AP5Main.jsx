import styles from './AP5Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionIcon from '../../../assets/questionIcon.svg';
import UpArrowIcon from '../../../assets/upArrowIcon.svg';
import DownArrowIcon from '../../../assets/downArrowIcon.svg';
import KakakoMap from '../../../modules/api/KakaoMap/KakaoMap';
import { useState, useEffect } from 'react';
import PlanCont from './PlanCont';
import regionMap from '../../../modules/utils/regionMap';
import { useLocation } from 'react-router-dom';

const AP5Main = () => {
  const location = useLocation();
  const { selectedDates, selectedRegion, selectedArea, tableData, selectedPlaces, selectedHotels } =
    location.state || {};

  const [isUpArrow, setIsUpArrow] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal);
    setIsUpArrow(!isUpArrow);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftCont}>
          <div className={styles.cart}>
            <div className={styles.title}>나의 여행 장바구니</div>
            <button className={styles.questionIcon}>
              <img src={QuestionIcon} alt='question-icon' />
              <div className={styles.tooltip}>
                AI 일정 최적화 전에 설정한 일자와 선택한 숙소, 장소들을 중간 저장해 놓은 목록입니다.
              </div>
            </button>
            <button onClick={handleClick}>
              <img
                className={styles.arrowIcon}
                src={isUpArrow ? UpArrowIcon : DownArrowIcon}
                alt={isUpArrow ? 'up-arrow-icon' : 'down-arrow-icon'}
              />
            </button>
          </div>
          {showModal && <div className={styles.modalContainer}>{/* Modal contents */}</div>}
          <div className={styles.planCont}>
            <PlanCont
              selectedDates={selectedDates}
              selectedRegion={selectedRegion}
              selectedArea={selectedArea}
              selectedPlaces={selectedPlaces}
              selectedHotels={selectedHotels}
            />
          </div>
          <div className={styles.divToCheck}>
            <h3>전달된 데이터 확인:</h3>
            <p>
              Region: {selectedRegion !== undefined && selectedRegion !== null ? regionMap[selectedRegion] : '없음'}
            </p>
            <p>Area: {selectedArea}</p>
            <p>Start Date: {selectedDates.start ? selectedDates.start.toLocaleDateString() : '없음'}</p>
            <p>End Date: {selectedDates.end ? selectedDates.end.toLocaleDateString() : '없음'}</p>
            <p>Table Data: {JSON.stringify(tableData)}</p>
            <p>
              Selected Places:{' '}
              {Object.keys(selectedPlaces).map((date) => (
                <div key={date}>
                  <strong>{date}:</strong>
                  {selectedPlaces[date].map((place, index) => (
                    <div key={index}>
                      {place.title} - Duration: {place.duration}분
                    </div>
                  ))}
                </div>
              ))}
            </p>
            <p>Selected Hotels: {JSON.stringify(selectedHotels)}</p>
          </div>
        </div>
        <div className={styles.rightCont}>
          <KakakoMap selectedRegion={selectedRegion} selectedArea={selectedArea} regionMap={regionMap} />
        </div>
      </div>
    </>
  );
};

export default AP5Main;
