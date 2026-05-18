import { useEffect, useState } from "react";
import api from "../services/api";

function Clientes() {

  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const [editando, setEditando] = useState(false);
  const [idCliente, setIdCliente] = useState(null);

  const [nuevoCliente, setNuevoCliente] = useState({
    curp: "",
    nombre: "",
    telefono: ""
  });

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {

      const respuesta = await api.get("clientes/");

      setClientes(respuesta.data);

    } catch (error) {

      console.log("Error:", error);

    }
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.curp.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimero = indiceUltimo - registrosPorPagina;

  const clientesPaginados = clientesFiltrados.slice(
    indicePrimero,
    indiceUltimo
  );

  const totalPaginas = Math.ceil(
    clientesFiltrados.length / registrosPorPagina
  );

  const guardarCliente = async () => {

    if (
      !nuevoCliente.curp ||
      !nuevoCliente.nombre ||
      !nuevoCliente.telefono
    ) {

      alert("Todos los campos son obligatorios");

      return;

    }

    try {

      if (editando) {

        await api.put(`clientes/${idCliente}/`, nuevoCliente);

        setEditando(false);

        setIdCliente(null);

      } else {

        await api.post("clientes/", nuevoCliente);

      }

      obtenerClientes();

      setNuevoCliente({
        curp: "",
        nombre: "",
        telefono: ""
      });

    } catch (error) {

      console.log("Error:", error);

    }
  };

  const eliminarCliente = async (id) => {

    const confirmar = window.confirm(
      "¿Desea eliminar este cliente?"
    );

    if (!confirmar) {
      return;
    }

    try {

      await api.delete(`clientes/${id}/`);

      obtenerClientes();

      alert("Cliente eliminado correctamente");

    } catch (error) {

      console.log(error);

    }
  };

  const editarCliente = (cliente) => {

    setNuevoCliente({
      curp: cliente.curp,
      nombre: cliente.nombre,
      telefono: cliente.telefono
    });

    setIdCliente(cliente.id);

    setEditando(true);
  };

  return (

    <div className="formulario">

      <h2>Clientes</h2>

      <input
        type="text"
        placeholder="CURP"
        value={nuevoCliente.curp}
        onChange={(e) =>
          setNuevoCliente({
            ...nuevoCliente,
            curp: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Nombre"
        value={nuevoCliente.nombre}
        onChange={(e) =>
          setNuevoCliente({
            ...nuevoCliente,
            nombre: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={nuevoCliente.telefono}
        onChange={(e) =>
          setNuevoCliente({
            ...nuevoCliente,
            telefono: e.target.value
          })
        }
      />

      <button onClick={guardarCliente}>
        {editando ? "Actualizar Cliente" : "Guardar Cliente"}
      </button>

      <hr />

      <div className="lista">

        <h3>Lista de clientes</h3>

        <label className="label-busqueda">
          Buscar cliente por nombre, CURP o teléfono
        </label>

        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {clientesPaginados.map((cliente) => (

          <div
            key={cliente.id}
            className="item-lista"
          >

            <div>

              <p>
                <strong>{cliente.nombre}</strong>
              </p>

              <p>
                CURP: {cliente.curp}
              </p>

              <p>
                Tel: {cliente.telefono}
              </p>

            </div>

            <div className="botones">

              <button
                className="btn-editar"
                onClick={() => editarCliente(cliente)}
              >
                Editar
              </button>

              <button
                className="btn-eliminar"
                onClick={() => eliminarCliente(cliente.id)}
              >
                Eliminar
              </button>

            </div>

          </div>

        ))}

        <div className="paginacion">

          <button
            disabled={paginaActual === 1}
            onClick={() =>
              setPaginaActual(paginaActual - 1)
            }
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
            onClick={() =>
              setPaginaActual(paginaActual + 1)
            }
          >
            Siguiente
          </button>

        </div>

      </div>

    </div>
  );
}

export default Clientes;