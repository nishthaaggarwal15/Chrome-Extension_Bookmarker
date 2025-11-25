const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";

const assetsURLMap = {// icons for play and delete 
    "play": chrome.runtime.getURL("assets/play.png"),
    "delete": chrome.runtime.getURL("assets/delete.png")

}

const bookmarkSection = document.getElementById("bookmarks"); // to get the bookmakrk section

document.addEventListener("DOMContentLoaded", () => { // if there is problem key show it else view current bookmarks
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookmarks = data[AZ_PROBLEM_KEY] || []; // if nothing saved then empty array
        viewBookmarks(currentBookmarks); // show all the saved bookmarks
    });
});

function viewBookmarks(bookmarks) {// if there are no bookmarks to show show no bookmarks
    bookmarkSection.innerHTML = ""; // clear old UI before adding fresh ones

    if(bookmarks.length === 0) {
        bookmarkSection.innerHTML = "<i>No Bookmarks to Show</i>"; // show message if blank
        return;
    }
    // add new bookmark 
    bookmarks.forEach(bookmark => addNewBookmark(bookmark)); // loop through each and show on screen

}

function addNewBookmark(bookmark){ // create diff divs
    const newBookmark = document.createElement('div'); // bookmark col
    const bookmarkTitle = document.createElement('div');// title
    const bookmarkControls = document.createElement('div');//controls 

    bookmarkTitle.textContent = bookmark.name;// shows bookmark name
    bookmarkTitle.classList.add("bookmark-title"); // giving css class for styling

    setControlAttributes(assetsURLMap["play"], onPlay, bookmarkControls); // attirbutes of play and delete should have tgese
    setControlAttributes(assetsURLMap["delete"], onDelete, bookmarkControls); // adding delete btn also
    bookmarkControls.classList.add("bookmark-controls"); // css class

    newBookmark.classList.add("bookmark"); // whole bookmark card styling

    newBookmark.append(bookmarkTitle); // putting title inside
    newBookmark.append(bookmarkControls); // putting buttons inside

    newBookmark.setAttribute("url", bookmark.url); // storing url inside div as attribute
    newBookmark.setAttribute("bookmark-id", bookmark.id); // storing id also for deleting later

    bookmarkSection.appendChild(newBookmark); // finally add to main section
}

function setControlAttributes(src, handler, parentDiv) {
    const controlElement = document.createElement("img"); // create img for buttons
    controlElement.src = src; // set icon image
    controlElement.addEventListener("click", handler); // when clicked call handler
    parentDiv.appendChild(controlElement); // put inside control div
}

function onPlay(event) {
    const problemUrl = event.target.parentNode.parentNode.getAttribute("url"); // getting url from the main bookmark div
    window.open(problemUrl, "_blank"); // open problem in new tab
}

function onDelete(event){
    const bookmarkItem = event.target.parentNode.parentNode; // whole bookmark card
    const idToRemove = bookmarkItem.getAttribute("bookmark-id"); // getting id for deletion
    bookmarkItem.remove(); // remove from UI immediately

    deleteItemFromStorage(idToRemove); // remove from chrome storage also
}

function deleteItemFromStorage(idToRemove){
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookmarks = data[AZ_PROBLEM_KEY] || []; // get old list
        const updatedBookmarks = currentBookmarks.filter((bookmark) => bookmark.id !== idToRemove); // keep all except deleted
        chrome.storage.sync.set({AZ_PROBLEM_KEY : updatedBookmarks}); // save back updated list
    })
}
