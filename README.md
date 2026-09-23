# Type Strike

Type Strike is a single-player browser typing game built with React and Vite. Words fall down the screen inside red circles, and you destroy each one by typing it and pressing Enter before it reaches the bottom. You have three lives. Falling words speed up as your score rises, and when a game ends your score is saved to a Firestore collection that feeds a top-3 leaderboard.

Live demo: https://type-strike-eight.vercel.app

## Features

- Name prompt before each run, then a 3-2-1-GO countdown with tick and "go" sounds.
- A new word spawns every 4 seconds. Words come from the `random-words` package.
- Each word's fall time is `max(2, 20 - score * 0.1)` seconds, so words fall faster as your score goes up.
- Scoring: each correct word is worth `10 + streak` points. A word that reaches the bottom costs a life and resets the streak. A submitted word that matches nothing on screen also costs a life, but the streak is kept.
- Pause and resume with Escape. The game also pauses by itself when the browser tab is hidden (`visibilitychange`).
- Pause menu with Resume, Restart, Quit and a sound toggle.
- Sound effects for pop, miss, pause and game over, background music, a lobby track on the start screen, and a one-time sound when you beat your session high score.
- Session high score kept in React state (it resets when the page reloads).
- Game-over screen that shows the top 3 scores from Firestore.

## Tech stack

- React 18, Vite 5
- Tailwind CSS 3 (with PostCSS and Autoprefixer)
- Firebase JS SDK 12 (Cloud Firestore only)
- `random-words` for word generation
- Deployed on Vercel

## How it works

- `src/main.jsx` mounts `App`, which renders `src/game/TypingGame.jsx`. All game state lives in that one component: words on screen, input, score, lives, streak, high score, pause state and game phase (`start`, `playing`, `gameover`).
- `src/components/StartScreen.jsx` asks for the player's name and passes it back through `setPlayerName`.
- `src/components/Bug.jsx` draws one falling word. The movement is a CSS `fall` animation whose length comes from the fall-time formula above. The `animationend` event calls `onFallComplete`, which removes the word and takes a life. Pausing sets `animation-play-state: paused`.
- `handleSubmit` in `TypingGame.jsx` compares the trimmed, lowercased input with the words on screen and either removes the matching word and adds points, or takes a life.
- `src/useSound.js` is a small hook that wraps an `HTMLAudioElement` with `play` and `stop` methods.
- `src/components/ScoreBoard.jsx`, `InputBox.jsx` and `PauseMenu.jsx` are presentational components.

### Leaderboard data flow

The leaderboard is not live. It does no real-time syncing and uses no `onSnapshot` listeners:

1. **Write, once per game.** When `lives` reaches 0, an effect in `TypingGame.jsx` calls `saveScore(name, score)` in `src/utils/saveScore.js`, but only if a name was entered and the score is above 0. That function runs `addDoc` on the `scores` collection with `{ name, score, timestamp: serverTimestamp() }`.
2. **Read, once per game-over screen.** `src/components/LeaderBoard.jsx` runs one `getDocs` query on mount: `scores` ordered by `score` descending, `limit(3)`.

`src/firebase.js` sets up the Firebase app and exports the Firestore instance.

## Running locally

Requires Node.js and npm.

```bash
npm install
npm run dev       # start the Vite dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

No environment variables are read. The Firebase web config is written directly into `src/firebase.js`. To use your own Firebase project, create a Firestore database, then replace the values in that file with your project's config:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Known limitations / next steps

- There are no automated tests, and no `test` or `lint` script in `package.json` (an `eslint.config.js` exists, but ESLint is not a dependency).
- The Firebase config is hardcoded. Moving it to `VITE_FIREBASE_*` environment variables would make it easier to point at a separate dev project.
- Anyone can write scores. There is no authentication and no server-side check, and the repo contains no Firestore security rules, so any client can write any name or score to `scores`.
- Player names are only checked for being non-empty. There is no length limit and no filtering.
- The leaderboard loads once. It does not refresh while the game-over screen is open.
- High scores are not saved between visits. Only the Firestore leaderboard survives a page reload.
- There is no touch or mobile input handling beyond the plain text field.
- Leftover code: `src/components/GameOver.jsx` is never imported (the game-over screen is rendered inline in `TypingGame.jsx`), and `src/data/wordList.js` is empty. `useSound` is passed an `interrupt` option that it ignores, and the combo sound is loaded but never played.
- `GDD.md` still uses the game's earlier name, "Bug Buster", and the npm package is still named `bugbuster`.
