const btnCrearUsuarioM = document.getElementById("crear_usuario"),
  btnCrearUsuario = document.getElementById("btn_crear_usuario"),
  roles = JSON.parse(document.getElementById("roles").textContent),
  cargos = JSON.parse(document.getElementById("cargos").textContent),
  coordinaciones = JSON.parse(document.getElementById("coordinaciones").textContent),
  horarios = JSON.parse(document.getElementById("horarios").textContent),
  usuariosBD = JSON.parse(document.getElementById("usuariosM").textContent),
  actividades = JSON.parse(document.getElementById("actividadesM").textContent),
  actCoor = JSON.parse(document.getElementById("actCoor").textContent)


function actCoorD() {
  //document.getElementById("actCoor0").hidden = true
  actCoor.forEach(element => {
    // console.log(element.id_actividad)
    document.getElementById("actCoor" + element.id_actividad).innerHTML = element.coorD.join(' - ')
  });
}

function ModalCreateUser() {
  let html = `
  <br>

<div class='grid_form'>

  <div>

    <label for='id'>Ingrese usuario</label>

    <input type="text" id='id_u' name="id_user" required>

  </div>

  <div>

    <label for='pnombre_u'>Ingrese el primer nombre</label>

    <input type="text" id='pnombre_u' name="pnombre_u" required>

  </div>

  <div>

    <label for='snombre_u'>Ingrese el segundo nombre</label>

    <input type="text" id='snombre_u' name="snombre_u" required>

  </div>

  <div>

    <label for='papellido_u'>Ingrese el primer apellido</label>

    <input type="text" id='papellido_u' name="papellido_u" required>

  </div>

  <div>

    <label for='sapellido_u'>Ingrese el segundo apellido</label>

    <input type="text" id='sapellido_u' name="sapellido_u" required>

  </div>

  <div>

    <label for='rol_u'>Seleccione el rol del usuario</label>

    <select name="rol_u" id="rol_u" required>

 

    </select>

  </div>

  <div>

    <label for='cargo_u'>Seleccione el cargo</label>

    <select name="cargo_u" id="cargo_u" required>

      <option value="value1">Auxiliar de base de datos</option>

      <option value="value2">Auxiliar de acreditación</option>

    </select>

  </div>

  <div>

    <label for='coordinacion_u'>Seleccione la coordinación</label>

    <select name="coordinacion_u" id="coordinacion_u" required>

      <option value="value1">Cuentas</option>

      <option value="value2">Recaudo</option>

    </select>

  </div>

  <div>

    <label for='horario_u'>Seleccione el horario</label>

    <select name="horario_u" id="horario_u" required>

      <option value="value1">Cuentas</option>

      <option value="value2">Recaudo</option>

    </select>

  </div>

  <div>

    <label for='contrasena'>Ingrese la contraseña</label>

    <input type="text" id='contrasena' name="contrasena" required>

  </div>

  <div style='display: flex'>

    </br></br>

    <button onclick="window.modal.close()" class="sendform">Cerrar</button>

    <button class='sendform' id="btn_crear_usuario" onclick="createUser()">Crear usuario</button>

  </div>

</div>




  `




  dspModal("Crear usuario", html)




  // agregar opciones a formulario

  let rolesHTML = undefined,

    cargosHTML = undefined,

    coordinacionesHTML = undefined,

    horariosHTML = undefined;




  roles.roles.forEach(rol => {

    rolesHTML += '<option value="' + rol.id_rol + '">' + rol.nombre_rol + '</option>';

  });




  coordinaciones.coordinaciones.forEach(coordinacion => {

    coordinacionesHTML += '<option value="' + coordinacion.id_coordinacion + '">' + coordinacion.nombre_coordinacion + '</option>';

  });




  cargos.cargos.forEach(cargo => {

    cargosHTML += '<option value="' + cargo.id_cargo + '">' + cargo.nombre_cargo + '</option>';

  });




  horarios.horarios.forEach(horario => {

    horariosHTML += '<option value="' + horario.id_horario + '">' + horario.hora_ingreso + " - " + horario.hora_salida + '</option>';

  });




  document.getElementById("rol_u").innerHTML = rolesHTML;

  document.getElementById("cargo_u").innerHTML = cargosHTML;

  document.getElementById("coordinacion_u").innerHTML = coordinacionesHTML;

  document.getElementById("horario_u").innerHTML = horariosHTML;

}




