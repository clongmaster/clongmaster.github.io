var modal;
// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  var modals = document.getElementsByClassName("modal");
  for (let i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = "none";
    }
  }
};

function openModal(modalId) {
  modal = document.getElementById(modalId);
  modal.style.display = "block";
}
function closeModal(modalId) {
  modal = document.getElementById(modalId);
  modal.style.display = "none";
}
