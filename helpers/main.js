require("colors");

const Tareas = require("../models/tareas");
const { guardarDB, leeDB } = require("../helpers/guardar-archivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listaParaBorrar,
  confirmarConsulta,
  completarTareas
} = require("../helpers/inquirer");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  const tareasDB = leeDB();

  if (tareasDB) {
    tareas.cargarTareas(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1": //Crear tarea
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);

        break;
      case "2": //Listar tareas
        tareas.listaCompleta();
        break;
      case "3": //Listar tareas completadas
        tareas.listarPendientesCompletadas();
        break;
      case "4": //Listar tareas pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case "5": //Completar tareas
        const ids = await completarTareas(tareas.listadoArr)
        tareas.tareasCompletadas( ids )
        break;
      case "6": //Borrar tareas
        const id = await listaParaBorrar(tareas.listadoArr);

        if (id !== "0") {

          const ok = await confirmarConsulta("Esta seguro?");

          if (ok) {
            tareas.borrarTarea(id);
            console.log();
            console.log(" tarea borrada".red);
          }
        }

        break;

      default:
        break;
    }
    guardarDB(tareas.listadoArr);

    if (opt != "0") await pausa();
  } while (opt != "0");
};

module.exports = { 
    main
}
