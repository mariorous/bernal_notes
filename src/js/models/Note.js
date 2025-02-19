export class Note {
    id;
    title;
    content;
    createdAt;

    constructor() {
        this.id = Date.now();
        this.title = '';
        this.content = '';
        this.createdAt = new Date().toLocaleString();
        
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    }

    addNote(content) {
        const note = { 
            id: Date.now(), // Genera una ID númerica para cada nota a partir de la fecha actual
            title,
            content,
            createdAt: new Date().toLocaleString(),
            };
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