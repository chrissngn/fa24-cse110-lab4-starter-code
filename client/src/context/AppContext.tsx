import { createContext, useState, ReactNode } from "react";
import { Expense } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  addExpense: (newExpense: Expense) => void;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  addExpense: () => {},
  budget: 1000,
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  const addExpense = (newExpense: Expense) => {
    setExpenses((prevExpense)=> [...prevExpense, newExpense]);
  };

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        addExpense,
        budget,
        setBudget,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
