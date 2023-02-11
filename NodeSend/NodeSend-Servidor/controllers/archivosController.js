// Subida de archivos.
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");

const subirArchivo = async (req, res, next) => {
  const configuracionMulter = {
    limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(configuracionMulter).single("archivo");

  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      res.status(200).json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

const eliminarArchivo = async (req, res, next) => {
  console.log(req.archivo);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    console.log("El archivo se elimino correctamente.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { subirArchivo, eliminarArchivo };