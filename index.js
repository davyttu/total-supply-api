// Importer le module express
const express = require('express');

// Créer une instance de l'application express
const app = express();

// Utiliser une variable pour récupérer le port (Vercel assigne dynamiquement un port)
const port = process.env.PORT || 3000; // Si aucune variable d'environnement pour le port n'est définie, utiliser 3000

// Route API pour récupérer le total supply de ton contrat
app.get('/total-supply', (req, res) => {
    // Remplace cette valeur par la supply réelle de ton contrat
    const totalSupply = 1000000000; // Exemple : total supply de ton token (à remplacer par la vraie valeur de ton contrat)
    
    // Retourner la valeur au format JSON
    res.json({ totalSupply: totalSupply });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
