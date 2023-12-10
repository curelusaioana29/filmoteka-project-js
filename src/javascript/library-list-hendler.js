import refs from './refs';
import clearList from './clear-movie-list';


export default function onLibraryListClick(event) {
    const element = event.target;

    if (element.nodeName === 'BUTTON' && element.classList.contains('is-active')) {
        return;
    } else if (element.nodeName === 'BUTTON') {
        toggleLibraryBtnClass();
        clearList();
    }
}

function toggleLibraryBtnClass() {
    refs.watchedBtn.classList.toggle('is-active');
    refs.queueBtn.classList.toggle('is-active');
}

refs.libraryList.addEventListener('click', onLibraryListClick);


