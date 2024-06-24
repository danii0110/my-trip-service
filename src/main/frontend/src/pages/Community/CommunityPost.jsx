import React, {useEffect, useRef, useState} from 'react';
import styles from "./CommunityPost.module.scss";
import Header from '../../components/layouts/Header'; // Assuming you have a separate Header component
import defaultImage from "../../assets/imageComponent.svg"
import calendar from "../../assets/calendarIcon.svg";
import marker from "../../assets/markerIcon.png";
import {createCommunityPost, fetchCommunityDetail, uploadImage, updateCommunityPost} from "./communityApi"
import {formatDate, calculateDuration} from "../../modules/utils/util";
import {getPlanById} from "./communityPlanApi"
import {useNavigate, useSearchParams} from "react-router-dom";
import KakakoMap from "../../modules/api/KakaoMap/KakaoMap";
import CommunitySmallModal from "./CommunitySmallModal";

const CommunityPost = () => {
    const [searchParams] = useSearchParams();
    const communityId = searchParams.get("communityId");
    const plan = searchParams.get("planId");

    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(!!communityId);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedCompanion, setSelectedCompanion] = useState(null);
    const [planId, setPlanId] = useState(plan || null);
    const [planData, setPlanData] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(defaultImage);
    const [imageId, setImageId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [oldData, setOldData] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const textAreaRef = useRef(null);
    const fileInputRef = useRef(null);

    const dummyUserId = 1; // Dummy userId

    const genderMap = {
        '남': 'MALE',
        '여': 'FEMALE',
        '비공개': 'NONE'
    };

    const ageMap = {
        '10대': 'TEENS',
        '20대': 'TWENTIES',
        '30대': 'THIRTIES',
        '40대': 'FORTIES',
        '50대': 'FIFTIES',
        '60대 이상': 'SIXTIES',
        '비공개': 'NONE'
    };

    const companionMap = {
        '나혼자': 'ALONE',
        '가족과함께': 'FAMILY',
        '친구와함께': 'FRIEND',
        '아이와함께': 'CHILD',
        '반려동물과함께': 'PET'
    };

    useEffect(() => {
        const fetchDetails = async () => {
            if (isEditing) {await fetchPostDetail();}
            if (planId) {await fetchPlanDetail();}
        };
        fetchDetails();
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [isEditing, planId]);

    useEffect(() => {
        adjustHeight();
    }, [text]);

    const fetchPostDetail = async () => {
        try {
            const data = await fetchCommunityDetail(communityId);
            setTitle(data.title);
            setText(data.content);
            setPlanId(data.plan.planId);
            setSelectedGender(Object.keys(genderMap).find(key => genderMap[key] === data.gender));
            setSelectedAge(Object.keys(ageMap).find(key => ageMap[key] === data.ageGroup));
            setSelectedCompanion(Object.keys(companionMap).find(key => companionMap[key] === data.mates));
            if (data.image && data.image.imagePath) {
                setImageId(data.image.imageId);
                setImage(`/uploads/${data.image.imagePath}`);
            }
            setOldData(data);
        } catch (error) {
            console.error('Failed to fetch post detail', error);
        }
    };

    const fetchPlanDetail = async() => {
        const data = await getPlanById(planId);
        setPlanData(data);
    };

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };

    const handleAgeClick = (age) => {
        setSelectedAge(age);
    };

    const handleCompanionClick = (companion) => {
        setSelectedCompanion(companion);
    };

    const handleTextChange = (event) => {
        if (event.target.value.length <= 5000) { // 입력 제한 추가
            setText(event.target.value);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const adjustHeight = () => {
        const textArea = textAreaRef.current;
        if (textArea) {
            const currentScroll = window.scrollY;

            textArea.style.height = 'auto';
            const newHeight = Math.min(Math.max(textArea.scrollHeight, 300));
            textArea.style.height = `${newHeight}px`;

            // 스크롤 위치 복원
            window.scrollTo({
                top: currentScroll,
                behavior: "instant"
            });
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
            setImageFile(file); // 이미지 파일 저장
        }
    };

    const handleImageClick = () => {
        if (image === defaultImage) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveImage = () => {
        setImage(defaultImage);
        setImageFile(null);
        setImageId(null);
    };

    const handleSubmit = async () => {
        if (title.trim() === '' || text.trim() === '' ||
            !selectedGender || !selectedAge || !selectedCompanion) {
            return;
        }

        let newImage = imageId;

        if (imageFile && image !== defaultImage) {
            try {
                const response = await uploadImage(imageFile); // 이미지 업로드 호출
                newImage = response.data;
                setImageId(newImage);// 업로드된 이미지 ID 저장
            } catch (error) {
                console.error('There was an error uploading the image!', error);
                setImageId(null);
            }
        }

        const newPost = {
            user: {
                userId: dummyUserId
            },
            plan: {
                planId: planId
            },
            gender: genderMap[selectedGender], // Gender 매핑
            ageGroup: ageMap[selectedAge], // AgeGroup 매핑
            mates: companionMap[selectedCompanion], // Mates 매핑
            title: title, // 제목 설정
            content: text,
            image: newImage ? { imageId: newImage } : null

        };

        try {
            if (isEditing) {
                await updateCommunityPost(communityId, newPost);
                //navigate('/community');
                navigate(`/community/detail?communityId=${communityId}`);
                console.log("okay");
            } else {
                await createCommunityPost(newPost);
                navigate('/community'); // 리디렉션
            }
        } catch (error) {
            console.error('There was an error submitting the post!', error);
        }
    };

    const handleCancel = () => {
        if (isEditing) {
            navigate(`/community/detail?communityId=${communityId}`);
        } else {
            navigate("/community");
        }
    }

    if (!planData || (isEditing && !oldData)) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.imageContainer} onClick={handleImageClick}>
                <img src={image} alt="Uploaded" className={styles.headerImage}/>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleImageChange}
                />
                {image !== defaultImage && (
                    <button className={styles.removeButton} onClick={handleRemoveImage}>X</button>
                )}
            </div>
            <div className={styles.form}>
                <div className={styles.leftSection}>
                    <div className={styles.title}>
                        <h3>제목</h3>
                        <input
                            id="title"
                            type="text"
                            placeholder="제목을 입력하세요"
                            className={styles.titleInput}
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className={styles.selection}>
                        <div className={styles.genderSelection}>
                            <h3>성별</h3>
                            <div className={styles.buttonContainer}>
                                {Object.keys(genderMap).map((gender) => (
                                    <button
                                        key={gender}
                                        className={selectedGender === gender ? styles.active : ''}
                                        onClick={() => handleGenderClick(gender)}
                                    >
                                        <p>{gender}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.ageSelection}>
                            <h3>연령대</h3>
                            <div className={styles.buttonContainer}>
                                {Object.keys(ageMap).map((age) => (
                                    <button
                                        key={age}
                                        className={selectedAge === age ? styles.active : ''}
                                        onClick={() => handleAgeClick(age)}
                                    >
                                        <p>{age}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.companionSelection}>
                        <h3>동행인</h3>
                        <div className={styles.buttonContainer}>
                            {Object.keys(companionMap).map((companion) => (
                                <button
                                    key={companion}
                                    className={selectedCompanion === companion ? styles.active : ''}
                                    onClick={() => handleCompanionClick(companion)}
                                >
                                    <p>{companion}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <h3>여행 소개 ({text.length}/5000)</h3>
                        <textarea
                            id = "textarea"
                            ref={textAreaRef}
                            value={text}
                            placeholder="여행 상세"
                            className={styles.detailInput}
                            onChange={handleTextChange}
                        ></textarea>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={()=> {setShowConfirmModal(true)}}>취소</button>
                        <button onClick={() => {setShowConfirmModal(true); setIsSave(true)}}>저장</button>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.dateLocationContainer}>
                        <h3>여행 일정</h3>
                        <div className={styles.dateLocation}>
                            <div className={styles.date}>
                                <img src={calendar} alt="date" />
                                <p>{formatDate(planData.startDate)} - {formatDate(planData.endDate)}</p>
                            </div>
                            <div className={styles.location}>
                                <img src={marker} alt="marker" />
                                <p>{planData.region}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.plan}>
                        <h3>여행 계획</h3>
                        <div className={styles.planDetail}>
                            <div className={styles.planInfo}>
                                <h3>{planData.region}</h3>
                                <p>{calculateDuration(planData.startDate, planData.endDate)} / {planData.transportation === "CAR" ? "자동차" : "대중교통"} 이용</p>
                            </div>
                            <div className={styles.planMap}>
                                <KakakoMap level="12" selectedRegion={planData.region.split(' ')[0]}/>
                            </div>
                        </div>
                    </div>
                </div>
                {showConfirmModal &&
                    <CommunitySmallModal
                        header="게시글 작성"
                        content={<div>{isSave ? "게시글을 저장하시겠습니까?" : "게시글 작성을 취소하시겠습니까?"}</div>}
                        onConfirm={isSave ? handleSubmit : handleCancel}
                        onCancel={() => {setShowConfirmModal(false); setIsSave(false);}}
                    />
                }
            </div>
        </div>
    );
};

export default CommunityPost;
