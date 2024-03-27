var modal;
// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
window.onmousedown = function (event) {
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

function saveGenInfo() {
  var name = document.getElementById("nameInput").value;
  var eng = document.getElementById("engNameInput").value;
  var desc = document.getElementById("descInput").value;

  let genInfo = {
    name: name,
    eng: eng,
    desc: desc,
  };

  let genInfo_serialized = JSON.stringify(genInfo);
  localStorage.setItem("clongGenInfo", genInfo_serialized);

  loadData();
  closeModal("editGenInfo");
}

function loadData() {
  let genInfo = JSON.parse(localStorage.getItem("clongGenInfo"));

  if (genInfo != null) {
    if (genInfo.name != "") {
      document.getElementById("name").innerHTML = genInfo.name;
    } else {
      document.getElementById("name").innerHTML = "Conlang name";
    }
    if (genInfo.eng != "") {
      document.getElementById("engName").innerHTML = genInfo.eng;
    } else {
      document.getElementById("engName").innerHTML = "Conlang name in English";
    }
    if (genInfo.desc != "") {
      document.getElementById("desc").innerHTML = genInfo.desc;
    } else {
      document.getElementById("desc").innerHTML = "Description / Lore";
    }

    document.getElementById("nameInput").value = genInfo.name;
    document.getElementById("engNameInput").value = genInfo.eng;
    document.getElementById("descInput").value = genInfo.desc;
  }
}

window.onload = function () {
  loadData();
};
