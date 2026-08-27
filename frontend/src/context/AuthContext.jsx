import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // Get token from localStorage first
  // If not found, check sessionStorage
  const storedToken =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const storedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);

  const [user, setUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  console.log("========== AUTH DEBUG ==========");
console.log("AUTH USER:", user);
console.log("USER ROLE:", user?.role);
console.log("IS LOGGED IN:", isLoggedIn);
console.log("TOKEN:", localStorage.getItem("token") || sessionStorage.getItem("token"));
console.log("================================");


  // ==============================
  // LOGIN
  // ==============================

  const login = (userData, token, rememberMe = false) => {

    // First remove old authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");


    // ==============================
    // REMEMBER ME CHECKED
    // ==============================

    if (rememberMe) {

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

    }

    // ==============================
    // REMEMBER ME NOT CHECKED
    // ==============================

    else {

      sessionStorage.setItem("token", token);
      sessionStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

    }


    // Update React state
    setUser(userData);
    setIsLoggedIn(true);
  };


  // ==============================
  // LOGOUT
  // ==============================

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setUser(null);
    setIsLoggedIn(false);
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);