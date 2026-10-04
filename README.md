# Kids First Aid Guide

## Description
A small, mobile-friendly web app that helps parents look up first aid
guidance for common minor childhood injuries and illnesses. Users can
search a list of conditions and open one to see when to call 911, the
first aid steps, and warning signs that mean it's time to seek medical
care.

Built with plain HTML, CSS, and JavaScript (no frameworks) for now. Will add
frameworks later.

> **Medical disclaimer:** This project provides general information only
> and is not a substitute for professional medical advice. In an
> emergency, call 911.

### Features
- Loads condition data asynchronously from a local JSON file

- Search bar filters conditions instantly as you type

- Dedicated detail page for each condition

- Shows loading, not‑found, and error states during data fetch

- Responsive layout using CSS Grid and Flexbox

- Semantic HTML structure with accessible labels and visible keyboard focus

- Save/remove conditions using localStorage

- “My saved conditions” list with remove buttons



## Project Structure
```
index.html           Main condition list page
condition.html       Single condition detail page
style.css            App styling and layout
script.js            Search + list rendering
condition.js         Load and display one condition
saved.js             LocalStorage saving logic
data/conditions.json Condition data
```

## How to Run
The app loads a local JSON file with `fetch()`, so it must be served over
HTTP. 

**Option 1: VS Code Live Server**
1. Clone the repo and open the folder in VS Code.
2. Install the Live Server extension.
3. Right-click `index.html` and choose **Open with Live Server**.


Then open http://localhost:8000.

## Data Source Credits
Condition content in `data/conditions.json` was written in my own words
based on guidance from the following sources:

- American Academy of Pediatrics (HealthyChildren.org)

This project is not affiliated with or endorsed by the American Academy
of Pediatrics.

## AI assistance Disclosure
There was Ai assistance used to scalp the website of HealthyChildren.org as well as the development of
this program. Specifically with knowing the best color combinations for css