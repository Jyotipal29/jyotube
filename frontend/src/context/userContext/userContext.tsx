import { createContext, useContext, useReducer } from "react";
import { userReducer } from "./userReducer";

type UserProviderProps = {
  children: React.ReactNode;
};

const userContext = createContext({} as UserContextType);
export const useUser = () => {
  return useContext(userContext);
};

const userFromStorage = localStorage.getItem("user");
const user = userFromStorage ? JSON.parse(userFromStorage) : null;
export const UserProvider = ({ children }: UserProviderProps) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserState, UserAction>
  >(userReducer, {
    user: user,
  });

  return (
    <userContext.Provider value={{ userState, userDispatch }}>
      {children}
    </userContext.Provider>
  );
};
