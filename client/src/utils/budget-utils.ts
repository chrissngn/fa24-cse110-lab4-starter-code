import { API_BASE_URL } from "../constants/constants";

type BudgetResponse ={
    data: number;
};

export const fetchBudget = async (): Promise<number> => {
    try {
        const response = await fetch(`${API_BASE_URL}/budget`); 
        if (!response.ok) {
            throw new Error("Failed to fetch budget");
        }
        const jsonResponse: BudgetResponse = await response.json();
        if (typeof jsonResponse.data != "number"){
            throw new Error("Invalid data format received from /budget");
        }
        return jsonResponse.data;
    } catch(error){
        console.error("Error fetching budget:", error);
        throw error;
    }
    
    // need to parse data we are getting before pushing it along
    //const jsonResponse = await response.json();
    
    
};

export const updateBudget = async (budget: number): Promise<number>=>{
    try{
        const response = await fetch('${API_BASE_URL}/budget', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({amount:budget}),
        });
        if(!response.ok){
            throw new Error("Failed to update budget");
        }
    
        // const jsonResponse = await response.json();
        // return jsonResponse; // might not need .data
        const jsonResponse: BudgetResponse = await response.json();
        if(typeof jsonResponse.data!=="number"){
            throw new Error("Invalid data format received from /budget after update");
        }
        return jsonResponse.data;
    } catch(error){
        console.error("Error updating budget:", error);
        throw error;
    }
   
};