const rolesModel = require("../models/rolesModel"),
    cargosModel = require("../models/cargosModel"),
    coordinacionesModel = require("../models/coordinacionesModel"),
    horariosModel = require("../models/horariosModel"),
    usuariosModel = require("../models/usuariosModel"),
    actividades = require("../models/actividadesModel");

async function adminstradorView(req, res) {
    let actividadesTmp = await actividades.getActivities(),
        coordinacionesTmp = await coordinacionesModel.getActCoor(),
        coordinaciones2Tmp = await coordinacionesModel.getCoordinaciones();

    actividadesTmp.actividades.map(act1t => {
        act1t.coorD = []
    })

    actividadesTmp.actividades.map(act1 => {
        coordinacionesTmp.actividades_coordinaciones.map(act2 => {
            if (act1.id_actividad == act2.actividades_id_actividad) {
                act1.coorD.push(act2.coordinaciones_id_coordinacion)
            }
        })
    })
    actividadesTmp.actividades.map(act3 => {
        act3.coorD.map((coorId, index) => {
            const coordinacion = coordinaciones2Tmp.coordinaciones.find(coorTmp => coorTmp.id_coordinacion === coorId);
            if (coordinacion) {
                act3.coorD[index] = coordinacion.nombre_coordinacion;
            }
        });
    });


    console.log("actividadesTmp.actividades con coorD:", actividadesTmp.actividades);


    res.render("layouts/administrador", {
        roles: await rolesModel.getRoles(),
        cargos: await cargosModel.getCargos(),
        coordinaciones: await coordinacionesModel.getCoordinaciones(),
        horarios: await horariosModel.getHorarios(),
        usuariosM: await usuariosModel.getUsersADM(),
        actividadesM: await actividades.getAllActivities(),
        actividadesO: await actividades.getActivities(),
        actsCoor: actividadesTmp.actividades
    })
}

module.exports = {
    adminstradorView
}