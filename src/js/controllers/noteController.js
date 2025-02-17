import { Note } from '../models/Note.js';
import { NoteView } from '../views/NoteView.js';

export class NoteController {
    constructor() {
        this.noteModel = new Note();
        this.noteView = new NoteView();

        // Vincular eventos de la vista con los manejadores del controlador
        this.noteView.bindAddNote(this.handleAddNote.bind(this));
        this.noteView.bindDeleteNote(this.handleDeleteNote.bind(this));

        // Cargar notas desde el almacenamiento y mostrarlas en la interfaz
        this.loadNotes();
    }

    loadNotes() {
        const notes = this.noteModel.getNotes();
        this.noteView.displayNotes(notes);
    }

    handleAddNote(content) {
        this.noteModel.addNote(content);
        this.loadNotes(); // Recargar las notas en la vista
    }

    handleDeleteNote(id) {
        this.noteModel.deleteNote(id);
        this.loadNotes(); // Recargar las notas en la vista
    }
}
