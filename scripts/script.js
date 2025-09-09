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

const users = [
    { username: "admin", password: "123" },
    { username: "user", password: "password" },
    { username: "test", password: "1234" }
];

const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

const pageContainer = document.getElementById("page-container");

function findUser(username, password) {
  return users.find(
    (user) => user.username === username && user.password === password
  );
}

function isLoggedIn() {
  return (
    currentUser.username &&
    currentUser.password &&
    findUser(currentUser.username, currentUser.password)
  );
}

if (isLoggedIn()) {
  welcomePage(currentUser);
} else {
  loginPage();
}


function login() {
    const inputUsername = document.getElementById("username").value.toLowerCase();
    const inputPassword = document.getElementById("password").value;
    const user = findUser(inputUsername, inputPassword);

    if (!user) {
        errorPage();
    } 

    if (document.getElementById("rememberMe").checked) {
        let currentUser = {
            username: user.username,
            password: user.password
        };

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    welcomePage(user);
}

function logout() {
    loginPage();

    localStorage.removeItem("currentUser");
}

function restorePassword(username) {
    restoredPasswordPage(username);
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

    document.addEventListener("click", (event) => {
        if (event.target && event.target.id === "forgotPassword") {
            forgotPasswordPage();
        }
    });

    form.appendChild(document.createElement("br"));

    const buttonsDiv = createElement("div", { class: "button-group" });
    form.appendChild(buttonsDiv);

    const loginButton = createElement("button", {
        id: "loginButton",
        type: "submit",
        text: "Logga in"
    });
    buttonsDiv.appendChild(loginButton);

    const registerButton = createElement("button", {
        id: "registerButton",
        type: "button",
        text: "Registrera"
    });
    buttonsDiv.appendChild(registerButton);

    registerButton.onclick = () => {
        alert("Registreringsfunktionen är inte implementerad än.");
    };

    pageBorder.appendChild(form);
    pageContainer.appendChild(pageBorder);

    form.addEventListener("submit", () => {
        login();
    });
}

function welcomePage(user) {
    pageContainer.innerHTML = "";
    pageContainer.classList.add("welcome-container");
    pageContainer.appendChild(addIcon());

    const h2 = createElement("h2", {
        text: `Välkommen, ${user.username.toUpperCase()}!`
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

function forgotPasswordPage() {
    pageContainer.innerHTML = "";
    pageContainer.classList.remove("welcome-container");
    pageContainer.appendChild(addIcon());

    const h1 = createElement("h1", {
        id: "forgotPasswordPage",
        text: "Återställ lösenord"
    });
    pageContainer.appendChild(h1);

    const form = createInputGroup("Ange ditt namn", {
        type: "text",
        id: "resetUsername",
        name: "resetUsername",
        required: true
    });
    pageContainer.appendChild(form);

    const resetButton = createElement("button", {
        id: "resetButton",
        text: "Återställ lösenord"
    });
    form.appendChild(resetButton);

    resetButton.onclick = () => {
        const username = form.querySelector("#resetUsername").value;
        restorePassword(username);
    };

    const backButton = createElement("button", {
        id: "backButton",
        text: "Tillbaka"
    });
    pageContainer.appendChild(backButton);

    backButton.onclick = logout;
}

function restoredPasswordPage(username) {
    pageContainer.innerHTML = "";
    pageContainer.classList.remove("welcome-container");
    pageContainer.appendChild(addIcon());

    const h1 = createElement("h1", {
        id: "resetPasswordPage",
        text: "Ditt lösenord är:"
    });
    pageContainer.appendChild(h1);

    const user = users.find(u => u.username === username);
    const p = createElement("p", {
        text: user ? `Ditt lösenord är: ${user.password}` : "Användaren finns inte!"
    });
    pageContainer.appendChild(p);

    const backButton = createElement("button", {
        id: "backButton",
        text: "Tillbaka"
    });
    pageContainer.appendChild(backButton);

    if (user != null) {
        backButton.onclick = loginPage;
    } else {
        backButton.onclick = forgotPasswordPage;
    }
}