export default function validarCrearProducto(valores) {
  let errores = {};

  // Validar nombre del usuario.
  if (!valores.nombre) {
    errores.nombre = "El Nombre es obligatorio.";
  }

  // Validar Empresa.
  if (!valores.empresa) {
    errores.empresa = "El nombre de empresa es obligatorio.";
  }

  // Validar url.
  if (!valores.url) {
    errores.url = "La url del producto es obligatorio.";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL mal formateada o no válida.";
  }

  // Validar descripción.
  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripción de tu producto.";
  }

  return errores;
}
