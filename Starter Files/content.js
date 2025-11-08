const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
//to acess the bookmark assets to chrome we cant get it locally
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";
const observer = new MutationObserver(() => { // this observer is going to observe
    addBookmarkButton();
});

observer.observe(document.body, {childList: true, subtree: true});// if any changes happen to this documents's body

addBookmarkButton();

function onProblemsPage(){
    return window.location.pathname.startsWith('/problems/');// check if it's  problems page
}
window.addEventListener("load",addBookmarkButton); // on load the book mark button should show
function addBookmarkButton(){
        console.log("Trigerring");
    if(!onProblemsPage() || document.getElementById("add-bookmark-button")) return; // if we are not on problem's page or if bookmark button is already present on the current page
    const bookmarkButton = document.createElement('img');// create element
    bookmarkButton.id= "add-bookmark-button";// give id
    bookmarkButton.src = bookmarkImgURL;//src of button
    bookmarkButton.style.height="30px";
    bookmarkButton.style.width="30px";
    //button whose adjacent our bookmark should be seen
 const submitbutton = document.getElementsByClassName("ant-btn css-19gw05y ant-btn-default Button_gradient_dark_button__r0EJI py-2 px-4 text-sm border_radius_8")[0]
 //safety check: if submit button not found, exit
 if(!submitbutton) return;
 //where it should seen
 submitbutton.insertAdjacentElement("beforebegin",bookmarkButton);
 bookmarkButton.addEventListener("click", addNewBookmarkHandler);
}

async function addNewBookmarkHandler(){
        const currentBookmarks = await getCurrentBookmarks();// stops the asycn fucntion until we get all the bookmarks
const azproblemurl = window.location.href;
const uniqueID = extractProblemId(azproblemurl);// extract the problem id from url 
const problemnameElem = document.getElementsByClassName("coding_problem_info_heading__G9ueL fw-bolder rubik text-xl mb-0")[0];
if(!problemnameElem) return; // safety check: if heading not found
const problemname = problemnameElem.innerText; // get text only, not html
    if(currentBookmarks.some((bookmark) => bookmark.id === uniqueID)) return; // if current bookmark is already present then simply return and dont do anything
//list of objects
const bookmarkObj={
    id: uniqueID,
    name : problemname,
    url: azproblemurl 
}
// if there is no already present problem then we simply use spread operator to store the the new problrm and set it into sync storage 
  const updatedBookmarks = [...currentBookmarks, bookmarkObj];

    chrome.storage.sync.set({ [AZ_PROBLEM_KEY]: updatedBookmarks }, () => { // fixed: use [] to access variable key
        console.log("Updated the bookmarks correctly to ", updatedBookmarks);
    })
}
function extractProblemId(url) {
  const parts = url.split('/');
  
  const index = parts.indexOf("problems");

  if (index !== -1 && index + 1 < parts.length) {
    const afterProblems = parts[index + 1];
    
    const id = afterProblems.split('?')[0];
    
    return id;
  }
  return null; // safety: if id not found
}
//get all the current bookmarks from the sync storage
function getCurrentBookmarks() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([AZ_PROBLEM_KEY], (results) => {
            resolve(results[AZ_PROBLEM_KEY] || []);
        });
    });
}
