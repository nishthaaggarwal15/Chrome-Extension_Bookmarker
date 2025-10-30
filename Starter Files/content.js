
const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
//to acess the bookmark assets to chrome we cant get it locally
window.addEventListener("load",addBookmarkButton); // on load the book mark button should show
function addBookmarkButton(){
    const bookmarkButton = document.createElement('img');// create element
    bookmarkButton.id= "add-bookmark-button";// give id
    bookmarkButton.src = bookmarkImgURL;//src of button
    bookmarkButton.style.height="30px";
    bookmarkButton.style.width="30px";
    //button whose adjacent our bookmark should be seen
 const submitbutton = document.getElementsByClassName("ant-btn css-19gw05y ant-btn-default Button_gradient_dark_button__r0EJI py-2 px-4 text-sm border_radius_8")[0]
//where it should seen
 submitbutton.insertAdjacentElement("beforebegin",bookmarkButton);
}