function actualizarUsuario(data) {

  let htmlactusu = `




  <br>

<div class='grid_form'>

  <div>

    <label for='id'>Usuario</label>

    <input type="text" id='id_u' name="id_user" value="`+ data.usuario + `" required>

  </div>

  <div>

    <label for='pnombre_u'>Primer nombre</label>

    <input type="text" id='pnombre_u' name="pnombre_u" value="`+ data.p_nombre + `" required>

  </div>

  <div>

    <label for='snombre_u'>Segundo nombre</label>

    <input type="text" id='snombre_u' name="snombre_u" value="`+ data.s_nombre + `" required>

  </div>

  <div>

    <label for='papellido_u'>Primer apellido</label>

    <input type="text" id='papellido_u' name="papellido_u" value="`+ data.p_apellido + `" required>

  </div>

  <div>

    <label for='sapellido_u'>Segundo apellido</label>

    <input type="text" id='sapellido_u' name="sapellido_u" value="`+ data.s_apellido + `" required>

  </div>

  <div>

    <label for='rol_u'>Rol del usuario</label>

    <select name="rol_u" id="rol_u" required>

 

    </select>

  </div>

  <div>

    <label for='cargo_u'>Cargo</label>

    <select name="cargo_u" id="cargo_u" required>

      <option value="value1">Auxiliar de base de datos</option>

      <option value="value2">Auxiliar de acreditación</option>

    </select>

  </div>

  <div>

    <label for='coordinacion_u'>Coordinación</label>

    <select name="coordinacion_u" id="coordinacion_u" required>

      <option value="value1">Cuentas</option>

      <option value="value2">Recaudo</option>

    </select>

  </div>

  <div>

    <label for='horario_u'>Horario</label>

    <select name="horario_u" id="horario_u" required>

      <option value="value1">Cuentas</option>

      <option value="value2">Recaudo</option>

    </select>

  </div>

  <div>

    <label for='contrasena'>Contraseña</label>

    <input type="password" id='contrasena' name="contrasena" required>

  </div>

  <div style='display: flex'>

    </br></br>

    <button onclick="window.modal.close()" class="sendform">Cerrar</button>

    <button class='sendform' id="btn_crear_usuario" onclick="createUser()">Actualizar usuario</button>

  </div>

</div>




  `

  dspModal("Actualizar usuario", htmlactusu)

  // agregar opciones a formulario

  let rolesHTML = undefined,

    cargosHTML = undefined,

    coordinacionesHTML = undefined,

    horariosHTML = undefined;




  roles.roles.forEach(rol => {

    rolesHTML += '<option value="' + rol.id_rol + '">' + rol.nombre_rol + '</option>';

  });




  coordinaciones.coordinaciones.forEach(coordinacion => {

    coordinacionesHTML += '<option value="' + coordinacion.id_coordinacion + '">' + coordinacion.nombre_coordinacion + '</option>';

  });




  cargos.cargos.forEach(cargo => {

    cargosHTML += '<option value="' + cargo.id_cargo + '">' + cargo.nombre_cargo + '</option>';

  });




  horarios.horarios.forEach(horario => {

    horariosHTML += '<option value="' + horario.id_horario + '">' + horario.hora_ingreso + " - " + horario.hora_salida + '</option>';

  });




  document.getElementById("rol_u").innerHTML = rolesHTML;

  document.getElementById("cargo_u").innerHTML = cargosHTML;

  document.getElementById("coordinacion_u").innerHTML = coordinacionesHTML;

  document.getElementById("horario_u").innerHTML = horariosHTML;




  console.log(data)




}




