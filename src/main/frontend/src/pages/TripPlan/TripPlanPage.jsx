import styles from './TripPlanPage.module.scss';
import Layout from '../../components/layouts/Layout';
import React, { useEffect, useRef, useState } from 'react';
import PageInfo from '../../components/layouts/PageInfo';
import leftFill from '../../assets/leftFill.svg';
import rightFill from '../../assets/rightFill.svg';
import upFill from '../../assets/upFill.svg';
import downFill from '../../assets/downFill.svg';
import TripLocationList from './TripLocationList';
import Search from '../../components/Element/Search';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getImageName } from '../../modules/utils/importImages';

const TripPlanPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const areaCode = searchParams.get('areaCode') || '2';
  const sigunguCode = searchParams.get('sigunguCode') || '0';

  const [areaList, setAreaList] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedButton, setSelectedButton] = useState('전체');
  const buttonContainerRef = useRef(null);

  const handleContent = (areacode, sigungucode) => {
    // 버튼을 클릭할 때 검색 페이지로 이동하고 검색어를 URL에 추가
    let area = areaList[areacode][sigungucode];
    if (sigungucode === '0') {
      area = '전체';
    }

    if (areaCode === areacode) {
      setShowMore(showMore);
    } else {
      setShowMore(false);
    }

    setSelectedButton(area);
    navigate(`/trip-plan?areaCode=${areacode}&sigunguCode=${sigungucode}`);
  };

  const fetchAreaName = async () => {
    try {
      const response = await axios.get('/area/areaCode');

      const areaSigunguMap = response.data.reduce((acc, curr) => {
        if (!acc[curr.areacode]) {
          acc[curr.areacode] = {};
        }
        acc[curr.areacode][curr.sigungucode || '0'] = curr.name;
        return acc;
      }, {});
      setAreaList(areaSigunguMap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreaName();
  }, []);

  useEffect(() => {
    if (buttonContainerRef.current) {
      const isOverflow = buttonContainerRef.current.scrollHeight > buttonContainerRef.current.clientHeight;
      setIsOverflowing(isOverflow);
    }
    if (showMore === true) {
      setIsOverflowing(true);
    }
  }, [areaCode, sigunguCode]);

  function CircleButton(props) {
    return (
      <div className={styles.circleButton}>
        <button type='button' key={props.name} onClick={props.onClick}>
          <img src={props.imageSrc} alt={props.name} />
        </button>
        <p>{props.name}</p>
      </div>
    );
  }
  
  function GreenButton(props) {
    return (
        <div>
          <button type='button' className={`${styles.greenButton} ${props.className}`} onClick={props.onClick}>
            {props.name}
          </button>
        </div>
    );
  }

  const handleMakePlan = () => {
        navigate('/planning/areaName', { state: { selectedRegion: areaCode, selectedArea: areaList[areaCode][sigunguCode] } });
    }
      
  const processLocationName = (name) => {
    // 1. '도'를 포함하면 '도' 삭제
    if (name.includes('도')) {
      name = name.replace('도', '');
    }
    // 2. 1번 조건 수행 후 글자가 3자이면 가운데 글자 삭제
    if (name.length === 3) {
      name = name[0] + name[2];
    }
    // 3. 2번 조건 수행 후 글자가 3자 이상이면 앞에 2글자만 남기고 삭제
    if (name.length > 2) {
      name = name.slice(0, 2);
    }
    return name;
  };
  
      const Carousel = () => {
        const renderLocationButtons = () => {
          const buttons = Object.keys(areaList)
              .map((areacode) => {
                const sigungucode = '0';
                let locationName = areaList[areacode][sigungucode];
                locationName = processLocationName(locationName);
                return (
                    <CircleButton
                        key={locationName}
                        name={locationName}
                        imageSrc={getImageName(locationName)}
                        onClick={() => handleContent(areacode, sigungucode)}
                    />
                );
              })
              .filter((button) => button.props.name); // 이름이 있는 버튼만 반환

          const slides = [buttons.slice(0, 9), buttons.slice(8, 17)];
          return slides[currentSlide];
        };

        const handlePrev = () => {
          if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
          }
        };

        const handleNext = () => {
          if (currentSlide < 1) {
            setCurrentSlide(currentSlide + 1);
          }
        };

        return (
            <div className={styles.carousel}>
              {currentSlide > 0 && (
                  <button type='button' className={styles.leftArrow} onClick={handlePrev}>
                    <img src={leftFill} alt='leftArrow'/>
                  </button>
              )}
              <div className={styles.regionButtons}>{renderLocationButtons()}</div>
              {currentSlide < 1 && (
                  <button type='button' className={styles.rightArrow} onClick={handleNext}>
                    <img src={rightFill} alt='rightArrow'/>
                  </button>
              )}
            </div>
        );
      };

      const Region = () => {
        if (!areaList || Object.keys(areaList).length === 0) {
          return <div>Loading...</div>; // or any loading indicator
        }

        const renderHeader = (areaCode, sigunguCode) => {
          let locationName = areaList[areaCode]['0'];
          locationName = processLocationName(locationName);
          let sigunguName = areaList[areaCode][sigunguCode];

          if (sigunguCode === '0') {
            sigunguName = '전체';
          }

          return (
              <div className={styles.aboutHeader}>
                <div className={styles.title}>{locationName}</div>
                <button
                    type='button'
                    className={styles.greenBigButton}
                    onClick={handleMakePlan}
                >
                  {locationName} {sigunguName} 플랜 생성하기 &gt;
                </button>
                {isOverflowing && (
                    <button type='button' className={styles.blackButton} onClick={() => setShowMore(!showMore)}>
                      {showMore ? (
                          <>
                            접기
                            <img src={upFill} alt='접기'/>
                          </>
                      ) : (
                          <>
                            더보기
                            <img src={downFill} alt='더보기'/>
                          </>
                      )}
                    </button>
                )}
              </div>
          );
        };

        const renderSigunguButtons = (areaCode) => {
          if (!areaList || !areaList[areaCode]) {
            return null; // areaList가 유효하지 않거나 해당 areaCode가 없는 경우
          }

          return (
              <div className={`${styles.buttonContainer} ${showMore ? styles.showMore : ''}`} ref={buttonContainerRef}>
                {Object.keys(areaList[areaCode])
                    .map((sigungucode) => {
                      let sigunguName = areaList[areaCode][sigungucode];

                      if (sigungucode === '0' || !sigunguName) {
                        return (
                            <GreenButton
                                className={'전체' === selectedButton ? styles.selectedButton : ''}
                                key='전체'
                                name='전체'
                                onClick={() => handleContent(areaCode, sigungucode)}
                            />
                        ); // sigunguName이 undefined 또는 null인 경우 생략
                      }

                      return (
                          <GreenButton
                              className={sigunguName === selectedButton ? styles.selectedButton : ''}
                              key={sigunguName}
                              name={sigunguName}
                              onClick={() => handleContent(areaCode, sigungucode)}
                          />
                      );
                    })
                    .filter((button) => button !== null)}
              </div>
          );
        };

        return (
            <div className={styles.region}>
              <Carousel/>
              <div className={styles.about}>
                {renderHeader(areaCode, sigunguCode)}
                {renderSigunguButtons(areaCode)}
              </div>
            </div>
        );
      };

      return (
          <Layout>
            <PageInfo>
              <Search text={'원하는 여행지를 검색해보세요'}/>
            </PageInfo>
            <Region/>
            <TripLocationList areaList={areaList} areacode={areaCode} sigungucode={sigunguCode}/>
          </Layout>
      );
};
export default TripPlanPage;
