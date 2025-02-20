export class Note {
    #id
    #name
    #content
    #favorite
    #trash
    #creationDate
    #modificationDate

    constructor(id = null, name, content, favorite = false, trash = false, creationDate = null, modificationDate = null) {
        this.id = id ?? `${this.getCurrentDate()}-${name}`; // Mantener ID si ya existe
        this.name = name;
        this.content = content;
        this.favorite = favorite;
        this.trash = trash;
        this.creationDate = creationDate ?? this.getCurrentDate(); // Mantener si existe
        this.modificationDate = modificationDate ?? this.getCurrentDate(); // Mantener si existe
    }
    
    // Método para obtener la fecha actual en formato legible
    getCurrentDate() {
        const now = new Date();
        return now.toISOString().replace("T", " ").substring(0, 19); // Formato: "YYYY-MM-DD HH:mm:ss"
    }


    toJSON() {
        let toJson = {
            id: this.id,
            name: this.name,
            content: this.content,
            favorite: this.favorite,
            trash: this.trash,
            creationDate: this.creationDate,
            modificationDate: this.modificationDate
        };

        return toJson;
    }

    set id(id) {
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    set name(name) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    set content(content) {
        this.#content = content;
    }

    get content() {
        return this.#content;
    }

    set favorite(favorite) {
        this.#favorite = favorite;
    }

    get favorite() {
        return this.#favorite;
    }

    set trash(trash) {
        this.#trash = trash;
    }

    get trash() {
        return this.#trash;
    }
    
    set creationDate(creationDate) {
        this.#creationDate = creationDate;
    }
    
    get creationDate() {
        return this.#creationDate;
    }
    
    set modificationDate(modificationDate) {
        this.#modificationDate = modificationDate;
    }
    
    get modificationDate() {
        return this.#modificationDate;
    }
}
