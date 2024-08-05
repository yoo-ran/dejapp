import React, { createContext, useState, useContext } from 'react';

const SavedItemsContext = createContext();

export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);

  return (
    <SavedItemsContext.Provider value={{ savedItems, setSavedItems }}>
      {children}
    </SavedItemsContext.Provider>
  );
};

export const useSavedItems = () => {
  return useContext(SavedItemsContext);
};
