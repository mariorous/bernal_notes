import { Note } from '../models/Note.js';
import { NoteView } from '../views/NoteView.js';
import { StorageService } from '../services/StorageService.js';

export class NoteController {
    constructor() {
        this.noteView = new NoteView();
        this.loadNotes();
    }

    newNote() {
        // Crear nueva nota con valores iniciales
        const note = new Note(
            null,  // id será generado automáticamente
            '',    // nombre vacío
            '',    // contenido vacío
            false, // no favorita
            false  // no en papelera
        );
        
        // Mostrar la nota para edición
        this.noteView.showFullNoteView(note);
        
        // Guardar la nota en el storage
        StorageService.addNote(note);
        
        return note;
    }

    loadNotes() {
        const notes = StorageService.getNotes();
        this.noteView.displayNotes(notes, window.currentSection);
    }

    getNotes() {
        return StorageService.getNotes();
    }
}