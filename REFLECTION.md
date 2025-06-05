🧠 Reflection Document

🛠️ Tool Used

Name of the tool: ChatGPT-4o and GitHub CopilotWhy you selected it:I chose ChatGPT-4o because I wanted help generating clean and functional code quickly, and to get support in debugging and improving design. I tried GitHub Copilot because it's integrated into my editor and can generate suggestions on the fly. However, because I only have the free version, Copilot was not as helpful. ChatGPT ended up being the main tool I used to complete my work.

💬 Prompting Strategy

✅ Prompts that worked well:

"can we Implement basic ability to save and restore board states (to/from some storage)"→ This prompt worked well because it was focused and clearly described a feature I wanted to add. The tool provided a full implementation using localStorage.

"its not working! every time i press on the grid and add cells and than press start all my added cells disappears"→ Although written emotionally, this prompt led to a correct diagnosis of the issue and a good fix using gridRef.

"i want the controls will be smaller"→ This prompt got a practical and quick UI/UX improvement using CSS.

❌ Prompts that misfired:

"instead can we use only CSS and not Tailwind? it will be more easy"→ At first the tool tried to explain Tailwind instead of giving raw CSS, so it took a few tries to get a full replacement.

"nothing works, what to provide you"→ This was too vague and emotional. The tool asked for more info but didn’t help until I gave more context.

📊 Tool Evaluation

👍 Strengths:

Very helpful with generating specific React code, especially state management and hooks.

Was great for converting Tailwind to pure CSS when requested.

Clear explanations of bugs and code behavior.

👎 Weaknesses:

Sometimes repeats itself or gives over-complicated solutions.

Occasionally forgets earlier parts of the conversation.

📌 Where it helped most / fell short:

Helped most: logic bugs and UX styling.

Fell short: real-time debugging (e.g., canvas updates not appearing).

⛔ Limitations:

GUI layout suggestions were good but needed tweaking.

Could not fully debug issues without full context/code from me.

🔁 Iterations:

I had many iterations, probably more than 15 turns, because sometimes the tool would hallucinate or misunderstand the issue.

💻 Code Quality

🔧 Manually improved or rewrote:

I fixed repeated logic in the simulation runner and cleaned up some of the CSS classes and structure.

🧱 MVC Pattern:

My project loosely follows MVC:

Model: the state in useGameLogic

View: the components like Grid, StatsPanel, etc.

Controller: logic functions like runSimulation, toggleCell, etc.

🧩 Modularity, naming, structure, logic:

Code is mostly modular thanks to custom hooks and components.

Naming is clear but could be more consistent.

Logic is clean but needed some state syncing improvements using refs.

