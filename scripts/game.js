import { fruits } from "./fruits.js";

let clicks = 0;
let currentFruitIndex = 0;

const fruitImg = document.getElementById("fruitImg");
const countText = document.getElementById("count");
const mcount = document.getElementById("mcount");
const tutorialbtn = document.getElementById("tutorialbtn");

// CONFIG ELEMENTOS
const configPanel = document.getElementById("configPanel");
const openConfig = document.getElementById("openConfig");
const closeConfig = document.getElementById("closeConfig");
const saveFileBtn = document.getElementById("saveFile");
const importFile = document.getElementById("importFile");
const importBtn = document.getElementById("importBtn");
const resetBtn = document.getElementById("resetGame");


// =============== SISTEMA DE SAVE LOCAL ===============
function saveGame() {
    const data = {
        clicks: clicks,
        fruitIndex: currentFruitIndex
    };
    localStorage.setItem("quetafruit-save", JSON.stringify(data));
}

function loadGame() {
    const raw = localStorage.getItem("quetafruit-save");
    if (!raw) return;

    try {
        const data = JSON.parse(raw);
        clicks = data.clicks || 0;
        currentFruitIndex = data.fruitIndex || 0;
        countText.textContent = clicks;
    } catch {
        console.warn("Save corrompido.");
    }
}
// =====================================================


// =============== EXPORTAR SAVE =======================
function downloadSave() {
    const data = localStorage.getItem("quetafruit-save") || "{}";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quetafruit_save.json";
    a.click();

    URL.revokeObjectURL(url);
}
// =====================================================


// =============== IMPORTAR SAVE =======================
function importSave(file) {
    const reader = new FileReader();
    reader.onload = () => {
        localStorage.setItem("quetafruit-save", reader.result);
        location.reload();
    };
    reader.readAsText(file);
}
// =====================================================


// =============== RESET SAVE ==========================
function resetGame() {
    localStorage.removeItem("quetafruit-save");
    location.reload();
}
// =====================================================


function updateFruit() {
    for (let i = fruits.length - 1; i >= 0; i--) {
        if (clicks >= fruits[i].required) {
            currentFruitIndex = i;
            fruitImg.src = fruits[i].img;
            break;
        }
    }

    if (clicks <= 0) {
        fruitImg.src = "../imgs/extras/interrogacao.png";
    }

    mcount.textContent = fruits[currentFruitIndex]?.power + "X";

    saveGame();
}


// clique da fruta
fruitImg.addEventListener("click", () => {
    clicks += fruits[currentFruitIndex].power;
    countText.textContent = clicks;
    updateFruit();
});

// tutorial
tutorialbtn.addEventListener("click", () => {
    window.open("../tutorial.html", "_blank");
});


// CONFIG PANEL BUTTONS
openConfig.addEventListener("click", () => {
    configPanel.style.display = "block";
});

closeConfig.addEventListener("click", () => {
    configPanel.style.display = "none";
});

saveFileBtn.addEventListener("click", downloadSave);

importBtn.addEventListener("click", () => {
    if (importFile.files.length > 0) {
        importSave(importFile.files[0]);
    }
});

resetBtn.addEventListener("click", resetGame);


// inicialização
loadGame();
updateFruit();
