import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful", data);
        navigate("/login"); // redirect to login
      } else {
        const error = await response.json();
        alert(error.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while signing up.");
    }
  };
  return(
      <div className="signup">
        <h2 className="signup__title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup__form">
          <div className="signup__form-group">
            <label className="signup__label">Email</label>
            <input
              type="email"
              className="signup__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup__form-group">
            <label className="signup__label">Password</label>
            <input
              type="password"
              className="signup__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup__form-group">
            <label className="signup__label">Confirm Password</label>
            <input
              type="password"
              className="signup__input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup__button">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
  
