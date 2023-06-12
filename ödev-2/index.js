let btnDOM = document.querySelector("#liveToastBtn");
let ulDOM = document.querySelector("#list");
let inputDOM = document.querySelector("#task");
let allLiDOM = document.querySelectorAll("li");

// Local Storage'dan verileri alıp listeye yükleme
window.addEventListener("load", function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach(function (task) {
      let newLi = document.createElement("li");
      newLi.textContent = task;
      newLi.addEventListener("click", markElement);
      newLi.innerHTML += closeButton;
      ulDOM.appendChild(newLi);
    });
  }
});

function removeElement(erase) {
  erase.remove();
  eraseStrorage(erase); // Silme işlemi için fonksiyonu çağırma
}

function eraseStrorage(erase) {
  let taskText = erase.firstChild.textContent.trim();
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let index = savedTasks.indexOf(taskText);
  if (index > -1) {
    savedTasks.splice(index, 1); // Local Storage'dan öğeyi silme
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
}

function markElement() {
  this.classList.toggle("checked");
}

let closeButton = `<button 
onclick="removeElement(parentNode)" 
style="padding: 13px;" type="button" 
class="close" 
data-dismiss="toast"
aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>`;

allLiDOM.forEach((e) => {
  e.addEventListener("click", markElement);
  e.innerHTML += `${closeButton}`;
});

btnDOM.addEventListener("click", function () {
  let yeniYazi = inputDOM.value.trim();
  if (yeniYazi !== "") {
    let yeniLİ = document.createElement("li");
    yeniLİ.innerHTML = `${inputDOM.value}${closeButton}`;
    yeniLİ.addEventListener("click", markElement);
    ulDOM.appendChild(yeniLİ);
    inputDOM.value = "";

    // Yeni veriyi Local Storage'a kaydetme
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(yeniYazi);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    $(".success").toast("show");
  } else {
    $(".error").toast("show");
  }
});
