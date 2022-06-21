import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const initialContext = {
  user: null,
  login: () => {},
  logout: () => {},
};

const UserContext = createContext(initialContext);

export function useUserContext() {
  return useContext(UserContext);
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const currentUser = cookie.user;
    setUser(currentUser);
  }, [cookie.user]);

  const login = (username, password) => {
    console.log(`login: ${username} ${password}`);

    let user = {
      name: username,
      email: `${username}@domain.com`,
      avatar: "https://randomuser.me/api/portraits/",
      id: "123",
    };
    setUser(user);
    setCookie("user", user, { path: "/" });

    console.log(`login successfuly`);
  };

  const logout = () => {
    console.log("logout...");

    removeCookie("user");

    console.log("logout successfuly");
  };

  const value = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
