(() => {
  const refs = {
    openModalBtn: document.querySelector(".open-team-modal"),
    closeModalBtn: document.querySelector(".close-team-modal"),
    modal: document.querySelector(".team-modal"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("team-modal-hidden");
  }
})();