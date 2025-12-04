let nataldata = new Date("2025-12-20"); // início do tema
let fimNatal = new Date("2025-12-30");  // fim do tema
let hojeData = new Date();

let natalJaAplicado = localStorage.getItem("update-natal-2025");

// Ativa primeira vez
function natalUpdate() {
    document.body.style.color = "#d9d9d9";
    document.body.style.background = "#c0392b33";
    addNatalImages();
}

// Mantém ativo
function manterNatal() {
    document.body.style.color = "#e0e0e0";
    document.body.style.background = "#c0392b55";
    addNatalImages();
}

// Remove tudo e volta ao normal
function tirarNatal() {
    document.body.style.color = "";
    document.body.style.background = "";

    const decor = document.getElementById("natal-decor");
    if (decor) decor.remove();

    localStorage.removeItem("update-natal-2025");
}

// Imagens
function addNatalImages() {
    if (document.getElementById("natal-decor")) return;

    const div = document.createElement("div");
    div.id = "natal-decor";
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.pointerEvents = "none";

    div.innerHTML = `
        <img src="../imgs/natal/bone-de-natal.png" style="position:absolute; left:20px; top:20px; opacity:0.9;">
        <img src="../imgs/natal/arvore-de-natal.png" style="position:absolute; right:20px; top:20px; opacity:0.9;">
    `;

    document.body.appendChild(div);
}

// Lógica principal
function checkNatalUpdate() {

    // Se passou do dia 30/12 → desativa
    if (hojeData > fimNatal) {
        tirarNatal();
        return;
    }

    // Se já tinha ativado antes → mantém
    if (natalJaAplicado) {
        manterNatal();
        return;
    }

    // Se chegou o dia → ativa
    if (hojeData >= nataldata) {
        natalUpdate();
        localStorage.setItem("update-natal-2025", "true");
    }
}

// Chama no início
checkNatalUpdate();
