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

export async function deleteExpense(req: Request, res: Response, db: Database) {
    // TO DO: Implement deleteExpense function
    const{id} = req.params;

    if (!id) {
        return res.status(400).json({ message: "Expense ID is required"});
    }

    try{
        const expense = await db.get('SELECT * FROM expenses WHERE id = ?;',[id]);
        if(!expense){
            return res.status(404).json({message:"expense not found"});
        }
        await db.run('DELETE FROM expenses WHERE id =?;',[id]);
        res.status(200).json({message:"Expense deleted successfully"});
    } catch(error){
        res.status(500).json({message: 'Error deleting: ${error.message}'});
    }

    
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try{
        const expenses = await db.all('SELECT * FROM expenses;');
        res.status(200).json({data:expenses});
    } catch(error){
        res.status(500).json({message: 'Error retrieving expenses:${error.message}'});
    }
}