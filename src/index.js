// Import JavaScript Files
import refs from './javascript/refs.js';
import './javascript/up-dwn-btn.js';
import './javascript/api.js';
import './javascript/darkmode.js';
import './javascript/header-bkg.js';
import './javascript/letters-jump.js';
import './javascript/storage.js';
// import './javascript/key-words.js';
import './javascript/change-header.js';
// import './javascript/btnLibrary.js';
// import './javascript/clear-movie-list.js';
//  import './javascript/library-list-hendler.js';

import './javascript/main.js';
import './javascript/notification.js';
// import './javascript/request.js';
// import './javascript/spinner.js';
// import fnFetch from './javascript/fetch.js';
// import fnHendler from './javascript/fnHendler.js';
// import './javascript/fetch.js';
// save('currentRequest', HOME);
import { HOME } from './javascript/request.js';
import { save } from './javascript/storage.js';
// import './javascript/library-list-hendler.js';
// import './javascript/clear-movie-list.js';
import { HOME } from './javascript/modal.js';

save('currentRequest', HOME);

// fnFetch.fetchData();

// refs.searchForm.addEventListener('submit', fnHendler.onSubmitSearchForm);
// refs.paginationBox.addEventListener('click', fnHendler.onClickPaginate);
// refs.filmListRef.addEventListener('click', fnHendler.onClickFilm);
refs.libraryHeaderBtn.addEventListener('click', fnHendler.onClickLibrary);
refs.watchedBtn.addEventListener('click', fnHendler.onClickWatched);
refs.queueBtn.addEventListener('click', fnHendler.onClickQueue);
// refs.logoNav.addEventListener('click', fnHendler.onClickLogoHome);
refs.homeHeaderBtn.addEventListener('click', fnHendler.onClickLogoHome);

import './javascript/main.js';
import './javascript/notification.js';

// import './javascript/spinner.js';
