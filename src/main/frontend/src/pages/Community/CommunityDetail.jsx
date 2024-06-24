import React, {useEffect, useState} from 'react';
import styles from "./CommunityDetail.module.scss";
import Layout from '../../components/layouts/Layout'; // Assuming you have a separate Header component
import defaultImage from "../../assets/imageComponent.svg"
import defaultUserImage from "../../assets/profileIcon.svg"
import calendar from "../../assets/calendarIcon.svg";
import marker from "../../assets/markerIcon.png";
import Comment from "./Comment";
import { fetchCommunityDetail, addComment, fetchCommentsByCommunityId, updateComment, deleteComment, deleteCommunityPost } from "./communityApi";
import { incrementViewCount, incrementCommentCount, decrementCommentCount, incrementScrapCount, decrementScrapCount } from "./communityApi"
import {formatDateTime, formatDate, calculateDuration} from "../../modules/utils/util";
import { addScrap, deleteScrap, getScrapByCommunityIdAndUserId } from "./communityApi";
import {useNavigate, useSearchParams} from "react-router-dom";
import {IoBookmark, IoBookmarkOutline, IoPencilSharp, IoShareSocial, IoTrashOutline} from "react-icons/io5";
import CommunitySmallModal from "./CommunitySmallModal";
import copy from 'copy-to-clipboard';
import KakakoMap from "../../modules/api/KakaoMap/KakaoMap";

