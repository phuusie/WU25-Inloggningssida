const username = "admin";
const password = "123";

const pageContainer = document.getElementById("page-container");

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

function createInputGroup(labelText, inputOptions) {
  const group = createElement("div", { 
    class: "form-group" 
  });

  const label = createElement("label", {
    for: inputOptions.id,
    text: labelText
  });

  group.appendChild(label);
  group.appendChild(document.createElement("br"));

  const input = createElement("input", inputOptions);
  
  group.appendChild(input);

  return group;
}

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

function renderLoginForm() {
  pageContainer.innerHTML = "";

  const pageBorder = createElement("div", { 
    class: "page-border" 
  });

  const h2 = createElement("h2", { 
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
  form.appendChild(document.createElement("br"));
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

function logout() {
  renderLoginForm();
}

window.addEventListener("DOMContentLoaded", renderLoginForm);

function login() {
  const inputUsername = document.getElementById("username").value.toLowerCase();
  const inputPassword = document.getElementById("password").value;
  if (inputUsername === username && inputPassword === password) {
    welcomePage();
  } else {
    errorPage();
  }
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
