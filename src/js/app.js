import { NoteController } from './controllers/NoteController.js';

document.addEventListener('DOMContentLoaded', () => {
    const controller = new NoteController();

    const homeButton = document.getElementById('home-button');
    homeButton.addEventListener('click', () => {
        controller.noteView.showNoteList(); // Usa la referencia de la vista desde el controlador
        controller.loadNotes(); // Recarga la lista de notas
    });
});



























/* const sampleNotes = [
    {
        id: crypto.randomUUID(),
        name: "Aprendiendo JavaScript",
        content: "JavaScript es un lenguaje de programación versátil y poderoso. Se usa tanto en el frontend como en el backend, gracias a tecnologías como Node.js. Aprenderlo bien puede abrir muchas oportunidades en el mundo del desarrollo web.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Mis metas para este año",
        content: "Este año quiero mejorar mis habilidades en desarrollo web, aprender más sobre arquitectura de software y contribuir en proyectos open source. También me gustaría crear una aplicación que realmente ayude a las personas en su día a día.",
        favorite: true,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo mejorar la productividad",
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones, establecer objetivos diarios y usar herramientas como Notion o Trello para organizar tareas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    }
];

// Guardar en localStorage
localStorage.setItem("notes", JSON.stringify(sampleNotes));

console.log("Notas de ejemplo guardadas en localStorage.");
 */