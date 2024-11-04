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
    //if there is no id then output an error code 
    if (!id) {
        return res.status(400).json({ message: "Expense ID is required"});
    }
    //try getting all the expenses 
    try{
        const expense = await db.get('SELECT * FROM expenses WHERE id = ?;',[id]);
        //if there are no expenses throw an error 
        if(!expense){
            return res.status(404).json({message:"expense not found"});
        }
        //otherwise delete the expense with the specified id 
        await db.run('DELETE FROM expenses WHERE id =?;',[id]);
        //message to confirm successful delete 
        res.status(200).json({message:"Expense deleted successfully"});
    } catch(error){
        //otherwise message to illustrate error 
        res.status(500).json({message: 'Error deleting: ${error.message}'});
    }

    
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try{
        //try getting all expenses 
        const expenses = await db.all('SELECT * FROM expenses;');
        res.status(200).json({data:expenses});
    } catch(error){
        //otherwise output error code 
        res.status(500).json({message: 'Error retrieving expenses:${error.message}'});
    }
}