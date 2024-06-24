import axios from "axios";

const communityPlanApi = axios.create({
    baseURL: 'http://localhost:8080/api/plans', // 백엔드 서버 주소
});

export const getUnusedPlansByUserId = async (userId) => {
    try {
        const response = await communityPlanApi.get(`/unused/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch unused plans by user ID', error);
        throw error;
    }
};

export const getPlanById = async (planId) => {
    try {
        const response = await communityPlanApi.get(`plan/${planId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plan by ID', error);
        throw error;
    }
};

export const getDailyScheduleByPlanId = async (planId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/daily-schedules/plan/${planId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch schedule by planID', error);
        throw error;
    }
}