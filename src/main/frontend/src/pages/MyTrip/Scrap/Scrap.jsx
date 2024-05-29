import { useState } from 'react';
import Layout from '../../../components/layouts/Layout';
import MyTripHeader from '../MyTripHeader';
import styles from './Scrap.module.scss';
import ScrapBox from './ScrapBox';
import DeleteScrapModal from './DeleteScrapModal';

const Scrap = () => {
  const plansData = [
    { date: '24.04.25-24.04.28', areaName: '광주 동구' },
    { date: '24.05.10-24.05.15', areaName: '서울 강남구' },
    { date: '24.06.01-24.06.05', areaName: '부산 해운대구' },
    { date: '24.07.20-24.07.25', areaName: '대구 중구' },
    { date: '24.08.15-24.08.20', areaName: '인천 연수구' },
    { date: '24.09.05-24.09.10', areaName: '제주 제주시' },
    { date: '24.10.12-24.10.18', areaName: '광주 북구' },
    { date: '24.11.22-24.11.27', areaName: '대전 유성구' },
    { date: '24.12.01-24.12.05', areaName: '서울 종로구' },
    { date: '25.01.15-25.01.20', areaName: '경기 수원시' },
    { date: '25.02.10-25.02.15', areaName: '울산 남구' },
    { date: '25.03.05-25.03.10', areaName: '세종' },
    { date: '25.04.20-25.04.25', areaName: '충남 천안시' },
    { date: '25.05.15-25.05.20', areaName: '전북 전주시' },
    { date: '25.06.10-25.06.15', areaName: '강원 춘천시' },
    { date: '25.07.05-25.07.10', areaName: '경북 포항시' },
  ];

  const [plans, setPlans] = useState(plansData);
  const [editMode, setEditMode] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const plansPerPage = 8;

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedPlans([]);
  };

  const handleSelect = (index) => {
    if (selectedPlans.includes(index)) {
      setSelectedPlans(selectedPlans.filter((i) => i !== index));
    } else {
      setSelectedPlans([...selectedPlans, index]);
    }
  };

  const handleDelete = () => {
    setPlans(plans.filter((_, i) => !selectedPlans.includes(i)));
    setSelectedPlans([]);
    setEditMode(false);
    setShowDeleteModal(false); // Close the modal after deletion
  };

  const totalPages = Math.ceil(plans.length / plansPerPage);

  const currentPlans = plans.slice((currentPage - 1) * plansPerPage, currentPage * plansPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Layout>
        <MyTripHeader />
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>스크랩</div>
            <button className={styles.editBtn} onClick={editMode ? openDeleteModal : toggleEditMode}>
              {editMode ? '삭제' : '편집'}
            </button>
          </div>
          <div className={styles.mainCont}>
            <div className={styles.main}>
              {currentPlans.map((plan, index) => (
                <ScrapBox
                  key={index}
                  date={plan.date}
                  areaName={plan.areaName}
                  selected={selectedPlans.includes(index)}
                  onSelect={() => handleSelect(index)}
                  editMode={editMode}
                />
              ))}
            </div>
          </div>
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.active : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </Layout>
      <DeleteScrapModal show={showDeleteModal} onHide={closeDeleteModal} onDelete={handleDelete} />
    </>
  );
};

export default Scrap;
