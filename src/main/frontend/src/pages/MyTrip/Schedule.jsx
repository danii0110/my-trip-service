import styles from './Schedule.module.scss';
import DotsIcon from '../../assets/dotsIcon.svg';
import { useState, useEffect, useRef } from 'react';
import ShareKakaoModal from './ShareKakaoModal';

const Schedule = ({ data, onDelete }) => {
  const [dDay, setDDay] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [tripTitle, setTripTitle] = useState(data.tripTitle || '여행 이름 입력');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const calculateDDay = () => {
      const today = new Date();
      const [startDateStr] = data.duration.split('~');
      const startDate = new Date(`20${startDateStr.split('.').join('-')}`);
      const diffTime = startDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let dDayText;
      if (diffDays > 0) {
        dDayText = `D-${diffDays}`;
      } else if (diffDays < 0) {
        dDayText = `D+${Math.abs(diffDays)}`;
      } else {
        dDayText = 'D-day';
      }

      // const items = diffDays > 0 ? ['일정보기', '공유하기', '삭제'] : ['일정보기', '글쓰기', '삭제'];
      const items = diffDays > 0 ? ['일정보기', '삭제'] : ['일정보기', '글쓰기', '삭제'];

      setDDay(dDayText);
      setMenuItems(items);
    };

    calculateDDay();
  }, [data.duration]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTitleClick = () => {
    if (tripTitle === '여행 이름 입력') {
      setTripTitle('');
    }
    setIsEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setTripTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    if (!tripTitle.trim()) {
      setTripTitle('여행 이름 입력');
    }
    setIsEditingTitle(false);
  };

  const handleDotsClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (item) => {
    if (item === '삭제') {
      onDelete();
    } else if (item === '공유하기') {
      setShowShareModal(true); // '공유하기' 클릭 시 모달 표시
    }
    setShowMenu(false);
  };

  const handleCloseModal = () => {
    setShowShareModal(false); // 모달 닫기
  };

  const handleButtonClick = () => {
    setShowShareModal(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.tripImg}></div>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.dDayCont}>{dDay}</div>
          <div className={styles.areaName}>{data.areaName}</div>
        </div>
        <div className={styles.tripTitleCont}>
          {isEditingTitle ? (
            <input type='text' value={tripTitle} onChange={handleTitleChange} onBlur={handleTitleBlur} autoFocus />
          ) : (
            <div
              className={`${styles.tripTitle} ${tripTitle === '여행 이름 입력' ? styles.placeholder : ''}`}
              onClick={handleTitleClick}
            >
              {tripTitle}
            </div>
          )}
          {/* {!isEditingTitle && tripTitle !== '여행 이름 입력' && (
            <div className={styles.edit} onClick={handleTitleClick}>
              수정
            </div>
          )} */}
        </div>
        <div className={styles.duration}>{data.duration}</div>
        {/* {data.isShared && (
          <div className={styles.shareCont}>
            {data.isHost && <div className={styles.hostCont}>호스트</div>}
            <div className={styles.checkCont}>공유일정</div>
            <div className={styles.partyCont}>일행+{data.partyCount}</div>
          </div>
        )} */}
      </div>
      <div className={styles.editDateCont}>최근수정일 {data.lastEdited}</div>
      <button className={styles.dotsIcon} onClick={handleDotsClick}>
        <img src={DotsIcon} alt='dots-icon' />
      </button>
      {showMenu && (
        <div className={styles.menu} ref={menuRef}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.menuItem} onClick={() => handleMenuItemClick(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
      {showShareModal && <ShareKakaoModal show={showShareModal} onHide={() => setShowShareModal(false)} />}
    </div>
  );
};

export default Schedule;
