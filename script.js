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
  loadData();
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

  closeModal("editGenInfo");
}

function select(cell) {
  let values = cell.id.split("");
  let i = parseInt(values[1]);
  let j = parseInt(values[2]);
  let arrName;

  if (values[3] == "r") {
    arrName = "roundedVowels";
  } else {
    arrName = "unroundedVowels";
  }
  let arr = JSON.parse(localStorage.getItem(arrName));

  if (cell.classList.contains("selected")) {
    // If the cell already has the 'selected' class, remove it
    cell.classList.remove("selected");
    arr[i][j] = 0;
  } else {
    // If the cell doesn't have the 'selected' class, add it
    cell.classList.add("selected");
    arr[i][j] = 1;
  }

  arr_serialized = JSON.stringify(arr);
  localStorage.setItem(arrName, arr_serialized);
}

function loadData() {
  let genInfo = JSON.parse(localStorage.getItem("clongGenInfo"));
  let roundedVowels = JSON.parse(localStorage.getItem("roundedVowels"));
  let unroundedVowels = JSON.parse(localStorage.getItem("unroundedVowels"));
  if (roundedVowels == null) {
    roundedVowels = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    roundedVowels_serialized = JSON.stringify(roundedVowels);
    localStorage.setItem("roundedVowels", roundedVowels_serialized);
  }
  if (unroundedVowels == null) {
    (unroundedVowels = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]),
      (unroundedVowels_serialized = JSON.stringify(unroundedVowels));
    localStorage.setItem("unroundedVowels", unroundedVowels_serialized);
  }

  if (genInfo != null) {
    if (genInfo.name != "") {
      document.getElementById("name").innerText = genInfo.name;
    } else {
      document.getElementById("name").innerText = "Conlang name";
    }
    if (genInfo.eng != "") {
      document.getElementById("engName").innerText = genInfo.eng;
    } else {
      document.getElementById("engName").innerText = "Conlang name in English";
    }
    if (genInfo.desc != "") {
      document.getElementById("desc").innerText = genInfo.desc;
    } else {
      document.getElementById("desc").innerText = "Description / Lore";
    }

    document.getElementById("nameInput").value = genInfo.name;
    document.getElementById("engNameInput").value = genInfo.eng;
    document.getElementById("descInput").value = genInfo.desc;

    for (let i = 0; i < unroundedVowels.length; i++) {
      let count = 0;
      for (let j = 0; j < unroundedVowels[i].length; j++) {
        if (unroundedVowels[i][j] != 0) {
          let element = document.getElementById(`vowel${i}${j}u`);
          let cell = document.getElementById(`v${i}${j}u`);
          count += 1;
          if (element != null) {
            element.style.visibility = "visible";
            if (!cell.classList.contains("selected")) {
              cell.classList.add("selected");
            }
          }
        } else {
          let element = document.getElementById(`vowel${i}${j}u`);
          let cell = document.getElementById(`v${i}${j}u`);
          if (element != null) {
            element.style.visibility = "hidden";
            if (cell.classList.contains("selected")) {
              cell.classList.remove("selected");
            }
          }
        }
        if (roundedVowels[i][j] != 0) {
          let element = document.getElementById(`vowel${i}${j}r`);
          let cell = document.getElementById(`v${i}${j}r`);
          count += 1;
          if (element != null) {
            element.style.visibility = "visible";
            if (!cell.classList.contains("selected")) {
              cell.classList.add("selected");
            }
          }
        } else {
          let element = document.getElementById(`vowel${i}${j}r`);
          let cell = document.getElementById(`v${i}${j}r`);
          if (element != null) {
            element.style.visibility = "hidden";
            if (cell.classList.contains("selected")) {
              cell.classList.remove("selected");
            }
          }
        }
      }
      if (count > 0) {
        document.getElementById(`vowelRow${i + 1}`).style.display = "table-row";
      } else {
        document.getElementById(`vowelRow${i + 1}`).style.display = "none";
      }
    }
  }
}

function playAudio(event, audio) {
  document.getElementById(audio).play();
  event.stopPropagation();
}

window.onload = function () {
  loadData();
};
