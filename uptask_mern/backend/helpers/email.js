import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9d5785e4f9c3ac",
      pass: "4c7fc0fdd29c3b",
    },
  });

  // Informacion del amail.
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `
      <p>Hola: ${nombre}, Comprueba tu cuentan en UpTask </p>
      <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
      <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
    `,
  });
};