function actualizarActividades(data) {

  let htmlActActs = `

  <div class='grid_form'>

  <div>

  <label for='id_a'>ID actividad</label>

  <input type="text" id='id_a' name="id_a" value="`+ data.id_actividad + `" required disabled>

  </div>




  <div>

  <label for='vusuario'>Usuario</label>

  <input type="text" id='vusuario' name="vusuario" value="`+ data.usuario + `" required disabled>

  </div>




  <div>

  <label for='n_actividad'>Nombre de la actividad</label>

  <input type="text" id='n_actividad' name="n_actividad" value="`+ data.nombre_actividad + `" required disabled>

  </div>




  <div>

  <label for='fecha_inicio'>Fecha inicio</label>

  <input type="text" id='fecha_inicio' name="fecha_inicio" value="`+ data.fecha_inicio + `" required disabled>

  </div>




  <div>

  <label for='fecha_fin'>Fecha fin</label>

  <input type="text" id='fecha_fin' name="fecha_fin" value="`+ data.fecha_fin + `" required>

  </div>




  <div>

  <label for='duracion'>Duración</label>

  <input type="text" id='duracion' name="duracion" value="" required disabled>

  </div>




  <div>

  <label for='unidad_medida'>Unidad de medida</label>

  <input type="text" id='unidad_medida' name="unidad_medida" value="`+ data.unidad_medida + `" required disabled>

  </div>




  <div>

  <label for='cantidad'>Cantidad</label>

  <input type="text" id='cantidad' name="cantidad" value="`+ data.cantidad + `" required>

  </div>




  <div>

  <label for='obs1F'>Observación 1</label>

  <input type="text" id='obs1F' name="obs1" value="`+ data.observacion1 + `" required>

  </div>

 

  <div>

  <label for='obs2F'>Observación 2</label>

  <input type="text" id='obs2F' name="obs2" value="`+ data.observacion2 + `" required>

  </div>

  </div>

  <div style='display: flex'>

    </br></br>

    <button onclick="window.modal.close()" class="sendform">Cerrar</button>

    <button class='sendform' id="btn_actualizar_act">Actualizar actividad</button>

  </div>

  `




  dspModal("Actualizar actividad", htmlActActs)




  document.getElementById("btn_actualizar_act").addEventListener("click", () => {

    let dataActs = {

      id_actividad: document.getElementById("id_a").value,

      usuario: document.getElementById("vusuario").value,

      fecha_inicio: document.getElementById("fecha_inicio").value,

      fecha_fin: document.getElementById("fecha_fin").value,

      unidad_medida: document.getElementById("unidad_medida").value,

      cantidad: document.getElementById("cantidad").value,

      obs1: document.getElementById("obs1F").value,

      obs2: document.getElementById("obs2F").value

    }




    if (confirm("¿Está segur@ de actualizar la actividad?")) {






      fetch("/actualizarActividad", {

        method: 'POST',

        headers: dataActs

      })

        .then(response => {

          if (response.ok) {

            if (response.status == 200) {

              alert("Actividad actualizada existosamente")

            } else {

              alert("Ya se inició esta actividad")

            }

          } else {

            alert("Ocurrió un error")

          }

        })

        .catch(error => {

          console.log("Error al realizar la solicitud:", error);

        });

      window.location.reload()

    }

  })





}




function createUser() {

  const data = {

    "id_usuario": document.getElementById("id_u").value,

    "primer_nombre": document.getElementById("pnombre_u").value,

    "segundo_nombre": document.getElementById("snombre_u").value,

    "primer_apellido": document.getElementById("papellido_u").value,

    "segundo_apellido": document.getElementById("sapellido_u").value,

    "rol": document.getElementById("rol_u").value,

    "cargo": document.getElementById("cargo_u").value,

    "coordinacion": document.getElementById("coordinacion_u").value,

    "horario": document.getElementById("horario_u").value,

    "contrasena": document.getElementById("contrasena").value

  }

  fetch("/createUser", {

    method: 'POST',

    headers: data

  })

  alert("usuario creado");

  window.location.reload()

}




