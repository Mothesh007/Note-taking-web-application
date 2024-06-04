const registerBtn = document.querySelector("#registerBtn");
const signupBtn = document.querySelector("#signupBtn");
const userIDInput = document.querySelector("#userID");
const errorMsg = document.querySelector("#errorMsg");
const addBtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");

registerBtn.addEventListener("click", () => {
    const userID = userIDInput.value;
    const storedUserID = localStorage.getItem("userID");

    if (userID === storedUserID) {
        document.querySelector("#register").style.display = "none";
        addBtn.style.display = "block";
        main.style.display = "block";
        loadNotes();
    } else {
        errorMsg.textContent = "Invalid User ID. Please try again.";
    }
});

signupBtn.addEventListener("click", () => {
    const userID = userIDInput.value;
    
    if (userID) {
        localStorage.setItem("userID", userID);
        errorMsg.textContent = "Sign-up successful. You can now log in.";
    } else {
        errorMsg.textContent = "Please enter a user ID to sign up.";
    }
});

function addNote() {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fas fa-save"></i>
        <i class="trash fas fa-trash"></i>
    </div>
    <textarea></textarea>
    `;
    main.appendChild(note);
    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");

    save.addEventListener("click", saveNotes);
    textarea.addEventListener("input", saveNotes);
    trash.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });
}

addBtn.addEventListener("click", addNote);

function saveNotes() {
    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note => note.value);
    console.log(notes, data);

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

function loadNotes() {
    const Isnotes = JSON.parse(localStorage.getItem("notes"));

    if (Isnotes !== null) {
        Isnotes.forEach(noteText => {
            addNote();

            const notes = document.querySelectorAll(".note textarea");
            const lastNote = notes[notes.length - 1];
            lastNote.value = noteText;
        });
    } else {
        addNote();
    }
}
