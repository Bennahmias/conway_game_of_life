# Conway's Game of Life

This is an implementation of Conway's Game of Life built with **JavaScript**, **React**, and **Vite**.

## 📦 Installation

To run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Bennahmias/conway_game_of_life.git
cd conway_game_of_life
```
### 2. Install
```bash
npm install
```
### 3. Run
```bash
npm run dev
```
This will start the app at http://localhost:5173/ 

## ✅ Features

- ✔️ Default **40×40** grid
- ✔️ Ability to change grid size (20×20, 40×40, 60×60, or custom)
- ✔️ Start / Stop simulation
- ✔️ Clear and Randomize grid
- ✔️ Click to toggle individual cells when simulation is stopped
- ✔️ Speed control slider (1× to 30×)
- ✔️ Pattern library with at least 5 classic patterns (e.g., Glider, Lightweight Spaceship, Toad, Beacon, Pulsar)
- ✔️ Grid can be customized and extended for future save/restore functionality
 ---
## 🧰 Requirements

Make sure you have the following installed:

- **Node.js** v14 or higher — [Download Node.js](https://nodejs.org/)
- **npm** v6 or higher

---

##📁 Project Structure
```
conway_game_of_life/
├── public/                      
├── src/
│   ├── Components/
│   │   └── game-of-life/
│   │       ├── controls/
│   │       │   ├── SimulationControls.jsx
│   │       │   └── SpeedSlider.jsx
│   │       ├── hooks/
│   │       │   └── useGameLogic.js
│   │       ├── Grid.jsx
│   │       ├── GridSizeControl.jsx
│   │       ├── PatternExamples.js
│   │       ├── PatternLibrary.jsx
│   │       └── StatsPanel.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── GameOfLife.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── eslint.config.js
└── README.md
```

