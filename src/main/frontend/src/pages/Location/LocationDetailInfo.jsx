import React from 'react';
import LocationDisplayItem from './LocationDisplayItem';
import styles from './LocationDetailInfo.module.scss';

const DetailInfo = ({ detail, item }) => {
    const renderItems = () => {
        switch (item.contenttypeid) {
            case '12':
                return (
                    <ul className={styles.grid}>
                        <LocationDisplayItem label="문의 및 안내" value={detail.infocenter} />
                        <LocationDisplayItem label="홈페이지" value={item.homepage} />
                        <LocationDisplayItem label="주소" value={item.addr1} />
                        <LocationDisplayItem label="이용시간" value={detail.usetime} />
                        <LocationDisplayItem label="개장일" value={detail.opendate} />
                        <LocationDisplayItem label="휴일" value={detail.restdate} />
                        <LocationDisplayItem label="체험 안내" value={detail.expguide} />
                        <LocationDisplayItem label="체험 연령" value={detail.expagerange} />
                        <LocationDisplayItem label="수용 인원" value={detail.accomcount} />
                        <LocationDisplayItem label="이용시기" value={detail.useseason} />
                        <LocationDisplayItem label="주차시설" value={detail.parking} />
                    </ul>
                );
            case '14': // 예: 공연장 타입
                return (
                    <ul className={styles.grid}>
                        <LocationDisplayItem label="문의 및 안내" value={detail.infocenterculture} />
                        <LocationDisplayItem label="홈페이지" value={item.homepage} />
                        <LocationDisplayItem label="주소" value={item.addr1} />
                        <LocationDisplayItem label="이용 시간" value={item.usetimeculture} />
                        <LocationDisplayItem label="휴일" value={item.restdateculture} />
                        <LocationDisplayItem label="주차" value={item.parkingculture} />
                        <LocationDisplayItem label="이용 요금" value={item.usefee} />
                    </ul>
                );
            case '32':
                return (
                  <ul className={styles.grid}>
                      <LocationDisplayItem label="문의 및 안내" value={detail.infocenterlodging} />
                      <LocationDisplayItem label="홈페이지" value={item.homepage} />
                      <LocationDisplayItem label="주소" value={item.addr1} />
                      <LocationDisplayItem label="주차" value={detail.parkinglodging} />
                      <LocationDisplayItem label="수용인원" value={detail.accomcountlodging} />
                      <LocationDisplayItem label="입실시간" value={detail.checkintime} />
                      <LocationDisplayItem label="퇴실시간" value={detail.checkouttime} />
                      <LocationDisplayItem label="객실내 취사 여부" value={detail.chkcooking} />
                      <LocationDisplayItem label="식음료장" value={detail.foodplace} />
                      <LocationDisplayItem label="픽업서비스" value={detail.pickup} />
                      <LocationDisplayItem label="객실수" value={detail.roomcount} />
                      <LocationDisplayItem label="예약안내 홈페이지" value={detail.reservationurl} />
                      <LocationDisplayItem label="객실유형" value={detail.roomtype} />
                      <LocationDisplayItem label="규모" value={detail.scalelodging} />
                      <LocationDisplayItem label="부대시설" value={detail.subfacility} />
                  </ul>
                );
            default: // 기본 타입
                return (
                    <ul className={styles.grid}>
                        <LocationDisplayItem label="문의 및 안내" value={detail.infocenter} />
                        <LocationDisplayItem label="홈페이지" value={item.homepage} />
                        <LocationDisplayItem label="주소" value={item.addr1} />
                        <LocationDisplayItem label="이용시간" value={detail.usetime} />
                        <LocationDisplayItem label="개장일" value={detail.opendate} />
                        <LocationDisplayItem label="휴일" value={detail.restdate} />
                        <LocationDisplayItem label="체험 안내" value={detail.expguide} />
                        <LocationDisplayItem label="체험 연령" value={detail.expagerange} />
                        <LocationDisplayItem label="수용 인원" value={detail.accomcount} />
                        <LocationDisplayItem label="이용시기" value={detail.useseason} />
                        <LocationDisplayItem label="주차" value={detail.parking} />
                    </ul>
                );
        }
    };

    return (
        <div className={styles.detailInfo}>
            {renderItems()}
        </div>
    );
};

export default DetailInfo;
