document.getElementById("clientForm").addEventListener("submit", function(event) {
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const error = document.getElementById("error");

    if (!nom || !prenom || !email || !telephone || !adresse) {
        event.preventDefault();
        error.textContent = "Tous les champs obligatoires doivent être remplis.";
    } else {
        error.textContent = "";
    }
});

// Fonction pour valider le champ 'Nom'
function validateNom() {
    const nom = document.getElementById("nom").value.trim();
    if (nom.length < 2) {
        displayError("Le nom doit contenir au moins 2 caractères.");
    } else {
        clearError();
    }
}

// Fonction pour valider le champ 'Prénom'
function validatePrenom() {
    const prenom = document.getElementById("prenom").value.trim();
    if (prenom.length < 2) {
        displayError("Le prénom doit contenir au moins 2 caractères.");
    } else {
        clearError();
    }
}

// Fonction pour valider le champ 'Email'
function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        displayError("L'email n'est pas valide.");
    } else {
        clearError();
    }
}

// Fonction pour valider le champ 'Téléphone'
function validateTelephone() {
    const telephone = document.getElementById("telephone").value.trim();
    const regex = /^[0-9]{10}$/;
    if (!regex.test(telephone)) {
        displayError("Le numéro de téléphone doit contenir 10 chiffres.");
    } else {
        clearError();
    }
}

// Fonction pour valider le champ 'Adresse'
function validateAdresse() {
    const adresse = document.getElementById("adresse").value.trim();
    if (adresse.length < 5) {
        displayError("L'adresse doit contenir au moins 5 caractères.");
    } else {
        clearError();
    }
}

// Fonction pour valider le champ 'Type de Client'
function validateTypeClient() {
    const typeClient = document.getElementById("type_client").value;
    if (!["particulier", "entreprise", "vip"].includes(typeClient)) {
        displayError("Type de client invalide.");
    } else {
        clearError();
    }
}

// Fonction pour valider le champ 'Date de Naissance'
function validateDateNaissance() {
    const dateNaissance = document.getElementById("date_naissance").value;
    if (!dateNaissance) {
        displayError("Veuillez sélectionner une date de naissance.");
    } else {
        clearError();
    }
}

// Afficher un message d'erreur
function displayError(message) {
    const errorElement = document.getElementById("error");
    errorElement.textContent = message;
}

// Effacer les messages d'erreur
function clearError() {
    const errorElement = document.getElementById("error");
    errorElement.textContent = "";
}
