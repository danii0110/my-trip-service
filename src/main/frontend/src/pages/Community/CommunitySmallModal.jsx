import React from "react";
import styles from "./CommunitySmallModal.module.scss"

const CommunitySmallModal = ({header, content, onConfirm, onCancel}) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{header}</h2>
                </div>
                <div className={styles.modal}>
                    {content}
                    <div className={styles.modalButton}>
                        <button onClick={onConfirm}>확인</button>
                        <button onClick={onCancel}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunitySmallModal;