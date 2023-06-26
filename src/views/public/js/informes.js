const filterGraficSelect = document.getElementById("filterGrafic");
const ctx = document.getElementById("actarea").getContext('2d');
const ctx2 = document.getElementById("acttime").getContext('2d');
const ctx3 = document.getElementById("actusuact").getContext('2d');
const ctx4 = document.getElementById("topUserRend").getContext('2d');
const ctx5 = document.getElementById("actuni").getContext('2d');
let coortmp = JSON.parse(document.getElementById("coortmp").textContent);
let actUsr = undefined

let c = 0;

// Configuración de los gráficos (responsive)
const options = {
    responsive: true, // Hace que el gráfico se ajuste al tamaño del contenedor
    scales: {
        y: {
            beginAtZero: true // Inicia el eje Y desde cero
        }
    }
};

let myChart,
    myChart2,
    myChart3,
    myChart4,
    myChart5// Declarar la variable myChart fuera de la función

function grafCantAct() {
    let cantidadAct = {};
    let l = [];
    let d = [];

    coortmp.forEach(actividad => {
        if (actividad.fecha_fin !== '') {
            let idAct = actividad.unidad_medida;

            if (actividad.unidad_medida != "") {

                if (!cantidadAct[idAct]) {
                    cantidadAct[idAct] = {
                        unidad_medida: actividad.unidad_medida,
                        cantidad: actividad.cantidad
                    };
                } else {
                    cantidadAct[idAct].cantidad += actividad.cantidad;
                }
            }
        }
    });

    for (let Id in cantidadAct) {
        if (cantidadAct.hasOwnProperty(Id)) {
            let duracion = cantidadAct[Id];
            let UnMedi = duracion.unidad_medida;
            let cantidad = duracion.cantidad;
            l.push(UnMedi);
            d.push(cantidad);
        }

    }

    var data = {
        labels: l,
        datasets: [{
            label: 'Usuario',
            data: d,
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo de las barras
            borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
            borderWidth: 1 // Ancho del borde de las barras
        }]
    };
    if (myChart5) {
        myChart5.destroy();
    }

    myChart5 = new Chart(ctx5, {
        type: 'bar', // Tipo de gráfico (barras en este caso)
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad por unidad de medida'
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: Math.max(...d)
                }
            }
        }
    });

    console.log("cantidad de area");
    console.log(cantidadAct);
}


function grafTopUser() {
    let duracionUser = {};
    let l = [];
    let d = [];

    coortmp.forEach(actividad => {
        if (actividad.fecha_fin !== '') {
            let fechaInicio = new Date(actividad.fecha_inicio);
            let fechaFin = new Date(actividad.fecha_fin);
            let tiempoPasadoEnMilisegundos = fechaFin - fechaInicio;
            let segundosTotales = tiempoPasadoEnMilisegundos / 1000;
            let horas = Math.floor(segundosTotales / 3600);
            let minutos = Math.floor((segundosTotales % 3600) / 60);
            let segundos = Math.floor(segundosTotales % 60);
            let idAct = actividad.usuario;

            if (!duracionUser[idAct]) {
                duracionUser[idAct] = {
                    usuario: actividad.usuario,
                    horas: horas,
                    minutos: minutos,
                    segundos: segundos
                };
            } else {
                duracionUser[idAct].horas += horas;
                duracionUser[idAct].minutos += minutos;
                duracionUser[idAct].segundos += segundos;
            }
        }
    });

    // Convertir el objeto a un arreglo de valores
    let duracionArray = Object.values(duracionUser);

    // Función de comparación personalizada
    function compararHorasMinutos(a, b) {
        let tiempoA = a.horas * 60 + a.minutos;
        let tiempoB = b.horas * 60 + b.minutos;
        return tiempoB - tiempoA; // Orden descendente
    }

    // Ordenar el arreglo utilizando la función de comparación
    duracionArray.sort(compararHorasMinutos);
    actUsr = duracionArray
    duracionArray = duracionArray.slice(0, 8);

    for (let Id in duracionArray) {
        if (duracionArray.hasOwnProperty(Id)) {
            let duracion = duracionArray[Id];
            let nomUser = duracion.usuario;
            let horas = duracion.horas;
            let minutos = duracion.minutos;
            let segundos = duracion.segundos;
            l.push(nomUser);
            d.push(horas);
        }

    }

    var data = {
        labels: l,
        datasets: [{
            label: 'Usuario',
            data: d,
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo de las barras
            borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
            borderWidth: 1 // Ancho del borde de las barras
        }]
    };
    if (myChart4) {
        myChart4.destroy();
    }

    myChart4 = new Chart(ctx4, {
        type: 'bar', // Tipo de gráfico (barras en este caso)
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad de tiempo por usuario  (top 8)'
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: Math.max(...d)
                }
            }
        }
    });

    console.log("duración usuario");
    console.log(duracionArray);
}



function grafUsuAct() {
    let duracionArea = {};
    let l = [];
    let d = [];

    coortmp.forEach(actividad => {
        if (actividad.fecha_fin !== '') {
            let fechaInicio = new Date(actividad.fecha_inicio);
            let fechaFin = new Date(actividad.fecha_fin);
            let tiempoPasadoEnMilisegundos = fechaFin - fechaInicio;
            let segundosTotales = tiempoPasadoEnMilisegundos / 1000;
            let horas = Math.floor(segundosTotales / 3600);
            let minutos = Math.floor((segundosTotales % 3600) / 60);
            let segundos = Math.floor(segundosTotales % 60);
            let idCoor = actividad.area;

            // Si el ID de actividad no existe en el objeto, se crea una nueva entrada con el tiempo actual
            if (!duracionArea[idCoor]) {
                duracionArea[idCoor] = {
                    nom_area: actividad.nombre_area,
                    usu: [actividad.usuario]
                };
            } else {
                // Si el ID de actividad ya existe en el objeto, se suman los tiempos acumulativos
                console.log(duracionArea[idCoor].usu)
                if (duracionArea[idCoor].usu.includes(actividad.usuario)) {
                    console.log("Se encontró valor duplicado")
                } else {
                    duracionArea[idCoor].usu.push(actividad.usuario)
                }
            }
        }
    });

    for (let Id in duracionArea) {
        if (duracionArea.hasOwnProperty(Id)) {
            let duracion = duracionArea[Id];
            let nomCoor = duracion.nom_area;
            let usuario = duracion.usu.length
            console.log(duracion.usu)
            l.push(nomCoor);
            d.push(usuario);
        }
    }

    var data = {
        labels: l,
        datasets: [{
            label: 'Cantidad de usuarios por actividad',
            data: d,
            backgroundColor: generarColoresAleatorios(d.length),
            borderColor: generarColoresAleatorios(d.length), // Color del borde de las barras
            borderWidth: 1 // Ancho del borde de las barras
        }]
    };

    if (myChart3) {
        myChart3.destroy();
    }

    myChart3 = new Chart(ctx3, {
        type: 'doughnut', // Tipo de gráfico (barras en este caso)
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad de usuarios por área'
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: Math.max(...d)
                }
            }
        }
    });
}

function graficActivArea() {
    let duracionArea = {};
    let l = [];
    let d = [];

    coortmp.forEach(actividad => {
        if (actividad.fecha_fin !== '') {
            let fechaInicio = new Date(actividad.fecha_inicio);
            let fechaFin = new Date(actividad.fecha_fin);
            let tiempoPasadoEnMilisegundos = fechaFin - fechaInicio;
            let segundosTotales = tiempoPasadoEnMilisegundos / 1000;
            let horas = Math.floor(segundosTotales / 3600);
            let minutos = Math.floor((segundosTotales % 3600) / 60);
            let segundos = Math.floor(segundosTotales % 60);
            let idCoor = actividad.area;

            // Si el ID de actividad no existe en el objeto, se crea una nueva entrada con el tiempo actual

            if (!duracionArea[idCoor]) {
                duracionArea[idCoor] = {
                    nom_area: actividad.nombre_area,
                    horas: horas,
                    minutos: minutos,
                    segundos: segundos
                };
            } else {
                // Si el ID de actividad ya existe en el objeto, se suman los tiempos acumulativos
                duracionArea[idCoor].horas += horas;
                duracionArea[idCoor].minutos += minutos;
                duracionArea[idCoor].segundos += segundos;
            }
        }
    });

    for (let Id in duracionArea) {
        if (duracionArea.hasOwnProperty(Id)) {
            let duracion = duracionArea[Id];
            let nomCoor = duracion.nom_area;
            let horas = duracion.horas;
            let minutos = duracion.minutos;
            let segundos = duracion.segundos;
            l.push(nomCoor);
            d.push(horas);
        }

    }

    var data = {
        labels: l,
        datasets: [{
            label: 'Cantidad de horas por área',
            data: d,
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo de las barras
            borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
            borderWidth: 1 // Ancho del borde de las barras
        }]
    };
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (barras en este caso)
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad de tiempo por área'
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: Math.max(...d)
                }
            }
        }
    });
}

