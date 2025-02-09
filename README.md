# Mario Party Random 🍄
![Roulette de choix aléatoire](/assets/docs/banner.PNG)

## 📱 Contexte
Mario Party Random est une application mobile développée en React Native avec Expo.

L'application vous permet de choisir un plateau de jeu aléatoire parmi les 7 disponibles.


## ✨ Fonctionnalités attendues
- Choisir un plateau de jeu aléatoire parmi les 7 disponibles
- Voir tous les plateaux de jeu disponibles

## 📁 Architecture du projet

```bash
mario-party-random/
├── package.json
├── README.md
├── index.js
├── App.js
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── game-logo.png
│   ├── splash-icon.png
│   ├── board-icons/
│   ├── board-view/
│   ├── fonts/
│   └── sounds/
├── constants/
│   ├── boards.js
│   └── sounds.js
├── store/
│   └── store.js
├── components/
│   ├── AppLoading.jsx
│   ├── AnimatedBackground.jsx
│   ├── CarouselRandom.jsx
│   ├── BoardsList.jsx
│   ├── PressableButton.jsx
│   └── board/
│       └── BoardCard.jsx
└── hooks/
    └── usePreloadSounds.js
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

Développé par Benoit Parmentier - contact@benoitparmentier.fr