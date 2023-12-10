import Notiflix from 'notiflix';

export function showFailureNotification(message) {
  Notiflix.Notify.failure(message);
}