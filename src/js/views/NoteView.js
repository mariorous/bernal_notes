import { StorageService } from '../services/StorageService.js';

export class NoteView {
    constructor() {
        this.app = document.getElementById('app');
        this.welcome = this._createWelcome();
        this.noteList = this._createNoteList();
        this.fullNoteView = this._createFullNoteView(); // Contenedor para la nota completa
        this.app.append(this.welcome, this.noteList, this.fullNoteView);
    }

    _createNoteList() {
        const noteList = document.createElement('div');
        noteList.classList.add('note-list');
        return noteList;
    }

    _createWelcome() {
        const welcome = document.createElement('div');
        welcome.classList.add('welcome');
        const welcomeText = document.createElement('span');
        welcomeText.textContent = 'Ready to start taking notes?';
        const welcomeTitle = document.createElement('h1');
        welcomeTitle.textContent = 'Bernal\'s Home';
        welcome.append(welcomeText, welcomeTitle);

        return welcome;
    }

    _createFullNoteView() {
        const fullNoteView = document.createElement('div');
        fullNoteView.classList.add('full-note-view');
        fullNoteView.style.display = 'none'; // Ocultar por defecto

        // Contenedor del título y fechas
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');

        // Elementos para mostrar la nota
        const titleInput = document.createElement('textarea');
        titleInput.classList.add('full-note-title');
        
        // Contenedor de fechas alineado a la derecha
        const dateContainer = document.createElement('div');
        dateContainer.classList.add('date-container');
        
        const createdAt = document.createElement('span');
        createdAt.classList.add('created-at');
        const modifiedAt = document.createElement('span');
        modifiedAt.classList.add('modified-at');
        
        dateContainer.append(createdAt, modifiedAt);
        titleContainer.append(titleInput, dateContainer);

        const contentTextarea = document.createElement('textarea');
        contentTextarea.classList.add('full-note-content');
        
        // Ajustar altura del textarea
        titleInput.addEventListener('input', () => {
            this.adjustTextareaHeight(titleInput);
        });

        // Ajustar altura del textarea
        contentTextarea.addEventListener('input', () => {
            this.adjustTextareaHeight(contentTextarea);
        });

        // Agregar elementos al contenedor
        fullNoteView.append(titleContainer, contentTextarea);

        return fullNoteView;
    }

    // Función para ajustar la altura del textarea
    adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto'; // Reiniciar la altura
        textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar a la altura del contenido
    }

    displayNotes(notes) {
        this.noteList.innerHTML = '';
    
        notes.forEach(note => {
            const noteContainer = document.createElement('div');
            noteContainer.classList.add('note');
            noteContainer.setAttribute('data-id', note.id); // Agregar un atributo de ID para referencia

            // Título
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('note-name');
            nameDiv.textContent = note.name;

            // Contenido
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('note-content');
            contentDiv.textContent = note.content;

            // Fechas
            const footerDiv = document.createElement('div');
            footerDiv.classList.add('note-footer');

            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date-div');
            const created = document.createElement('span');
            created.textContent = `📅 Created at: ${note.creationDate}`;
            dateDiv.append(created);
            const modified = document.createElement('span');
            modified.textContent = `✏️ Last updated: ${note.modificationDate}`;
            dateDiv.append(modified);

            // Botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Evitar que el clic en el botón se propague
                this.onDeleteNote(note.id);
            });

            footerDiv.append(dateDiv, deleteButton);
            noteContainer.append(nameDiv, contentDiv, footerDiv);
            this.noteList.append(noteContainer);

            // Agregar evento para abrir la nota completa al hacer clic en la nota
            noteContainer.addEventListener('click', () => this.showFullNoteView(note));
        });
    }

    showFullNoteView(note) {
        // Mostrar el contenedor de la nota completa
        this.fullNoteView.style.display = 'block';
        this.noteList.style.display = 'none'; // Ocultar la lista de notas
        
        // Cargar datos de la nota en los inputs
        this.fullNoteView.querySelector('.full-note-title').value = note.name;
        this.fullNoteView.querySelector('.full-note-content').value = note.content;
        this.fullNoteView.querySelector('.created-at').textContent = `📅 Created at: ${note.creationDate}`;
        this.fullNoteView.querySelector('.modified-at').textContent = `✏️ Last updated: ${note.modificationDate}`;

        // Ajustar altura del textarea
        this.adjustTextareaHeight(this.fullNoteView.querySelector('.full-note-content'));

        // Guardar automáticamente al escribir
        this.fullNoteView.querySelector('.full-note-title').addEventListener('input', () => {
            note.name = this.fullNoteView.querySelector('.full-note-title').value;
            StorageService.editNote(note);
        });
        
        this.fullNoteView.querySelector('.full-note-content').addEventListener('input', () => {
            note.content = this.fullNoteView.querySelector('.full-note-content').value;
            StorageService.editNote(note);
        });
    }

    showNoteList() {
        this.fullNoteView.style.display = 'none'; // Ocultar la nota completa
        this.noteList.style.display = 'flex'; // Mostrar la lista de notas
    }

    onDeleteNote(id) {
        console.log('Borrando nota con ID:', id);
        StorageService.deleteNote(id);
    };
}
