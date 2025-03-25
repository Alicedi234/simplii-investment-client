import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login with:", email, password);

    navigate("/");
  };
  return (
    <div className="login">
      <h2 className="login__title">Log in</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__form-group">
          <label className="login__label">Email</label>
          <input
            type="email"
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login__form-group">
          <label className="login__label">Password</label>
          <input
            type="password"
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login__button">
          Login
        </button>
      </form>
    </div>
  );
}
