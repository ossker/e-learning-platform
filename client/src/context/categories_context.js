import React, { useContext, useEffect, useState } from "react";

const CategoriesContext = React.createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetch('/category/categories').
    then(data => data.json()).
    then(data => setCategories(data));
  }, [])

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => useContext(CategoriesContext);