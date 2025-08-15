"Bug Buster: Crush the bugs, sharpen your typing — can your fingers keep up?"

1. GAME OVERVIEW :-

| Attribute       | Description                                                               |
|-----------------|---------------------------------------------------------------------------|
| Game Title      | Bug Buster                                                                |
| Genre           | Typing Arcade                                                             |
| Platform        | Web-based (Playable in browsers)                                          |
| Target Audience | Kids, teens, and anyone who enjoys fast-paced typing challenges           | 
| Game Mode       | Single-player                                                             |

Short Description:
Bug Buster is a fast-paced web-based typing game where players must quickly type the words attached to falling bugs before they hit the bottom of the screen. Each correct word earns points, but a miss or a wrong input costs a life. The game starts easy but becomes increasingly intense as the speed of the bugs increases with your score. With only 3 lives, players must stay sharp and type fast to climb the leaderboard. It's a thrilling mix of reflexes, focus, and keyboard skills — perfect for improving typing speed in a fun way!


2. GAMEPLAY MECHANICS :-

- Controls:
The game is controlled entirely using the keyboard. Players must type the words shown on the falling bugs accurately to eliminate them. No mouse or touchscreen interaction is needed.

- Objective:
The goal of Bug Buster is to type as many correct words as possible before losing all 3 lives. Words appear attached to bugs that slowly fall from the top of the screen. Players must quickly type the full word to eliminate the bug before it reaches the bottom or they risk losing a life.

The words are randomly selected with no specific theme, adding variety and unpredictability to gameplay.

- Countdown Before Game Start:
Before gameplay begins, a "3...2...1...GO!" countdown is displayed in the center of the screen, accompanied by tick sounds and a final "GO!" sound.
This builds anticipation and gives players a moment to prepare before the bugs start falling.

- Lives System:
Players start with 3 lives. A life is lost in two situations:

If the player types the word incorrectly.
If the bug reaches the bottom of the screen without being typed.

- Score System:
Each correctly typed word gives 10 base points.
The game features a dynamic streak-based scoring system:
For every correct word typed consecutively, the streak count increases.

A bonus is added for each streak:
Points = 10 + current streak
Example: If you're on a 4-word streak, you'll get 10 + 4 = 14 points for the next word.
If a bug falls without being typed, the streak is reset to 0.

The score increases faster with longer correct streaks, encouraging continuous accuracy.

Streak Display:
The current streak is shown live in the scoreboard, highlighted in yellow to motivate players to maintain accuracy.

- Leveling and Speed Increase:
The maximum speed cap is 2 sec after which the words generation speed increases gradually.

- High Score Tracking:
The game will store the highest score achieved by the player in the browser using localStorage.
After each game session, the player’s current score will be compared with the saved high score.
If the current score is higher, it updates the stored high score.
The high score will be displayed on the Start Screen and Game Over Screen.

- Leaderboard System:
A Top 3 Leaderboard is shown on the Game Over screen.
The leaderboard fetches and displays the top scores from a Firebase backend.
Each entry shows the player's name and score, sorted in descending order.
Only scores greater than 0 are stored, and only if the player has entered their name before starting.
This leaderboard allows players to compare their performance and aim for higher ranks in future sessions.

- Game Over Condition:
The game ends when all 3 lives are lost.
The final score is displayed, and the player has the option to restart the game and try again.


3. STORY AND CHARACTERS :-

🐛 Story:
In a futuristic digital world, the system is under attack by rogue bugs that have glitched out of control. These bugs aren’t creepy crawlies — they’re colorful circular invaders, each carrying a word that must be typed to destroy them.

As the elite Bug Buster, your mission is to eliminate the threat before it crashes your system. The bugs fall from the top of the screen, and with each rising score, their speed increases. Make a mistake, or let one slip past, and you lose a life. It’s a typing test like no other — accuracy and speed are your only weapons.

👾 Enemies (The Bugs):
Bugs are simple colored circles, each with a word on it.
Their speed increases as the player progresses, making them harder to defeat.
Visual simplicity keeps the focus on the challenge of fast typing.

🧑‍💻 Player:
The player takes on the role of a Bug Buster — an anonymous system defender.
The game does not use a named or visual character; the focus remains on the typing experience and reaction speed.


4. ART AND VISUALS :-

🖼️ Art Style:
The game features a minimalist, flat 2D art style, with a focus on simplicity and readability.
The design is optimized for clarity and speed, which aligns well with the typing-focused gameplay.
The background is clean and non-distracting to help players concentrate on the falling word-bugs.

🐞 Bug Design:
Bugs are represented as colored circular shapes.
Each circle contains a randomly selected word displayed in a bold, legible font.


💻 UI Elements:
Scoreboard: Positioned at the top right , updates in real-time.

Lives Indicator: Shows remaining lives . 

Start / Restart Button: Simple rectangular buttons for game control.

Typing Input Box: Optional or automatic based on real-time typing (depends on your implementation).

Fonts are clear and sans-serif to enhance legibility.

🎨 Color Palette:
Bright, high-contrast colors for bugs (Red) to make them visually distinct.
Black background with stars , fells like a dark sky.
UI colors complement the bug colors without overwhelming the screen.

🔄 Animations:
Bugs fall smoothly from the top of the screen with increasing speed.
Words fade on correct typing .
Life loss or game over animations are added to enhance feedback.


5. AUDIO DESIGN :-

