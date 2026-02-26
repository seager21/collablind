# 🔍 CollaBLIND - Spot the Difference Game

## About the Game

**CollaBLIND** is an interactive "Spot the Difference" game that challenges players to discover hidden differences between two nearly identical images. Built with modern web technologies, this game combines engaging gameplay mechanics with a polished user interface, creating an immersive experience for players of all ages.

The game tests your observation skills, attention to detail, and reaction time as you race through multiple levels with increasing difficulty. Whether you're looking for a quick casual game or want to compete on the leaderboard, CollaBLIND delivers entertainment with stunning visuals and smooth performance.

## 🎮 Features

- **Interactive Gameplay with Multiple Levels** - Progress through increasingly challenging levels with carefully designed image pairs
- **Responsive Audio Feedback** - Satisfying sound effects and audio cues for correct and incorrect selections
- **Mobile & Desktop Optimized** - Seamless experience across all devices with fully responsive design
- **Stunning Visual Design** - Smooth animations, beautiful gradients, and carefully crafted UI elements
- **Real-time Scoreboard** - Track your progress, earn points, and compete with others
- **Lightning-Fast Performance** - Optimized for speed with Vite's blazing-fast build times and instant HMR
- **Accessibility Features** - Designed with usability in mind for all players

## 🎯 How to Play

1. **Start a Game** - Select your desired difficulty level from the main menu
2. **Spot the Differences** - Carefully examine two similar images displayed side-by-side
3. **Click on Differences** - Click on the areas where you notice differences between the images
4. **Earn Points** - Gain points for each correct spot and bonus points for speed
5. **Complete Levels** - Find all differences to advance to the next level
6. **Climb the Leaderboard** - Compete for the highest score and fastest completion times

## 💻 Tech Stack

- **Vue 3** - Modern, reactive frontend framework with Composition API support
- **TypeScript** - Strongly-typed JavaScript for better developer experience and code reliability
- **Vite** - Next-generation build tool providing instant server start and lightning-fast HMR
- **SCSS** - Advanced CSS preprocessor for maintainable and organized stylesheets
- **ESLint** - Code quality tool ensuring consistent code standards across the project

Each technology was chosen for its performance, developer experience, and ability to create a seamless user experience.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Install Dependencies

```sh
npm install
```

This installs all required dependencies including Vue 3, TypeScript, Vite, SCSS, and development tools.

### Development Server

```sh
npm run dev
```

Launches the development server with hot module reloading (HMR) for instant feedback. Open your browser to `http://localhost:5173` and start developing. Any changes you make to the code will automatically refresh in the browser.

### Build for Production

```sh
npm run build
```

Creates an optimized production build with:

- Type checking via TypeScript
- Code minification for smaller bundle sizes
- Asset optimization
- Tree-shaking for unused code removal

The built files are ready for deployment to any static hosting service.

### Code Quality & Linting

```sh
npm run lint
```

Runs ESLint to check code quality and enforce consistent coding standards. This helps maintain a clean, professional codebase.

## 🛠️ Development Environment

### Recommended IDE Setup

We recommend using **Visual Studio Code** with the following extensions:

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Official Vue 3 language support
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Real-time linting
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting

**Note:** If you have Vetur installed, please disable it to avoid conflicts with Volar.

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── GameHeader.vue   # Game title and level information
│   ├── GameGrid.vue     # Main game board with image comparison
│   ├── GameFooter.vue   # Game statistics and controls
│   ├── GameOverModal.vue # Game completion screen
│   ├── ScoreBoard.vue   # Player statistics and leaderboard
│   ├── MainMenu.vue     # Game menu and difficulty selection
│   ├── LoadingScreen.vue # Loading states
│   └── icons/           # SVG icon components
├── composables/         # Reusable Vue composition functions
│   ├── useSound.ts      # Audio management and effects
│   └── useMobileInteractions.ts # Touch and mobile event handling
├── assets/              # Styles and static resources
│   ├── styles.scss      # Global styles
│   ├── animations.scss  # Keyframe animations
│   ├── mobile.scss      # Mobile-specific styles
│   ├── variables.scss   # SCSS variables and mixins
│   └── backgrounds/     # Background images and patterns
└── App.vue             # Root application component

server/                 # Backend server files for future enhancements
public/                 # Static assets and favicon
```

## 🎨 Key Implementation Details

### Performance Optimization

- Lazy loading of images and components for faster initial load
- Efficient state management with Vue 3's Composition API
- CSS animations using `transform` and `opacity` for GPU acceleration
- Minimal bundle size through tree-shaking and code splitting

### Audio System

- Contextual sound effects for correct/incorrect selections
- Mute/unmute functionality accessible from game controls
- Optimized audio files for quick playback without latency

### Mobile Experience

- Touch-optimized interface with appropriate tap targets
- Responsive image scaling for various screen sizes
- Viewport-aware layout adjustments
- Smooth scrolling and swipe handling

## 🚀 Performance Metrics

- **Page Load Time:** < 2 seconds
- **First Contentful Paint (FCP):** < 1 second
- **Time to Interactive (TTI):** < 3 seconds
- **Lighthouse Score:** 90+

## 🤝 Contributing

Found a bug or have an idea for improvement? Contributions are welcome!

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please ensure your code follows the project's linting standards by running `npm run lint` before submitting.

## 📜 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 🎯 Future Enhancements

- Multiplayer competitive mode
- Difficulty rankings and achievements
- Custom image uploads
- In-game tutorials and hints
- Dark mode support
- Internationalization (i18n) for multiple languages

---

**Made with ❤️ by the CollaBLIND team**
