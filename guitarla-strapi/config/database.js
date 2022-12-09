module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'dpg-ce96hg94rebc0ptuvnlg-a.oregon-postgres.render.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'guitar_s12o'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', 'EyTpLwrgVf9QLlfYMxek0anjtUfAqdzk'),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
