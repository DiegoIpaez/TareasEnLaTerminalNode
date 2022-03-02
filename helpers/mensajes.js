require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {

    console.log("==========================".green);
    console.log("  Seleciones una opcion ".green);
    console.log("==========================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opcion: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar`, (opt) => {
      readline.close();
      resolve();
    });
  });
};


const menu = async () => {
 
    let opt = "";
  
    do {
      opt = await mostrarMenu();
      console.log({ opt });
  
      if (opt !== "0") await pausa();
    } while (opt != "0");
  };


module.exports = { menu };