const CommunityDetail = () => {
    const [searchParams] = useSearchParams();
    const communityId = searchParams.get("communityId");
    const navigate = useNavigate();

    const [community, setCommunity] = useState(null);
    const [user, setUser] = useState("author");
    const [replyUser, setReplyUser] = useState("author");
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrapped, setIsScrapped] = useState(false);
    const [scrapId, setScrapId] = useState(null);
    const [showScrapModal, setShowScrapModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const userId = 1;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        fetchDetail();
        fetchComments();
        checkScrapStatus();
        incrementViewCount(communityId);
    }, [communityId]);

    useEffect(() => {
        fetchDetail();
    }, [isScrapped, comments]);

    const fetchDetail = async () => {
        try {
            const data = await fetchCommunityDetail(communityId);
            setCommunity(data);
        } catch (error) {
            console.error('Failed to fetch community detail', error);
        }
    };

    const fetchComments = async () => {
        try {
            const data = await fetchCommentsByCommunityId(communityId);
            setComments(data);
        } catch (error) {
            console.error('Failed to fetch comments', error);
        }
    };

    const checkScrapStatus = async () => {
        try {
            const scrap = await getScrapByCommunityIdAndUserId(communityId, userId);
            if (scrap) {
                setIsScrapped(true);
                setScrapId(scrap.scrapId);
            }
        } catch (error) {
            console.error('Failed to check scrap status', error);
        }
    };

    const handleDropdown = (communityId) => {
        setActiveDropdown(communityId);
    };

    const handleEditPost = () => {
        setShowEditModal(true);
    };

    const handleConfirmEdit = () => {
        setShowEditModal(false);
        navigate(`/community/edit?communityId=${communityId}`);
    };

    const handleDeletePost = async () => {
        try {
            await deleteCommunityPost(communityId);
            navigate('/community');
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;
        try {
            const addedComment = await addComment(communityId, userId, newComment);
            await incrementCommentCount(communityId);
            setComments((prevComments) => [...prevComments, addedComment]);
            setNewComment("");
        } catch (error) {
            console.error('Failed to add comment', error);
        }
    };

    const handleCommentUpdate = async (commentId, content) => {
        try {
            const updatedComment = await updateComment(commentId, content);
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === commentId ? updatedComment : comment
                )
            );
        } catch (error) {
            console.error('Failed to update comment', error);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await deleteComment(commentId);
            await decrementCommentCount(communityId);
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.commentId !== commentId)
            );
        } catch (error) {
            console.error('Failed to delete comment', error);
        }
    };

    const handleScrapClick = () => {
        setShowScrapModal(true);
    };

    const handleAddScrap = async () => {
        try {
            const scrap = await addScrap(communityId, userId);
            await incrementScrapCount(communityId);
            setIsScrapped(true);
            setScrapId(scrap.scrapId);
        } catch (error) {
            console.error('Failed to add scrap', error);
        } finally {
            setShowScrapModal(false);
        }
    };

    const handleRemoveScrap = async () => {
        try {
            await deleteScrap(scrapId);
            await decrementScrapCount(communityId);
            setIsScrapped(false);
            setScrapId(null);
        } catch (error) {
            console.error('Failed to delete scrap', error);
        } finally {
            setShowScrapModal(false);
        }
    };

    const handlePlanClick = (planId) => {
        navigate(`/community/detail/plan?planId=${planId}`);
    };

    const handleShareClick = () => {
        copy(window.location.href);
        setShowShareModal(true);
    };

    const ageGroupMapping = {
        'TEENS': '10대',
        'TWENTIES': '20대',
        'THIRTIES': '30대',
        'FORTIES': '40대',
        'FIFTIES': '50대',
        'SIXTIES': '60대 이상',
        'OLDER': '70대',
        'NONE': '비공개'
    };

    const genderMapping = {
        'MALE': '남성',
        'FEMALE': '여성',
        'NONE': '비공개'
    };

    const matesMapping = {
        'ALONE': '나혼자',
        'FAMILY': '가족과 함께',
        'FRIEND': '친구와 함께',
        'CHILD': '아이와 함께',
        'PET': '반려동물과 함께'
    };

    if (!community) {
        return <div>Loading...</div>;
    }

    const { plan = {}, user: communityUser = {}, title, content, viewCount, commentCount, createdAt, image = {}, gender, mates, ageGroup } = community;
    const { region, startDate, endDate, transportation, planId } = plan;

    const ageGroupKorean = ageGroupMapping[ageGroup] || '비공개';
    const genderKorean = genderMapping[gender] || '비공개';
    const matesKorean = matesMapping[mates] || '비공개';

    return (
        <Layout>
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={image ? `/uploads/${image.imagePath}` : defaultImage} alt="uploaded" className={styles.headerImage}/>
            </div>
            <div className={styles.form}>
                <div className={styles.leftSection}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>
                            <h3>{title}</h3>
                            <p>게시일 {formatDateTime(createdAt)} | 조회수 {viewCount} | 댓글수 {commentCount}</p>
                        </div>
                        <div className={styles.titleButton}>
                            {user === "viewer" && (
                                <div>
                                    <button onClick={handleScrapClick}>
                                        {isScrapped ? <IoBookmark size="25px"/> : <IoBookmarkOutline size="25px"/>}
                                    </button>
                                    <button onClick={handleScrapClick}><IoShareSocial size="25px"/></button>
                                </div>
                            )}
                            {user === "author" && (
                                <div>
                                    <button onClick={handleEditPost}><IoPencilSharp size="25px"/></button>
                                    <button onClick={() => setIsModalOpen(true)}><IoTrashOutline size="25px"/></button>
                                    <button onClick={handleShareClick}><IoShareSocial size="25px"/></button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.dateLocationContainer}>
                        <h3>여행 일정</h3>
                        <div className={styles.dateLocation}>
                            <div className={styles.date}>
                                <img src={calendar} alt="date"/>
                                <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
                            </div>
                            <div className={styles.location}>
                                <img src={marker} alt="marker"/>
                                <p>{region}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <h3>여행 소개</h3>
                        <textarea
                            id="textarea"
                            value={content}
                            readOnly
                        ></textarea>
                    </div>
                    <div className={styles.commentContainer}>
                        <h3>댓글</h3>
                        <div className={styles.commentInputContainer}>
                            <textarea
                                id="comment"
                                className={styles.commentInput}
                                placeholder="댓글을 입력해주세요"
                                value={newComment}
                                onChange={handleCommentChange}
                            />
                            <input
                                id="replySubmit"
                                value="게시"
                                className={styles.commentInputButton}
                                type="button"
                                onClick={handleCommentSubmit}
                            />
                        </div>
                        <div className={styles.comments}>
                            {comments.map(comment => (
                                <Comment
                                    key={comment.commentId}
                                    id={comment.commentId}
                                    nickname={comment.user.nickname}
                                    comment={comment.content}
                                    date={comment.createdAt}
                                    activeDropdown={activeDropdown}
                                    handleDropdown={handleDropdown}
                                    onUpdate={handleCommentUpdate}
                                    onDelete={handleCommentDelete}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.user}>
                    <div className={styles.userInfoImg}>
                            <img src={defaultUserImage} alt="avatar" />
                        </div>
                        <div className={styles.userInfo}>
                            <h3>{communityUser.nickname}</h3>
                            <p>{ageGroupKorean} {genderKorean} {matesKorean}</p>
                        </div>
                    </div>
                    <div className={styles.plan}>
                        <h3>여행 계획</h3>
                        <div className={styles.planDetail} onClick={() => handlePlanClick(planId)}>
                            <div className={styles.planInfo}>
                                <h3>{region}</h3>
                                <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
                                <p>{calculateDuration(startDate, endDate)} / {transportation === "CAR" ? "자동차" : "대중교통"} 이용</p>
                            </div>
                            <div className={styles.planMap}>
                                <KakakoMap level="12" selectedRegion={region.split(' ')[0]}/>
                            </div>
                            <div className={styles.goPlan}>
                                <p>상세보기 ></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <CommunitySmallModal
                    header="게시글 삭제"
                    content={<div>정말 이 게시글을 삭제하시겠습니까?</div>}
                    onConfirm={handleDeletePost}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
            {showScrapModal && (
                <CommunitySmallModal
                    header={isScrapped ? "스크랩 삭제" : "스크랩 추가"}
                    content={<div>{isScrapped ? "정말 스크랩을 삭제하시겠습니까?" : "스크랩을 추가하시겠습니까?"}</div>}
                    onConfirm={isScrapped ? handleRemoveScrap : handleAddScrap}
                    onCancel={() => setShowScrapModal(false)}
                />
            )}
            {showEditModal && (
                <CommunitySmallModal
                    header="게시글 수정"
                    content={<div>정말 이 게시글을 수정하시겠습니까?</div>}
                    onConfirm={handleConfirmEdit}
                    onCancel={() => setShowEditModal(false)}
                />
            )}
            {showShareModal && (
                <CommunitySmallModal
                    header="링크 복사됨"
                    content={<div>페이지 링크가 복사되었습니다.</div>}
                    onConfirm={() => setShowShareModal(false)}
                    onCancel={() => setShowShareModal(false)}
                />
            )}
        </div>
        </Layout>
    )
};

export default CommunityDetail;
