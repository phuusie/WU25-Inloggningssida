import { 
    createElement, 
    createInputGroup, 
    createCheckboxGroup, 
    createLinkGroup,
    addIcon
} from './helpers.js';

import { 
    animate 
} from './animations.js';

animate();

const username = "admin";
const password = "123";

const pageContainer = document.getElementById("page-container");

function login() {
    const inputUsername = document.getElementById("username").value.toLowerCase();
    const inputPassword = document.getElementById("password").value;

    if (inputUsername === username && inputPassword === password) {
        welcomePage();

        let currentUser = { 
            username: inputUsername, 
            password: inputPassword 
        };

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
        errorPage();
    }
}

function logout() {
    loginPage();

    localStorage.removeItem("currentUser");
}

const savedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
if (
    savedUser.username === username &&
    savedUser.password === password
) {
    welcomePage();
} else {
    loginPage();
}

function loginPage() {
    pageContainer.innerHTML = "";
    pageContainer.classList.remove("welcome-container");

    const pageBorder = createElement("div", { 
        class: "page-border" 
    });

    pageBorder.appendChild(addIcon());

    const h2 = createElement("h1", { 
        text: "LOGIN" 
    });
    pageBorder.appendChild(h2);

    const form = createElement("form", { 
        id: "loginForm" 
    });

    form.appendChild(
        createInputGroup("NAMN", {
        type: "text",
        id: "username",
        name: "username",
        required: true
        })
    );

    form.appendChild(
        createInputGroup("LÖSENORD", {
        type: "password",
        id: "password",
        name: "password",
        required: true
        })
    );

    form.appendChild(
        createCheckboxGroup("Kom ihåg mig", {
        id: "rememberMe"
        })
    );

    form.appendChild(createLinkGroup("Glömt lösenord?", {
        id: "forgotPassword",
        href: "#",
        text: "Återställ lösenord"
    }));

    form.appendChild(document.createElement("br"));

    const loginButton = createElement("button", {
        id: "loginButton",
        type: "submit",
        text: "Logga in"
    });
    form.appendChild(loginButton);
    pageBorder.appendChild(form);
    pageContainer.appendChild(pageBorder);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        login();
    });
}

function welcomePage() {
    pageContainer.innerHTML = "";
    pageContainer.classList.add("welcome-container");
    pageContainer.appendChild(addIcon());

    const h2 = createElement("h2", {
        text: `Välkommen, ${username.toUpperCase()}!`
    });
    pageContainer.appendChild(h2);

    pageContainer.appendChild(document.createElement("br"));

    const p = createElement("p", {
        text: "Du är nu inloggad."
    });
    pageContainer.appendChild(p);

    const logoutButton = createElement("button", {
        id: "logoutButton",
        text: "Logga ut"
    });
    pageContainer.appendChild(logoutButton);

    logoutButton.onclick = logout;
}

function errorPage() {
    pageContainer.innerHTML = "";
    pageContainer.classList.remove("welcome-container");
    pageContainer.appendChild(addIcon());

    const h1 = createElement("h1", {
        id: "errorPage",
        text: "Inloggning misslyckades"
    });
    pageContainer.appendChild(h1);

    const p = createElement("p", {
        text: "Kontrollera ditt namn och lösenord och försök igen."
    });
    pageContainer.appendChild(p);

    const backButton = createElement("button", {
        id: "backButton",
        text: "Tillbaka"
    });
    pageContainer.appendChild(backButton);

    backButton.onclick = logout;
}
