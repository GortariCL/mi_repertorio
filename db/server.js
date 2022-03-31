const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { insertarCancion, consultaCanciones, editarCancion, eliminarCancion } = require('./query');

const port = 3000;

http.createServer(async (req, res) => {
    // Disponibilizar ruta: html
    if(req.url == '/' && req.method == 'GET'){
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path.join(__dirname, '..', 'index.html'), (err, html) => {
            res.end(html);
        });
    }
    
    // Disponibilizar ruta: javascript
    if (req.url == '/script') {
        res.setHeader('Content-Type', 'text/javascript');
        fs.readFile(path.join(__dirname, '..', '/assets/js/script.js'), (err, js) => {
            res.end(js);
        });
    }

    // Disponibilizar ruta: style
    if (req.url == '/style') {
        res.setHeader('Content-Type', 'text/css');
        fs.readFile(path.join(__dirname, '..', '/assets/css/style.css'), (err, css) => {
            res.end(css);
        });
    }

    // Disponibilizar ruta: img-hero
    if (req.url == '/img-hero') {
        res.setHeader('Content-Type', 'image/jpeg');
        fs.readFile(path.join(__dirname, '..', '/assets/img/bg-hero.png'), (err, img) => {
            res.end(img);
        });
    }

    // Disponibilizar ruta: favicon
    if (req.url == '/favicon') {
        res.setHeader('Content-Type', 'image/jpeg');
        fs.readFile(path.join(__dirname, '..', '/assets/img/favicon.ico'), (err, icon) => {
            res.end(icon);
        });
    }

    // Disponibilizar ruta: logo
    if (req.url == '/logo') {
        res.setHeader('Content-Type', 'image/jpeg');
        fs.readFile(path.join(__dirname, '..', '/assets/img/logo.png'), (err, logo) => {
            res.end(logo);
        });
    }

    //INSERTAR CANCION (Requerimiento 1)
    if(req.url == '/cancion' && req.method == 'POST'){
        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const datos = Object.values(JSON.parse(body));
            const response = await insertarCancion(datos);
            res.end(JSON.stringify(response));
        })
    }

    //LEER DATA DE LA TABLA (Requerimiento 2)
    if(req.url == '/canciones' && req.method == 'GET'){
        const registros = await consultaCanciones();
        res.end(JSON.stringify(registros.rows));
    }

    //EDITAR CANCION (Requerimiento 3)
    if(req.url == '/cancion' && req.method == 'PUT'){
        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const datos = Object.values(JSON.parse(body));
            const response = await editarCancion(datos);
            res.end(JSON.stringify(response));
        })
    }

    //ELIMINAR CANCION (Requerimiento 4)
    if(req.url.startsWith('/cancion') && req.method == 'DELETE'){
        const { id } = url.parse(req.url, true).query;
        const respuesta = await eliminarCancion(id);
        res.end(JSON.stringify(respuesta));
    }
}).listen(3000, () => console.log(`Server on => ${port}`));