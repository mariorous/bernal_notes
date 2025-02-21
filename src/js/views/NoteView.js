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
            created.textContent = `📅 Created at: ${note.creationDate}`;
            dateDiv.append(created);
            const modified = document.createElement('span');
            modified.textContent = `✏️ Last updated: ${note.modificationDate}`;
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
            const notes = StorageService.getNotes();
            console.log(notes);

            const exists = notes.some(n => n.id === note.id); // Verifica si la nota ya existe

            if (!exists) {
                StorageService.addNote(note); // Solo agrega si NO existe
                console.log('Añadir nota:', note);
            } else {
                notes.forEach(n => {
                    if (n.id === note.id) {
                        n.name = this.fullNoteView.querySelector('.full-note-title').value;
                        StorageService.editNote(n);
                        console.log('Editar nota:', n);
                    }     
                });
            }

        });
        
        this.fullNoteView.querySelector('.full-note-content').addEventListener('input', () => {
            note.content = this.fullNoteView.querySelector('.full-note-content').value;
            StorageService.editNote(note);
            console.log('Editar nota:', note);
        });
    }

    showNoteList() {
        this.fullNoteView.style.display = 'none'; // Ocultar la nota completa
        this.noteList.style.display = 'flex'; // Mostrar la lista de notas
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
