// async/await = async = makes a function return a promise
//               await = makes an async function wait for a promise
                
//              Allows you write asynchronous code in a syncronous manner
//              Async doesn't have resolve or reject parameters
//              Everything after Await is placed in an event queue


// I want the page to pull information from the jsons and put it into seperate tabs that are minimized by default. someone searches for something then it will scroll
// down to the condition and give the information. 

// Get the data
// for each condition, make a panel,
// Make a user 
// a search bar with inputs
// allow typing of a condition
// match typing to condition
// page scrolls to condition and opens it
// detailed information at the condition

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const list = document.getElementById("condition-list");
const noResults = document.getElementById("no-results");
const count = document.getElementById("result-count");

let allConditions = [];

async function loadConditions() {
  try {
    const response = await fetch("data/conditions.json");
    if (!response.ok) {
      throw new Error("Status " + response.status);
    }
    allConditions = await response.json();
    buildPanels();
    filterPanels();
  } catch (err) {
    console.error(err);
    error.hidden = false;
  } finally {
    loading.hidden = true;
  }
}

function buildList() {
  list.replaceChildren();
  allConditions.forEach((c) => {
    const li = document.createElement("li");
    li.dataset.id = c.id;
 
    const link = document.createElement("a");
    link.href = "condition.html?id=" + encodeURIComponent(c.id);
    link.textContent = c.title;
 
    const summary = document.createElement("p");
    summary.textContent = c.summary;
 
    li.append(link, summary);
    list.appendChild(li);
  });
}

function makeSection(title, items, listTag) {
  const section = document.createElement("section");
  const heading = document.createElement("h3");
  heading.textContent = title;
  const ul = document.createElement(listTag);
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = typeof item === "object" ? item.title : item;
    ul.appendChild(li);
  });
  section.append(heading, ul);
  return section;
}

function buildPanels() {
  list.replaceChildren();
  allConditions.forEach((c) => {
    const li = document.createElement("li");
    const details = document.createElement("details");
    details.id = c.id;

    const summary = document.createElement("summary");
    summary.textContent = c.title;

    const text = document.createElement("p");
    text.textContent = c.summary;

    details.append(
      summary,
      text,
      makeSection("Call 911 or go to the ER if:", c.callEmergencyIf, "ul"),
      makeSection("First aid steps", c.steps, "ol"),
      makeSection("What to watch for", c.watchFor, "ul"),
      makeSection("Sources", c.sources, "ul")
    );
    li.appendChild(details);
    list.appendChild(li);
  });
}

function getMatches() {
  const text = input.value.trim().toLowerCase();
  return allConditions.filter((c) =>
    (c.title + " " + c.summary + " " + c.category).toLowerCase().includes(text)
  );
}

function filterList() {
  const matches = getMatches();
 
  list.querySelectorAll("li").forEach((li) => {
    li.hidden = !matches.some((c) => c.id === li.dataset.id);
  });
 
  noResults.hidden = matches.length > 0;
  count.textContent =
    matches.length + (matches.length === 1 ? " condition" : " conditions") + " shown";
}
 
input.addEventListener("input", filterList);
form.addEventListener("submit", (e) => e.preventDefault());


function jumpToFirstMatch() {
  const matches = getMatches();
  if (matches.length === 0) {
    return;
  }
  const details = document.getElementById(matches[0].id);
  details.open = true;
  details.scrollIntoView({ behavior: "smooth" });
}

input.addEventListener("input", filterPanels);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  jumpToFirstMatch();
});

loadConditions();