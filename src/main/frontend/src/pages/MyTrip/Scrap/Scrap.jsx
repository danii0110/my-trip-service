import {useEffect, useState} from 'react';
import Layout from '../../../components/layouts/Layout';
import MyTripHeader from '../MyTripHeader';
import styles from './Scrap.module.scss';
import ScrapBox from './ScrapBox';
import DeleteScrapModal from './DeleteScrapModal';
import { getScrapsByUserId, deleteScrap } from '../../Community/communityApi';

const Scrap = () => {

  const [plans, setPlans] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dummyUserId = 1;

  const plansPerPage = 8;

  useEffect(() => {
    const fetchScraps = async () => {
      const data = await getScrapsByUserId(dummyUserId);
      setPlans(data);
      console.log(data);
    };
    fetchScraps();
  }, []);

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

  const handleDelete = async () => {
    await Promise.all(selectedPlans.map((planIndex) => deleteScrap(plans[planIndex].scrapId)));
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
                  communityId={plan.community.communityId}
                  startDate={plan.plan.startDate}
                  endDate={plan.plan.endDate}
                  areaName={plan.plan.region}
                  selected={selectedPlans.includes(index)}
                  onSelect={() => handleSelect(index)}
                  editMode={editMode}
                  imageSrc={plan.community.image? plan.community.image.imagePath : null}
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
