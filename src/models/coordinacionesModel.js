const fs = require('fs');
const path = require('path');
const archivoCoordinaciones = path.join(__dirname, "../database/coordinaciones.json");
const archivoActCoor = path.join(__dirname, "../database/actividades_coordinaciones.json");

function getCoordinaciones() {
    return new Promise((resolve, reject) => {
        fs.readFile(archivoCoordinaciones, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                try {
                    const coordinaciones = JSON.parse(data); // Parsear el contenido del archivo como JSON
                    resolve(coordinaciones); // Resolver la promesa con los datos obtenidos
                } catch (error) {
                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON
                }
            }
        });
    });
}

function getActCoor () {
    return new Promise((resolve, reject) => {
        fs.readFile(archivoActCoor, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                try {
                    const actCoor = JSON.parse(data); // Parsear el contenido del archivo como JSON
                    resolve(actCoor); // Resolver la promesa con los datos obtenidos
                } catch (error) {
                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON
                }
            }
        });
    });
}




function agregarCoordinacion(coor) {

    // Leer archivo usuarios.json y agregar un usuario al arreglo

    let coordinacionesF = fs.readFileSync(archivoCoordinaciones);

    let coordinaciones = JSON.parse(coordinacionesF);




    let data = {

        id_coordinacion: coordinaciones.coordinaciones.length + 1,

        nombre_coordinacion: coor

    }




    try {

        coordinaciones.coordinaciones = coordinaciones.coordinaciones.filter(coorf => coor != coorf.nombre_coordinacion)

    } catch (error) {

        console.log("coordinación nueva")

    }




    coordinaciones.coordinaciones.push(data);




    fs.writeFile(archivoCoordinaciones, JSON.stringify(coordinaciones), function (err) {

        if (err) throw err;

        console.log('Archivo coordinaciones modificado!');

        //console.log(usuarios);

    });

}




module.exports = {
    getCoordinaciones,
    agregarCoordinacion,
    getActCoor
}