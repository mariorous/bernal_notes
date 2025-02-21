export class Auth {
    constructor() {
        this.user = this.getLoggedUser();
    }

    register(username, password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.username === username)) {
            return "El usuario ya existe";
        }
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        return "Registro exitoso, ahora inicia sesión";
    }

    login(username, password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(user => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem("loggedUser", username);
            this.user = username;
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem("loggedUser");
        this.user = null;
    }

    getLoggedUser() {
        return localStorage.getItem("loggedUser");
    }

    isAuthenticated() {
        return !!this.getLoggedUser();
    }
}