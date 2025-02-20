import { Note } from '../models/Note.js';

export class StorageService {
    static #storage = localStorage;

    // Añade las notas al localStorage con su clave 'notes'
    static setNotes(notes) {
        this.#storage.setItem('notes', JSON.stringify(notes)); // Convierte a JSON aquí
    }    

    static getNotes() {
        // Verificar si existe 'items' en el localStorage
        const notesFromStorage = JSON.parse(this.#storage.getItem('notes')) || [];

        // Si el localStorage está vacío, inicializarlo como un arreglo vacío
        if (!notesFromStorage.length) {
            this.#storage.setItem('notes', JSON.stringify([]));
        }
        // Convierte los objetos a instancias
        const notes = notesFromStorage.map(noteData => {
            return new Note(
                noteData.id,
                noteData.name,
                noteData.content,
                noteData.favorite,
                noteData.trash,
                noteData.creationDate,
                noteData.modificationDate,
            );
        });

        return notes;
    }

    static addNote(note) {
        const notes = this.getNotes();
        notes.push(note);
        this.setNotes(notes);
    }

    static editNote(updatedNote) {
        let notes = this.getNotes();
    
        notes = notes.map(note => {
            if (note.id === updatedNote.id) {
                // Actualizar la fecha de modificación en el objeto actualizado
                updatedNote.modificationDate = new Date().toISOString().replace("T", " ").substring(0, 19);
                return updatedNote; // Devuelve la nota actualizada
            }
            return note;
        });
    
        this.setNotes(notes);
    }

    static trashNote(id) {
        let notes = this.getNotes();
        notes = notes.map(note => {
            if (note.id === id) {
                note.trash = true;
                return note;
            }
            return note;
        });
        this.setNotes(notes);
    }

    static favoriteNote(id) {
        let notes = this.getNotes();
        notes = notes.map(note => {
            if (note.id === id) {
                note.favorite = !note.favorite;
                return note;
            }
            return note;
        });
        this.setNotes(notes);
    }

    static deleteNote(id) {
        let notes = this.getNotes();
        notes = notes.filter(note => note.id !== id);
        this.setNotes(notes);
    }
    

    // Método para obtener la fecha actual en formato legible
    static getCurrentDate() {
        const now = new Date();
        return now.toISOString().replace("T", " ").substring(0, 19); // Formato: "YYYY-MM-DD HH:mm:ss"
    }


    static clear() {
        this.#storage.clear();
    }
    
}