const coordinacionesModel = require("../models/coordinacionesModel")


function crearCoordinacion(req, res) {
    coordinacionesModel.agregarCoordinacion(req.headers.nombre_coordinacion)
}

module.exports = {

    crearCoordinacion

}