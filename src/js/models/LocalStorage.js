
export class LocalStorage {
    static #storage = localStorage;

    // Añade los items al localStorage con su clave 'items'
    static setItems(items) {
        this.#storage.setItem('items', items);
    }

    static getItems() {
        // Verificar si existe 'items' en el localStorage
        const itemsFromStorage = JSON.parse(this.#storage.getItem('items')) || [];

        // Si el localStorage está vacío, inicializarlo como un arreglo vacío
        if (!itemsFromStorage.length) {
            this.#storage.setItem('items', JSON.stringify([]));
        }
        // Convierte los objetos a instancias adecuadas según el tipo
        const items = itemsFromStorage.map(itemData => {
            if (itemData.imageURL) {
                // Si el objeto tiene imageURL, es un ItemVisual
                return new ItemVisual(
                    itemData.name,
                    itemData.description,
                    itemData.creationDate,
                    itemData.modificationDate,
                    itemData.imageURL
                );
            } else {
                // Si no tiene imageURL, es un ItemSimple
                return new ItemSimple(
                    itemData.name,
                    itemData.description,
                    itemData.creationDate,
                    itemData.modificationDate
                );
            }
        });

        return itemsFromStorage
    }

    static clear() {
        this.#storage.clear();
    }
    
}