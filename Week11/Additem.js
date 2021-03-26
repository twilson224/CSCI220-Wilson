var list = document.getElementById('list'); // Creates a global variable

// adds a function to add an item to the list by appending the ul and adding a child
function addItem() {
    var listitem = document.getElementById('todoList').value;
    document.getElementById('todoList').value = "";
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(listitem));
    list.appendChild(entry);
}

// adds a function to clear the items in the list by removing the child elements
function clearItems() {

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}