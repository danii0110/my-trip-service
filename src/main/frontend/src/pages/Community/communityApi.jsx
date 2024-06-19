import axios from 'axios';

const communityApi = axios.create({
    baseURL: 'http://localhost:8080/community', // 백엔드 서버 주소
});

//community
export const createCommunityPost = (postData) => {
    return communityApi.post('/community', postData);
};

export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return communityApi.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const fetchCommunityPosts = async (page, order, filter) => {
    const monthNumber = filter.month === '전체' ? null : parseInt(filter.month.replace('월', ''), 10);

    const response = await communityApi.get('/communities', {
        params: {
            page: page - 1,
            size: 12,
            order: order,
            month: monthNumber,
            region: filter.region,
            subRegion: filter.subRegion,
        },
    });

    const { content, totalElements } = response.data;
    const posts = content.map((post) => ({
        id: post.communityId,
        title: post.title,
        user: post.userNickname,
        areaCode: post.areaCode,
        sigunguCode: post.sigunguCode,
        imageUrl: post.imageSrc ? `${post.imageSrc}` : null,
        year: post.year,
        month: post.month,
        viewCount: post.viewCount,
        commentCount: post.commentCount,
        scrapCount: post.scrapCount,
        createdAt: post.createdAt,
    }));

    return { data: posts, total: totalElements };
};

export const fetchCommunityDetail = async (id) => {
    const response = await communityApi.get(`/community/${id}`);
    return response.data;
}

export const updateCommunityPost = async (communityId, postData) => {
    try {
        const response = await communityApi.patch(`/${communityId}`, postData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to update community post');
    }
};

export const deleteCommunityPost = async (communityId) => {
    try {
        await communityApi.delete(`/community/${communityId}`);
    } catch (error) {
        throw new Error('Failed to delete community post');
    }
};

//comment
export const addComment = async (communityId, userId, content) => {
    try {
        const response = await communityApi.post(`/${communityId}/${userId}/comment`, {
            content
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to add comment');
    }
};

export const fetchCommentsByCommunityId = async (communityId) => {
    try {
        const response = await communityApi.get(`/comments/${communityId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch comments');
    }
};

export const updateComment = async (commentId, content) => {
    try {
        const response = await communityApi.patch(`comment/${commentId}`, {
            content
        }, {headers: {'Content-Type': 'application/json'}});
        return response.data;
    } catch (error) {
        throw new Error('Failed to update comment');
    }
};

export const deleteComment = (commentId) => {
    return communityApi.delete(`/comment/${commentId}`);
};

//scrap
export const addScrap = async (communityId, userId) => {
    const response = await communityApi.post('/scrap', null, { params: { communityId, userId } });
    return response.data;
};

export const deleteScrap = async (scrapId) => {
    await communityApi.delete(`/scrap/${scrapId}`, { params: { scrapId } });
};

export const getScrapByCommunityIdAndUserId = async (communityId, userId) => {
    const response = await communityApi.get(`/${communityId}/user/${userId}`);
    return response.data;
};

//update
export const incrementViewCount = async (communityId) => {
    const response = await communityApi.patch(`/incrementView/${communityId}`);
    return response.data;
};

export const incrementCommentCount = async (communityId) => {
    const response = await communityApi.patch(`/incrementComment/${communityId}`);
    return response.data;
};

export const decrementCommentCount = async (communityId) => {
    const response = await communityApi.patch(`/decrementComment/${communityId}`);
    return response.data;
};

export const incrementScrapCount = async (communityId) => {
    const response = await communityApi.patch(`/incrementScrap/${communityId}`);
    return response.data;
};

export const decrementScrapCount = async (communityId) => {
    const response = await communityApi.patch(`/decrementScrap/${communityId}`);
    return response.data;
};

export default communityApi;