function justificarAusencia(usr) {

  let htmlAusencias = `

  <div class='grid_form'>




  <div>

  <label for='vusuario'>Usuario</label>

  <input type="text" id='vusuarioAU' name="vusuario" value="`+ usr.usuario + `" required disabled>

  </div>

  <div>

  <label for='cantHJ'>Cantidad de horas de ausencia</label>

  <input type="number" id='cantidad_horas' name="cantHJ" required min="0" value="0">

  </div>

  </div>

  <div>

  <label for='descaus'>Descripción de ausencia</label>

  </br>

  <textarea id="descaus" style="width: 98%; heigth: 500px"  rows="10"></textarea>

  </div>

  </br>

  <div>

     

      <label for="confirmAusJ">Se agregará una actividad con el tiempo ingresado y con la marcación de ausencia justificada. </br></br>

      Conozco los cambios que realizará este ajuste y estoy segur@ de aplicar esta operación</label><input type="checkbox" id="confirmAusJ" name="confirmAusJ">

    </div>

 

  </br></br></br>

  <div style='display: flex'>

    </br></br>

    <button onclick="window.modal.close()" class="sendform">Cerrar</button>

    <button class='sendform' id="btn_justifica_ausencia">Justificar ausencia</button>

  </div>




 

  `




  dspModal("Justificar ausencias", htmlAusencias)




  document.getElementById("btn_justifica_ausencia").addEventListener("click", () => {

    if (confirm("¿Está segur@ de aplicar la novedad a este usuario?")) {

      let horas = Number(document.getElementById("cantidad_horas").value);

      let fechaActual = new Date();

      let fechaSalida = new Date();

      fechaSalida.setHours(fechaSalida.getHours() + 3);

      console.log(horas)



      fechaActual = fechaActual.getFullYear().toString().padStart(4, '0') + "-" +

        (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +

        fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +

        fechaActual.getMinutes().toString().padStart(2, '0') + ':' + fechaActual.getSeconds().toString().padStart(2, '0');



      fechaSalida = fechaSalida.getFullYear().toString().padStart(4, '0') + "-" +

        (fechaSalida.getMonth() + 1).toString().padStart(2, '0') + "-" +

        fechaSalida.getDate().toString().padStart(2, '0') + ' ' + fechaSalida.getHours().toString().padStart(2, '0') + ':' +

        fechaSalida.getMinutes().toString().padStart(2, '0') + ':' + fechaSalida.getSeconds().toString().padStart(2, '0');






      fetch("/justificarAusencia", {

        method: 'POST',

        headers: {

          usuario: document.getElementById("vusuarioAU").value,

          horas: document.getElementById("cantidad_horas").value,

          descripcion: document.getElementById("descaus").value,

          fecha_inicio: fechaActual,

          fecha_salida: fechaSalida,

          area: usr.area,

          cargo: usr.cargo

        }

      })

        .then(response => {

          if (response.ok) {

            if (response.status == 200) {

              alert("Ausencia justificada")

            } else {

              alert("Ya se inició esta actividad")

            }

          } else {

            alert("Ocurrió un error")

          }

        })

        .catch(error => {

          console.log("Error al realizar la solicitud:", error);

        });

      window.location.reload()

    }

  });

}




function actualizarCoordinacion(coor) {



  let htmlActCoor = `

  <div class='grid_form'>




  <div>

  <label for='nomCoor'>Nombre de la coordinación a crear</label>

  <input type="text" id='nomCoor' name="nomCoor" value="" required >

  </div>

 

  </br></br></br>

  <div style='display: flex'>

    </br></br>

    <button onclick="window.modal.close()" class="sendform">Cerrar</button>

    <button class='sendform' id="btn_crear_coordinacion">Crear coordinación</button>

  </div>

  `

  dspModal("Crear coordinación", htmlActCoor)




  document.getElementById("btn_crear_coordinacion").addEventListener("click", () => {

    let nombre_coordinacionF = document.getElementById("nomCoor").value;



    if (confirm("¿Está segur@ de crear la coordinación?")) {

      fetch("/crearCoordinacion", {

        method: 'POST',

        headers: {

          nombre_coordinacion: nombre_coordinacionF

        }

      })

        .then(response => {

          if (response.ok) {

            if (response.status == 200) {

              alert("Ausencia justificada")

            } else {

              alert("Ya se inició esta actividad")

            }

          } else {

            alert("Ocurrió un error")

          }

        })

        .catch(error => {

          console.log("Error al realizar la solicitud:", error);

        });

      window.location.reload()

    }

  })

}




function crearActividad() {

  let htmlCrtAct = `

  <div class='grid_form'>




  <div>

  <label for='nomAct'>Nombre de la actividad</label>

  <input type="text" id='nomAct' name="nomAct" value="" required >

  </div>

  </div>

  <label for='desAct'>Descripción de la actividad</label>

  <textarea id="desAct" style="width: 98%; heigth: 500px"  rows="10"></textarea>

  </br></br>

  <div class='grid_form'>




  <div>

  <label for='uniM'>Unidad de medida</label>

  <input type="text" id='uniM' name="uniM" value="" required >

  </div>

  </div>

  </br></br></br>

  <div style='display: flex'>

    </br></br>

    <button onclick="window.modal.close()" class="sendform">Cerrar</button>

    <button class='sendform' id="btn_crear_actividad">Crear actividad</button>

  </div>

  `




  dspModal("Crear actividad", htmlCrtAct)




  document.getElementById("btn_crear_actividad").addEventListener("click", () => {

    if (confirm("¿Está segur@ de crear esta actividad?")) {

      let nomActC = document.getElementById("nomAct").value,

        desActC = document.getElementById("desAct").value,

        uniMC = document.getElementById("uniM").value;




      fetch("/crearActividad", {

        method: 'POST',

        headers: {

          nombre_actividad: nomActC,

          descripcion_actividad: desActC,

          unidad_medida: uniMC

        }

      })

        .then(response => {

          if (response.ok) {

            if (response.status == 200) {

              alert("Actividad creada")

            } else {

              alert("Ocurrió un error")

            }

          } else {

            alert("Ocurrió un error")

          }

        })

        .catch(error => {

          console.log("Error al realizar la solicitud:", error);

        });




      console.log({

        nombre_actividad: nomActC,

        descripcion_actividad: desActC,

        unidad_medida: uniMC

      })

      window.location.reload()

    }

  })

}

function confActCoor() {
  let htmlConfActCoor = `

  <div class='grid_form'>




  <div>

  <label for='nomAct'>Nombre de la actividad</label>

  <input type="text" id='nomAct' name="nomAct" value="" required >

  </div>

  </div>

  <label for='desAct'>Descripción de la actividad</label>

  <textarea id="desAct" style="width: 98%; heigth: 500px"  rows="10"></textarea>

  </br></br>

  <div class='grid_form'>




  <div>

  <label for='uniM'>Unidad de medida</label>

  <input type="text" id='uniM' name="uniM" value="" required >

  </div>

  </div>

  </br></br></br>

  <div style='display: flex'>

    </br></br>

    <button onclick="window.modal.close()" class="sendform">Cerrar</button>

    <button class='sendform' id="btn_crear_actividad">Agregar</button>

  </div>

  `

  dspModal("Configurar coordinaciones de las actividades", htmlConfActCoor)


}



btnCrearUsuarioM.addEventListener("click", () => {
  ModalCreateUser()
})

actCoorD()