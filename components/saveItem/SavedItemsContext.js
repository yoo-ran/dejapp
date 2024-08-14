import React, { createContext, useState, useContext } from 'react';

// Create a Context object named `SavedItemsContext`.
// This will be used to share the saved items state across different components.
const SavedItemsContext = createContext();

// Define a Provider component named `SavedItemsProvider`.
// This component will wrap other components that need access to the saved items state.
export const SavedItemsProvider = ({ children }) => {
  // Create a state variable `savedItems` with its updater function `setSavedItems`.
  // `savedItems` is initialized as an empty array.
  const [savedItems, setSavedItems] = useState([]);

  return (
    // Provide the `savedItems` and `setSavedItems` state to the context consumers.
    <SavedItemsContext.Provider value={{ savedItems, setSavedItems }}>
      {children}
    </SavedItemsContext.Provider>
  );
};

// Define a custom hook `useSavedItems` to access the context.
// This hook simplifies the process of consuming the context in functional components.
export const useSavedItems = () => {
  return useContext(SavedItemsContext);
};
