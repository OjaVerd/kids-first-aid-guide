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
- Condition data loaded asynchronously from a local JSON file
- Search to filter conditions as you type
- Detail view for each condition, with emergency signs listed first
- Loading and error states for the data fetch
- Responsive layout using CSS Grid and Flexbox
- Semantic HTML, labeled form controls, and keyboard-visible focus styles
- Save conditions to a personal list using localStorage *(remove if not built)*


## Project Structure
```
index.html           Page structure
style.css            Styles
script.js            Fetching, search, and rendering
data/conditions.json Condition content
```

## Data Source Credits
Condition content in `data/conditions.json` was written in my own words
based on guidance from the following sources:

- American Academy of Pediatrics (HealthyChildren.org): 

This project is not affiliated with or endorsed by the American Academy
of Pediatrics.