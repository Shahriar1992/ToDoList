const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const formBtn = document.getElementById("form-btn");
const itemFilter = document.getElementById("item-filter");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clear");

// console.log(itemList);
// Functions
function onAddItemClick(e) {
  e.preventDefault();

  const text = itemInput.value;

  if (text === "") {
    alert("Please add an item.");
    return;
  }

  addItemToDom(text);
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

function filteritems(e) {
  const text = e.target.value;
  const listItems = itemList.querySelectorAll("li");

  listItems.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function onRemoveBtnClick(e) {
  if (e.target.classList.contains("remove-item")) {
    e.target.parentElement.remove();
  }
}

function checkUI() {}

// Event Listeners
itemForm.addEventListener("submit", onAddItemClick);
itemFilter.addEventListener("input", filteritems);
itemList.addEventListener("click", onRemoveBtnClick);
