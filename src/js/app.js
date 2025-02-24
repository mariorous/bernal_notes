import { NoteController } from './controllers/NoteController.js';
import { Auth } from './services/Auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = new Auth();
    const app = document.getElementById("app");

    function renderLogin() {
        app.innerHTML = `
            <div class="auth-container">
                <form id="login-form">
                    <h2>Login</h2>
                    <input type="text" id="login-username" placeholder="Usuario" />
                    <input type="password" id="login-password" placeholder="Contraseña" />
                    <div id="login-errors"></div>
                    <button id="login-btn">Iniciar sesión</button>
                    <p>No tienes cuenta? <a href="#" id="go-register">Regístrate</a></p>
                </form>
            </div>
        `;
        document.querySelector('.sidebar').style.display = 'none';

        document.getElementById("login-form").addEventListener("submit", (event) => {
            event.preventDefault(); // Evitar que se envíe el formulario
        
            const usernameInput = document.getElementById("login-username");
            const passwordInput = document.getElementById("login-password");
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            let errors = [];
        
            // Validación del nombre de usuario
            if (username === "") {
                errors.push("El nombre de usuario no puede estar vacío.");
                usernameInput.classList.add("input-error");
            } else {
                usernameInput.classList.remove("input-error");
            }
        
            // Validación de la contraseña
            if (password === "") {
                errors.push("La contraseña no puede estar vacía.");
                passwordInput.classList.add("input-error");
            } else {
                passwordInput.classList.remove("input-error");
            }
        
            // Mostrar errores si hay alguno
            const errorContainer = document.getElementById("login-errors");
            errorContainer.innerHTML = ""; // Limpiar mensajes previos
            if (errors.length > 0) {
                errors.forEach(error => {
                    const errorElement = document.createElement("p");
                    errorElement.textContent = error;
                    errorElement.classList.add("error-message");
                    errorContainer.appendChild(errorElement);
                });
                return;
            }
        
            // Intentar iniciar sesión
            if (auth.login(username, password)) {
                document.querySelector('.auth-container').style.display = 'none';
                renderApp();
            } else {
                errorContainer.innerHTML = "<p class='error-message'>Usuario o contraseña incorrectos.</p>";
            }
        });
        

        document.getElementById("go-register").addEventListener("click", renderRegister);
    }

    function renderRegister() {
        app.innerHTML = `
            <div class="auth-container">
                <form id="register-form">
                    <h2>Registro</h2>
                    <input type="text" id="register-username" placeholder="Usuario" />
                    <input type="password" id="register-password" placeholder="Contraseña" />
                    <div id="register-errors"></div>
                    <button id="register-btn">Registrarse</button>
                    <p>Ya tienes cuenta? <a href="#" id="go-login">Inicia sesión</a></p>
                </form>
            </div>
        `;

        document.getElementById("register-form").addEventListener("submit", (event) => {
            event.preventDefault(); // Evitar que se envíe el formulario
        
            const usernameInput = document.getElementById("register-username");
            const passwordInput = document.getElementById("register-password");
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            let errors = [];
        
            // Validación del nombre de usuario
            if (username === "") {
                errors.push("El nombre de usuario no puede estar vacío.");
                usernameInput.classList.add("input-error");
            } else {
                usernameInput.classList.remove("input-error");
            }
        
            // Validación de la contraseña
            if (password.length < 6) {
                errors.push("La contraseña debe tener al menos 6 caracteres.");
                passwordInput.classList.add("input-error");
            } else {
                passwordInput.classList.remove("input-error");
            }
        
            // Mostrar errores si hay alguno
            const errorContainer = document.getElementById("register-errors");
            errorContainer.innerHTML = ""; // Limpiar mensajes previos
            if (errors.length > 0) {
                errors.forEach(error => {
                    const errorElement = document.createElement("p");
                    errorElement.textContent = error;
                    errorElement.classList.add("error-message");
                    errorContainer.appendChild(errorElement);
                });
                return;
            }
        
            // Si no hay errores, proceder con el registro
            const message = auth.register(username, password);
            alert(message);
            if (message.includes("exitoso")) renderLogin();
        });
        

        document.getElementById("go-login").addEventListener("click", renderLogin);
    }

    function renderApp() {
        document.querySelector('.sidebar').style.display = 'flex';
        

        const controller = new NoteController();
        window.currentSection = 'home';

        document.addEventListener("keydown", function (event) {
            if (event.ctrlKey && event.key === "k") {
                // Se usa un setTimeout para mantener activo Ctrl + K, evitando que el listener se pierda al editar o crear notas.
                setTimeout(() => {  // Pequeña espera en caso de que la UI esté cambiando
                    const searchInput = document.querySelector(".search");
                    if (searchInput) {
                        searchInput.focus(); // Enfoca solo si el input existe en el DOM
                    }
                }, 50);
            }
        });
        

        const homeButton = document.getElementById('home-button');
        homeButton.addEventListener('click', () => {
            currentSection = 'home';
            controller.noteView.showNoteList(); // Usa la referencia de la vista desde el controlador
            controller.loadNotes(); // Recarga la lista de notas
        });

        const trashButton = document.getElementById('trash-button');
        trashButton.addEventListener('click', () => {
            currentSection = 'trash';
            const notes = controller.getNotes();
            controller.noteView.displayNotes(notes, 'trash');
        });

        const favoriteButton = document.getElementById('favorite-button');
        favoriteButton.addEventListener('click', () => {
            currentSection = 'favorites';
            const notes = controller.getNotes();
            controller.noteView.displayNotes(notes, 'favorites');
        });

        const search = document.querySelector('.search');
        search.addEventListener('input', () => {
            const notes = controller.getNotes();
            const filteredNotes = notes.filter(note => note.name.toLowerCase().includes(search.value.toLowerCase()));
            controller.noteView.displayNotes(filteredNotes, currentSection);
        });

        const addNoteButton = document.getElementById('add-note-button');
        addNoteButton.addEventListener('click', () => {
            controller.newNote();
            document.querySelector('.full-note-title').placeholder = 'New Note';
            document.querySelector('.full-note-content').placeholder = 'Start writing here...';
            document.querySelector('.full-note-title').focus();
        });

        document.getElementById("logout-btn").addEventListener("click", () => {
            auth.logout();
            renderLogin();
        });
    }

    auth.isAuthenticated() ? renderApp() : renderLogin();
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
        content: "La clave para ser más productivo es gestionar bien el tiempo. Algunas estrategias incluyen la técnica Pomodoro, eliminar distracciones y establecer objetivos diarios.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Hábitos para un día exitoso",
        content: "Levantarse temprano, hacer ejercicio, leer algo nuevo y planificar el día pueden marcar una gran diferencia en la productividad y el bienestar.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Aprendiendo sobre inversiones",
        content: "Invertir no es solo para expertos. Empezar con educación financiera y conocer instrumentos como ETFs, acciones y fondos de inversión puede ayudar a mejorar nuestras finanzas.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Consejos para mejorar en programación",
        content: "Practicar todos los días, contribuir a proyectos open source y leer documentación oficial son algunas formas de mejorar como programador.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Beneficios del ejercicio diario",
        content: "Hacer ejercicio regularmente ayuda a mejorar la salud física y mental, aumentando la energía y reduciendo el estrés.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Libros recomendados este año",
        content: "Algunos libros recomendados incluyen 'Atomic Habits', 'Deep Work' y 'El poder del ahora'. Todos ofrecen valiosas lecciones para el desarrollo personal y profesional.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cocinando platos saludables",
        content: "Incluir más verduras, proteínas magras y evitar los azúcares añadidos es clave para una alimentación balanceada.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Viajes que quiero hacer",
        content: "Me gustaría viajar a Japón, Noruega y Perú. Cada destino tiene algo especial que me llama la atención, desde su cultura hasta su naturaleza.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Cómo organizar mejor mi día",
        content: "Utilizar un planificador, establecer prioridades y hacer descansos programados ayuda a mantener un buen balance entre trabajo y vida personal.",
        favorite: false,
        trash: false,
        creationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
        modificationDate: new Date().toISOString().replace("T", " ").substring(0, 19)
    },
    {
        id: crypto.randomUUID(),
        name: "Aprendiendo un nuevo idioma",
        content: "Aprender un idioma requiere constancia. Usar aplicaciones, practicar con hablantes nativos y ver contenido en el idioma puede acelerar el proceso.",
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