import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
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