import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Login.scss";

const Login: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginError, setLoginError] = useState<string | null>(null); // Estado para manejar errores de login

  const predefinedEmail = "usuario@dominio.com";

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  const validateEmail = (email: string): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      errors.email = "Por favor, introduce un correo electrónico válido.";
    }

    return errors;
  };

  const validatePassword = (password: string): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    const minLength = 6;
    const maxLength = 12;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const number = /\d/;

    if (password.length < minLength) {
      errors.length = `La contraseña debe tener al menos ${minLength} caracteres.`;
    }
    if (password.length > maxLength) {
      errors.length = `La contraseña no debe tener más de ${maxLength} caracteres.`;
    }
    if (!uppercase.test(password)) {
      errors.uppercase =
        "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!lowercase.test(password)) {
      errors.lowercase =
        "La contraseña debe contener al menos una letra minúscula.";
    }
    if (!specialChar.test(password)) {
      errors.specialChar =
        "La contraseña debe contener al menos un carácter especial.";
    }
    if (!number.test(password)) {
      errors.number = "La contraseña debe contener al menos un número.";
    }

    return errors;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailErrors = validateEmail(newEmail);
    setErrors(emailErrors);
    setLoginError(null); // Resetea el error de login al cambiar el email
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationErrors = validatePassword(newPassword);
    setErrors(validationErrors);
    setLoginError(null); // Resetea el error de login al cambiar la contraseña
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErrors = validateEmail(email);
    const passwordErrors = validatePassword(password);
    setErrors({ ...emailErrors, ...passwordErrors });
  
    const storedPassword = localStorage.getItem("password") ?? "Contrasena1!";
  
    if (email === predefinedEmail && password === storedPassword) {
      login(email, password);
      navigate("/products");
    } else {
      setLoginError("El correo electrónico o la contraseña son incorrectos."); // Mensaje de error
    }
  };
  

  return (
    <div className="loginContainer">
      <h1>Inicia sesión en tu cuenta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
        {Object.values(errors).map((error, index) => (
          <p key={index}>{errors.credentials ? "" : error}</p>
        ))}
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {!passwordsMatch && confirmPassword && (
          <p>Las contraseñas no coinciden.</p>
        )}

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || !passwordsMatch}
        >
          Iniciar Sesión
        </button>

        {loginError && <p className="error-message">{loginError}</p>} {/* Mensaje de error de login */}
      </form>
    </div>
  );
};

export default Login;
