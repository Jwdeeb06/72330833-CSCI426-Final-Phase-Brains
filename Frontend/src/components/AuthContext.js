import React, { createContext, useState, useContext } from "react";
import axios from "axios";
// create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //the API-base for Render hosted backend
  const API_BASE = "https://seven2330833-csci426-final-phase-brains.onrender.com/api";
  
  //the API-base for localhosted backend
  // const API_BASE = "http://localhost:5000/api";

  
  // login function using backend
  const login = async (username, password) => {
    try {
      const res = await axios.post(`${API_BASE}/users/login`, {
        username,
        password,
      });
      setUser(res.data.user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  // clear user info on logout
  const logout = () => {
    setUser(null);
  };
  // share user, login and logout across app
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
//  hook to use the context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
