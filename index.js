const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const formBtn = document.getElementById("form-btn");
const itemFilter = document.getElementById("item-filter");
const itemList = document.getElementById("item-list");
const removeitem = document.getElementById("remove-item");
const clearAll = document.getElementById("clear");

// Functions
function onAddItemClick(e) {
  e.preventDefault();

  const text = itemInput.value;

  if (text === "") {
    alert("Please add an item.");
  }

  addItemToDom(text);

  console.log(text);
}

function createButton() {
  const button = document.createElement("button");
  button.className = "remove-item";

  const icon = document.createTextNode("X");

  button.appendChild(icon);

  return button;
}

function addItemToDom(newItem) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton();

  li.appendChild(button);

  itemList.appendChild(li);
}

function addItemToStorage() {}

function checkUI() {}

// Event Listeners
itemForm.addEventListener("submit", onAddItemClick);
