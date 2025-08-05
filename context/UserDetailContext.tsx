import { createContext, useContext } from "react";

export const UserDetailContext = createContext(null);

export const useUserDetailContext = () => useContext(UserDetailContext);