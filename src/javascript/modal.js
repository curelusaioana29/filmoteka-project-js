(() => {
  const refs = {
    openModalBtn: document.querySelector(".open-review-modal"),
    closeModalBtn: document.querySelector(".close-review-modal"),
    modal: document.querySelector(".review-modal"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("review-is-hidden");
  }
})();