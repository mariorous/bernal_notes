import { StorageService } from '../services/StorageService.js';

export class NoteView {
    constructor() {
        this.app = document.getElementById('app');
        this.welcome = this._createWelcome();
        this.noteList = this._createNoteList();
        this.fullNoteView = this._createFullNoteView(); // Contenedor para la nota completa
        this.app.append(this.welcome, this.noteList, this.fullNoteView);

        // Creamos versiones vinculadas de los manejadores
        this.titleInputHandler = this.handleTitleInput.bind(this);
        this.contentInputHandler = this.handleContentInput.bind(this);
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
        let user = localStorage.getItem('loggedUser');
        user = user.charAt(0).toLocaleUpperCase() + user.slice(1); // Convertir a mayúscula la primera letra del usuario
        welcomeTitle.textContent = `${user}'s Home`;
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

    displayNotes(notes, category, search) {
        this.noteList.innerHTML = '';
        
        let notesToShow;

        switch(category) {
            case 'favorites':
                notesToShow = notes.filter(note => note.favorite === true);
                break;
            case 'trash':
                notesToShow = notes.filter(note => note.trash === true);
                break;
            default:
                notesToShow = notes.filter(note => note.trash === false);
                break;
        }

        if (notesToShow.length === 0) {
            const noNotes = document.createElement('div');
            noNotes.classList.add('no-notes');
        
            const icon = document.createElement('i');
            icon.classList.add('fa', 'fa-sticky-note'); // Icono de FontAwesome
        
            const message = document.createElement('p');
            message.textContent = 'No notes found';
            
            const advice = document.createElement('span');
            advice.textContent = 'Try using a diferent keyword or filter.';
        
            noNotes.append(icon, message, advice);
            this.noteList.append(noNotes);
            return;
        }
        
        
        notesToShow.forEach(note => {
            const noteContainer = document.createElement('div');
            noteContainer.classList.add('note');
            noteContainer.setAttribute('data-id', note.id); // Agregar un atributo de ID para referencia

            const cardPreview = document.createElement('div');
            cardPreview.classList.add('card-preview');

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
            created.textContent = `📅 Created: ${note.creationDate}`;
            dateDiv.append(created);
            const modified = document.createElement('span');
            modified.textContent = `✏️ Updated: ${note.modificationDate}`;
            dateDiv.append(modified);
            
            const favoriteButton = document.createElement('button');
            favoriteButton.classList.add('favorite-button');
            if (note.favorite) {
                favoriteButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
            } else {
                favoriteButton.innerHTML = '<i class="fa-regular fa-heart"></i>';
            }
            favoriteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Evitar que el clic en el botón se propague
                this.onFavoriteNote(note.id);
            });
            
            // Botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Evitar que el clic en el botón se propague
                this.onDeleteNote(note.id);
            });
            
            nameDiv.append(favoriteButton);
            cardPreview.append(nameDiv, contentDiv);
            footerDiv.append(dateDiv, deleteButton);
            noteContainer.append(cardPreview, footerDiv);
            this.noteList.append(noteContainer);

            // Agregar evento para abrir la nota completa al hacer clic en la nota
            noteContainer.addEventListener('click', () => this.showFullNoteView(note));
        });
    }

    handleTitleInput(event) {
        const notes = StorageService.getNotes();
        const noteId = this.currentNoteId;
        
        const foundNote = notes.find(note => note.id === noteId);
        if (foundNote) {
            foundNote.name = event.target.value;
            foundNote.modificationDate = new Date().toISOString().replace("T", " ").substring(0, 19);
            StorageService.editNote(foundNote);
        }
    }

    handleContentInput(event) {
        const notes = StorageService.getNotes();
        const noteId = this.currentNoteId;
        
        const foundNote = notes.find(note => note.id === noteId);
        if (foundNote) {
            foundNote.content = event.target.value;
            foundNote.modificationDate = new Date().toISOString().replace("T", " ").substring(0, 19);
            StorageService.editNote(foundNote);
        }
    }

    showFullNoteView(note) {
        this.currentNoteId = note.id;
        this.fullNoteView.style.display = 'block';
        this.noteList.style.display = 'none';
        this.welcome.style.display = 'none';
        
        const titleInput = this.fullNoteView.querySelector('.full-note-title');
        const contentInput = this.fullNoteView.querySelector('.full-note-content');
        
        // Eliminar listeners existentes
        titleInput.removeEventListener('input', this.titleInputHandler);
        contentInput.removeEventListener('input', this.contentInputHandler);
        
        // Establecer valores y placeholders
        titleInput.value = note.name || '';
        contentInput.value = note.content || '';
        titleInput.placeholder = 'New Note';
        contentInput.placeholder = 'Start writing here...';
        
        // Actualizar fechas
        this.fullNoteView.querySelector('.created-at').textContent = `📅 Created at: ${note.creationDate}`;
        this.fullNoteView.querySelector('.modified-at').textContent = `✏️ Last updated: ${note.modificationDate}`;

        // Ajustar altura
        this.adjustTextareaHeight(contentInput);
        
        // Añadir nuevos listeners
        titleInput.addEventListener('input', this.titleInputHandler);
        contentInput.addEventListener('input', this.contentInputHandler);
        
        // Añadir botón para volver a la lista si no existe
        if (!this.backButton) {
            this.backButton = document.createElement('button');
            this.backButton.classList.add('back-button');
            this.backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Volver';
            this.backButton.addEventListener('click', () => {
                this.showNoteList();
            });
            this.fullNoteView.insertBefore(this.backButton, this.fullNoteView.firstChild);
        }

        // Enfocar el título automáticamente
        titleInput.focus();
    }

    showNoteList() {
        this.fullNoteView.style.display = 'none';
        this.noteList.style.display = 'flex';
        this.welcome.style.display = 'block';
        this.displayNotes(StorageService.getNotes());
    }

    onDeleteNote(id) {
        if (confirm('¿Estás seguro de que quieres borrar esta nota?')) {
            const notes = StorageService.getNotes();
            const noteToDelete = notes.find(note => note.id === id);
            
            if (noteToDelete.trash === true) {
                StorageService.deleteNote(id);
                this.displayNotes(StorageService.getNotes(),'trash');
            } else {
                if (noteToDelete.favorite) {
                    if (confirm('Estas eliminando una nota favorita, ¿estás seguro?')) {
                        StorageService.favoriteNote(id);
                        StorageService.trashNote(id);
                        this.displayNotes(StorageService.getNotes());
                    }
                } else {
                    StorageService.trashNote(id);
                    this.displayNotes(StorageService.getNotes());
                }
                
            }
            
        }
    };

    onFavoriteNote(id) {
        const notes = StorageService.getNotes();
        const noteToFavorite = notes.find(note => note.id === id);

        if (!noteToFavorite.trash) {
            StorageService.favoriteNote(id);
            this.displayNotes(StorageService.getNotes());
        }
    }
}
