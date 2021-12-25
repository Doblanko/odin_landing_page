// Array that holds the entire library
let myLibrary = []

// Constructor for the book object
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Prototype for adding a book to the library array

Book.prototype.addBook = function() {
    myLibrary.push({
        title: this.title,
        author: this.author,
        pages: this.pages,
        read: this.read,
    })
}

// Append the library to the table

function render(i) {
    const libraryTable = document.getElementById('libraryTable');

    // New row for each book object in the library array
    for (i; i < myLibrary.length; i ++) {
        let newRow = libraryTable.insertRow(-1)

        // Set data attribute to correspond to array index
        newRow.setAttribute('id', 'rowNumber' + i)

        // Create number of cells equivalent to book properties for each row
        for (c = 0; c < 5; c++) {
            let newCell = newRow.insertCell(newRow)
        }

        // Assigns each book property value to it's corresponding cell
        newRow.children[0].innerHTML = myLibrary[i].title
        newRow.children[1].innerHTML = myLibrary[i].author
        newRow.children[2].innerHTML = myLibrary[i].pages
        newRow.children[3].innerHTML = myLibrary[i].read

        // Generate and append delete button to new library entries
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Delete'
        deleteButton.setAttribute('id', 'deleteRow' + i)
        deleteButton.setAttribute('class', 'deleteButton')
        deleteButton.addEventListener('click', event => {deleteRow(i)})
        newRow.children[4].appendChild(deleteButton)

        // Generate and append toggle button to new library entries
        let toggleButton = document.createElement('button')
        toggleButton.innerHTML = 'Toggle Read Status'
        toggleButton.setAttribute('id', 'toggleRead' +i)
        toggleButton.setAttribute('class', 'toggleButton')
        toggleButton.addEventListener('click', (event) => {toggleRead(i-1)})
        newRow.children[4].appendChild(toggleButton)
    }
}

// Functionality for button "New Book"
const newBookButton = document.getElementById('addButton')
const formContainer = document.getElementById('newBookForm')

// Opens up the new book form
newBookButton.addEventListener('click', (event) => {
    formContainer.style.visibility = 'visible'
}
)

// Functionality for new book form buttons
const addBookButton= document.getElementById('addBook')

// Get values from input fields and create new book object
addBookButton.addEventListener('click', (event) => {
    const bookName = document.getElementById('bookName').value
    const authorName = document.getElementById('authorName').value
    const pageNumber = document.getElementById('pageNumber').value
    const isRead = document.getElementById('isRead').value

    // Check for input value for having read the book to be yes or no
    // Needed for toggling the value in the object
    if ((isRead.toLowerCase() === 'yes') | (isRead.toLowerCase() === 'no')) {
        new Book(bookName, authorName, pageNumber, isRead).addBook();
        // Adds only the last added book to the table
        render(myLibrary.length - 1);
    }
    else {
        alert('The value for having read the book can only be Yes or No');
        return;
    }

    // Reset input form
    resetForm()
})

const cancelButton= document.getElementById('cancel');
cancelButton.addEventListener('click', (event) => {
    formContainer.style.visibility = 'hidden';

    // Reset input form
    resetForm()
})

function resetForm() {
    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('pageNumber').value = '';
    document.getElementById('isRead').value = '';
}

// Render all items from library array. 
// 0 represents the starting value of iterating through the library object.
render(0);

//Delete function for delete buttons
function deleteRow(i) {
    let deleteRow = document.getElementById('rowNumber' + (i-1));
    deleteRow.parentNode.removeChild(deleteRow);
}

//Toggle function for changing read value in object key.
function toggleRead(i) {

    let updateCell = document.getElementById('rowNumber' + (i));

    if(myLibrary[i].read.toLowerCase() === 'no') {
        myLibrary[i].read = 'yes';
        updateCell.children[3].innerHTML = 'Yes';
    }
    else if(myLibrary[i].read.toLowerCase() === 'yes') {
        myLibrary[i].read = 'no';
        updateCell.children[3].innerHTML = 'No';
    }
}