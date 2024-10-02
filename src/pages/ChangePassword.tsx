import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import usePasswordValidation from "../customHooks/usePasswordValidation";
import "../styles/ChangePassword.scss";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { password, changePassword } = useAuth();
  const validationErrors = usePasswordValidation(newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (currentPassword !== password) {
      setError("La contraseña actual es incorrecta.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setError("Corrige los errores antes de enviar.");
      return;
    }

    changePassword(newPassword);
    navigate("/login");
  };

  return (
    <div>
      <div className="go-back-button" onClick={() => navigate("/products")}>
        ← Regresar
      </div>

      <div className="change-password-container">
        <h1>Cambiar Contraseña</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Contraseña Actual:</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {Object.keys(validationErrors).length > 0 && (
              <ul className="error-list">
                {Object.entries(validationErrors).map(([key, message]) => (
                  <li key={key} className="error-message">
                    {message}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Nueva Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cambiar Contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
