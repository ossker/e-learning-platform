import React, { useContext, useEffect, useState } from "react";

const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch('/auth/users').
    then(data => data.json()).
    then(data => setUsers(data));
  }, [])

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => useContext(UsersContext);