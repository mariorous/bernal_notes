import { Note } from '../models/Note.js';
import { NoteView } from '../views/NoteView.js';
import { StorageService } from '../services/StorageService.js';

export class NoteController {
    constructor() {
        this.noteView = new NoteView();

        // Cargar notas desde el almacenamiento y mostrarlas en la interfaz
        this.loadNotes();
    }

    newNote() {
        const note = new Note();
        note.name = '';
        note.content = '';
        this.noteView.showFullNoteView(note);
    }

    loadNotes() {
        const notes = StorageService.getNotes();
        this.noteView.displayNotes(notes);
    }

    getNotes() {
        return StorageService.getNotes();
    }

    saveNotes() {
        const notes = StorageService.getNotes();
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}
