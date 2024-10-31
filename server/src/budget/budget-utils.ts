import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
    //res.status(200).json({ data: amount });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    // TO DO: Implement updateBudget function
    const {amount} = body;
    if(typeof amount !== "number" || amount <=0){
        return res.status(400).send({error: "Invalid budget amount"});
    }
    budget.amount = amount;
    res.status(200).send({data: budget.amount});
    
}
