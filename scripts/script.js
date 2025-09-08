/* 
Satta variabler för inloggning 
*/
const username = "admin";
const password = "123";

/* 
Hämtar elementet med id "page-container" från HTML-dokumentet 
*/
const pageContainer = document.getElementById("page-container");

/*
Funktion för att skapa ett HTML-element med specifika attribut.
Exemple: createElement("tag", {class: "my-class", id: "my-id");
Detta skapar ett element av typen "tag" med attributen class = "my-class", id = "my-id".
Genom att göra en sådan funktion kan vi undvika att upprepa samma kod flera gånger när vi skapar olika HTML-element.
*/
function createElement(tag, options = {}) {
    const element = document.createElement(tag);
        if (options.class) element.className = options.class;
        if (options.id) element.id = options.id;
        if (options.for) element.htmlFor = options.for;
        if (options.type) element.type = options.type;
        if (options.name) element.name = options.name;
        if (options.required) element.required = true;
        if (options.text) element.textContent = options.text;
        if (options.href) element.href = options.href;
    return element;
}

/* SEKTION: FUNKTIONER FÖR ATT MINIMERA REPETITIV KOD */

/* 
Funktion för att skapa ett input-fält med matchande label 
*/
function createInputGroup(labelText, inputOptions) {
    /*  
    Anropar createElement för att skapa en div med klassen "form-group" 
    */
    const group = createElement("div", { 
        class: "form-group" 
    });

    /* 
    Anropar createElement för att skapa en label med attributen for och text
    */
    const label = createElement("label", {
        for: inputOptions.id,
        text: labelText
    });  

    /* 
    group är div elementet vi skapade ovan 
    appendChild lägger vi till elementen i div elementet
    */
    group.appendChild(label);
    group.appendChild(document.createElement("br"));

    /* 
    Anropar createElement för att skapa ett input-fält som vi kan sedan sätta olika attribut på 
    */
    const input = createElement("input", inputOptions);
    group.appendChild(input);

    /* 
    Returnerar hela gruppen med label och input 
    */
    return group;
}

/* 
Lades till bara för att skapa checkboxen "Kom ihåg mig" 
*/
function createRememberMe() {
    const label = createElement("label");

    const input = createElement("input", {
        type: "checkbox",
        id: "rememberMe",
        name: "rememberMe"
    });
    label.appendChild(input);
    label.appendChild(document.createTextNode(" Kom ihåg mig"));

    return label;
}

/* 
Lades till bara för att skapa länken "Glömt lösenord?" 
*/
function createForgotPassword() {
    const label = createElement("label", { 
        id: "forgotPassword" 
    });

    const link = createElement("a", { 
        href: "#", 
        text: "Glömt lösenord?" 
    });
    label.appendChild(link);

    return label;
}

/* SEKTION: FUNKTIONER FÖR INLOGGNING, UTLOGGNING OCH SIDOR */

function logout() {
  loginPage();

  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentPassword");
}

function login() {
  const inputUsername = document.getElementById("username").value.toLowerCase();
  const inputPassword = document.getElementById("password").value;

  if (inputUsername === username && inputPassword === password) {
    welcomePage();
    localStorage.setItem("currentUser", inputUsername);
    localStorage.setItem("currentPassword", inputPassword);
  } else {
    errorPage();
  }
}

/* 
Här kollar vi om användaren är redan inloggad och sparad i localStorage
Om nykel och värde i localStorage matchar de satta variablerna, så visas välkomstsidan direkt
annars visas inloggningssidan
*/
if (
    localStorage.getItem("currentUser") === username &&
    localStorage.getItem("currentPassword") === password
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

    form.appendChild(createRememberMe());
    form.appendChild(createForgotPassword());
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

    const h1 = createElement("h1", {
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