function grafTiempoAct() {
    let duracionArea = {};
    let l = [];
    let d = [];

    coortmp.forEach(actividad => {
        if (actividad.fecha_fin !== '') {
            let fechaInicio = new Date(actividad.fecha_inicio);
            let fechaFin = new Date(actividad.fecha_fin);
            let tiempoPasadoEnMilisegundos = fechaFin - fechaInicio;
            let segundosTotales = tiempoPasadoEnMilisegundos / 1000;
            let horas = Math.floor(segundosTotales / 3600);
            let minutos = Math.floor((segundosTotales % 3600) / 60);
            let segundos = Math.floor(segundosTotales % 60);
            let idAct = actividad.id_actividad;

            // Si el ID de actividad no existe en el objeto, se crea una nueva entrada con el tiempo actual

            if (!duracionArea[idAct]) {
                duracionArea[idAct] = {
                    nom_actividad: actividad.nombre_actividad,
                    horas: horas,
                    minutos: minutos,
                    segundos: segundos

                };
            } else {
                // Si el ID de actividad ya existe en el objeto, se suman los tiempos acumulativos
                duracionArea[idAct].horas += horas;
                duracionArea[idAct].minutos += minutos;
                duracionArea[idAct].segundos += segundos;
            }
        }
    });




    for (let Id in duracionArea) {
        if (duracionArea.hasOwnProperty(Id)) {
            let duracion = duracionArea[Id];
            let nomAct = duracion.nom_actividad;
            let horas = duracion.horas;
            let minutos = duracion.minutos;
            let segundos = duracion.segundos;
            l.push(nomAct);
            d.push(horas);
        }

    }




    var data = {

        labels: l,

        datasets: [

            {

                label: 'Cantidad de horas por actividad',

                data: d,

                backgroundColor: 'rgba(0, 123, 255, 0.5)',

                borderColor: 'rgba(0, 123, 255, 1)',

                borderWidth: 1,

                type: 'bar', // Tipo de gráfico de barras

                yAxisID: 'bar-y-axis' // Identificador de la escala del eje Y para las barras

            },

            {

                label: 'Cantidad de horas por actividad - linea',

                data: d,

                backgroundColor: '#ff7f9a',

                borderColor: 'rgba(0, 123, 255, 1)',

                borderWidth: 1,

                type: 'line', // Tipo de gráfico de líneas

                yAxisID: 'line-y-axis' // Identificador de la escala del eje Y para las líneas

            }

        ]

    };




    if (myChart2) {

        myChart2.destroy();

    }




    // ... Código previo ...




    myChart2 = new Chart(ctx2, {

        type: 'bar',

        data: data,

        options: {

            plugins: {

                title: {

                    display: true,

                    text: 'Cantidad de tiempo por actividad'

                }

            },

            scales: {

                y: {

                    id: 'bar-y-axis',

                    beginAtZero: true,

                    suggestedMax: Math.max(...d),

                    ticks: {

                        callback: function (value) {

                            return value; // Devuelve el valor del tick sin etiqueta

                        }

                    },

                    display: false

                },

                'line-y-axis': {

                    beginAtZero: true,

                    suggestedMax: Math.max(...d),

                    display: false // Oculta las etiquetas del eje Y para las líneas

                }

            }

        }

    });





}

//




function actualizaActCoor() {

    let tmp = [];

    if (filterGraficSelect.value == 0) {

        c = 0

    } else {

        c = 1

    }




    if (c == 0) {

        let fechaActual = new Date();




        coortmp.forEach(coor => {

            let fechaInicio = new Date(coor.fecha_inicio);




            if (

                fechaInicio.getFullYear() === fechaActual.getFullYear() &&

                fechaInicio.getMonth() === fechaActual.getMonth() &&

                fechaInicio.getDate() === fechaActual.getDate()

            ) {

                tmp.push({ ...coor });
            }
        });

        coortmp = tmp;
        graficActivArea();
        grafTiempoAct()
        grafUsuAct()
        grafTopUser();
        grafCantAct()
        c = 1;
    } else {
        coortmp = JSON.parse(document.getElementById("coortmp").textContent);
        graficActivArea();
        grafTiempoAct()
        grafUsuAct()
        grafTopUser();
        grafCantAct()
        c = 0;

    }

}





// Colores aleatorios




function generarColoresAleatorios(cantidad) {

    const colores = [];




    for (let i = 0; i < cantidad; i++) {

        const rojo = Math.floor(Math.random() * 128); // Rango de 0 a 127

        const verde = Math.floor(Math.random() * 128); // Rango de 0 a 127

        const azul = Math.floor(Math.random() * 128); // Rango de 0 a 127

        const opacidad = Math.random();




        const colorAleatorio = `rgba(${rojo}, ${verde}, ${azul}, ${opacidad})`;

        colores.push(colorAleatorio);

    }




    return colores;

}




filterGraficSelect.addEventListener("change", () => {

    actualizaActCoor()

});





graficActivArea()
grafTiempoAct()
grafUsuAct()
grafTopUser()
grafCantAct()