const fs = require('fs');
const path = require('path');
const archivoActividades = path.join(__dirname, "../database/actividades.json");
const archivoActividadesCoord = path.join(__dirname, "../database/actividades_coordinaciones.json");
const archivoUsuariosActividades = path.join(__dirname, "../database/usuarios_actividades.json");
const horariosModel = require("../models/horariosModel");

function crearActividad(data) {

    let actividadesF = fs.readFileSync(archivoActividades);

    let actividades = JSON.parse(actividadesF);




    let data2 = {

        id_actividad: actividades.actividades.length,

        nombre_actividad: data.nombre_actividad,

        descripcion_actividad: data.descripcion_actividad,

        unidad_medida: data.unidad_medida

    }

    console.log(data2)




    try {

        actividades.actividades = actividades.actividades.filter(actf2 => data.nombre_actividad != actf2.nombre_actividad)

    } catch (error) {

        console.log("Actividad nueva")

    }




    actividades.actividades.push(data2);




    fs.writeFile(archivoActividades, JSON.stringify(actividades), function (err) {

        if (err) throw err;

        console.log('Archivo actividades modificado!');

        //console.log(usuarios);

    });

}





function getActivities() {

    return new Promise((resolve, reject) => {

        fs.readFile(archivoActividades, 'utf8', function (err, data) {

            if (err) {

                reject(err);

            } else {

                try {

                    const activities = JSON.parse(data); // Parsear el contenido del archivo como JSON

                    resolve(activities); // Resolver la promesa con los datos obtenidos

                } catch (error) {

                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON

                }

            }

        });

    });

}




function getActividadesACT() {

    return new Promise((resolve, reject) => {

        fs.readFile(archivoUsuariosActividades, 'utf8', function (err, data) {

            if (err) {

                reject(err);

            } else {

                try {

                    const activities = JSON.parse(data); // Parsear el contenido del archivo como JSON

                    resolve(activities); // Resolver la promesa con los datos obtenidos

                } catch (error) {

                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON

                }

            }

        });

    });

}




async function getAllActivities() {

    let usuariosActiv = await getActividadesACT(),

        actividadesSis = await getActivities(),

        actividadesCom = [];




    usuariosActiv.usuarios_actividades.map((act) => {

        actividadesSis.actividades.map((acts) => {

            if (act.actividad == acts.id_actividad) {

                actividadesCom.push({ ...act, ...acts });

            }

        })

    })




    return new Promise((resolve, reject) => {

        resolve(actividadesCom)

    });




    //console.log("actividades completas")

    //console.log(actividadesCom)




    // console.log("usuariosActiv")

    // console.log(usuariosActiv)

    // console.log("actividadesSis")

    // console.log(actividadesSis)

}




function getActivitiesCoordinacion() {

    return new Promise((resolve, reject) => {

        fs.readFile(archivoActividadesCoord, 'utf8', function (err, data) {

            if (err) {

                reject(err);

            } else {

                try {

                    const activitiesCoordinacion = JSON.parse(data); // Parsear el contenido del archivo como JSON

                    resolve(activitiesCoordinacion); // Resolver la promesa con los datos obtenidos

                } catch (error) {

                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON

                }

            }

        });

    });

}




async function getActivitiesUser(s) {

    let user = s;

    let activities = await getActivities();

    let activitiesCoord = await getActivitiesCoordinacion();




    return new Promise((resolve, reject) => {

        resolve({ activities, activitiesCoord });

    });

}




function iniciarActividad(data) {

    let auM = fs.readFileSync(archivoUsuariosActividades);

    let au = JSON.parse(auM);




    // console.log("actividades jsjs")

    // console.log(au)

    if (data.actividad != "0") {

        try {

            au.usuarios_actividades.filter((usr) => usr.actividad != data.actividad && usr.fecha_inicio != data.fecha_inicio

                && data.usuario != usr.usuario)

        } catch (error) {

            console.log("Actividad nueva")

        }




        let existeActividad = au.usuarios_actividades.find((actd) =>

            actd.usuario === data.usuario && actd.actividad === data.actividad && actd.fecha_fin === '')




        if (existeActividad == undefined) {

            au.usuarios_actividades.push(data);

        }

    } else {

        au.usuarios_actividades.push(data);

    }




    fs.writeFile(archivoUsuariosActividades, JSON.stringify(au), function (err) {

        if (err) throw err;

        console.log('Archivo usuarios_actividades modificado!');

    })

    // console.log(au)

}





function finalizarActividad(data) {

    let auM = fs.readFileSync(archivoUsuariosActividades);

    let au = JSON.parse(auM);




    au.usuarios_actividades.map(actividad => {

        if (actividad.usuario === data.usuario && actividad.actividad === data.id_actividad) {

            if (!actividad.fecha_fin) {

                actividad.fecha_fin = data.fecha_fin;

                actividad.observacion2 = data.observacion2

                actividad.cantidad = data.cantidad

            }

        }

    });




    fs.writeFile(archivoUsuariosActividades, JSON.stringify(au), function (err) {

        if (err) throw err;

        console.log('Archivo usuarios_actividades modificado!');

    })

}




function cerrarActividades(d) {

    let auM = fs.readFileSync(archivoUsuariosActividades);

    let au = JSON.parse(auM);




    au.usuarios_actividades.map(actividad => {

        if (actividad.usuario == d.usuario) {

            actividad.fecha_fin = d.fecha_fin

        }

    })




    fs.writeFile(archivoUsuariosActividades, JSON.stringify(au), function (err) {

        if (err) throw err;

        console.log('Archivo usuarios_actividades modificado!');

    })




    horariosModel.registrarSalida(d.fecha_fin, d.usuario)

}




function actualizarActividad(data) {

    let auM = fs.readFileSync(archivoUsuariosActividades);

    let au = JSON.parse(auM);




    au.usuarios_actividades = au.usuarios_actividades.map(actrs => {

        if (actrs.actividad == data.id_actividad

            && actrs.usuario == data.usuario

            && actrs.fecha_inicio == data.fecha_inicio) {

            actrs.actividad = data.id_actividad;

            actrs.usuario = data.usuario;

            actrs.fecha_inicio = data.fecha_inicio;

            actrs.fecha_fin = data.fecha_fin;

            actrs.unidad_medida = data.unidad_medida;

            actrs.cantidad = data.cantidad;

            actrs.observacion1 = data.obs1;

            actrs.observacion2 = data.obs2;




            fs.writeFile(archivoUsuariosActividades, JSON.stringify(au), function (err) {

                if (err) throw err;

                console.log('Archivo usuarios_actividades modificado!');

            })

        }



    })




    function ausenciaJustificada(usr) {

        let auM = fs.readFileSync(archivoUsuariosActividades);

        let au = JSON.parse(auM);




        fs.writeFile(archivoUsuariosActividades, JSON.stringify(au), function (err) {

            if (err) throw err;

            console.log('Archivo usuarios_actividades modificado!');

        })

        // console.log(au)

    }






}





module.exports = {

    getActivities,

    getActivitiesCoordinacion,

    getActivitiesUser,

    iniciarActividad,

    getActividadesACT,

    finalizarActividad,

    cerrarActividades,

    getAllActivities,

    actualizarActividad,

    crearActividad

}