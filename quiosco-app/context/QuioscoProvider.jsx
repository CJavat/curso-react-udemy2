import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    const productoEstado = pedido.some(
      (productoState) => productoState.id === producto.id
    );

    if (productoEstado) {
      // Actualizar la cantidad.
      const pedidoActualizado = pedido.map((pedidoState) =>
        pedidoState.id === producto.id ? producto : pedidoState
      );

      setPedido(pedidoActualizado);

      toast.success("Guardado correctamente"); // Notificacion
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al pedido"); // Notificacion
    }

    setModal(!modal);
  };

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };

  const colocarOrden = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      // Recetear la app.
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);

      toast.success("Pedido realizado correctamente");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        producto,
        modal,
        pedido,
        nombre,
        total,
        setNombre,
        handleClickCategoria,
        handleSetProducto,
        handleChangeModal,
        handleAgregarPedido,
        handleEditarCantidades,
        handleEliminarProducto,
        colocarOrden,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
