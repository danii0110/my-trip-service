import React, {useEffect, useRef, useState} from 'react';
import styles from "./CommunityPost.module.scss";
import Header from '../../components/layouts/Header'; // Assuming you have a separate Header component
import defaultImage from "../../assets/imageComponent.svg"
import calendar from "../../assets/calendarIcon.svg";
import marker from "../../assets/markerIcon.png";
import {createCommunityPost, fetchCommunityDetail, uploadImage, updateCommunityPost} from "./communityApi"
import {useNavigate, useSearchParams} from "react-router-dom";

const CommunityPost = () => {
    const [searchParams] = useSearchParams();
    const communityId = searchParams.get("communityId");
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(!!communityId);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedCompanion, setSelectedCompanion] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(defaultImage);
    const [imageId, setImageId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [oldData, setOldData] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 상태 관리
    const [showAlert, setShowAlert] = useState(false);
    const textAreaRef = useRef(null);
    const fileInputRef = useRef(null);

    const dummyUserId = 1; // Dummy userId
    const dummyPlanId = 25; // Dummy planId

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
        if (isEditing) {
            fetchPostDetail();
        }
    }, [])

    useEffect(() => {
        adjustHeight();
    }, [text]);

    const fetchPostDetail = async () => {
        try {
            const data = await fetchCommunityDetail(communityId);
            setTitle(data.title);
            setText(data.content);
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
            setShowAlert(true);
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

        console.log(imageId);

        const newPost = {
            user: {
                userId: dummyUserId
            },
            plan: {
                planId: dummyPlanId
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
        navigate(`/community/detail?communityId=${communityId}`);
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
                        <button onClick={handleCancel}>취소</button>
                        <button onClick={handleSubmit}>저장</button>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.dateLocationContainer}>
                        <h3>여행 일정</h3>
                        <div className={styles.dateLocation}>
                            <div className={styles.date}>
                                <img src={calendar} alt="date" />
                                <p>기간</p>
                            </div>
                            <div className={styles.location}>
                                <img src={marker} alt="marker" />
                                <p>장소</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.plan}>
                        <h3>여행 계획</h3>
                        <div className={styles.planDetail}>
                            <div className={styles.planInfo}>
                                <h3>도시명</h3>
                                <p>기간</p>
                            </div>
                            <div style={styles.planMap}>
                                <img src={defaultImage} alt="map"/>
                            </div>
                            <div className={styles.goPlan}>
                                <p>상세보기 ></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CommunityPost;
