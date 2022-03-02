const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: "1.".green + " Crear tarea",
      },
      {
        value: "2",
        name: "2.".green + " Listar tarea",
      },
      {
        value: "3",
        name: "3.".green + " Listar tareas completadas",
      },
      {
        value: "4",
        name: "4.".green + " Listar tareas pendientes",
      },
      {
        value: "5",
        name: "5.".green + " Completar tareas",
      },
      {
        value: "6",
        name: "6.".green + " Borrar tarea",
      },
      {
        value: "0",
        name: "0.".green + " Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.log("==========================".green);
  console.log("  Selecione una opcion ".white);
  console.log("==========================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ENTER" para continuar`,
    },
  ];

  console.log("\n");

  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }

        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const listaParaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const uid = `${i + 1}`;

    return {
      value: tarea.id,
      name: `${uid.green}. ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Canselar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const confirmarConsulta = async (mensaje) => {
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      mensaje,
    },
  ];

  const { ok } = await inquirer.prompt(pregunta);

  return ok;
};

const completarTareas = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const uid = `${i + 1}`;

    return {
      value: tarea.id,
      name: `${uid.green}. ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);

  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listaParaBorrar,
  confirmarConsulta,
  completarTareas,
};
