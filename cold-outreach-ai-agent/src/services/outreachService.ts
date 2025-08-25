import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/outreach';

export interface OutreachData {
    name: string;
    email: string;
    message: string;
    type?: 'email' | 'call' | 'message' | 'linkedin';
}

export const sendOutreach = async (data: OutreachData) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Error sending outreach: ' + (error.message || 'Unknown error'));
        }
        throw new Error('Error sending outreach: ' + String(error));
    }
};

export const getOutreachHistory = async () => {
    try {
        const response = await axios.get(`${API_URL}/history`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Error fetching outreach history: ' + (error.message || 'Unknown error'));
        }
        throw new Error('Error fetching outreach history: ' + String(error));
    }
};

export const scheduleOutreach = async (data: OutreachData & { scheduledAt: string }) => {
    try {
        const response = await axios.post(`${API_URL}/schedule`, data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Error scheduling outreach: ' + (error.message || 'Unknown error'));
        }
        throw new Error('Error scheduling outreach: ' + String(error));
    }
};
