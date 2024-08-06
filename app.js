const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    attachEventListeners(); // Yüklenen notları dinamik olarak güncelle
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    attachEventListeners(); // Yeni eklenen notlara olay dinleyicileri ekleyin
});

function attachEventListeners() {
    notesContainer.querySelectorAll(".input-box").forEach(nt => {
        nt.onkeyup = function() {
            updateStorage();
        }
    });
}

notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.execCommand("insertLineBreak");
    }
});
