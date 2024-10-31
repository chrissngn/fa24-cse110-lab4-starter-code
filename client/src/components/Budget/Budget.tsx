import React, { useState, useEffect } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";
//Users/danielledang/Documents/GitHub/fa24-cse110-lab4-starter-code/client/src/utils/budget-utils.ts
//Users/danielledang/Documents/GitHub/fa24-cse110-lab4-starter-code/client/src/components/Budget/Budget.tsx
const Budget = () => {
  const [budget, setBudget] = useState<number | null>(null);
  const [newBudget, setNewBudget] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBudget = async () => {
        try {
            const fetchedBudget = await fetchBudget();
            setBudget(fetchedBudget);
            setNewBudget(fetchedBudget);
        } catch (error) {
            console.error("Failed to load budget:", error);
            setError("Failed to load budget");
        }
    };

    loadBudget();
  }, []);

  const handleSave = async () => {
    if (newBudget !== null) {
        try {
            const updatedBudget = await updateBudget(newBudget);
            console.log("Updated Budget:", updatedBudget)
            setBudget(updatedBudget);
            setIsEditing(false);
            setError(null);
        } catch (error) {
            console.error("Failed to update budget:", error);
            setError("Failed to update budget");
        }
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {error && <p className="text-danger">{error}</p>}
            <div>
                {isEditing ? (
                    <input
                        type="number"
                        value={newBudget !== null ? newBudget : ""}
                        onChange={(e) => setNewBudget(Number(e.target.value))}
                    />
                ) : (
                    <span>Budget: ${budget}</span>
                )}
            </div>
            <div>
                {isEditing ? (
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                )}
            </div>
    </div>
  );
};

export default Budget;
