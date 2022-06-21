import { useState } from "react";
import { useUserContext } from "../../libs/user-context";

const Login = () => {
  const { login } = useUserContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert(`Please enter username and password`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(username, password);
      setLoading(false);
    }, 618);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      <input
        type={"text"}
        placeholder={"Username"}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type={"password"}
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>{loading ? "Loading..." : "Login"}</button>
    </div>
  );
};

export default Login;
