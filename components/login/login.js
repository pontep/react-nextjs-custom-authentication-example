import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUserContext } from "../../libs/user-context";

const Login = () => {
  const { login } = useUserContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      if (!toast.isActive("login-failed")) {
        toast({
          title: "Login Failed",
          description: "Please enter username and password",
          status: "error",
          duration: 3000,
          isClosable: true,
          id: "login-failed",
        });
      }

      return;
    }

    setLoading(true);
    login(username, password).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      p={"1rem"}
      boxShadow={"lg"}
      gap={"1rem"}
    >
      <Heading fontSize={"xl"}>Login</Heading>
      <Input
        type={"text"}
        placeholder={"Username"}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type={"password"}
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>{loading ? <Spinner /> : "Login"}</Button>
    </Box>
  );
};

export default Login;
