# Mario Party Random 🍄
![Roulette de choix aléatoire](/assets/docs/banner.png)

## 📱 Contexte
Mario Party Random est une application mobile développée en React Native avec Expo.

L'application vous permet de choisir un plateau de jeu aléatoire parmi les 7 disponibles.


## ✨ Fonctionnalités
- Choisir un plateau de jeu aléatoire parmi les 7 disponibles
- Voir tous les plateaux de jeu disponibles
- Avoir une UX agréable et bien pensée
- Avoir un design qui rappelle l'univers de Mario Party
- Des animations et des transitions fluides
- Des sons pour une expérience immersive (roulette, boutons, sélection de plateau, ...)
- Retours haptiques aux actions clés (boutons, sélection de plateau, ...)

## 📁 Architecture du projet

Voici l'architecture des fichiers du projet
```bash
mario-party-random/
├── index.js
├── App.js
├── assets/ # Contient les assets du projet (images, sons, polices)
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── game-logo.png
│   ├── splash-icon.png
│   ├── board-icons/
│   ├── board-view/
│   ├── fonts/
│   └── sounds/
├── constants/ # Contient les constantes du projet (plateaux de jeu, sons)
│   ├── boards.js
│   └── sounds.js
├── store/
│   └── store.js # Store Zustand pour la gestion de l'état global
├── components/
│   ├── AppLoading.jsx
│   ├── AnimatedBackground.jsx
│   ├── about/
│   │   └── AboutModal.jsx # Modal d'infos sur l'application
│   ├── board/
│   │   ├── BoardsList.jsx # Liste des plateaux de jeu
│   │   └── BoardCard.jsx # Carte d'infos d'un plateau de jeu
│   ├── button/
│   │   └── PressableButton.jsx # Bouton dans le style de Mario Party 
│   ├── carousel/
│   │   └── CarouselRandom.jsx # Carousel pour choisir un plateau de jeu aléatoire
│   └── icons/ # Icônes SVG
│       ├── GitHubIcon.jsx
│       ├── GlobeIcon.jsx
│       └── LinkedInIcon.jsx
├── hooks/
│   └── usePreloadSounds.js # Hook pour précharger les sons
└── utils/
    └── selectRandom.js # Fonction pour choisir un élément aléatoire dans un tableau
```

## ⚡️️ Prérequis
Vous devez avoir NodeJS en version 20 ou supérieure installé sur votre machine.

## 🚀 Installation et lancement du projet

Clonez le projet sur votre machine locale :
```bash
git clone https://github.com/BenoitPrmt/mario-party-random.git
cd mario-party-random
```

Installez les dépendances avec NPM :
```bash
npm install
```

Lancez le projet :
```bash
npm run start
```

Ensuite, vous pouvez tester le projet sur votre téléphone en scannant le QR Code et en testant via l'application Expo Go.

Développé par Benoit Parmentier - contact@benoitparmentier.fr