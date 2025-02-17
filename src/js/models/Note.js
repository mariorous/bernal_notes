export class Note {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    }

    addNote(content) {
        const note = { id: Date.now(), content };
        this.notes.push(note);
        this._commit();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this._commit();
    }

    getNotes() {
        return this.notes;
    }

    _commit() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}