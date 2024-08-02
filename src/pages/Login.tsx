import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import "./styles/Login.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validatePassword = (password: string) => {
    const minLength = /.{6,}/;
    const maxLength = /^.{0,12}$/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const number = /[0-9]/;

    if (!minLength.test(password)) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    if (!maxLength.test(password)) {
      return "La contraseña no debe tener más de 12 caracteres";
    }
    if (!uppercase.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!lowercase.test(password)) {
      return "La contraseña debe contener al menos una letra minúscula";
    }
    if (!specialChar.test(password)) {
      return "La contraseña debe contener al menos un carácter especial";
    }
    if (!number.test(password)) {
      return "La contraseña debe contener al menos un número";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordError === "") {
      dispatch(login({ email, password }));
      console.log("logeadp");
      navigate("/products");
    } else {
      alert(
        "Por favor, corrija los errores en la contraseña antes de iniciar sesión."
      );
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-group" onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
