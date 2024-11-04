import { Expense } from "../types";
import { Request, Response } from "express";
import {Database} from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body;
 
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }
 
    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
    res.status(201).send({ id, description, cost });
 
 
 }

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const{id} = req.params;

    if (!id) {
        return res.status(400).json({ message: "Expense ID is required"});
    }

    const expenseIndex = expenses.findIndex(expense => expense.id === id);

    if(expenseIndex !== -1){
        expenses.splice(expenseIndex, 1);
        res.status(200).json({message: "Expense deleted successfully"});
    }
    else{
        res.status(404).json({message: "Expense not found"});
    }
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}