Background Music:
The game features light, energetic background music that adds excitement without distracting the player from typing. The music helps maintain a fast-paced, engaging atmosphere throughout the game.

Sound Effects:

Correct Word Typed: A satisfying "pop" sound plays to reward accuracy.
Game Over: A dramatic sound effect plays when all lives are lost, followed by a brief pause before restart.
A special sound plays when the player beats their session high score during gameplay.

Audio Tools or Sources Used:

All sound effects were sourced from Pixabay.com and integrated using a custom useSound.js hook in React.

-> Countdown now includes **tick-tock sounds** and a final "GO!" sound before gameplay starts.
-> Updated start screen background sound to better fit the typing theme.



6. TECHNICAL DETAILS :-

- Languages & Technologies Used:
The game is developed using React (JSX) with styling done via Tailwind CSS. JavaScript handles game logic and interactivity, while sound integration is managed using a custom useSound.js hook.
Firebase Firestore – For real-time leaderboard data storage and retrieval.

- Frameworks / Libraries:

React.js – Component-based UI structure

Tailwind CSS – Utility-first CSS framework for design

Vite – Fast build tool and dev server

PostCSS – For processing Tailwind CSS

ESLint – For code linting and quality

Custom sound hook (useSound.js) – Manages sound playback

Firebase SDK – Used to fetch and store scores in Firestore for the leaderboard.

- Folder Structure 
public/
  Sounds/       -> Game audio files
src/
  assets/       -> Game images and other media
  components/   -> UI components 
  data/         -> Word lists or static data
  game/         -> Core game logic and functions
  App.jsx       -> Main app structure
  main.jsx      -> Entry point
  App.css / index.css -> Styling files

- Build Tools & Config Files:

vite.config.js – Build configuration

tailwind.config.js – Tailwind setup

eslint.config.js – Code style rules

postcss.config.js – CSS processing

- Game Resolution & Responsiveness:
The game is designed to be responsive across screen sizes. While no fixed resolution is enforced, the layout scales for desktops and adjusts for mobile where applicable.

Browser Compatibility:

Tested on Chrome and Safari .


7. DEVELOPMENT TIMELINE :-

The development of Bug Buster followed a progressive feature-based approach. Instead of strict deadlines, work was completed in logical phases focused on functionality, visual appeal, and gameplay refinement.

| Phase              | Tasks Completed                                                      |Status        | 
| ------------------ | -------------------------------------------------------------------- |------------- |
| 1.Initial Setup     | Project structure, Vite + React setup, Tailwind integration         | ✅Complete    |
| 2.Core Game Logic   | Bug generation, falling animation, word matching, life/score system | ✅Complete    |
| 3.UI Implementation | Scoreboard, life bar, start/game over screens, basic layout         | ✅Complete    |
| 4.Visual Styling    | Bug design (circular), background, responsive layout adjustments    | ✅Complete    |
| 5.Audio Integration | Sound effects for correct word, life loss, and game over            | ✅Complete    |
| 6.Responsiveness    | Basic mobile support, flexible scaling                              | 🔄 InProgress |
| 7.Testing & Tweaks  | Bug fixing, feedback-based polish, minor adjustments                | 🔄 InProgress |
| 8.GDD Creation      | Full documentation of game design and technical flow                | 🟡Ongoing     |



8. ASSETS USED :-

🖼️ Visual Assets
- Bug Design: Colored circular bugs generated via CSS or SVGs.
              No complex sprites used; minimal and clean design.

- UI Elements: Scoreboard and lives indicator built with Tailwind CSS and React components.
               Buttons (Start, Restart) are custom-styled with Tailwind.

- Backgrounds & Effects: Background visuals are simple and possibly CSS-based.
                         No heavy images or canvas-based rendering.

🎶 Sound Assets
- Correct Word Typed: Click/pop sound for typing success.

- Life Lost: Alert or buzzer sound.

- Game Over: Dramatic short end sound.

-> All sounds are located in public/Sounds/folder.

🔧 Tools Used
Vite – Build and dev server

React – Component-based UI

Tailwind CSS – Utility-first design system

Custom Hooks – useSound.js to manage audio playback

VS Code – Development environment

GitHub – Version control and collaboration


9. TESTING AND FEEDBACK :-

✅ Testing Methods
The game was tested through manual play sessions in web browsers on different dimensions.
Console logging and DevTools were used for debugging, and real-world testing was done by the developer and peers to evaluate usability and performance.

💬 Feedback Summary
- Positive:
 Typing challenge is fun and helps improve speed
 Smooth animations and simple UI
 Gameplay feels satisfying and rewarding

- Suggestions for Improvement:
  Add visible levels or increasing difficulty indicators
  Include feedback animations (e.g., screen shake, bug flash)
  Improve mobile typing experience and responsiveness

🛠️ Changes Made Based on Feedback :
Balanced bug speed progression for smoother difficulty
Enhanced score and life display in the UI
Added sound effects for feedback and immersion
Implemented global leaderboard using Firebase to increase competition and replayability.


10. FUTURE SCOPE :-

To keep Bug Buster evolving and engaging, the following features are planned or under consideration for future development:

- Leaderboard System: Track and display high scores locally or globally (Implemented).

- Level-Based Progression: Add visual stages or themes with milestones.

- Bug Variety: Introduce bugs with different speeds, behaviors, or word types.

- Typing Themes or Word Packs: Categories like animals, food, space, etc.

- Mobile Optimization: Fully responsive typing input and touch-friendly UI.




