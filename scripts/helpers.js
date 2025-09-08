export {
  createElement,
  createInputGroup
};

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