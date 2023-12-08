// import './modal.js'
import refs from './refs';

function nodeCheckClosing(event) {
  if (event.target.dataset.attribute !== 'modal') {
    return;
  }
  closingModal();
}

refs.closeBtn.addEventListener('click', closingModal);
refs.backdropModalRef.addEventListener('click', nodeCheckClosing);
refs.filmListRef.addEventListener('click', openingModal);

function openingModal(event) {
  let id;
  if (event.target.nodeName === 'IMG' || event.target.nodeName === 'DIV') {
    id = event.target.dataset.movieid;
  }

  const all = JSON.parse(localStorage.getItem('watched') || '[]');
  if (all.includes(id)) {
    refs.addToWatchedBtn.innerHTML = 'REMOVE FROM WATCHED';
  }

  const all2 = JSON.parse(localStorage.getItem('queue') || '[]');
  if (all2.includes(id)) {
    refs.addToQueueBtn.innerHTML = 'REMOVE FROM QUEUE';
  }

  refs.backdropModalRef.classList.add('visually-shown');
  refs.backdropModalRef.classList.remove('visually-hidden');
  refs.bodyEl.classList.add('modal-is-open');
  window.addEventListener('keydown', onEscPress);
}

function closingModal() {
  refs.backdropModalRef.classList.remove('visually-shown');
  window.removeEventListener('keydown', onEscPress);
  refs.bodyEl.classList.remove('modal-is-open');
  setTimeout(clearData, 250);
}

function clearData() {
  refs.modalImg.src = '';
  refs.modalTitle.textContent = '';
  refs.rate.textContent = '';
  refs.votes.textContent = '';
  refs.popularity.textContent = '';
  refs.title.textContent = '';
  refs.genre.textContent = '';
  refs.descr.textContent = '';
  refs.addToWatchedBtn.innerHTML = 'ADD TO WATCHED';
  refs.addToQueueBtn.innerHTML = 'ADD TO QUEUE';
}

function onEscPress(event) {
  if (event.code === 'Escape') closingModal();
}

export default openingModal;
