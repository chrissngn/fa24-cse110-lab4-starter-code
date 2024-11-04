//main module that allows us to use SQLite (database engine)
import sqlite3 from "sqlite3";
//helper func that makes it easier to work with sqlite3
import { open } from "sqlite";

//happens asynchronously -> doesnt have to wait for one task to be done to complete itself 
const initDB = async () => {
 // Open the database connection
 //await open -> async -> tells javaScript to wait for open func to finish 
 //creating connection -> however js doesn't pause everything else 
 //waits for database connection while allowing other code to run 
 const db = await open({
   filename: "database.sqlite",
   driver: sqlite3.Database,
 });
 // Create a "budget" table if it doesn't exist
 //creating the expense table 
 //db.exec creates new table 
 //if it deosnt exist -> create table name expenses 
 await db.exec(`
   CREATE TABLE IF NOT EXISTS expenses (
     id TEXT PRIMARY KEY,
     description TEXT NOT NULL,
     cost INTEGER NOT NULL
   );
 `);
 return db;
};

export default initDB;