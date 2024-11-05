const itemInput = document.getElementById("input");

function loadInitialState() {
  const state = localStorage.getItem("state");
  const list = JSON.parse(state) ?? [];
  list.forEach((element) => {
    addItemToUI(element);
  });
}

function initializeListeners() {
  itemInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addItemFromInput();
    }
  });

  document
    .getElementById("add-item-btn")
    .addEventListener("click", addItemFromInput);

  document
    .getElementById("save-btn")
    .addEventListener("click", saveAllItemsToLocalStorage);

  document.getElementById("clear-btn").addEventListener("click", clearAll);
}

function saveAllItemsToLocalStorage() {
  const listHTML = document.getElementById("list");
  const listItems = Array.from(listHTML.children).map(function (el) {
    const label = el.innerText;
    const checkbox = el.firstChild.checked;
    return {
      label: label,
      isChecked: checkbox,
    };
  });
  localStorage.setItem("state", JSON.stringify(listItems));
  alert("saved succcesfully");
}

function addItemToUI({ label, isChecked }) {
  const listItem = document.createElement("li");
  document.getElementById("list").appendChild(listItem);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;

  listItem.append(checkbox, label);

  setCheckboxClasses({ checkbox, listItem });

  checkbox.addEventListener("change", () => {
    setCheckboxClasses({ checkbox, listItem });
  });
}

function setCheckboxClasses({ checkbox, listItem }) {
  if (checkbox.checked) {
    listItem.classList.add("checked");
  } else {
    listItem.classList.remove("checked");
  }
}

function addItemFromInput() {
  addItemToUI({ label: itemInput.value, isChecked: false });
  itemInput.value = "";
}

function clearAll() {
  localStorage.clear();
  document.getElementById("list").replaceChildren("");
}

loadInitialState();
initializeListeners();
