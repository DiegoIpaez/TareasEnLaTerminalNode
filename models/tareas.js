const Tarea = require("./tarea");
require("colors");

class Tareas {
  listado = {};

  get listadoArr() {
    const lista = [];

    //Extraigo todas la llaves y creo un arreglo
    Object.keys(this.listado).forEach((key) => {
      const tarea = this.listado[key];
      lista.push(tarea);
    });

    return lista;
  }

  constructor() {
    this.listado = {};
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this.listado[tarea.id] = tarea;
  }

  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this.listado[tarea.id] = tarea;
    });
  }

  listaCompleta() {
    console.log();

    this.listadoArr.forEach((tarea, i) => {
      const { desc, completadoEn } = tarea;
      const uid = `${i + 1}`;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;

      console.log(`${uid.green} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completado = true) {
    console.log();
    let count = 0;

    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;

      const estado = completadoEn ? "Completado".green : "Pendiente".red;

      if (completado) {
        if (completadoEn) {
          count += 1;
          console.log(
            `${count.toString().green}. ${desc} :: ${completadoEn.green}`
          );
        }
      } else {
        if (!completadoEn) {
          count += 1;
          console.log(`${count.toString().green}. ${desc} :: ${estado}`);
        }
      }
    });
  }

  tareasCompletadas(ids = []) {

    //Le asignomas la fecha de completado
    ids.forEach((id) => {
      const tarea = this.listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    //le asignamos el pendiente
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this.listado[tarea.id].completadoEn = null;
      }
    });
  }

  borrarTarea(id = "") {
    if (this.listado[id]) {
      delete this.listado[id];
    }
  }
}

module.exports = Tareas;
