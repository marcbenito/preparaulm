const { Pool } = require("pg")

// Configura los parámetros de conexión desde variables de entorno
// o usa valores predeterminados para desarrollo local
const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "aerotest",
  password: process.env.PGPASSWORD || "postgres",
  port: process.env.PGPORT || 5432,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
})

// Función para ejecutar consultas
const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start

  // Registra la consulta en desarrollo
  if (process.env.NODE_ENV !== "production") {
    console.log("Consulta ejecutada:", { text, duration, filas: res.rowCount })
  }

  return res
}

// Obtiene un cliente del pool para transacciones
const getClient = async () => {
  const client = await pool.connect()

  // Sobrescribe los métodos para agregar registro en desarrollo
  const originalQuery = client.query
  client.query = async (...args) => {
    const start = Date.now()
    const result = await originalQuery.apply(client, args)
    const duration = Date.now() - start

    if (process.env.NODE_ENV !== "production") {
      console.log("Consulta en transacción:", {
        args,
        duration,
        filas: result.rowCount,
      })
    }

    return result
  }

  return client
}

module.exports = {
  query,
  getClient,
  pool,
}
