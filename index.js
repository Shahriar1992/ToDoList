const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function displayItems() {
  const itemsFromLocalStorage = getItemsFromlocalStorage();

  itemsFromLocalStorage.forEach((item) => addItemToDom(item));

  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  addItemToDom(newItem);

  addItemToLocalStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDom(item) {
  // Create New Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  //   Create Button
  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  itemList.appendChild(li);

  return li;
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
}

function getItemsFromlocalStorage() {
  let itemsFromLocalStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromLocalStorage;
}

function addItemToLocalStorage(item) {
  const itemsFromLocalStorage = getItemsFromlocalStorage();

  itemsFromLocalStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item) {
  if (confirm("Are you sure")) {
    item.remove();

    removeItemFormStorage(item.textContent);

    checkUI();
  }
}

function removeItemFormStorage(item) {
  let itemsFromLocalStorage = getItemsFromlocalStorage();

  itemsFromLocalStorage = itemsFromLocalStorage.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
}

function clearItems(e) {
  if (confirm("Are you sure to delete all")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  localStorage.removeItem("items");

  checkUI();
}

function checkUI() {
  items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemFilter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    itemFilter.style.display = "block";
    clearBtn.style.display = "block";
  }
}

function filterItems(e) {
  items = itemList.querySelectorAll("li");
  text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function init() {
  // Event Listener
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
