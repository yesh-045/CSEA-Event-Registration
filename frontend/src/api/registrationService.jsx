import axios from 'axios';

const API_URL = '/register'; // Your backend API endpoint

// Fetch all registrations
export const fetchRegistrations = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching registrations:", error);
        throw error;
    }
};

// Submit registration
export const submitRegistration = async (registrationData) => {
    try {
        const response = await axios.post(`${API_URL}`, registrationData);
        return response.data;
    } catch (error) {
        console.error("Error submitting registration:", error);
        throw error;
    }
};
