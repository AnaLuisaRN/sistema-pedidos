import { useEffect, useState } from "react";
import api from "../services/api";

function Estadisticas() {
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);

  useEffect(() => {
    obtenerEstadisticas();
  }, []);

  const obtenerEstadisticas = async () => {
    try {
      const respuestaClientes = await api.get("clientes/");
      const respuestaPedidos = await api.get("pedidos/");

      setTotalClientes(respuestaClientes.data.length);
      setTotalPedidos(respuestaPedidos.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="estadisticas">
      <div className="tarjeta-estadistica">
        <h3>Total de clientes</h3>
        <p>{totalClientes}</p>
      </div>

      <div className="tarjeta-estadistica">
        <h3>Total de pedidos</h3>
        <p>{totalPedidos}</p>
      </div>
    </div>
  );
}

export default Estadisticas;