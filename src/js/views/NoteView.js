export class NoteView {
    constructor() {
        this.app = document.getElementById('app');
        this.form = this._createForm();
        this.noteList = this._createNoteList();
        this.app.append(this.form, this.noteList);
    }

    _createForm() {
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Escribe una nota...';
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Crear Nota';
        form.append(input, submitButton);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (input.value.trim()) {
                this.onAddNote(input.value);
                input.value = '';
            }
        });

        return form;
    }

    _createNoteList() {
        return document.createElement('ul');
    }

    displayNotes(notes) {
        this.noteList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.content;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => this.onDeleteNote(note.id));
            li.append(deleteButton);
            this.noteList.append(li);
        });
    }

    bindAddNote(handler) {
        this.onAddNote = handler;
    }

    bindDeleteNote(handler) {
        this.onDeleteNote = handler;
    }
}