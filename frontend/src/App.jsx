import { useState } from "react";
import "./App.css";
import Clientes from "./components/Clientes";
import Pedidos from "./components/Pedidos";
import Estadisticas from "./components/Estadisticas";
import Login from "./components/Login";

function App() {
  const [seccion, setSeccion] = useState("inicio");
  const [sesionActiva, setSesionActiva] = useState(
  sessionStorage.getItem("sesionActiva")
);

const cerrarSesion = () => {
  sessionStorage.removeItem("sesionActiva")
  setSesionActiva(false);
};

if (!sesionActiva) {
  return <Login iniciarSesion={() => setSesionActiva(true)} />;
}
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Pedidos AnaLU</div>

        <div className="nav-links">
          <button onClick={() => setSeccion("inicio")}>Inicio</button>
          <button onClick={() => setSeccion("clientes")}>Clientes</button>
          <button onClick={() => setSeccion("pedidos")}>Pedidos</button>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      </nav>

      {seccion === "inicio" && (
        <section className="inicio">
          <div className="inicio-texto">
            <h1>Sistema Web de Registro de Pedidos</h1>
            <p>
              Somos una empresa dedicada a la gestión eficiente de pedidos de
              clientes, ofreciendo un sistema digital que permite registrar,
              consultar, actualizar y administrar información de clientes y
              pedidos de forma rápida, segura y organizada.
            </p>
            <Estadisticas />
          </div>

          <div className="inicio-imagen">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              alt="Gestión de pedidos"
            />
          </div>
        </section>
      )}

      <main className="container">
        {seccion === "clientes" && <Clientes />}
        {seccion === "pedidos" && <Pedidos />}
      </main>

      <footer className="footer">
        <p>
            © 2026 Pedidos AnaLU | Todos los derechos reservados
        </p>
        <p>Las mejores facilidades de pago</p>
      </footer>
    </div>
  );
}

export default App;