(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  };
})();
const refs = {
  // ... other references
  modal: document.querySelector("[data-modal]"),
};

document.body.addEventListener("click", function(event) {
  if (event.target.matches("[data-modal-open]")) {
    toggleModal("open-lightbox");
  } else if (event.target.matches("[data-modal-close]")) {
    toggleModal("close-lightbox");
  }
});