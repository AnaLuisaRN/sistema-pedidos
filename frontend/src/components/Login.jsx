import { useState } from "react";

function Login({ iniciarSesion }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const validarLogin = () => {
    if (usuario === "admin" && password === "12345") {
      localStorage.setItem("sesionActiva", "true");
      iniciarSesion();
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Inicio de Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
           autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={validarLogin}>Ingresar</button>

        <p className="login-info">
          Usuario: xxxxx | Contraseña: *****
        </p>
      </div>
    </div>
  );
}

export default Login;