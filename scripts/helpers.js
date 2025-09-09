export {
  createElement,
  createInputGroup,
  createCheckboxGroup,
  createLinkGroup,
  addIcon
};

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

  const input = createElement("input", inputOptions);
  group.appendChild(input);

  return group;
}

function createCheckboxGroup(labelText, checkboxOptions) {
  const group = createElement("div", {
    class: "checkbox-group"
  });

  const label = createElement("label", {
    for: checkboxOptions.id
  });

  const checkbox = createElement("input", {
    type: "checkbox",
    id: checkboxOptions.id,
    name: checkboxOptions.name,
    required: checkboxOptions.required
  });

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" " + labelText));
  group.appendChild(label);

  return group;
}

function createLinkGroup(linkText, linkOptions) {
  const group = createElement("div", {
    class: "link-group"
  });

  const link = createElement("a", {
    id: linkOptions.id,
    href: linkOptions.href,
    text: linkText
  });

  group.appendChild(link);

  return group;
}

function addIcon() {
  const logo = createElement("img", {
      id: "mainLogo"
  });

  logo.src = "./assets/logo/logo.png";
  logo.alt = "Logo";
  logo.style.maxWidth = "60px";
  logo.style.marginBottom = "20px";

  return logo;
}