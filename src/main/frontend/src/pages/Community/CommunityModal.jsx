import React from 'react';
import styles from './CommunityModal.module.scss';

const CommunityModal = ({ children, onClose, width, height, size }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ width: width, height:height }}>
                <button className={styles.closeButton}
                        style={{fontSize: size}}
                        onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default CommunityModal;
