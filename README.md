MAANG.in Problem Bookmarker – Chrome Extension

This is a simple Chrome extension I made for bookmarking problems from MAANG.in. Using this extension, I can save any MAANG problem and open it later from any tab, directly from the extension popup.

🚀 Features

⭐ Bookmark any problem on MAANG.in

⭐ Open bookmarked problems from anywhere

⭐ Play button → opens problem in new tab

⭐ Delete button → remove bookmark

⭐ Stored using chrome.storage.sync so bookmarks stay synced

⭐ Clean popup UI for viewing saved problems

📌 How It Works

On MAANG.in problem page
The content script reads the problem details (name + URL).

When “Add Bookmark” is clicked
The problem is saved in browser storage and visible inside the extension popup.

Extension Popup
Shows all bookmarks with:

Title

Play button

Delete button

Clicking Play opens the problem in a new tab.

📂 Project Structure chrome-ext-bookmarker/ │ ├── manifest.json → Extension settings & permissions ├── popup.html → UI of the popup ├── popup.css → Styles for popup ├── popup.js → Logic for showing bookmarks ├── content.js → Runs on MAANG.in pages, collects problem info ├── background.js → Manages extension events │ └── assets/ → icons for play/delete/bookmark

🔧 Installation (Developer Mode)

Open Chrome → go to chrome://extensions/

Turn ON Developer Mode

Click Load Unpacked

Select your project folder (chrome-ext-bookmarker)

The extension will appear in your toolbar ✔️

🛠️ Tech Used

JavaScript

Chrome Extensions API

chrome.storage.sync

HTML

CSS

📘 Notes (Future Improvements)

Add small note/description for each problem

Improve popup UI

Add search bar for bookmarks

Add “copy link” button

Allow renaming of bookmark title

📜 License

Free to use. Feel free to modify and improve it however you like.
