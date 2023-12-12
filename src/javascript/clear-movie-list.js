import refs from './refs.js';
import { load, save } from './storage.js';
import message from './key-words.js';


let currentValue;

export default function clearList() {
    currentValue = load('currentRequest');

    if (load(currentValue).length === 0) {
        hiddenClearBtn();
        
    } else if (load(currentValue).length !== 0) {
        showClearBtn();
    }
}

function handleClearBtn() {
    save(currentValue, []);
    refs.filmListRef.innerHTML = '';
    refs.clearBtnContainer.style.display = "none";
    refs.paginationList.innerHTML = '';
    message.messageAboutLibrary();
}

function hiddenClearBtn() {
    refs.clearBtnContainer.style.display = "none";
}

function showClearBtn() {
    refs.clearBtn.textContent = `clear ${currentValue} list`;
    refs.clearBtnContainer.style.display = "block";
}


refs.clearBtn.addEventListener('click', handleClearBtn);