import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Redux.
import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../actions/productoActions";

export default function Producto({ producto }) {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Habilitar history para reedireccion.

  // Confirar si desea eliminarlo.
  const confirmarEliminarProducto = (id) => {
    // Preguntar a usuario.
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un producto que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // Pasarlo al action.
        dispatch(borrarProductoAction(id));
      }
    });
  };

  // Funcion que redirige de forma programada.
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    navigate(`/productos/editar/${id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold "> ${precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionarEdicion(producto)}
        >
          Editar
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
