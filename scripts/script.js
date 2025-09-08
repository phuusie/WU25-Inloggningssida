/*
Importerar funktioner från helpers.js som skapar HTML-element 
utan att behöva skriva samma kod flera gånger
*/
import { createElement, createInputGroup, createCheckboxGroup, createLinkGroup} from './helpers.js';
import { animate } from './animations.js';
animate();

/* 
Satta variabler för inloggning 
*/
const username = "admin";
const password = "123";

/* 
Hämtar elementet med id "page-container" från HTML-dokumentet 
*/
const pageContainer = document.getElementById("page-container");

/* SEKTION: FUNKTIONER FÖR INLOGGNING OCH UTLOGGNING */

/* 
Login-funktion som kollar användarnamn och lösenord
Jämför inmatade värden med satta variabler
Vid lyckad inloggning, visa välkomstsidan och spara användaren i localStorage
Vid misslyckad inloggning, visa felmeddelandesidan
 */
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

/* 
Logout-funktion som rensar localStorage och visar inloggningssidan
*/
function logout() {
    loginPage();

    localStorage.removeItem("currentUser");
}

/* 
Här kollar vi om användaren är redan inloggad och sparad i localStorage
Deklarerar en variabel som hämtar och parsar "currentUser" från localStorage 
Om nykel och värde i localStorage matchar de satta variablerna, så visas välkomstsidan direkt
annars visas inloggningssidan
*/
const savedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
if (
    savedUser.username === username &&
    savedUser.password === password
) {
    welcomePage();
} else {
    loginPage();
}

/* SEKTION: PAGES */

/* 
Landningssidan / Inloggningssidan 
*/
function loginPage() {
    pageContainer.innerHTML = "";

    const pageBorder = createElement("div", { 
        class: "page-border" 
    });

    const logo = createElement("img", {
      id: "mainLogo"
    });

    logo.src = "./assets/logo/logo.png";
    logo.alt = "Logo";
    logo.style.maxWidth = "60px";
    logo.style.marginBottom = "20px";
    pageBorder.appendChild(logo);
    
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

    /* 
    Placeholder for checkbox "Kom ihåg mig"
    */
    form.appendChild(
        createCheckboxGroup("Kom ihåg mig", {
        id: "rememberMe"
        })
    );

    /* 
    Placeholder för länk för återställning av lösenord
    */
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

/* 
Välkomstsidan efter lyckad inloggning 
*/
function welcomePage() {
    pageContainer.innerHTML = "";

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

/* 
Felmeddelandesidan vid misslyckad inloggning 
*/
function errorPage() {
    pageContainer.innerHTML = "";

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
