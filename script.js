// Configuration et sélection des éléments du DOM
const btnObtenir = document.getElementById('btn-obtenir');
const recipeContainer = document.getElementById('recipe-container');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let recettesData = [];

// 1. Chargement des données JSON
async function chargerRecettes() {
    try {
        const response = await fetch('recettes.json');
        const data = await response.json();
        recettesData = data.recettes;
    } catch (error) {
        console.error("Erreur lors du chargement du JSON :", error);
        alert("Impossible de charger les recettes pour le moment.");
    }
}

// 2. Fonction pour afficher une recette aléatoire
function afficherRecetteAleatoire() {
    if (recettesData.length === 0) return;

    const randomIndex = Math.floor(Math.random() * recettesData.length);
    const recette = recettesData[randomIndex];

    document.getElementById('recipe-title').textContent = recette.nom;
    document.getElementById('recipe-image').src = recette.image || 'https://via.placeholder.com/600x550?text=Image+indisponible';
    
    const ingredientsList = document.getElementById('recipe-ingredients');
    ingredientsList.innerHTML = recette.ingredients
        .map(ing => `<li>${ing}</li>`)
        .join('');

    const instructionsDiv = document.getElementById('recipe-instructions');
    if (Array.isArray(recette.instructions)) {
        instructionsDiv.innerHTML = recette.instructions
            .map(step => `<p class="mb-2">${step}</p>`)
            .join('');
    } else {
        instructionsDiv.textContent = recette.instructions;
    }

    const videoBtn = document.getElementById('recipe-video');
    if (recette.lien) {
        videoBtn.href = recette.lien;
        videoBtn.style.display = 'inline-block';
    } else {
        videoBtn.style.display = 'none';
    }

    recipeContainer.classList.remove('fade-in');
    void recipeContainer.offsetWidth;
    recipeContainer.classList.add('fade-in');

    recipeContainer.style.display = 'block';
    recipeContainer.scrollIntoView({ behavior: 'smooth' });
}

// 3. Gestion du mode Sombre
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
    
    themeIcon.classList.add('rotate-icon');
    setTimeout(() => themeIcon.classList.remove('rotate-icon'), 500);

    if (document.body.classList.contains('bg-dark')) {
        themeIcon.textContent = '🌙';
        recipeContainer.style.backgroundColor = '#333';
        recipeContainer.style.borderColor = '#444';
    } else {
        themeIcon.textContent = '☀️';
        recipeContainer.style.backgroundColor = '#F2F2F2';
        recipeContainer.style.borderColor = '#ccc';
    }
});

btnObtenir.addEventListener('click', afficherRecetteAleatoire);

chargerRecettes();