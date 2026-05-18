import { useEffect, useState } from "react";
import api from "../services/api";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const [editando, setEditando] = useState(false);
  const [idPedido, setIdPedido] = useState(null);

  const [nuevoPedido, setNuevoPedido] = useState({
    fecha: "",
    codigo_producto: "",
    talla: "",
    precio: "",
    descripcion: "",
    cliente: ""
  });

  useEffect(() => {
    obtenerPedidos();
    obtenerClientes();
  }, []);

  const obtenerPedidos = async () => {
    try {
      const respuesta = await api.get("pedidos/");
      setPedidos(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await api.get("clientes/");
      setClientes(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.cliente_nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimero = indiceUltimo - registrosPorPagina;

  const pedidosPaginados = pedidosFiltrados.slice(
    indicePrimero,
    indiceUltimo
  );

  const totalPaginas = Math.ceil(
    pedidosFiltrados.length / registrosPorPagina
  );

  const guardarPedido = async () => {
    if (
      !nuevoPedido.fecha ||
      !nuevoPedido.codigo_producto ||
      !nuevoPedido.talla ||
      !nuevoPedido.precio ||
      !nuevoPedido.descripcion ||
      !nuevoPedido.cliente
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (editando) {
        await api.put(`pedidos/${idPedido}/`, nuevoPedido);
        setEditando(false);
        setIdPedido(null);
      } else {
        await api.post("pedidos/", nuevoPedido);
      }

      obtenerPedidos();

      setNuevoPedido({
        fecha: "",
        codigo_producto: "",
        talla: "",
        precio: "",
        descripcion: "",
        cliente: ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPedido = async (id) => {
    const confirmar = window.confirm("¿Desea eliminar este pedido?");

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(`pedidos/${id}/`);
      obtenerPedidos();
      alert("Pedido eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const editarPedido = (pedido) => {
    setNuevoPedido({
      fecha: pedido.fecha,
      codigo_producto: pedido.codigo_producto,
      talla: pedido.talla,
      precio: pedido.precio,
      descripcion: pedido.descripcion,
      cliente: pedido.cliente
    });

    setIdPedido(pedido.id);
    setEditando(true);
  };

  return (
    <div className="formulario">
      <h2>Pedidos</h2>

      <input
        type="date"
        value={nuevoPedido.fecha}
        onChange={(e) =>
          setNuevoPedido({
            ...nuevoPedido,
            fecha: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Código producto"
        value={nuevoPedido.codigo_producto}
        onChange={(e) =>
          setNuevoPedido({
            ...nuevoPedido,
            codigo_producto: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Talla"
        value={nuevoPedido.talla}
        onChange={(e) =>
          setNuevoPedido({
            ...nuevoPedido,
            talla: e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Precio"
        value={nuevoPedido.precio}
        onChange={(e) =>
          setNuevoPedido({
            ...nuevoPedido,
            precio: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Descripción"
        value={nuevoPedido.descripcion}
        onChange={(e) =>
          setNuevoPedido({
            ...nuevoPedido,
            descripcion: e.target.value
          })
        }
      />

      <select
        value={nuevoPedido.cliente}
        onChange={(e) =>
          setNuevoPedido({
            ...nuevoPedido,
            cliente: e.target.value
          })
        }
      >
        <option value="">Seleccione cliente</option>

        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre}
          </option>
        ))}
      </select>

      <button onClick={guardarPedido}>
        {editando ? "Actualizar Pedido" : "Guardar Pedido"}
      </button>

      <hr />

      <div className="lista">
        <h3>Lista de pedidos</h3>

        <label className="label-busqueda">
          Buscar pedido por nombre del cliente
        </label>

        <input
          type="text"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
        />

        {pedidosPaginados.map((pedido) => (
          <div key={pedido.id} className="item-lista">
            <div>
              <p>
                <strong>{pedido.codigo_producto}</strong>
              </p>

              <p>Fecha: {pedido.fecha}</p>

              <p>Talla: {pedido.talla}</p>

              <p>Precio: ${pedido.precio}</p>

              <p>Cliente: {pedido.cliente_nombre}</p>
            </div>

            <div className="botones">
              <button
                className="btn-editar"
                onClick={() => editarPedido(pedido)}
              >
                Editar
              </button>

              <button
                className="btn-eliminar"
                onClick={() => eliminarPedido(pedido.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <div className="paginacion">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            disabled={
              paginaActual === totalPaginas ||
              totalPaginas === 0
            }
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;