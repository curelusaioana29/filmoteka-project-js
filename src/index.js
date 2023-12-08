import './css';
import refs from './java-script/refs';
// import './js/up-btn';
// import './js/header-position';
import './java-script/storage';
// import './js/themes';
// import './js/theme-change';
// import './js/footermodal.js';

import './java-script/modal.js';
import './java-script/modal-close.js';
// import './js/movieLibrary';
// import '../node_modules/spinkit/spinkit.css';



// import fnFetch from './js/fetch.js';
import btnLibrary from './java-script/btnLibrary.js';

import { HOME } from './java-script/request.js';
import { save } from './java-script/storage.js';
// import modal from './js/modal';

// import './js/change-header-theme';
import './java-script/library-list-hendler.js';
// import './js/clear-movie-list';



save('currentRequest', HOME);

fnFetch.fetchData();

refs.searchForm.addEventListener('submit', fnHendler.onSubmitSearchForm);
refs.paginationBox.addEventListener('click', fnHendler.onClickPaginate);
refs.filmListRef.addEventListener('click', fnHendler.onClickFilm);
refs.libraryHeaderBtn.addEventListener('click', fnHendler.onClickLibrary);
refs.watchedBtn.addEventListener('click', fnHendler.onClickWatched);
refs.queueBtn.addEventListener('click', fnHendler.onClickQueue);
refs.logoNav.addEventListener('click', fnHendler.onClickLogoHome);
refs.homeHeaderBtn.addEventListener('click', fnHendler.onClickLogoHome);
