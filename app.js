const express = require("express");
const app = express();
const port = 5000;

const obtener = require("./obtenerDatos");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/', async (req, res) => {
    try {
        const datos = await obtener();
        res.json(datos);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
