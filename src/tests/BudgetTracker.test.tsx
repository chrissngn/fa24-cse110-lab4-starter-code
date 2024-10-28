import React from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import App from '../App';
import { AppProvider } from '../context/AppContext';
import Remaining from '../components/Remaining';

window.alert = jest.fn();

describe('Budget Tracking Application',()=>{
  test('creates a new expense', async () =>{
    render(<AppProvider><App/></AppProvider>);
    //checking to see if the screen properly displays the Remaining: $1000 initally
    const ogRemaining = screen.getByText("Remaining: $1000");
    expect(ogRemaining).toBeInTheDocument();
    //checking to see if the budget is correctly initalized
    const ogBudget = screen.getByText("Budget: $1000");
    expect(ogBudget).toBeInTheDocument();
    //checking to see if the number of spent is initalized to $0
    const ogTotalSpent = screen.getByText("Spent so far: $0");
    expect(ogTotalSpent).toBeInTheDocument();
    //capturing proper input fields necessary to simulate the user inputting an expense
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    //using fireEvent to simulate the user loggin an expense 
    //the fireEvent inputs 50 as the cost and "car" as the name 
    //then it clicks the save button to log in the inputs 
    fireEvent.change(costInput, {target: {value:50}});
    fireEvent.change(nameInput, {target: {value:"car"}})
    fireEvent.click(saveButton);
    //check to see if car is correcly logged
    //check to see $50 is properly logged
    const newExpenseTitle = screen.getByText("car");
    const newBudgetNum = screen.getByText("$50");
    expect(newExpenseTitle).toBeInTheDocument;
    expect(newBudgetNum).toBeInTheDocument;
    //check to see if the remaining value (1000-50-950) is properly logged
    const newBudget = screen.getByText("Remaining: $950");
    expect(newBudget).toBeInTheDocument();
    //check to see if it properly logs that the user spent $50
    const newTotalSpent = screen.getByText("Spent so far: $50");
    expect(newTotalSpent).toBeInTheDocument();
  });

  test('create a new expense multiple times', async ()=> {
    render(<AppProvider><App/></AppProvider>);
    //same code as above 
    const ogRemaining = screen.getByText("Remaining: $1000");
    expect(ogRemaining).toBeInTheDocument();
    const ogBudget = screen.getByText("Budget: $1000");
    expect(ogBudget).toBeInTheDocument();
    const ogTotalSpent = screen.getByText("Spent so far: $0");
    expect(ogTotalSpent).toBeInTheDocument();
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    fireEvent.change(costInput, {target: {value:50}});
    fireEvent.change(nameInput, {target: {value:"car"}})
    fireEvent.click(saveButton);
    const newExpenseTitle = screen.getByText("car");
    const newBudgetNum = screen.getByText("$50");
    expect(newExpenseTitle).toBeInTheDocument;
    expect(newBudgetNum).toBeInTheDocument;
    const newBudget = screen.getByText("Remaining: $950");
    expect(newBudget).toBeInTheDocument();
    const newTotalSpent = screen.getByText("Spent so far: $50");
    expect(newTotalSpent).toBeInTheDocument();
    //at this point it should be spent so far: $50, remaining: $950
    //lets now add another value to our expenses 
    fireEvent.change(costInput, {target: {value:100}});
    fireEvent.change(nameInput, {target: {value:"tires"}})
    fireEvent.click(saveButton);
    //now we should have 950-100 remaining 
    const newBudget2 = screen.getByText("Remaining: $850");
    expect(newBudget2).toBeInTheDocument();
    //now we should have spent so far 50+100=150
    const newTotalSpent2 = screen.getByText("Spent so far: $150");
    expect(newTotalSpent2).toBeInTheDocument();
  });

  test('Delete an expense', async () =>{
    render(<AppProvider><App/></AppProvider>);
    //checking to see if the screen properly displays the Remaining: $1000 initally
    const ogRemaining = screen.getByText("Remaining: $1000");
    expect(ogRemaining).toBeInTheDocument();
    //capturing proper input fields necessary to simulate the user inputting an expense
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    //using fireEvent to simulate the user loggin an expense 
    //the fireEvent inputs 50 as the cost and "car" as the name 
    //then it clicks the save button to log in the inputs 
    fireEvent.change(costInput, {target: {value:50}});
    fireEvent.change(nameInput, {target: {value:"car"}})
    fireEvent.click(saveButton);
    const newExpenseTitle = screen.getByText("car");
    const newBudgetNum = screen.getByText("$50");
    expect(newExpenseTitle).toBeInTheDocument;
    expect(newBudgetNum).toBeInTheDocument;
    const newBudget = screen.getByText("Remaining: $950");
    expect(newBudget).toBeInTheDocument();
    const newTotalSpent = screen.getByText("Spent so far: $50");
    expect(newTotalSpent).toBeInTheDocument();
    //store the delete button for later use with fireEvent
    const deleteButton = screen.getAllByText("x")[0];
    //simulate the user clicking the x button 
    fireEvent.click(deleteButton);
    //this checks to see if the expense is removed
    await waitFor(()=>{
        const deletedExpense = screen.queryByText("car");
        expect(deletedExpense).not.toBeInTheDocument();
        const deletedCost = screen.queryByText("$50");
        expect(deletedCost).not.toBeInTheDocument();
    });
  });

  test('triggers an alert when total exceeds budget', async()=>{
    render(<AppProvider><App/></AppProvider>)
    const budget = 1000;
    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    fireEvent.change(nameInput,{target: {value: "rent"}});
    fireEvent.change(costInput,{target: {value: 1109}});
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("You have exceeded your budget!");
    });
  });

  test('Budget Balance Verification', async() => {
    render(<AppProvider><App/></AppProvider>);
    const budget = 1000;
    let remainingBalance = 1000;
    let totalSpent = 0;
    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(costInput, {target: {value: 50}});
    fireEvent.change(nameInput,{target: {value: "food"}});
    fireEvent.click(saveButton);

    remainingBalance = remainingBalance - 50;
    totalSpent = totalSpent + 50;

    await waitFor(() => {
      expect(screen.getByText("Remaining: $950")).toBeInTheDocument();
      //expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
      expect(screen.getByText("Spent so far: $50")).toBeInTheDocument();
    });

    expect(remainingBalance + totalSpent).toBe(budget);

  });

  test('Delete multiple', async ()=> {
    render(<AppProvider><App/></AppProvider>);
    //same code as above, this is populating the expenses such that there are 
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    fireEvent.change(costInput, {target: {value:50}});
    fireEvent.change(nameInput, {target: {value:"car"}})
    fireEvent.click(saveButton);
    fireEvent.change(costInput, {target: {value:100}});
    fireEvent.change(nameInput, {target: {value:"tires"}})
    fireEvent.click(saveButton);
    fireEvent.change(costInput, {target: {value:200}});
    fireEvent.change(nameInput, {target: {value:"insurance"}})
    fireEvent.click(saveButton);
    const newBudget2 = screen.getByText("Remaining: $650");
    expect(newBudget2).toBeInTheDocument();
    const newTotalSpent2 = screen.getByText("Spent so far: $350");
    expect(newTotalSpent2).toBeInTheDocument();
    //at this point there should be three expenses
    //store the delete button for later use with fireEvent
    const deleteButton = screen.getAllByText("x")[0];
    //simulate the user clicking the x button 
    fireEvent.click(deleteButton);
    //this checks to see if the expense is removed
    await waitFor(()=>{
        const deletedExpense = screen.queryByText("car");
        expect(deletedExpense).not.toBeInTheDocument();
        //check to see if the total spent is correctly updated
        //the car expense was 50 so subtract 50 
        const TotalSpentDelete1 = screen.getByText("Spent so far: $300");
        expect(TotalSpentDelete1).toBeInTheDocument();
        //check to see if remaining is properly updated
        //add 50 back into the remaining 
        const RemainingDelete1 = screen.getByText("Remaining: $700");
        expect(RemainingDelete1).toBeInTheDocument();
    });
    fireEvent.click(deleteButton);
    await waitFor(()=>{
        const deletedExpense = screen.queryByText("tires");
        expect(deletedExpense).not.toBeInTheDocument();
        //check to see if the total spent is correctly updated
        //the tires were 100 so subtract 100 
        const TotalSpentDelete2 = screen.getByText("Spent so far: $200");
        expect(TotalSpentDelete2).toBeInTheDocument();
        //check to see if the remaining is properly updated
        //add 100 back into the remaining 
        const RemainingDelete2 = screen.getByText("Remaining: $800");
        expect(RemainingDelete2).toBeInTheDocument();
    });
    fireEvent.click(deleteButton);
    await waitFor(()=>{
        const deletedExpense = screen.queryByText("insurance");
        expect(deletedExpense).not.toBeInTheDocument();
        //check to see if the total spent is correctly updated
        //the tires were 200 so subtract 200 = 0 
        const TotalSpentDelete3 = screen.getByText("Spent so far: $0");
        expect(TotalSpentDelete3).toBeInTheDocument();
        //check to see if the remaining is properly updated
        //add 200 back into the remaining 
        const RemainingDelete3 = screen.getByText("Remaining: $1000");
        expect(RemainingDelete3).toBeInTheDocument();
    });
  });

});