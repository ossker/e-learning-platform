import React, { useContext, useEffect, useState } from "react";

const CoursesContext = React.createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    fetch('/course/courses').
    then(data => data.json()).
    then(data => setCourses(data));
  }, [])

  return (
    <CoursesContext.Provider value={courses}>
      {children}
    </CoursesContext.Provider>
  )
}

export const useCourses = () => useContext(CoursesContext);