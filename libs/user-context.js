import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import capitalizeFirtsLetter from "../utils/capitalize";
import axiosApiInstance from "./axios";

const initialContext = {
  user: null,
  login: () => new Promise(),
  logout: () => new Promise(),
};

const UserContext = createContext(initialContext);

export function useUserContext() {
  return useContext(UserContext);
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    setUser(JSON.parse(currentUser));
  }, []);

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      try {
        console.log(`login: ${username} ${password}`);

        var config = {
          method: "post",
          url: process.env.NEXT_PUBLIC_LOGIN_API,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            username: username,
            password: password,
          },
          withCredentials: true,
        };

        axios(config)
          .then(function (response) {
            // get user from decoded jwt token
            let user = jwt_decode(response.data.accessToken).user;
            // set user and accessToken in local storage
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", response.data.accessToken);

            console.log(`login successfuly`);
            toast({
              title: "Login Successful",
              description: "You are now logged in",
              status: "success",
              duration: 3000,
              isClosable: true,
            });

            resolve();
          })
          .catch(function (error) {
            console.log(error);
            if (!toast.isActive("login-failed")) {
              toast({
                title: "Login Failed",
                description: capitalizeFirtsLetter(error.response.data),
                status: "error",
                duration: 3000,
                isClosable: true,
                id: "login-failed",
              });
            }
            reject();
          });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  };

  const logout = () => {
    console.log("logout...");

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);

    toast({
      title: "Logout Successful",
      description: "You are now logged out",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

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
