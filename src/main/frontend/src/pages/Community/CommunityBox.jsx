import defaultImage from "../../assets/defaultImage.png";
import styles from "./CommunityBox.module.scss"
import {PiUserCircle} from "react-icons/pi";
import {useNavigate} from "react-router-dom";


const CommunityBox = ({ id, userSrc, imageSrc, userNickname, areacode, sigungucode, year, month, title}) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/community/detail?communityId=${id}`);
    };


    return (
        <div className={styles.container} onClick={() => handleClick(id)}>
            <div className={styles.container}>
                <div className={styles.postInfo}>
                    <div className={styles.userImage}>
                        {userSrc ? <img src={userSrc} alt="user" /> : <PiUserCircle size="40px" />}
                    </div>
                    <div className={styles.info}>
                        <h3>{userNickname}</h3>
                        <p>{areacode} {sigungucode}</p>
                    </div>
                    <div className={styles.date}>
                        <p>{year}</p>
                        <h3>{month}</h3>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img src={imageSrc === "defaultImage" ? defaultImage : `/uploads/${imageSrc}`} alt="default"/>
                </div>
                <div className={styles.title}>
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
};

export default CommunityBox;
