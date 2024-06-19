import React from 'react';
import styles from './CommunityModal.module.scss';

const CommunityModal = ({ children, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default CommunityModal;
