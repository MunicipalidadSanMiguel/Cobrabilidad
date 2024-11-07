const mssql = require('mssql');
//const oracle = require('oracledb'); // Corrección de la importación de Oracle
const fs = require('fs');

// Configuración para la base de datos MSSQL (Datawherehouse)
const configDatawherehouse = {
  user: 'cons_hacienda',
  password: 'haciENda4578', // Coloca aquí la contraseña
  server: '172.20.20.65',
  database: 'dwh_hacienda',
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 300000
  },
  connectionTimeout: 999999999,
  requestTimeout: 999999999
};

// Configuración para la base de datos Oracle (RAF)
const configRAF = {
  user: 'CONS_RAFAM',
  password: 'consultas24Raf', // Coloca aquí la contraseña
  connectString: '172.20.30.74/MSMTEST',
  poolMax: 10,
  poolMin: 0,
  poolTimeout: 300
};

// Función para conectarse a MSSQL
async function connectToMSSQL() {
  try {
    const pool = await mssql.connect(configDatawherehouse);
    console.log("Conexión exitosa a MSSQL (Datawherehouse)");
    await pool.close();
  } catch (error) {
    console.error("Error al conectar a MSSQL:", error);
  }
}

// Función para conectarse a Oracle
/*async function connectToOracle() {
  try {
    await oracle.createPool(configRAF); // Crea un pool de conexiones a Oracle
    const connection = await oracle.getConnection();
    console.log("Conexión exitosa a Oracle (RAF)");
    await connection.close();
  } catch (error) {
    console.error("Error al conectar a Oracle:", error);
  }
}*/

// Ejecución de ambas conexiones
async function connectToBothDatabases() {
  await connectToMSSQL();
  //await connectToOracle();
}

connectToBothDatabases();



