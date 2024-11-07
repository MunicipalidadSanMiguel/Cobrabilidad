const mssql = require('mssql');
const oracle = require ('oracledb');
const fs = require('fs');

const configDatawherehouse = {
  server: '172.20.20.65',
  user: 'cons_hacienda',
  password: '',
  database: 'dwh_hacienda',
  options: {
    encrypt: false, // Cambia a true si tu servidor requiere encriptación
    trustServerCertificate: true // Usa esto si estás en un entorno de prueba sin certificados válidos
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 300000
  },
  connectionTimeout: 999999999,
  requestTimeout: 999999999
};

const configRAF = {
  client: 'oracledb',
  connection: {
      host : '172.20.30.74', user : 'CONS_RAFAM', password : '',
      database : 'MSMTEST', connectionTimeout: 999999999, requestTimeout: 999999999,
      pool: {
        max: 10, min: 0, idleTimeoutMillis: 300000
        }
      }
  };

async function connectToDatabase() {
  try {
    const pool = await mssql.connect(configDatawherehouse);
    console.log("Conexión exitosa a la base de datos");
    await pool.close();
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

connectToDatabase();