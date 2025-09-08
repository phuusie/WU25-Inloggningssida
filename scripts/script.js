const username = "admin";
const password = "123";

const pageContainer = document.getElementById("page-container");

function renderLoginForm() {
    pageContainer.innerHTML = "";
        const pageBorder = document.createElement("div");
        pageBorder.className = "page-border";

        const h2 = document.createElement("h2");
        h2.textContent = "LOGIN";
        pageBorder.appendChild(h2);

        const form = document.createElement("form");
        form.id = "loginForm";

        const userGroup = document.createElement("div");
        userGroup.className = "form-group";
        const userLabel = document.createElement("label");
        userLabel.htmlFor = "username";
        userLabel.textContent = "NAMN";
        userGroup.appendChild(userLabel);

        userGroup.appendChild(document.createElement("br"));

        const userInput = document.createElement("input");
        userInput.type = "text";
        userInput.id = "username";
        userInput.name = "username";
        userInput.required = true;
        userGroup.appendChild(userInput);
        form.appendChild(userGroup);

        const passGroup = document.createElement("div");
        passGroup.className = "form-group";
        const passLabel = document.createElement("label");
        passLabel.htmlFor = "password";
        passLabel.textContent = "LÖSENORD";
        passGroup.appendChild(passLabel);

        passGroup.appendChild(document.createElement("br"));

        const passInput = document.createElement("input");
        passInput.type = "password";
        passInput.id = "password";
        passInput.name = "password";
        passInput.required = true;
        passGroup.appendChild(passInput);
        form.appendChild(passGroup);

        const rememberLabel = document.createElement("label");
        const rememberInput = document.createElement("input");
        rememberInput.type = "checkbox";
        rememberInput.id = "rememberMe";
        rememberInput.name = "rememberMe";
        rememberLabel.appendChild(rememberInput);
        rememberLabel.appendChild(document.createTextNode(" Kom ihåg mig"));
        form.appendChild(rememberLabel);

        form.appendChild(document.createElement("br"));

        const forgotLabel = document.createElement("label");
        forgotLabel.id = "forgotPassword";
        const forgotLink = document.createElement("a");
        forgotLink.href = "#";
        forgotLink.textContent = "Glömt lösenord?";
        forgotLabel.appendChild(forgotLink);
        form.appendChild(forgotLabel);

        form.appendChild(document.createElement("br"));

        const loginButton = document.createElement("button");
        loginButton.id = "loginButton";
        loginButton.type = "submit";
        loginButton.textContent = "Logga in";
        form.appendChild(loginButton);

        pageBorder.appendChild(form);
        pageContainer.appendChild(pageBorder);
        document.body.appendChild(pageContainer);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      login();
    });
}

function logout() {
    renderLoginForm();
}   

window.addEventListener("DOMContentLoaded", renderLoginForm);

function login() {
    let inputUsername = document.getElementById("username").value.toLowerCase();
    let inputPassword = document.getElementById("password").value;

    if (inputUsername === username && inputPassword === password) {
        welcomePage();
    } else {
        errorPage();
    }
}

document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    login();
});

function welcomePage() {
    pageContainer.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.textContent = `Välkommen, ${username.toUpperCase()}!`;
    pageContainer.appendChild(h2);

    const br = document.createElement("br");
    pageContainer.appendChild(br);

    const p = document.createElement("p");
    p.textContent = "Du är nu inloggad.";
    pageContainer.appendChild(p);

    const logoutButton = document.createElement("button");
    logoutButton.id = "logoutButton";
    logoutButton.textContent = "Logga ut";
    pageContainer.appendChild(logoutButton);

    document.getElementById("logoutButton").onclick = () => logout();
}

function errorPage() {
    pageContainer.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.textContent = "Inloggning misslyckades";
    pageContainer.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = "Kontrollera ditt namn och lösenord och försök igen.";
    pageContainer.appendChild(p);

    const backButton = document.createElement("button");
    backButton.id = "backButton";
    backButton.textContent = "Tillbaka";
    pageContainer.appendChild(backButton);

    backButton.onclick = () => {
        logout();
    };
}
