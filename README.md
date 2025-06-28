# Helsinki XR Center – Coding Task 2025

## Tarot Card App – UI/UX Improvements & Game Concepts

### Changes Made to the Existing Tarot Card App

- Moved the "Deal" buttons to the center and scaled them up for easier interaction.
- Centered the deck and positioned it at the top of the screen.
- Created a grid layout for dealt cards and added a hover animation effect.
- Changed overall colour scheme to match the cards.

### Suggestions for Further UI/UX Improvements

- Display card names underneath each dealt card.
- Show additional card information (e.g., stats, facts, or descriptions) when a card is clicked or pressed.
- Add a discard pile visual effect for removed cards.
- Implement drag-and-drop discard functionality, along with a "Discard All" button.
- Convert image assets to lightweight formats like `.webp` to minimize load times.
- Include user settings to toggle animations for better performance or accessibility.
- Add music 

## Gamification Concepts

### 🧠 Memory Game (Beginner)

- Display 12 cards in a grid (6 pairs of matching Arcana cards).
- The user must match all pairs within 10 turns.
- Every second level reduces the number of available turns by one.

### ♠️ Suit Collector (Intermediate)

- A suit (Wands, Cups, Swords, or Pentacles) is randomly selected at the start.
- The user must draw and collect all cards of the selected suit before the deck runs out.
- The user can draw 1–7 cards per turn.
- A discard pile shows only the top card.
- Once per turn, the user may retrieve the top discard card.
- Cards from the selected suit go into a “suit pile”; others go into the discard pile.
- Score is based on how many cards are left in the deck when the suit is completed.

**Bonus Twist**: The 22 non-suited cards could introduce wildcard effects (e.g., reshuffle the deck, lose your current hand, draw bonus cards, etc.).

---

This task is intended to evaluate your frontend skills and understanding of interaction design, UI/UX, and code structure in a Three.js + React environment. 
You will enhance an existing Tarot card deck viewer and improve its functionality and feel. 

> **Note:** This task is designed to be completed in **3–5 hours**.  
> It should **not** take a full working day.  
> Please prioritize clarity and interactivity over polish or completeness.


Setup Instructions:
1. Clone the repository: 
	https://gitlab.com/hxrc_public/hxrc_codetask_2025 
2. Install dependencies and run the app locally:
	npm install
	npm run dev
3. You can preview the current application functionality at:  
	https://xrdev.edu.metropolia.fi/hxrc_codetask_2025 

Coding Tasks:
1. Create a better UI for the Tarot card application.
	• Use your preferred styling method (CSS, styled-components, Tailwind, etc).
	• Ensure responsive layout and a user-friendly experience on 
	desktop and mobile
2. Improve the shuffling logic.
	• Ensure that each deal gives a truly randomized result.
	• Avoid predictable orders after shuffling.

3. Add a hover effect for dealt cards only.
	• Implement the logic in: /src/animations/hovercard.js
	• Cards should animate forward when hovered, improving visibility.

4. Enhance the README file:
	• Explain how you would improve the overall user experience.
	• Propose ideas on how to gamify the Tarot app if given a 
	full week to develop.

5. Submit your task: 
	• Upload your code to a repository (GitHub, GitLab, etc).
	• Deploy the final app using a service like Vercel, Netlify, or GitHub Pages.
	• Share both the repository link and the live demo link. 

Questions? If you have any questions about the task, please contact:
Juho Puurunen – juho.puurunen@metropolia.fi