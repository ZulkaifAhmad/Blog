import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const userContext = () => {
  return useContext(UserContext);
};

function Context({ children }) {
  const [StoreData, setStoreData] = useState([]);

  const [state, setState] = useState(false);

  return (
    <UserContext.Provider
      value={{ state, setState }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default Context;
