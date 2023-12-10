import {Server} from './Firebase';
import refs from './refs';


refs.addToWatchedBtn.addEventListener('click', handleWatched);
refs.addToQueueBtn.addEventListener('click', handleQueue);


function handleWatched(event) {
  event.preventDefault();
  refs.addToWatchedBtn.innerHTML = 'REMOVE FROM WATCHED';
  const id = event.target.dataset.id;
  const all = JSON.parse(localStorage.getItem('watched') || '[]');
  if (!all.includes(id)) { all.push(id) }
  else {
    all.splice(all.indexOf(id), 1);
    refs.addToWatchedBtn.innerHTML = 'ADD TO WATCHED';
  };


  localStorage.setItem('watched', JSON.stringify(all));
}

function handleQueue(event) {
  event.preventDefault();
  refs.addToQueueBtn.innerHTML = 'REMOVE FROM QUEUE';
    const id = event.target.dataset.id; 
    const all = JSON.parse(localStorage.getItem('queue') || '[]');    
  if (!all.includes(id)) {
    all.push(id);
  } else {
    all.splice(all.indexOf(id), 1);
    refs.addToQueueBtn.innerHTML = 'ADD TO QUEUE';
  };     
    
     localStorage.setItem('queue', JSON.stringify(all));
}