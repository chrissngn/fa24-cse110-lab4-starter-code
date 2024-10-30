import { API_BASE_URL } from "../constants/constants";

export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`); 
    if (!response.ok) {
        throw new Error("Failed to fetch budget");
    }
    const jsonResponse = await response.json();
    return jsonResponse.data;
};