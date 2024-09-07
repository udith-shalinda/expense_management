import { useState } from "react";
import axios from "axios";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const url = mode === "login" ? "/api/login" : "/api/signup";
    const payload = { email, password };

    try {
      const response = await axios.post(`http://localhost:5000${url}`, payload);
      console.log(response.data);
      alert(`${mode === "login" ? "Login" : "Signup"} successful`);
    } catch (error) {
      console.error(error);
      alert(`${mode === "login" ? "Login" : "Signup"} failed`);
    }
  };

  return (
    <div>
      <h2>{mode === "login" ? "Login" : "Signup"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {mode === "login" ? "Login" : "Signup"}
      </button>
    </div>
  );
};

export default AuthForm;
