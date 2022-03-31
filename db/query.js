const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'repertorio',
    password: 'Feer1985',
    port: 5432,
});
//INSERTAR CANCION (Requerimiento 1)
const insertarCancion = async (datos) => {
    const consulta = {
        text: 'INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3)',
        values: datos,
    }
    try{
        const result = await pool.query(consulta);
        return result;
    }catch(err){
        console.log('Error: ', err);
    }
}
//LEER DATA DE LA TABLA (Requerimiento 2)
const consultaCanciones = async () => {
    try{
        const result = await pool.query('SELECT * FROM repertorio ORDER BY id ASC');
        return result;
    }catch(err){
        console.log('Error: ', err);
    }
}
//EDITAR CANCION (Requerimiento 3)
const editarCancion = async (datos) => {
    const consulta = {
        text: "UPDATE repertorio SET cancion = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *",
        values: datos,
    }
    try{
        const result = await pool.query(consulta);
        return result;
    }catch(err){
        console.log('Error: ', err);
    }
}
//ELIMINAR CANCION (Requerimiento 4)
const eliminarCancion = async (id) => {
    try{
        const result = await pool.query(`DELETE FROM repertorio WHERE id = ${id}`);
        return result;
    }catch(err){
        console.log('Error: ', err);
    }
}
module.exports = { insertarCancion, consultaCanciones, editarCancion, eliminarCancion }